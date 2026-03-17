-- ============================================================
-- Fix RLS so the website (anon key) can read rankings data
-- Run in Supabase SQL Editor: Dashboard → SQL Editor → paste → Run
-- ============================================================

-- Drop existing policies if they exist (avoids "already exists" error)
DROP POLICY IF EXISTS "Allow public read" ON categories;
DROP POLICY IF EXISTS "Allow public read" ON people;
DROP POLICY IF EXISTS "Allow public read" ON tags;
DROP POLICY IF EXISTS "Allow public read" ON articles;
DROP POLICY IF EXISTS "Allow public read" ON people_tags;

-- Create policies for public read
CREATE POLICY "Allow public read" ON categories FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON people FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON tags FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON articles FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON people_tags FOR SELECT USING (true);
