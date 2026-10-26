'use strict';
const express = require('express'), path = require('path'), fs = require('fs'), crypto = require('crypto');
const Database = require('better-sqlite3'), multer = require('multer');

const PORT = process.env.PORT || 3000;
const SECRET = process.env.SESSION_SECRET || crypto.randomBytes(32).toString('hex');
if (!process.env.SESSION_SECRET) console.warn('[warn] SESSION_SECRET not set: admin sessions reset on restart.');
const DB_FILE = process.env.DB_FILE || path.join(__dirname, 'db', 'hikari.sqlite');
const UP = path.join(__dirname, 'uploads');
for (const d of ['products', 'custom']) fs.mkdirSync(path.join(UP, d), { recursive: true });

const db = new Database(DB_FILE);
db.pragma('journal_mode = WAL'); db.pragma('foreign_keys = ON');
db.exec(fs.readFileSync(path.join(__dirname, 'db', 'schema.sql'), 'utf8'));

// ---------- auth helpers ----------
const hashPw = (pw, salt = crypto.randomBytes(16).toString('hex')) => salt + ':' + crypto.scryptSync(pw, salt, 64).toString('hex');
const checkPw = (pw, stored) => {
  const [salt, h] = stored.split(':'); const t = crypto.scryptSync(pw, salt, 64);
  return crypto.timingSafeEqual(t, Buffer.from(h, 'hex'));
};
if (process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD && !db.prepare('SELECT 1 FROM admins').get()) {
  db.prepare('INSERT INTO admins (email,hash) VALUES (?,?)').run(process.env.ADMIN_EMAIL.toLowerCase(), hashPw(process.env.ADMIN_PASSWORD));
  console.log('[init] Owner account created for', process.env.ADMIN_EMAIL);
}
const sign = (p) => { const b = Buffer.from(JSON.stringify(p)).toString('base64url'); return b + '.' + crypto.createHmac('sha256', SECRET).update(b).digest('base64url'); };
const verify = (t) => {
  if (!t) return null; const [b, s] = t.split('.'); if (!b || !s) return null;
  const e = crypto.createHmac('sha256', SECRET).update(b).digest('base64url');
  if (e.length !== s.length || !crypto.timingSafeEqual(Buffer.from(e), Buffer.from(s))) return null;
  const p = JSON.parse(Buffer.from(b, 'base64url').toString()); return p.exp > Date.now() ? p : null;
};
const cookie = (req, n) => (req.headers.cookie || '').split(';').map(s => s.trim().split('=')).find(a => a[0] === n)?.[1];
const requireAdmin = (req, res, next) => {
  const s = verify(cookie(req, 'hk_admin'));
  if (!s) return res.status(401).json({ error: 'unauthorized' });
  if (req.method !== 'GET' && req.headers['x-hikari'] !== '1') return res.status(403).json({ error: 'csrf' });
  req.admin = s; next();
};
const attempts = new Map(); // naive login rate limit per IP
const limited = (ip) => { const a = (attempts.get(ip) || []).filter(t => Date.now() - t < 15 * 60e3); attempts.set(ip, a); return a.length >= 8; };

// ---------- uploads ----------
const ok = /^image\/(jpeg|png|webp)$/;
const storage = (dir) => multer.diskStorage({
  destination: path.join(UP, dir),
  filename: (r, f, cb) => cb(null, crypto.randomBytes(12).toString('hex') + { 'image/jpeg': '.jpg', 'image/png': '.png', 'image/webp': '.webp' }[f.mimetype])
});
const upl = (dir, n) => multer({ storage: storage(dir), limits: { fileSize: 6 * 1024 * 1024, files: n }, fileFilter: (r, f, cb) => cb(ok.test(f.mimetype) ? null : new Error('bad_file'), ok.test(f.mimetype)) });

