PRAGMA foreign_keys = ON;
CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT, slug TEXT UNIQUE NOT NULL,
  name_ar TEXT NOT NULL, name_fr TEXT NOT NULL, name_en TEXT NOT NULL, sort INTEGER DEFAULT 0);
CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT, category_id INTEGER REFERENCES categories(id),
  name TEXT NOT NULL, description TEXT DEFAULT '', materials TEXT DEFAULT '', dimensions TEXT DEFAULT '',
  production_time TEXT DEFAULT '', price INTEGER NOT NULL CHECK (price >= 0),
  stock INTEGER,                         -- NULL = made to order / unlimited
  available INTEGER NOT NULL DEFAULT 1, published INTEGER NOT NULL DEFAULT 0,
  customizable INTEGER NOT NULL DEFAULT 0, video_url TEXT DEFAULT '',
  created_at TEXT DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE IF NOT EXISTS product_images (
  id INTEGER PRIMARY KEY AUTOINCREMENT, product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  file TEXT NOT NULL, position INTEGER DEFAULT 0, is_main INTEGER DEFAULT 0);
CREATE TABLE IF NOT EXISTS wilayas (
  code INTEGER PRIMARY KEY, name TEXT NOT NULL, fee_home INTEGER, fee_office INTEGER); -- NULL = not offered
CREATE TABLE IF NOT EXISTS orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, phone TEXT NOT NULL, email TEXT DEFAULT '',
  wilaya_code INTEGER REFERENCES wilayas(code), delivery_type TEXT NOT NULL CHECK (delivery_type IN ('home','office')),
  address TEXT DEFAULT '', note TEXT DEFAULT '', subtotal INTEGER NOT NULL, delivery_fee INTEGER NOT NULL, total INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'new', created_at TEXT DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE IF NOT EXISTS order_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT, order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id INTEGER, name TEXT NOT NULL, price INTEGER NOT NULL, qty INTEGER NOT NULL);
CREATE TABLE IF NOT EXISTS custom_orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, phone TEXT NOT NULL, email TEXT DEFAULT '',
  type TEXT NOT NULL, description TEXT NOT NULL, colors TEXT DEFAULT '', links TEXT DEFAULT '', budget TEXT DEFAULT '',
  status TEXT NOT NULL DEFAULT 'new', created_at TEXT DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE IF NOT EXISTS custom_files (
  id INTEGER PRIMARY KEY AUTOINCREMENT, custom_id INTEGER NOT NULL REFERENCES custom_orders(id) ON DELETE CASCADE, file TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS reviews (
  id INTEGER PRIMARY KEY AUTOINCREMENT, author TEXT NOT NULL, city TEXT DEFAULT '', rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  text TEXT NOT NULL, approved INTEGER NOT NULL DEFAULT 0, created_at TEXT DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY, value TEXT NOT NULL DEFAULT '');
CREATE TABLE IF NOT EXISTS admins (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT UNIQUE NOT NULL, hash TEXT NOT NULL);

INSERT OR IGNORE INTO categories (slug,name_ar,name_fr,name_en,sort) VALUES
 ('books','كتب جلدية مجلدة يدويًا','Livres reliés main / Grimoires','Hand-bound Books / Grimoires',1),
 ('charms','تعليقات طينية','Charms en argile','Clay Charms',2),
 ('dioramas','عوالم مصغرة','Dioramas miniatures','Miniature Dioramas',3);
INSERT OR IGNORE INTO settings (key,value) VALUES ('instagram',''),('tiktok',''),('youtube',''),('facebook','');
INSERT OR IGNORE INTO wilayas (code,name) VALUES
(1,'Adrar'),(2,'Chlef'),(3,'Laghouat'),(4,'Oum El Bouaghi'),(5,'Batna'),(6,'Béjaïa'),(7,'Biskra'),(8,'Béchar'),(9,'Blida'),(10,'Bouira'),
(11,'Tamanrasset'),(12,'Tébessa'),(13,'Tlemcen'),(14,'Tiaret'),(15,'Tizi Ouzou'),(16,'Alger'),(17,'Djelfa'),(18,'Jijel'),(19,'Sétif'),(20,'Saïda'),
(21,'Skikda'),(22,'Sidi Bel Abbès'),(23,'Annaba'),(24,'Guelma'),(25,'Constantine'),(26,'Médéa'),(27,'Mostaganem'),(28,'M''Sila'),(29,'Mascara'),(30,'Ouargla'),
(31,'Oran'),(32,'El Bayadh'),(33,'Illizi'),(34,'Bordj Bou Arréridj'),(35,'Boumerdès'),(36,'El Tarf'),(37,'Tindouf'),(38,'Tissemsilt'),(39,'El Oued'),(40,'Khenchela'),
(41,'Souk Ahras'),(42,'Tipaza'),(43,'Mila'),(44,'Aïn Defla'),(45,'Naâma'),(46,'Aïn Témouchent'),(47,'Ghardaïa'),(48,'Relizane'),(49,'Timimoun'),(50,'Bordj Badji Mokhtar'),
(51,'Ouled Djellal'),(52,'Béni Abbès'),(53,'In Salah'),(54,'In Guezzam'),(55,'Touggourt'),(56,'Djanet'),(57,'El M''Ghair'),(58,'El Meniaa');
