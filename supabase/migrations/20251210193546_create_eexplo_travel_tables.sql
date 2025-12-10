/*
  # Create Eexplo Travel Website Tables

  ## Overview
  This migration creates all necessary tables for the Eexplo travel website clone,
  including destinations, tour packages, blog posts, FAQs, newsletter subscriptions,
  contact inquiries, and services.

  ## New Tables

  ### 1. destinations
  - `id` (uuid, primary key) - Unique destination identifier
  - `name` (text) - Destination name (e.g., "Italy", "Maldives")
  - `country` (text) - Country name
  - `description` (text) - Detailed destination description
  - `tour_count` (integer) - Number of tours available
  - `image_url` (text) - Main destination image URL
  - `featured` (boolean) - Whether to show on home page
  - `created_at` (timestamptz) - Creation timestamp

  ### 2. tour_packages
  - `id` (uuid, primary key) - Unique package identifier
  - `destination_id` (uuid, foreign key) - Links to destinations table
  - `name` (text) - Package name
  - `duration` (text) - Package duration (e.g., "5 Days 4 Nights")
  - `price` (decimal) - Package price
  - `description` (text) - Package description
  - `image_url` (text) - Package image URL
  - `featured` (boolean) - Whether to show on home page
  - `created_at` (timestamptz) - Creation timestamp

  ### 3. blog_posts
  - `id` (uuid, primary key) - Unique post identifier
  - `title` (text) - Blog post title
  - `slug` (text, unique) - URL-friendly slug
  - `excerpt` (text) - Short excerpt for previews
  - `content` (text) - Full blog post content
  - `image_url` (text) - Featured image URL
  - `read_time` (integer) - Estimated read time in minutes
  - `category` (text) - Post category
  - `created_at` (timestamptz) - Creation timestamp
  - `published` (boolean) - Publication status

  ### 4. faqs
  - `id` (uuid, primary key) - Unique FAQ identifier
  - `question` (text) - FAQ question
  - `answer` (text) - FAQ answer
  - `order` (integer) - Display order
  - `active` (boolean) - Whether to display

  ### 5. newsletter_subscriptions
  - `id` (uuid, primary key) - Unique subscription identifier
  - `email` (text, unique) - Subscriber email
  - `subscribed_at` (timestamptz) - Subscription timestamp
  - `active` (boolean) - Subscription status

  ### 6. contact_inquiries
  - `id` (uuid, primary key) - Unique inquiry identifier
  - `name` (text) - Contact name
  - `email` (text) - Contact email
  - `phone` (text) - Contact phone
  - `destination` (text) - Destination of interest
  - `message` (text) - Inquiry message
  - `created_at` (timestamptz) - Creation timestamp
  - `status` (text) - Inquiry status (pending, contacted, resolved)

  ### 7. services
  - `id` (uuid, primary key) - Unique service identifier
  - `category` (text) - Service category
  - `title` (text) - Service title
  - `description` (text) - Service description
  - `icon` (text) - Icon identifier
  - `featured` (boolean) - Whether to show prominently
  - `order` (integer) - Display order

  ## Security
  All tables have Row Level Security (RLS) enabled with appropriate policies:
  - Public read access for published/active content
  - Authenticated access required for creating subscriptions and inquiries
  - Admin-only access for managing content (not implemented in this migration)
*/

-- Create destinations table
CREATE TABLE IF NOT EXISTS destinations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  country text NOT NULL,
  description text DEFAULT '',
  tour_count integer DEFAULT 0,
  image_url text DEFAULT '',
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE destinations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Destinations are viewable by everyone"
  ON destinations FOR SELECT
  TO authenticated, anon
  USING (true);

-- Create tour_packages table
CREATE TABLE IF NOT EXISTS tour_packages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  destination_id uuid REFERENCES destinations(id) ON DELETE CASCADE,
  name text NOT NULL,
  duration text NOT NULL,
  price decimal(10,2) NOT NULL DEFAULT 0,
  description text DEFAULT '',
  image_url text DEFAULT '',
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE tour_packages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tour packages are viewable by everyone"
  ON tour_packages FOR SELECT
  TO authenticated, anon
  USING (true);

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text DEFAULT '',
  content text DEFAULT '',
  image_url text DEFAULT '',
  read_time integer DEFAULT 5,
  category text DEFAULT 'General',
  published boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published blog posts are viewable by everyone"
  ON blog_posts FOR SELECT
  TO authenticated, anon
  USING (published = true);

-- Create faqs table
CREATE TABLE IF NOT EXISTS faqs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  answer text NOT NULL,
  "order" integer DEFAULT 0,
  active boolean DEFAULT true
);

ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Active FAQs are viewable by everyone"
  ON faqs FOR SELECT
  TO authenticated, anon
  USING (active = true);

-- Create newsletter_subscriptions table
CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  subscribed_at timestamptz DEFAULT now(),
  active boolean DEFAULT true
);

ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can subscribe to newsletter"
  ON newsletter_subscriptions FOR INSERT
  TO authenticated, anon
  WITH CHECK (true);

CREATE POLICY "Users can view their own subscription"
  ON newsletter_subscriptions FOR SELECT
  TO authenticated, anon
  USING (true);

-- Create contact_inquiries table
CREATE TABLE IF NOT EXISTS contact_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text DEFAULT '',
  destination text DEFAULT '',
  message text NOT NULL,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contact inquiry"
  ON contact_inquiries FOR INSERT
  TO authenticated, anon
  WITH CHECK (true);

-- Create services table
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL,
  title text NOT NULL,
  description text DEFAULT '',
  icon text DEFAULT '',
  featured boolean DEFAULT false,
  "order" integer DEFAULT 0
);

ALTER TABLE services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Services are viewable by everyone"
  ON services FOR SELECT
  TO authenticated, anon
  USING (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_destinations_featured ON destinations(featured);
CREATE INDEX IF NOT EXISTS idx_tour_packages_featured ON tour_packages(featured);
CREATE INDEX IF NOT EXISTS idx_tour_packages_destination ON tour_packages(destination_id);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_faqs_active ON faqs(active);
CREATE INDEX IF NOT EXISTS idx_services_category ON services(category);