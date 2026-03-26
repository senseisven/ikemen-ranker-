# Real people — admin input checklist

Use this while adding profiles in **Admin → People**. Toggle `- [ ]` to `- [x]` in your editor as you finish each step.

**Suggested category slugs** (match your DB): `actor` · `athlete` · `model` · `youtuber` · `musician` · `startup`

---

## Field reference (matches admin form)

For each person, you eventually need:

| Field | Notes |
|--------|--------|
| `slug` | URL-safe, unique (e.g. `yamazaki-kento`) |
| `category_id` | Pick from your categories |
| `name_ja` | Display name (Japanese) |
| `name_kana` | Reading (カタカナ推奨) |
| `title` | Short job line |
| `bio_short` | Short bio |
| `editorial` | Longer site copy |
| `image` | Upload file or set `image_url` |
| `image_alt` | Alt text (often same as name) |
| Scores | cleanliness, facial, vibe, fashion, charisma → total auto |
| Tags | In admin UI |
| `link_x` / `link_instagram` / `link_official` | Optional |
| `is_weekly_pick` / `display_order` / `meta_*` | As needed |

---

## Per-person checklist template

Copy this block under **Notes** if you add people who are not listed below.

```markdown
### （名前）
- **Slug:** `family-given`（例: `yamazaki-kento`）
- **Suggested category:** （category slug）
- [ ] Slug + category + names (JA / kana)
- [ ] Title + bio_short + editorial
- [ ] Image + image_alt
- [ ] Scores + tags
- [ ] Links (X / Instagram / official)
- [ ] Weekly pick / display order / SEO meta (if used)
```

---

## 俳優・映画・ドラマ → `actor`

### 木村拓哉 (Kimura Takuya)
- **Slug:** `kimura-takuya`
- **Suggested category:** `actor`
- [ ] Core fields (slug, names, title, bios)
- [ ] Image + alt
- [ ] Scores + tags
- [ ] Links

### 山崎賢人 (Yamazaki Kento)
- **Slug:** `yamazaki-kento`
- **Suggested category:** `actor`
- [ ] Core fields
- [ ] Image + alt
- [ ] Scores + tags
- [ ] Links

### 佐藤健 (Satoh Takeru)
- **Slug:** `satoh-takeru`
- **Suggested category:** `actor`
- [ ] Core fields
- [ ] Image + alt
- [ ] Scores + tags
- [ ] Links

### 菅田将暉 (Suda Masaki)
- **Slug:** `suda-masaki`
- **Suggested category:** `actor`（歌も扱うなら `musician` でも可）
- [ ] Core fields
- [ ] Image + alt
- [ ] Scores + tags
- [ ] Links

### 横浜流星 (Yokohama Ryusei)
- **Slug:** `yokohama-ryusei`
- **Suggested category:** `actor`
- [ ] Core fields
- [ ] Image + alt
- [ ] Scores + tags
- [ ] Links

### 目黒蓮 (Meguro Ren)
- **Slug:** `meguro-ren`
- **Suggested category:** `actor`（アイドル枠を分けるなら別カテゴリ検討）
- [ ] Core fields
- [ ] Image + alt
- [ ] Scores + tags
- [ ] Links

### 阿部寛 (Abe Hiroshi)
- **Slug:** `abe-hiroshi`
- **Suggested category:** `actor`
- [ ] Core fields
- [ ] Image + alt
- [ ] Scores + tags
- [ ] Links

---

## アイドル・歌手 → `musician`（運用に合わせて `actor` も可）

### 平野紫耀 (Hirano Sho)
- **Slug:** `hirano-sho`
- **Suggested category:** `musician`
- [ ] Core fields
- [ ] Image + alt
- [ ] Scores + tags
- [ ] Links

### 岩田剛典 (Iwata Takanori)
- **Slug:** `iwata-takanori`
- **Suggested category:** `musician`
- [ ] Core fields
- [ ] Image + alt
- [ ] Scores + tags
- [ ] Links

