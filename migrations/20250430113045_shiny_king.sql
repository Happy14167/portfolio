/*
  # Create visitors table for website counter

  1. New Tables
    - `visitors`
      - `id` (uuid, primary key)
      - `count` (bigint)
      - `last_visit` (timestamp)
  2. Security
    - Enable RLS on `visitors` table
    - Add policy for public read access
*/

CREATE TABLE IF NOT EXISTS visitors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  count bigint DEFAULT 0,
  last_visit timestamptz DEFAULT now()
);

ALTER TABLE visitors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to visitors"
  ON visitors
  FOR SELECT
  TO public
  USING (true);

-- Insert initial record if not exists
INSERT INTO visitors (id, count)
VALUES ('00000000-0000-0000-0000-000000000000', 0)
ON CONFLICT (id) DO NOTHING;