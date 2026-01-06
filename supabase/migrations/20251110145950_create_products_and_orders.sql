/*
  # Create Products and Orders Tables

  1. New Tables
    - `products` - Goyard product catalog
      - `id` (uuid, primary key)
      - `name` (text) - Product name
      - `category` (text) - Saint Louis, Artois, Saigon, etc
      - `description` (text) - Product description
      - `price` (numeric) - Price in EUR
      - `image_url` (text) - Product image URL
      - `created_at` (timestamp)

    - `orders` - Customer orders
      - `id` (uuid, primary key)
      - `customer_email` (text)
      - `customer_name` (text)
      - `items` (jsonb) - Order items array
      - `total_amount` (numeric)
      - `status` (text) - pending, confirmed, shipped, delivered
      - `created_at` (timestamp)

    - `contact_messages` - Contact form submissions
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `subject` (text)
      - `message` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Allow public SELECT on products
    - Allow public INSERT on orders and contact_messages
*/

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL,
  description text,
  price numeric(10, 2) NOT NULL,
  image_url text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Products are public"
  ON products FOR SELECT
  TO public
  USING (true);

CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_email text NOT NULL,
  customer_name text NOT NULL,
  items jsonb NOT NULL,
  total_amount numeric(10, 2) NOT NULL,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create orders"
  ON orders FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can view their own orders"
  ON orders FOR SELECT
  TO public
  USING (true);

CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contact messages"
  ON contact_messages FOR INSERT
  TO public
  WITH CHECK (true);

INSERT INTO products (name, category, description, price, image_url)
VALUES
  ('Saint Louis PM', 'Saint Louis', 'Le sac iconique de voyage. Dimensions compactes pour vos déplacements quotidiens.', 1050.00, 'https://images.pexels.com/photos/3962286/pexels-photo-3962286.jpeg'),
  ('Saint Louis GM', 'Saint Louis', 'Le grand modèle de la collection Saint Louis. Parfait pour les longs voyages.', 1450.00, 'https://images.pexels.com/photos/3962286/pexels-photo-3962286.jpeg'),
  ('Artois Tote', 'Artois', 'Élégant tote bag pour le travail et les loisirs. Pratique et intemporel.', 890.00, 'https://images.pexels.com/photos/1055690/pexels-photo-1055690.jpeg'),
  ('Artois Briefcase', 'Artois', 'Serviette de luxe pour les professionnels. Rangement optimisé et design raffiné.', 1250.00, 'https://images.pexels.com/photos/1055690/pexels-photo-1055690.jpeg'),
  ('Saigon PM', 'Saigon', 'Sac à main de taille médium. Élégance et sophistication pour tous les jours.', 850.00, 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg'),
  ('Saigon MM', 'Saigon', 'Grand sac à main. Capacité généreuse avec style intemporel.', 950.00, 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg'),
  ('Travel Pouch', 'Accessories', 'Pochette de voyage pratique. Rangement organisé pour vos essentiels.', 350.00, 'https://images.pexels.com/photos/3962286/pexels-photo-3962286.jpeg'),
  ('Leather Wallet', 'Accessories', 'Portefeuille en cuir raffiné. Qualité Goyard inégalée.', 450.00, 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg');
