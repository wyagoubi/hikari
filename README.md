# Hikari Studio — Node.js + SQLite storefront

## Run
    npm install
    ADMIN_EMAIL=you@mail.com ADMIN_PASSWORD='strong-pass' SESSION_SECRET='long-random' npm start
Store: http://localhost:3000 — Owner dashboard: http://localhost:3000/admin (not linked from the public site).
ADMIN_* are used once, only to create the first owner account when the database has none.

## Structure
- `server.js` — Express API (public + owner), auth, uploads, order validation (server recomputes prices/fees and checks stock)
- `db/schema.sql` — SQLite schema, applied automatically. Seeds only: 3 categories, 58 wilayas (no fees), empty social links
- `public/index.html`, `css/style.css`, `js/app.js` — storefront (Arabic RTL / French / English)
- `public/admin.html` — owner dashboard
- `public/assets/` — logo, mascot, illustrative collection images
- `uploads/products` public product photos · `uploads/custom` PRIVATE customer references (served to the owner only)

## First steps for the owner
1. Admin > Delivery: set home/office fees per wilaya (empty = not offered; checkout blocks it).
2. Admin > Settings: add the real social URLs (empty ones stay hidden).
3. Admin > Products: add real products and photos, tick "published".
Nothing is pre-invented: the storefront shows branded empty states until real data is added.

## Security
Scrypt password hash, HMAC-signed HttpOnly SameSite=Strict session cookie, X-Hikari header required on owner writes, login rate limit, upload type/size limits, output escaping. Use HTTPS in production.
