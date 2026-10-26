'use strict';
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const Database = require('better-sqlite3');

const root = path.join(__dirname, '..');
const schema = fs.readFileSync(path.join(root, 'db', 'schema.sql'), 'utf8');
const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'hikari-check-'));
let db;
try {
  db = new Database(path.join(tempDir, 'check.sqlite'));
  db.pragma('foreign_keys = ON');
  db.exec(schema);
  const categories = db.prepare('SELECT COUNT(*) AS n FROM categories').get().n;
  const wilayas = db.prepare('SELECT COUNT(*) AS n FROM wilayas').get().n;
  const settings = db.prepare('SELECT COUNT(*) AS n FROM settings').get().n;
  if (categories !== 3) throw new Error(`Expected 3 categories, got ${categories}`);
  if (wilayas !== 58) throw new Error(`Expected 58 wilayas, got ${wilayas}`);
  if (settings !== 4) throw new Error(`Expected 4 social settings, got ${settings}`);
  const required = ['products', 'product_images', 'orders', 'order_items', 'custom_orders', 'custom_files', 'reviews', 'admins'];
  const tables = new Set(db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all().map(x => x.name));
  for (const name of required) if (!tables.has(name)) throw new Error(`Missing SQL table: ${name}`);

  // Catch the common cause of a blank/broken storefront: incorrect public file paths.
  const requiredFiles = [
    'server.js', 'package.json', 'db/schema.sql', 'public/index.html', 'public/admin.html',
    'public/css/style.css', 'public/js/app.js', 'public/assets/logo-sm.webp',
    'public/assets/hero-book.webp', 'public/assets/mascot.webp', 'uploads/products/.gitkeep',
    'uploads/custom/.gitkeep'
  ];
  for (const rel of requiredFiles) {
    if (!fs.existsSync(path.join(root, rel))) throw new Error(`Missing project file: ${rel}`);
  }
  const html = fs.readFileSync(path.join(root, 'public/index.html'), 'utf8');
  for (const asset of ['/css/style.css', '/js/app.js', '/assets/logo-sm.webp']) {
    if (!html.includes(asset)) throw new Error(`Missing storefront asset reference: ${asset}`);
  }
  console.log('Hikari checks passed: project paths, storefront assets, SQL schema, seed data and required tables.');
} finally {
  if (db) db.close();
  fs.rmSync(tempDir, { recursive: true, force: true });
}
