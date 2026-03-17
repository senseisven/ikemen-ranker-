-- ============================================================
-- Assign categories to people based on their title/bio
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard → SQL Editor
-- ============================================================

-- Step 1: Ensure categories exist (insert if missing)
-- Option A: If categories.slug has a UNIQUE constraint, use ON CONFLICT:
INSERT INTO categories (slug, name_ja, description, display_order, is_active)
VALUES 
  ('startup', 'スタートアップ', 'テクノロジーとビジネスで未来を切り開く、スタートアップ界のイケメン経営者たち。', 1, true),
  ('actor', '俳優', '映画、ドラマ、舞台で活躍する俳優陣。演技力と存在感で観客を魅了する実力派を厳選。', 2, true),
  ('athlete', 'アスリート', 'スポーツの世界で結果を残し続けるトップアスリート。鍛え抜かれた肉体美と精神力。', 3, true),
  ('model', 'モデル', 'ファッション業界を牽引するプロフェッショナルモデル。洗練されたスタイルと表現力。', 4, true),
  ('youtuber', 'YouTuber', 'デジタルネイティブ世代を代表するクリエイター。独自の企画力とキャラクター。', 5, true),
  ('musician', 'ミュージシャン', '音楽シーンで独自の存在感を放つアーティスト。楽曲のクオリティとビジュアル。', 6, true)
ON CONFLICT (slug) DO NOTHING;

-- Option B: If you get "ON CONFLICT requires a unique constraint" error, use this instead:
-- INSERT INTO categories (slug, name_ja, description, display_order, is_active)
-- SELECT * FROM (VALUES 
--   ('startup', 'スタートアップ', 'テクノロジーとビジネスで未来を切り開く、スタートアップ界のイケメン経営者たち。', 1, true),
--   ('actor', '俳優', '映画、ドラマ、舞台で活躍する俳優陣。演技力と存在感で観客を魅了する実力派を厳選。', 2, true),
--   ('athlete', 'アスリート', 'スポーツの世界で結果を残し続けるトップアスリート。鍛え抜かれた肉体美と精神力。', 3, true),
--   ('model', 'モデル', 'ファッション業界を牽引するプロフェッショナルモデル。洗練されたスタイルと表現力。', 4, true),
--   ('youtuber', 'YouTuber', 'デジタルネイティブ世代を代表するクリエイター。独自の企画力とキャラクター。', 5, true),
--   ('musician', 'ミュージシャン', '音楽シーンで独自の存在感を放つアーティスト。楽曲のクオリティとビジュアル。', 6, true)
-- ) AS v(slug, name_ja, description, display_order, is_active)
-- WHERE NOT EXISTS (SELECT 1 FROM categories c WHERE c.slug = v.slug);

-- Step 2: Update each person's category_id based on their title and bio_short
-- Uses keyword matching - customize the WHEN conditions for your data
UPDATE people p
SET category_id = c.id
FROM categories c
WHERE c.slug = (
  CASE
    -- スタートアップ: CEO, 創業, CTO, 経営, スタートアップ, フィンテック, SaaS
    WHEN COALESCE(p.title, '') ILIKE '%CEO%' 
      OR COALESCE(p.title, '') ILIKE '%創業%' 
      OR COALESCE(p.title, '') ILIKE '%CTO%'
      OR COALESCE(p.title, '') ILIKE '%経営%'
      OR COALESCE(p.title, '') ILIKE '%スタートアップ%'
      OR COALESCE(p.title, '') ILIKE '%フィンテック%'
      OR COALESCE(p.title, '') ILIKE '%SaaS%'
      OR COALESCE(p.bio_short, '') ILIKE '%スタートアップ%'
      OR COALESCE(p.bio_short, '') ILIKE '%経営%'
      THEN 'startup'
    
    -- 俳優: 俳優, actor, 映画, ドラマ, 舞台
    WHEN COALESCE(p.title, '') ILIKE '%俳優%' 
      OR COALESCE(p.title, '') ILIKE '%actor%'
      OR COALESCE(p.bio_short, '') ILIKE '%俳優%'
      OR COALESCE(p.bio_short, '') ILIKE '%映画%'
      OR COALESCE(p.bio_short, '') ILIKE '%ドラマ%'
      OR COALESCE(p.bio_short, '') ILIKE '%舞台%'
      THEN 'actor'
    
    -- アスリート: アスリート, athlete, 選手, スポーツ
    WHEN COALESCE(p.title, '') ILIKE '%アスリート%' 
      OR COALESCE(p.title, '') ILIKE '%athlete%'
      OR COALESCE(p.title, '') ILIKE '%選手%'
      OR COALESCE(p.bio_short, '') ILIKE '%スポーツ%'
      OR COALESCE(p.bio_short, '') ILIKE '%アスリート%'
      OR COALESCE(p.bio_short, '') ILIKE '%選手%'
      THEN 'athlete'
    
    -- モデル: モデル, model, ランウェイ
    WHEN COALESCE(p.title, '') ILIKE '%モデル%' 
      OR COALESCE(p.title, '') ILIKE '%model%'
      OR COALESCE(p.bio_short, '') ILIKE '%モデル%'
      OR COALESCE(p.bio_short, '') ILIKE '%ランウェイ%'
      OR COALESCE(p.bio_short, '') ILIKE '%ファッション%'
      THEN 'model'
    
    -- YouTuber: YouTuber, YouTube, クリエイター
    WHEN COALESCE(p.title, '') ILIKE '%YouTuber%' 
      OR COALESCE(p.title, '') ILIKE '%YouTube%'
      OR COALESCE(p.title, '') ILIKE '%クリエイター%'
      OR COALESCE(p.bio_short, '') ILIKE '%YouTuber%'
      OR COALESCE(p.bio_short, '') ILIKE '%YouTube%'
      THEN 'youtuber'
    
    -- ミュージシャン: ミュージシャン, musician, アーティスト, 歌手, 音楽
    WHEN COALESCE(p.title, '') ILIKE '%ミュージシャン%' 
      OR COALESCE(p.title, '') ILIKE '%musician%'
      OR COALESCE(p.title, '') ILIKE '%アーティスト%'
      OR COALESCE(p.title, '') ILIKE '%歌手%'
      OR COALESCE(p.bio_short, '') ILIKE '%音楽%'
      OR COALESCE(p.bio_short, '') ILIKE '%ミュージシャン%'
      OR COALESCE(p.bio_short, '') ILIKE '%楽曲%'
      THEN 'musician'
    
    -- Default: assign to startup if no match
    ELSE 'startup'
  END
);

-- Optional: Check the results
-- SELECT p.name_ja, p.title, c.name_ja as category 
-- FROM people p 
-- LEFT JOIN categories c ON p.category_id = c.id 
-- ORDER BY c.display_order, p.name_ja;