const app = express();
app.disable('x-powered-by');
app.use((q, s, n) => { s.set({ 'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'same-origin', 'X-Frame-Options': 'DENY' }); n(); });
app.use(express.json({ limit: '200kb' }));
app.use('/uploads/products', express.static(path.join(UP, 'products'), { maxAge: '7d' }));
app.use(express.static(path.join(__dirname, 'public'), { extensions: ['html'], maxAge: '1h' }));

const str = (v, max = 500) => String(v ?? '').trim().slice(0, max);
const int = (v) => Number.isFinite(+v) ? Math.trunc(+v) : NaN;
const imgs = db.prepare('SELECT id,file,position,is_main FROM product_images WHERE product_id=? ORDER BY is_main DESC, position, id');
const withImages = (p) => ({ ...p, images: imgs.all(p.id).map(i => ({ ...i, url: '/uploads/products/' + i.file })) });
const PROD_COLS = 'p.*, c.slug AS category';

// ---------- public API ----------
app.get('/api/categories', (q, s) => s.json(db.prepare('SELECT * FROM categories ORDER BY sort').all()));
app.get('/api/products', (q, s) => {
  let sql = `SELECT ${PROD_COLS} FROM products p LEFT JOIN categories c ON c.id=p.category_id WHERE p.published=1`; const a = [];
  if (q.query.cat) { sql += ' AND c.slug=?'; a.push(str(q.query.cat, 40)); }
  if (q.query.q) { sql += ' AND (p.name LIKE ? OR p.description LIKE ?)'; a.push(`%${str(q.query.q, 60)}%`, `%${str(q.query.q, 60)}%`); }
  sql += { price_asc: ' ORDER BY p.price ASC', price_desc: ' ORDER BY p.price DESC' }[q.query.sort] || ' ORDER BY p.id DESC';
  s.json(db.prepare(sql).all(...a).map(withImages));
});
app.get('/api/products/:id', (q, s) => {
  const p = db.prepare(`SELECT ${PROD_COLS} FROM products p LEFT JOIN categories c ON c.id=p.category_id WHERE p.id=? AND p.published=1`).get(int(q.params.id));
  p ? s.json(withImages(p)) : s.status(404).json({ error: 'not_found' });
});
app.post('/api/cart/price', (q, s) => { // fresh prices/availability for client cart
  const ids = (Array.isArray(q.body.ids) ? q.body.ids : []).map(int).filter(Number.isFinite).slice(0, 50);
  s.json(ids.map(id => db.prepare('SELECT * FROM products WHERE id=? AND published=1').get(id)).filter(Boolean).map(withImages));
});
app.get('/api/wilayas', (q, s) => s.json(db.prepare('SELECT * FROM wilayas ORDER BY code').all()));
app.get('/api/settings', (q, s) => s.json(Object.fromEntries(db.prepare('SELECT key,value FROM settings').all().map(r => [r.key, r.value]))));
app.get('/api/reviews', (q, s) => s.json(db.prepare('SELECT id,author,city,rating,text,created_at FROM reviews WHERE approved=1 ORDER BY id DESC LIMIT 30').all()));
app.post('/api/reviews', (q, s) => {
  const b = q.body, r = int(b.rating), a = str(b.author, 60), t = str(b.text, 800);
  if (!a || !t || !(r >= 1 && r <= 5)) return s.status(400).json({ error: 'invalid' });
  db.prepare('INSERT INTO reviews (author,city,rating,text) VALUES (?,?,?,?)').run(a, str(b.city, 60), r, t);
  s.json({ ok: true, pending: true });
});

const createOrder = db.transaction((b) => {
  const name = str(b.name, 100), phone = str(b.phone, 20).replace(/[\s.-]/g, '');
  if (name.length < 2 || !/^(\+?213|0)[5-7]\d{8}$/.test(phone)) throw Object.assign(new Error('invalid_contact'), { code: 400 });
  const w = db.prepare('SELECT * FROM wilayas WHERE code=?').get(int(b.wilaya));
  const type = b.delivery_type === 'office' ? 'office' : 'home';
  const fee = w && (type === 'home' ? w.fee_home : w.fee_office);
  if (!w || fee == null) throw Object.assign(new Error('delivery_unavailable'), { code: 400 });
  const address = str(b.address, 300); if (type === 'home' && address.length < 5) throw Object.assign(new Error('address_required'), { code: 400 });
  const items = Array.isArray(b.items) ? b.items.slice(0, 50) : []; if (!items.length) throw Object.assign(new Error('empty_cart'), { code: 400 });
  let subtotal = 0; const rows = [];
  for (const it of items) {
    const p = db.prepare('SELECT * FROM products WHERE id=? AND published=1 AND available=1').get(int(it.id)); const qty = int(it.qty);
    if (!p || !(qty >= 1 && qty <= 20)) throw Object.assign(new Error('item_unavailable'), { code: 409 });
    if (p.stock != null) { if (p.stock < qty) throw Object.assign(new Error('out_of_stock'), { code: 409 }); db.prepare('UPDATE products SET stock=stock-? WHERE id=?').run(qty, p.id); }
    subtotal += p.price * qty; rows.push([p.id, p.name, p.price, qty]);
  }
  const o = db.prepare('INSERT INTO orders (name,phone,email,wilaya_code,delivery_type,address,note,subtotal,delivery_fee,total) VALUES (?,?,?,?,?,?,?,?,?,?)')
    .run(name, phone, str(b.email, 120), w.code, type, type === 'home' ? address : '', str(b.note, 500), subtotal, fee, subtotal + fee);
  const ins = db.prepare('INSERT INTO order_items (order_id,product_id,name,price,qty) VALUES (?,?,?,?,?)');
  rows.forEach(r => ins.run(o.lastInsertRowid, ...r));
  return { id: o.lastInsertRowid, subtotal, delivery_fee: fee, total: subtotal + fee };
});
app.post('/api/orders', (q, s) => {
  try { s.json({ ok: true, order: createOrder(q.body) }); }
  catch (e) { s.status(e.code || 500).json({ error: e.code ? e.message : 'server_error' }); if (!e.code) console.error(e); }
});

const upCustom = upl('custom', 4).array('refs', 4);
app.post('/api/custom-orders', (q, s) => {
  upCustom(q, s, (err) => {
    if (err) return s.status(400).json({ error: err.message === 'bad_file' ? 'bad_file' : 'upload_failed' });
    const b = q.body, name = str(b.name, 100), phone = str(b.phone, 20).replace(/[\s.-]/g, ''), desc = str(b.description, 3000);
    const cleanup = () => (q.files || []).forEach(f => fs.unlink(f.path, () => {}));
    if (name.length < 2 || !/^(\+?213|0)[5-7]\d{8}$/.test(phone) || desc.length < 10 || !str(b.type, 60)) { cleanup(); return s.status(400).json({ error: 'invalid' }); }
    const id = db.transaction(() => {
      const r = db.prepare('INSERT INTO custom_orders (name,phone,email,type,description,colors,links,budget) VALUES (?,?,?,?,?,?,?,?)')
        .run(name, phone, str(b.email, 120), str(b.type, 60), desc, str(b.colors, 200), str(b.links, 600), str(b.budget, 60));
      (q.files || []).forEach(f => db.prepare('INSERT INTO custom_files (custom_id,file) VALUES (?,?)').run(r.lastInsertRowid, f.filename));
      return r.lastInsertRowid;
    })();
    s.json({ ok: true, id, status: 'received' }); // received for review, NOT accepted
  });
});

// ---------- admin API ----------
app.post('/api/admin/login', (q, s) => {
  if (limited(q.ip)) return s.status(429).json({ error: 'too_many' });
  const a = db.prepare('SELECT * FROM admins WHERE email=?').get(str(q.body.email, 120).toLowerCase());
  if (!a || !checkPw(str(q.body.password, 200), a.hash)) { attempts.get(q.ip)?.push(Date.now()) ?? attempts.set(q.ip, [Date.now()]); return s.status(401).json({ error: 'bad_credentials' }); }
  const t = sign({ id: a.id, exp: Date.now() + 8 * 3600e3 });
  s.set('Set-Cookie', `hk_admin=${t}; HttpOnly; SameSite=Strict; Path=/; Max-Age=28800${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`);
  s.json({ ok: true });
});
app.post('/api/admin/logout', (q, s) => { s.set('Set-Cookie', 'hk_admin=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0'); s.json({ ok: true }); });
app.get('/api/admin/me', requireAdmin, (q, s) => s.json({ ok: true }));
const A = express.Router(); A.use(requireAdmin); app.use('/api/admin', A);

A.get('/stats', (q, s) => s.json({
  orders: db.prepare('SELECT COUNT(*) n FROM orders').get().n, newOrders: db.prepare("SELECT COUNT(*) n FROM orders WHERE status='new'").get().n,
  revenue: db.prepare("SELECT COALESCE(SUM(total),0) n FROM orders WHERE status IN ('delivered')").get().n,
  products: db.prepare('SELECT COUNT(*) n FROM products').get().n, custom: db.prepare("SELECT COUNT(*) n FROM custom_orders WHERE status='new'").get().n,
  reviews: db.prepare('SELECT COUNT(*) n FROM reviews WHERE approved=0').get().n,
  recent: db.prepare('SELECT id,name,total,status,created_at FROM orders ORDER BY id DESC LIMIT 5').all() }));

A.get('/products', (q, s) => s.json(db.prepare(`SELECT ${PROD_COLS} FROM products p LEFT JOIN categories c ON c.id=p.category_id ORDER BY p.id DESC`).all().map(withImages)));
const prodFields = (b) => {
  const price = int(b.price), name = str(b.name, 150); if (!name || !(price >= 0)) throw Object.assign(new Error('invalid'), { code: 400 });
  const cat = db.prepare('SELECT id FROM categories WHERE slug=?').get(str(b.category, 40));
  return [cat?.id ?? null, name, str(b.description, 4000), str(b.materials, 300), str(b.dimensions, 120), str(b.production_time, 120), price,
    b.stock === '' || b.stock == null ? null : Math.max(0, int(b.stock)), b.available ? 1 : 0, b.published ? 1 : 0, b.customizable ? 1 : 0, str(b.video_url, 400)];
};
const COLS = 'category_id,name,description,materials,dimensions,production_time,price,stock,available,published,customizable,video_url';
const wrap = (f) => (q, s) => { try { f(q, s); } catch (e) { s.status(e.code || 500).json({ error: e.code ? e.message : 'server_error' }); if (!e.code) console.error(e); } };
A.post('/products', wrap((q, s) => { const r = db.prepare(`INSERT INTO products (${COLS}) VALUES (${COLS.split(',').map(() => '?')})`).run(...prodFields(q.body)); s.json({ id: r.lastInsertRowid }); }));
A.put('/products/:id', wrap((q, s) => { db.prepare(`UPDATE products SET ${COLS.split(',').map(c => c + '=?')} WHERE id=?`).run(...prodFields(q.body), int(q.params.id)); s.json({ ok: true }); }));
A.delete('/products/:id', wrap((q, s) => {
  const id = int(q.params.id); imgs.all(id).forEach(i => fs.unlink(path.join(UP, 'products', i.file), () => {}));
  db.prepare('DELETE FROM products WHERE id=?').run(id); s.json({ ok: true });
}));
A.post('/products/:id/images', (q, s) => upl('products', 8).array('images', 8)(q, s, (err) => {
  if (err) return s.status(400).json({ error: 'bad_file' });
  const id = int(q.params.id); if (!db.prepare('SELECT 1 FROM products WHERE id=?').get(id)) { (q.files || []).forEach(f => fs.unlink(f.path, () => {})); return s.status(404).json({ error: 'not_found' }); }
  let pos = db.prepare('SELECT COALESCE(MAX(position),0) m FROM product_images WHERE product_id=?').get(id).m;
  const has = db.prepare('SELECT COUNT(*) n FROM product_images WHERE product_id=?').get(id).n;
  (q.files || []).forEach((f, i) => db.prepare('INSERT INTO product_images (product_id,file,position,is_main) VALUES (?,?,?,?)').run(id, f.filename, ++pos, !has && i === 0 ? 1 : 0));
  s.json({ ok: true });
}));
A.post('/images/:id/main', wrap((q, s) => {
  const i = db.prepare('SELECT * FROM product_images WHERE id=?').get(int(q.params.id)); if (!i) throw Object.assign(new Error('not_found'), { code: 404 });
  db.transaction(() => { db.prepare('UPDATE product_images SET is_main=0 WHERE product_id=?').run(i.product_id); db.prepare('UPDATE product_images SET is_main=1 WHERE id=?').run(i.id); })(); s.json({ ok: true });
}));
A.post('/images/:id/move', wrap((q, s) => { // dir: -1 / +1
  const i = db.prepare('SELECT * FROM product_images WHERE id=?').get(int(q.params.id)); if (!i) throw Object.assign(new Error('not_found'), { code: 404 });
  const list = db.prepare('SELECT id FROM product_images WHERE product_id=? ORDER BY position,id').all(i.product_id).map(r => r.id);
  const k = list.indexOf(i.id), j = k + (int(q.body.dir) < 0 ? -1 : 1); if (j < 0 || j >= list.length) return s.json({ ok: true });
  [list[k], list[j]] = [list[j], list[k]]; list.forEach((id, n) => db.prepare('UPDATE product_images SET position=? WHERE id=?').run(n + 1, id)); s.json({ ok: true });
}));
A.delete('/images/:id', wrap((q, s) => {
  const i = db.prepare('SELECT * FROM product_images WHERE id=?').get(int(q.params.id)); if (!i) throw Object.assign(new Error('not_found'), { code: 404 });
  db.prepare('DELETE FROM product_images WHERE id=?').run(i.id); fs.unlink(path.join(UP, 'products', i.file), () => {});
  if (i.is_main) { const n = db.prepare('SELECT id FROM product_images WHERE product_id=? ORDER BY position LIMIT 1').get(i.product_id); if (n) db.prepare('UPDATE product_images SET is_main=1 WHERE id=?').run(n.id); }
  s.json({ ok: true });
}));

const STATUS = ['new', 'confirmed', 'shipped', 'delivered', 'cancelled'];
A.get('/orders', (q, s) => s.json(db.prepare('SELECT o.*, w.name AS wilaya FROM orders o LEFT JOIN wilayas w ON w.code=o.wilaya_code ORDER BY o.id DESC LIMIT 300').all()
  .map(o => ({ ...o, items: db.prepare('SELECT * FROM order_items WHERE order_id=?').all(o.id) }))));
A.put('/orders/:id', wrap((q, s) => { if (!STATUS.includes(q.body.status)) throw Object.assign(new Error('invalid'), { code: 400 }); db.prepare('UPDATE orders SET status=? WHERE id=?').run(q.body.status, int(q.params.id)); s.json({ ok: true }); }));
A.get('/custom', (q, s) => s.json(db.prepare('SELECT * FROM custom_orders ORDER BY id DESC LIMIT 300').all()
  .map(c => ({ ...c, files: db.prepare('SELECT id,file FROM custom_files WHERE custom_id=?').all(c.id).map(f => ({ id: f.id, url: '/api/admin/custom-file/' + f.file })) }))));
A.put('/custom/:id', wrap((q, s) => { if (!['new', 'reviewing', 'quoted', 'accepted', 'declined', 'done'].includes(q.body.status)) throw Object.assign(new Error('invalid'), { code: 400 }); db.prepare('UPDATE custom_orders SET status=? WHERE id=?').run(q.body.status, int(q.params.id)); s.json({ ok: true }); }));
A.get('/custom-file/:f', (q, s) => { // private customer references: admin only
  const f = path.basename(q.params.f); if (!db.prepare('SELECT 1 FROM custom_files WHERE file=?').get(f)) return s.sendStatus(404);
  s.sendFile(path.join(UP, 'custom', f));
});
A.get('/reviews', (q, s) => s.json(db.prepare('SELECT * FROM reviews ORDER BY id DESC').all()));
A.put('/reviews/:id', wrap((q, s) => { db.prepare('UPDATE reviews SET approved=? WHERE id=?').run(q.body.approved ? 1 : 0, int(q.params.id)); s.json({ ok: true }); }));
A.delete('/reviews/:id', wrap((q, s) => { db.prepare('DELETE FROM reviews WHERE id=?').run(int(q.params.id)); s.json({ ok: true }); }));
A.get('/wilayas', (q, s) => s.json(db.prepare('SELECT * FROM wilayas ORDER BY code').all()));
A.put('/wilayas/:code', wrap((q, s) => { const f = (v) => (v === '' || v == null ? null : Math.max(0, int(v))); db.prepare('UPDATE wilayas SET fee_home=?, fee_office=? WHERE code=?').run(f(q.body.fee_home), f(q.body.fee_office), int(q.params.code)); s.json({ ok: true }); }));
A.put('/settings', wrap((q, s) => {
  for (const k of ['instagram', 'tiktok', 'youtube', 'facebook']) { const v = str(q.body[k], 300); if (v && !/^https:\/\//.test(v)) throw Object.assign(new Error('invalid_url'), { code: 400 }); db.prepare('UPDATE settings SET value=? WHERE key=?').run(v, k); }
  s.json({ ok: true });
}));

app.get('/admin', (q, s) => s.sendFile(path.join(__dirname, 'public', 'admin.html')));
app.use('/api', (q, s) => s.status(404).json({ error: 'not_found' }));
app.use((e, q, s, n) => { console.error(e); s.status(500).json({ error: 'server_error' }); });
app.listen(PORT, () => console.log(`Hikari Studio → http://localhost:${PORT}  |  Admin → /admin`));
