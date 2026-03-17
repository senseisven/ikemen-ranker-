/**
 * Verifies current category assignments in the database.
 * Run: node apps/web/scripts/verify-categories.mjs
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
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing env vars.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  console.log('Supabase URL:', supabaseUrl);
  console.log('Using:', process.env.SUPABASE_SERVICE_ROLE_KEY ? 'service_role' : 'anon');
  console.log('');

  const { data: categories, error: catErr } = await supabase
    .from('categories')
    .select('id, slug, name_ja');

  if (catErr) {
    console.error('Categories error:', catErr);
    return;
  }
  console.log('Categories:', categories?.length ?? 0, categories?.map(c => c.slug).join(', ') || '(none)');
  console.log('');

  const { data: people, error: peopleErr } = await supabase
    .from('people')
    .select('id, name_ja, title, category_id, is_active')
    .limit(5);

  if (peopleErr) {
    console.error('People error:', peopleErr);
    return;
  }

  console.log('Sample people (first 5):');
  people?.forEach(p => {
    console.log(`  ${p.name_ja}: title="${p.title}" category_id=${p.category_id ?? 'NULL'} is_active=${p.is_active}`);
  });

  const { count: activeCount } = await supabase
    .from('people')
    .select('*', { count: 'exact', head: true })
    .eq('is_active', true);
  console.log('');
  console.log(`People with is_active=true: ${activeCount ?? '?'}`);

  const { count } = await supabase
    .from('people')
    .select('*', { count: 'exact', head: true })
    .not('category_id', 'is', null);
  const { count: total } = await supabase
    .from('people')
    .select('*', { count: 'exact', head: true });

  console.log('');
  console.log(`People with category: ${count ?? '?'} / ${total ?? '?'}`);
}

main().catch(console.error);
