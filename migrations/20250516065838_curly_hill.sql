/*
  # Create testimonials table

  1. New Tables
    - `testimonials`
      - `id` (uuid, primary key)
      - `name` (text)
      - `role` (text)
      - `content` (text)
      - `rating` (integer)
      - `created_at` (timestamp)
      - `approved` (boolean)
  2. Security
    - Enable RLS on `testimonials` table
    - Add policy for public read access to approved testimonials
    - Add policy for public insert access
*/

CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text NOT NULL,
  content text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  created_at timestamptz DEFAULT now(),
  approved boolean DEFAULT false
);

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Allow public to read approved testimonials
CREATE POLICY "Allow public read access to approved testimonials"
  ON testimonials
  FOR SELECT
  TO public
  USING (approved = true);

-- Allow public to submit new testimonials
CREATE POLICY "Allow public to submit testimonials"
  ON testimonials
  FOR INSERT
  TO public
  WITH CHECK (true);