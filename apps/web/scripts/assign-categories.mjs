/**
 * Assigns category_id to each person based on their title.
 * Run: node apps/web/scripts/assign-categories.mjs
 * 
 * Uses SUPABASE_SERVICE_ROLE_KEY (bypasses RLS) - get from:
 * Supabase Dashboard → Project Settings → API → service_role
 * Add to apps/web/.env. Do NOT commit this key.
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, '../.env');

if (existsSync(envPath)) {
  const lines = readFileSync(envPath, 'utf8').split('\n');
  for (const line of lines) {
    const m = line.match(/^([^#=]+)=(.*)$/);
    if (m) process.env[m[1].trim()] = m[2].trim();
  }
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// Service role bypasses RLS - required for updates to persist
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in apps/web/.env');
  process.exit(1);
}

if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.warn('Warning: Using anon key. Updates may not persist due to RLS. Add SUPABASE_SERVICE_ROLE_KEY to .env\n');
}

const supabase = createClient(supabaseUrl, supabaseKey);

function getCategorySlug(title = '', bioShort = '') {
  const t = title.toLowerCase();
  const b = (bioShort || '').toLowerCase();

  if (t.includes('ceo') || t.includes('創業') || t.includes('cto') || t.includes('経営') || t.includes('スタートアップ') || t.includes('フィンテック') || t.includes('saas') || b.includes('スタートアップ') || b.includes('経営'))
    return 'startup';
  if (t.includes('俳優') || t.includes('actor') || b.includes('俳優') || b.includes('映画') || b.includes('ドラマ') || b.includes('舞台'))
    return 'actor';
  if (t.includes('アスリート') || t.includes('athlete') || t.includes('選手') || b.includes('スポーツ') || b.includes('アスリート') || b.includes('選手'))
    return 'athlete';
  if (t.includes('モデル') || t.includes('model') || b.includes('モデル') || b.includes('ランウェイ') || b.includes('ファッション'))
    return 'model';
  if (t.includes('youtuber') || t.includes('youtube') || t.includes('クリエイター') || b.includes('youtuber') || b.includes('youtube'))
    return 'youtuber';
  if (t.includes('ミュージシャン') || t.includes('musician') || t.includes('アーティスト') || t.includes('歌手') || b.includes('音楽') || b.includes('ミュージシャン') || b.includes('楽曲'))
    return 'musician';

  return 'startup'; // default
}

async function main() {
  const { data: categories, error: catErr } = await supabase
    .from('categories')
    .select('id, slug');

  if (catErr) {
    console.error('Failed to fetch categories:', catErr.message);
    process.exit(1);
  }

  const bySlug = Object.fromEntries((categories || []).map((c) => [c.slug, c.id]));

  const { data: people, error: peopleErr } = await supabase.from('people').select('id, name_ja, title, bio_short');

  if (peopleErr) {
    console.error('Failed to fetch people:', peopleErr.message);
    process.exit(1);
  }

  if (!people?.length) {
    console.log('No people found.');
    return;
  }

  let updated = 0;
  let failed = 0;

  for (const p of people) {
    const slug = getCategorySlug(p.title || '', p.bio_short || '');
    const categoryId = bySlug[slug];

    if (!categoryId) {
      console.warn(`Category "${slug}" not found, skipping ${p.name_ja || p.id}`);
      failed++;
      continue;
    }

    const { error } = await supabase
      .from('people')
      .update({ category_id: categoryId })
      .eq('id', p.id);

    if (error) {
      console.warn(`Update failed for ${p.name_ja || p.id}:`, error.message);
      failed++;
    } else {
      updated++;
      console.log(`  ${p.name_ja || p.id}: ${slug}`);
    }
  }

  console.log(`\nDone. Updated ${updated}, failed ${failed}.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
