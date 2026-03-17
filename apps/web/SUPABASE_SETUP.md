# Supabase Setup for Ikemen Ranker

## 1. Get your credentials

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project (or create one)
3. **Project Settings** → **API** → copy:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public** key → `VITE_SUPABASE_ANON_KEY`

## 2. Configure env

Create `apps/web/.env`:

```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 3. Row Level Security (RLS)

If tables have RLS enabled, add policies to allow read access. In Supabase SQL Editor, run:

```sql
-- Allow public read for categories
CREATE POLICY "Allow public read" ON categories
  FOR SELECT USING (true);

-- Allow public read for people
CREATE POLICY "Allow public read" ON people
  FOR SELECT USING (true);

-- Allow public read for tags
CREATE POLICY "Allow public read" ON tags
  FOR SELECT USING (true);

-- Allow public read for articles
CREATE POLICY "Allow public read" ON articles
  FOR SELECT USING (true);
```

Or disable RLS (simpler for demo, not for production):

```sql
ALTER TABLE categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE people DISABLE ROW LEVEL SECURITY;
ALTER TABLE tags DISABLE ROW LEVEL SECURITY;
ALTER TABLE articles DISABLE ROW LEVEL SECURITY;
```

## 4. Required schema

Tables must exist with these columns:

- **categories**: `id`, `slug`, `name_ja`, `description`, `is_active`, `display_order`
- **people**: `id`, `slug`, `name_ja`, `title`, `category_id`, `score_total`, `is_active`, `created_at`, `image_url`, etc.
- **tags**, **people_tags** (for person–tag relations)

Use the admin panel at `/admin` to add data, or run migrations from the Supabase SQL editor.