### 米津玄師 (Kenshi Yonezu)
- **Slug:** `yonezu-kenshi`
- **Suggested category:** `musician`
- [ ] Core fields
- [ ] Image + alt
- [ ] Scores + tags
- [ ] Links

### 野田洋次郎 (Noda Yojiro)
- **Slug:** `noda-yojiro`
- **Suggested category:** `musician`
- [ ] Core fields
- [ ] Image + alt
- [ ] Scores + tags
- [ ] Links

---

## スポーツ → `athlete`

### 大谷翔平 (Ohtani Shohei)
- **Slug:** `ohtani-shohei`
- **Suggested category:** `athlete`
- [ ] Core fields
- [ ] Image + alt
- [ ] Scores + tags
- [ ] Links

### 錦織圭 (Nishikori Kei)
- **Slug:** `nishikori-kei`
- **Suggested category:** `athlete`
- [ ] Core fields
- [ ] Image + alt
- [ ] Scores + tags
- [ ] Links

### 羽生結弦 (Hanyu Yuzuru)
- **Slug:** `hanyu-yuzuru`
- **Suggested category:** `athlete`
- [ ] Core fields
- [ ] Image + alt
- [ ] Scores + tags
- [ ] Links

### 久保建英 (Kubo Takefusa)
- **Slug:** `kubo-takefusa`
- **Suggested category:** `athlete`
- [ ] Core fields
- [ ] Image + alt
- [ ] Scores + tags
- [ ] Links

---

## モデル・ファッション寄り → `model` または `actor`

### 坂口健太郎 (Sakaguchi Kentaro)
- **Slug:** `sakaguchi-kentaro`
- **Suggested category:** `actor`（モデル枠なら `model`）
- [ ] Core fields
- [ ] Image + alt
- [ ] Scores + tags
- [ ] Links

### 町田啓太 (Machida Keita)
- **Slug:** `machida-keita`
- **Suggested category:** `actor`（同上）
- [ ] Core fields
- [ ] Image + alt
- [ ] Scores + tags
- [ ] Links

---

## YouTube・インフルエンサー → `youtuber`

### ヒカキン (Hikakin)
- **Slug:** `hikakin`
- **Suggested category:** `youtuber`
- [ ] Core fields
- [ ] Image + alt
- [ ] Scores + tags
- [ ] Links

### はじめしゃちょー (Hajime Syacho)
- **Slug:** `hajime-shacho`
- **Suggested category:** `youtuber`
- [ ] Core fields
- [ ] Image + alt
- [ ] Scores + tags
- [ ] Links

### フィッシャーズ — メンバー別に追加する場合
- **Suggested category:** `youtuber`
- **Slug pattern:** `fischers-{lowercase-nickname}`（例: `fischers-ndaho`）。メンバーごとに**公式プロフィールのローマ字**に合わせること。
- [ ] メンバー1
- [ ] メンバー2
- [ ] …（グループ全体を1行にしない前提）

---

## 起業家・経営者・メディア → `startup`（または別カテゴリ）

### 堀江貴文 (Horie Takafumi)
- **Slug:** `horie-takafumi`
- **Suggested category:** `startup`
- [ ] Core fields
- [ ] Image + alt
- [ ] Scores + tags
- [ ] Links

### 西村博之 — ひろゆき (Nishimura Hiroyuki)
- **Slug:** `nishimura-hiroyuki`
- **Suggested category:** `startup`
- [ ] Core fields
- [ ] Image + alt
- [ ] Scores + tags
- [ ] Links

---

## Reminders

- Use **photos and facts you are allowed to use** (official / licensed / fair use per your counsel).
- **Slug uniqueness**: if two people could clash in Romanization, add a disambiguator (year, middle initial, domain).
- After bulk add, spot-check **category filters** and **public profile pages** (`/p/[slug]`).
