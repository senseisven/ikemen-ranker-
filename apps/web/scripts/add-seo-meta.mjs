/**
 * Add meta_title and meta_description to all people in the database.
 *
 * Run:  node apps/web/scripts/add-seo-meta.mjs
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, "../.env");

if (existsSync(envPath)) {
  const lines = readFileSync(envPath, "utf8").split("\n");
  for (const line of lines) {
    const m = line.match(/^([^#=]+)=(.*)$/);
    if (m) process.env[m[1].trim()] = m[2].trim();
  }
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in apps/web/.env");
  process.exit(1);
}

if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.warn(
    "⚠  Using anon key — updates may fail due to RLS. Add SUPABASE_SERVICE_ROLE_KEY to .env\n",
  );
}

const supabase = createClient(supabaseUrl, supabaseKey);

const CATEGORY_NAMES = {
  startup: "スタートアップ",
  actor: "俳優",
  athlete: "アスリート",
  model: "モデル",
  youtuber: "YouTuber",
  musician: "ミュージシャン",
};

function generateMeta(person, categoryName) {
  const name = person.name_ja;
  const title = person.title || "";
  const catName = categoryName || "イケメン";
  const score = person.score_total || 0;
  const bioSnippet = (person.bio_short || "")
    .replace(/\n/g, " ")
    .slice(0, 80);

  const metaTitle = `${name}（${title}）のプロフィール・スコア | ${catName} | イケメン名鑑`;

  const metaDescription =
    `${name}の総合スコアは${score}点。${bioSnippet}${bioSnippet.length >= 80 ? "…" : ""}` +
    ` ${catName}カテゴリのイケメンランキング・プロフィール詳細はイケメン名鑑で。`;

  return {
    meta_title: metaTitle.slice(0, 60),
    meta_description: metaDescription.slice(0, 160),
  };
}

async function main() {
  console.log("Fetching categories...");
  const { data: categories, error: catErr } = await supabase
    .from("categories")
    .select("id, slug, name_ja");

  if (catErr) {
    console.error("Failed to fetch categories:", catErr.message);
    process.exit(1);
  }

  const catById = Object.fromEntries(
    (categories || []).map((c) => [c.id, c]),
  );

  console.log("Fetching people...\n");
  const { data: people, error: peopleErr } = await supabase
    .from("people")
    .select("id, slug, name_ja, title, bio_short, score_total, category_id, meta_title, meta_description")
    .order("created_at", { ascending: false });

  if (peopleErr) {
    console.error("Failed to fetch people:", peopleErr.message);
    process.exit(1);
  }

  if (!people?.length) {
    console.log("No people found.");
    return;
  }

  console.log(`Found ${people.length} people. Generating SEO meta...\n`);

  let updated = 0;
  let skipped = 0;
  let failed = 0;

  for (const person of people) {
    const cat = catById[person.category_id];
    const catName = cat?.name_ja || CATEGORY_NAMES[cat?.slug] || "イケメン";
    const { meta_title, meta_description } = generateMeta(person, catName);

    const { error } = await supabase
      .from("people")
      .update({ meta_title, meta_description })
      .eq("id", person.id);

    if (error) {
      console.error(`  ✗ ${person.name_ja}: ${error.message}`);
      failed++;
    } else {
      updated++;
      console.log(`  ✓ ${person.name_ja}`);
      console.log(`    title: ${meta_title}`);
      console.log(`    desc:  ${meta_description.slice(0, 80)}…\n`);
    }
  }

  console.log(
    `Done. Updated: ${updated}, Skipped: ${skipped}, Failed: ${failed}`,
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
