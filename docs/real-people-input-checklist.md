# Real people — admin input checklist

Use this while adding profiles in **Admin → People**. Toggle `- [ ]` to `- [x]` in your editor as you finish each step.

**Suggested category slugs** (match your DB): `actor` · `athlete` · `model` · `youtuber` · `musician` · `startup`

All tags available: 知的 · 大人系 · クール · 爽やか · 若々しい · フレンドリー · ワイルド · セクシー · エレガント · ミニマル · 個性的 · アクティブ · たくましい · 親しみやすい · スポーティ

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

Copy this block if you add people who are not listed below.

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

---

### 木村拓哉 (Kimura Takuya)

- **Slug:** `kimura-takuya`
- **Category:** `actor`
- **Name (JA):** 木村拓哉
- **Name (Kana):** キムラタクヤ
- **Title:** 俳優・元SMAP
- **Tags:** 大人系 · セクシー · カリスマ · ワイルド
- **Weekly Pick:** Yes
- **Score（各0–20点、合計: 92点）**
  - 清潔感: 18
  - 顔立ち: 19
  - 雰囲気: 19
  - ファッション: 18
  - カリスマ性: 18
- **コンテンツ**
  - **プロフィール:** 元SMAPメンバーとして一世を風靡し、「キムタク」の愛称で国民的スターに。俳優としても『HERO』『華麗なる一族』など数々のヒット作に主演。50代を迎えてなお圧倒的な存在感を放ち続けている。
  - **編集部コメント:** 日本のエンターテインメント史において唯一無二の存在。年齢を重ねるごとに増す色気と風格は、まさにレジェンド。ファッションアイコンとしても長年にわたり影響力を持ち続け、彼のスタイルは常にトレンドを生み出してきた。スクリーンでもプライベートでも、その佇まいには誰もが目を奪われる。
- **Links:** Instagram: https://www.instagram.com/takuya.kimura_tak/
- [ ] Image + alt
- [ ] Final review

---

### 山崎賢人 (Yamazaki Kento)

- **Slug:** `yamazaki-kento`
- **Category:** `actor`
- **Name (JA):** 山崎賢人
- **Name (Kana):** ヤマザキケント
- **Title:** 俳優
- **Tags:** 爽やか · 若々しい · クール · エレガント
- **Weekly Pick:** No
- **Score（各0–20点、合計: 91点）**
  - 清潔感: 19
  - 顔立ち: 19
  - 雰囲気: 18
  - ファッション: 17
  - カリスマ性: 18
- **コンテンツ**
  - **プロフィール:** 少女漫画原作の実写映画で次々と主演を務め、「実写化の王子」と称される。『キングダム』シリーズでは肉体改造にも挑み、俳優としてのスケールを拡大。端正な顔立ちと真摯な姿勢で幅広い層から支持を集める。
  - **編集部コメント:** 漫画から飛び出したかのような完璧な顔立ちが最大の武器。それでいて気負いのない爽やかさが同世代の男性からも好感を得ている理由だろう。作品ごとに異なる表情を見せる演技力と、変わらぬ清潔感のバランスが秀逸。
- **Links:** X: https://x.com/kentooyamazaki
- [ ] Image + alt
- [ ] Final review

---

### 佐藤健 (Satoh Takeru)

- **Slug:** `satoh-takeru`
- **Category:** `actor`
- **Name (JA):** 佐藤健
- **Name (Kana):** サトウタケル
- **Title:** 俳優
- **Tags:** クール · 知的 · 大人系 · ミニマル
- **Weekly Pick:** No
- **Score（各0–20点、合計: 93点）**
  - 清潔感: 19
  - 顔立ち: 19
  - 雰囲気: 19
  - ファッション: 18
  - カリスマ性: 18
- **コンテンツ**
  - **プロフィール:** 『仮面ライダー電王』で注目を集め、『るろうに剣心』シリーズで国際的評価を確立。繊細な演技からハードなアクションまでこなす実力派。近年はYouTubeやSNSでも独自の発信を行い、ファンとの距離感も絶妙。
  - **編集部コメント:** 知的で控えめな雰囲気の奥に秘めた情熱が、佐藤健の最大の魅力。作品へのストイックな姿勢は業界内でも評価が高い。シンプルな私服スタイルにも品があり、飾らない美しさが際立つ。年齢を重ねるほどに深みを増す、稀有な俳優。
- **Links:** X: https://x.com/takerusatoh · Instagram: https://www.instagram.com/takeru_satoh/ · Official: https://www.amuse.co.jp/artist/A8312/
- [ ] Image + alt
- [ ] Final review

---

### 菅田将暉 (Suda Masaki)

- **Slug:** `suda-masaki`
- **Category:** `actor`
- **Name (JA):** 菅田将暉
- **Name (Kana):** スダマサキ
- **Title:** 俳優・歌手
- **Tags:** 個性的 · ワイルド · クール · 大人系
- **Weekly Pick:** No
- **Score（各0–20点、合計: 90点）**
  - 清潔感: 17
  - 顔立ち: 18
  - 雰囲気: 19
  - ファッション: 18
  - カリスマ性: 18
- **コンテンツ**
  - **プロフィール:** 『仮面ライダーW』でデビュー後、映画・ドラマ・音楽と多方面で活躍。『共喰い』『あゝ、荒野』など社会派作品での体当たり演技でも高い評価を得る。歌手としてもヒット曲を持つマルチな才能。
  - **編集部コメント:** カメレオン俳優と称される菅田将暉の魅力は、役柄によってまったく異なる顔を見せるところ。ファッションにおいても独自の美学を貫き、ハイブランドからヴィンテージまで自在に着こなす。その個性的な存在感は、従来の「イケメン」の枠を超えた新しい美の基準を提示している。
- **Links:** Instagram: https://www.instagram.com/masaki.suda/ · Official: https://www.topcoat.co.jp/artist/suda-masaki/
- [ ] Image + alt
- [ ] Final review

---

### 横浜流星 (Yokohama Ryusei)

- **Slug:** `yokohama-ryusei`
- **Category:** `actor`
- **Name (JA):** 横浜流星
- **Name (Kana):** ヨコハマリュウセイ
- **Title:** 俳優
- **Tags:** 爽やか · 若々しい · たくましい · セクシー
- **Weekly Pick:** Yes
- **Score（各0–20点、合計: 93点）**
  - 清潔感: 19
  - 顔立ち: 20
  - 雰囲気: 18
  - ファッション: 18
  - カリスマ性: 18
- **コンテンツ**
  - **プロフィール:** 空手の全国大会で優勝経験を持つ俳優。『初めて恋をした日に読む話』で一躍ブレイクし、以降ドラマ・映画の主演作が続く。アクションもこなせる身体能力と、正統派のルックスを兼ね備えた次世代のトップスター。
  - **編集部コメント:** 端正な顔立ちと鍛え抜かれた肉体のバランスが圧倒的。空手で培った所作の美しさは演技にも反映されており、立ち姿だけで絵になる稀有な俳優。普段の穏やかな笑顔と、役に入った時の鋭い眼差しのギャップもファンを魅了するポイント。
- **Links:** Instagram: https://www.instagram.com/ryusei_yokohama_official/
- [ ] Image + alt
- [ ] Final review

---

### 目黒蓮 (Meguro Ren)

- **Slug:** `meguro-ren`
- **Category:** `actor`
- **Name (JA):** 目黒蓮
- **Name (Kana):** メグロレン
- **Title:** 俳優・Snow Manメンバー
- **Tags:** クール · エレガント · セクシー · 若々しい
- **Weekly Pick:** Yes
- **Score（各0–20点、合計: 94点）**
  - 清潔感: 19
  - 顔立ち: 20
  - 雰囲気: 19
  - ファッション: 18
  - カリスマ性: 18
- **コンテンツ**
  - **プロフィール:** Snow Manのメンバーとして活動しながら、俳優としても『silent』『海のはじまり』などの話題作に出演。アイドルと俳優を高いレベルで両立させ、幅広いファン層を獲得。端正な顔立ちとクールな佇まいで「国宝級イケメン」とも称される。
  - **編集部コメント:** その端整な顔立ちは、まさに「彫刻のような」という形容がふさわしい。クールな印象の中に時折見せる柔らかい笑顔が、多くの人の心を掴む理由。ステージ上でのパフォーマンスとドラマでの繊細な演技、どちらにおいても洗練された美しさを放つ。
- **Links:** —（個人SNSなし、グループ公式経由）
- [ ] Image + alt
- [ ] Final review

---

### 阿部寛 (Abe Hiroshi)

- **Slug:** `abe-hiroshi`
- **Category:** `actor`
- **Name (JA):** 阿部寛
- **Name (Kana):** アベヒロシ
- **Title:** 俳優・元モデル
- **Tags:** 大人系 · ワイルド · たくましい · 知的
- **Weekly Pick:** No
- **Score（各0–20点、合計: 88点）**
  - 清潔感: 17
  - 顔立ち: 18
  - 雰囲気: 18
  - ファッション: 17
  - カリスマ性: 18
- **コンテンツ**
  - **プロフィール:** 189cmの長身を武器にモデルとしてキャリアをスタート。『TRICK』『テルマエ・ロマエ』『ドラゴン桜』など代表作多数。シリアスからコメディまでこなす演技の幅広さで、日本映画界に欠かせない存在。
  - **編集部コメント:** 彫りの深い顔立ちと圧倒的な長身は、日本の俳優の中でも異彩を放つ。コミカルな役どころでもその存在感は損なわれず、むしろ親しみやすさが増す。モデル出身ならではのスタイルの良さは健在で、スーツ姿の格好良さは業界随一。
- **Links:** Official: https://www.abehiroshi.jp/
- [ ] Image + alt
- [ ] Final review

---

## アイドル・歌手 → `musician`（運用に合わせて `actor` も可）

---

### 平野紫耀 (Hirano Sho)

- **Slug:** `hirano-sho`
- **Category:** `musician`
- **Name (JA):** 平野紫耀
- **Name (Kana):** ヒラノショウ
- **Title:** アイドル・Number_iメンバー
- **Tags:** 爽やか · 若々しい · セクシー · フレンドリー
- **Weekly Pick:** Yes
- **Score（各0–20点、合計: 94点）**
  - 清潔感: 19
  - 顔立ち: 20
  - 雰囲気: 19
  - ファッション: 18
  - カリスマ性: 18
- **コンテンツ**
  - **プロフィール:** 元King & Princeのセンターとして絶大な人気を誇り、現在はNumber_iのメンバーとして活動。圧倒的なビジュアルに加え、天然キャラとしてバラエティでも人気を博す。歌、ダンス、演技とマルチに才能を発揮。
  - **編集部コメント:** 「顔面国宝」とも称されるその容姿は、文字通り非の打ちどころがない。しかし最大の魅力は、その完璧なルックスと天然で飾らない性格のギャップにある。ステージ上での圧倒的なオーラと、カメラオフでの無邪気な笑顔の両面を持つ、まさに天性のアイドル。
- **Links:** Instagram: https://www.instagram.com/and_and_sho/
- [ ] Image + alt
- [ ] Final review

---

### 岩田剛典 (Iwata Takanori)

- **Slug:** `iwata-takanori`
- **Category:** `musician`
- **Name (JA):** 岩田剛典
- **Name (Kana):** イワタタカノリ
- **Title:** パフォーマー・俳優（三代目J SOUL BROTHERS）
- **Tags:** エレガント · クール · 大人系 · セクシー
- **Weekly Pick:** No
- **Score（各0–20点、合計: 91点）**
  - 清潔感: 19
  - 顔立ち: 19
  - 雰囲気: 18
  - ファッション: 18
  - カリスマ性: 17
- **コンテンツ**
  - **プロフィール:** 三代目J SOUL BROTHERSのパフォーマーとして活躍しながら、俳優としても『植物図鑑』『去年の冬、きみと別れ』などに出演。慶應義塾大学法学部卒の知性派でもあり、その洗練された雰囲気で「最もファッショナブルなLDHメンバー」と評される。
  - **編集部コメント:** ダンスで鍛え抜かれた肉体と、品のある顔立ちの組み合わせが唯一無二。高学歴でありながら努力を惜しまない姿勢が、外見だけでなく内面的な魅力にもつながっている。ファッションセンスも群を抜いており、ハイブランドのアンバサダーを複数務めるのも納得。
- **Links:** Instagram: https://www.instagram.com/takanori_iwata_official/
- [ ] Image + alt
- [ ] Final review

---

### 米津玄師 (Yonezu Kenshi)

- **Slug:** `yonezu-kenshi`
- **Category:** `musician`
- **Name (JA):** 米津玄師
- **Name (Kana):** ヨネヅケンシ
- **Title:** ミュージシャン・シンガーソングライター
- **Tags:** 個性的 · 知的 · クール · ミニマル
- **Weekly Pick:** No
- **Score（各0–20点、合計: 87点）**
  - 清潔感: 17
  - 顔立ち: 17
  - 雰囲気: 19
  - ファッション: 17
  - カリスマ性: 17
- **コンテンツ**
  - **プロフィール:** 「Lemon」「KICK BACK」など社会現象クラスのヒット曲を連発する天才ミュージシャン。ボカロP「ハチ」としての活動を経てメジャーデビュー。作詞作曲編曲に加え、MVのイラストも手掛けるなど、圧倒的なクリエイティブ能力を持つ。
  - **編集部コメント:** 従来の「イケメン」とは異なる、唯一無二の存在感が米津玄師の魅力。長身で独特のシルエットを持ち、ファッションにも強いこだわりが見える。内省的でミステリアスな雰囲気は、彼の音楽そのもの。顔を隠す時期を経て表舞台に立つようになった今、その存在自体がアートと言える。
- **Links:** X: https://x.com/haborym · Instagram: https://www.instagram.com/kenshi_yonezu/ · Official: https://reissuerecords.net/
- [ ] Image + alt
- [ ] Final review

---

### 野田洋次郎 (Noda Yojiro)

- **Slug:** `noda-yojiro`
- **Category:** `musician`
- **Name (JA):** 野田洋次郎
- **Name (Kana):** ノダヨウジロウ
- **Title:** ミュージシャン（RADWIMPS）・俳優
- **Tags:** 知的 · 個性的 · 大人系 · エレガント
- **Weekly Pick:** No
- **Score（各0–20点、合計: 88点）**
  - 清潔感: 17
  - 顔立ち: 18
  - 雰囲気: 19
  - ファッション: 17
  - カリスマ性: 17
- **コンテンツ**
  - **プロフィール:** RADWIMPSのボーカル・ギターとして「前前前世」「なんでもないや」など新海誠作品の主題歌で世界的知名度を獲得。ソロプロジェクト「illion」でも活動。俳優としても『トイレのピエタ』で主演を務めるなど多才。
  - **編集部コメント:** 長身で端正な顔立ちを持ちながら、それを前面に出さない知的な佇まいが魅力。詩的な歌詞を紡ぎ出すその感性は、容姿以上に人を惹きつける。海外育ちのバイリンガルという経歴も加わり、知性と感性を兼ね備えた稀有なアーティスト。
- **Links:** Instagram: https://www.instagram.com/yojiro_noda/ · Official: https://radwimps.jp/
- [ ] Image + alt
- [ ] Final review

---

## スポーツ → `athlete`

---

### 大谷翔平 (Ohtani Shohei)

- **Slug:** `ohtani-shohei`
- **Category:** `athlete`
- **Name (JA):** 大谷翔平
- **Name (Kana):** オオタニショウヘイ
- **Title:** プロ野球選手（MLB・ロサンゼルス・ドジャース）
- **Tags:** 爽やか · たくましい · アクティブ · フレンドリー
- **Weekly Pick:** Yes
- **Score（各0–20点、合計: 95点）**
  - 清潔感: 20
  - 顔立ち: 19
  - 雰囲気: 19
  - ファッション: 18
  - カリスマ性: 19
- **コンテンツ**
  - **プロフィール:** 投打「二刀流」でMLBの常識を覆した世界的スーパースター。エンゼルスを経てドジャースへ移籍。MVP複数回受賞、歴史的な記録を次々と更新し続ける。193cmの恵まれた体格と少年のような笑顔で世界中のファンを魅了。
  - **編集部コメント:** スポーツ界のみならず、あらゆるジャンルの中で最も輝いている日本人と言っても過言ではない。恵まれた体格、爽やかな笑顔、そして謙虚な人柄。すべてが揃った大谷翔平は、まさに「リアルヒーロー」。グラウンド上の圧倒的パフォーマンスとベンチでの無邪気な笑顔のギャップが、老若男女を問わず人々を惹きつける。
- **Links:** Instagram: https://www.instagram.com/sholohtani/
- [ ] Image + alt
- [ ] Final review

---

### 錦織圭 (Nishikori Kei)

- **Slug:** `nishikori-kei`
- **Category:** `athlete`
- **Name (JA):** 錦織圭
- **Name (Kana):** ニシコリケイ
- **Title:** 元プロテニス選手
- **Tags:** クール · 知的 · スポーティ · 爽やか
- **Weekly Pick:** No
- **Score（各0–20点、合計: 87点）**
  - 清潔感: 18
  - 顔立ち: 17
  - 雰囲気: 18
  - ファッション: 17
  - カリスマ性: 17
- **コンテンツ**
  - **プロフィール:** 日本男子テニス界のパイオニア。全米オープン準優勝、世界ランキング最高4位という偉業を達成。小柄ながらも世界のトップ選手と渡り合った技術と精神力は、日本テニス界に新たな歴史を刻んだ。
  - **編集部コメント:** コート上での集中した表情と、インタビューでの穏やかな受け答えの対比が印象的。スポーツマンとしての引き締まった体型と、知的で落ち着いた雰囲気を持つ。世界の舞台で戦い続けた経験が、内面からにじみ出る風格として現れている。
- **Links:** Instagram: https://www.instagram.com/kaboriyasumasa/ · Official: https://www.keinishikori.com/
- [ ] Image + alt
- [ ] Final review

---

### 羽生結弦 (Hanyu Yuzuru)

- **Slug:** `hanyu-yuzuru`
- **Category:** `athlete`
- **Name (JA):** 羽生結弦
- **Name (Kana):** ハニュウユヅル
- **Title:** プロフィギュアスケーター
- **Tags:** エレガント · クール · 知的 · 個性的
- **Weekly Pick:** Yes
- **Score（各0–20点、合計: 94点）**
  - 清潔感: 20
  - 顔立ち: 19
  - 雰囲気: 19
  - ファッション: 18
  - カリスマ性: 18
- **コンテンツ**
  - **プロフィール:** オリンピック2連覇を達成したフィギュアスケート界のレジェンド。競技者としてのキャリアを経て、プロスケーターとして単独公演を開催。氷上での圧倒的な表現力と技術力は世界中から称賛を受けている。
  - **編集部コメント:** 氷上の王子と呼ばれるにふさわしい、透明感のある美しさ。しかしその内面は驚くほどストイックで、限界に挑戦し続ける強い意志を持つ。演技中の鬼気迫る表情と、リンク外でのはにかんだ笑顔のギャップが、世界中のファンを虜にしている。その存在自体が芸術作品のよう。
- **Links:** Official: https://yuzuruhanyu.jp/
- [ ] Image + alt
- [ ] Final review

---

### 久保建英 (Kubo Takefusa)

- **Slug:** `kubo-takefusa`
- **Category:** `athlete`
- **Name (JA):** 久保建英
- **Name (Kana):** クボタケフサ
- **Title:** プロサッカー選手（レアル・ソシエダ）
- **Tags:** 若々しい · 爽やか · アクティブ · スポーティ
- **Weekly Pick:** No
- **Score（各0–20点、合計: 88点）**
  - 清潔感: 18
  - 顔立ち: 18
  - 雰囲気: 18
  - ファッション: 17
  - カリスマ性: 17
- **コンテンツ**
  - **プロフィール:** FCバルセロナの下部組織出身という異色の経歴を持つ日本代表MF。レアル・マドリードを経てレアル・ソシエダで主力として活躍。若くしてスペインのトップリーグで存在感を示す、日本サッカー界の至宝。
  - **編集部コメント:** まだ若さの残る顔立ちと、ピッチ上で見せる大人びたプレーのギャップが魅力的。スペインでの生活で身につけた洗練された雰囲気も加わり、日本人サッカー選手の中でも独特の存在感を放つ。フィールドでボールを持った時の自信に満ちた表情は、見る者を惹きつける。
- **Links:** Instagram: https://www.instagram.com/takefusa.kubo/
- [ ] Image + alt
- [ ] Final review

---

## モデル・ファッション寄り → `model` または `actor`

---

### 坂口健太郎 (Sakaguchi Kentaro)

- **Slug:** `sakaguchi-kentaro`
- **Category:** `actor`（モデル枠なら `model`）
- **Name (JA):** 坂口健太郎
- **Name (Kana):** サカグチケンタロウ
- **Title:** 俳優・モデル
- **Tags:** 爽やか · エレガント · ミニマル · クール
- **Weekly Pick:** No
- **Score（各0–20点、合計: 90点）**
  - 清潔感: 19
  - 顔立ち: 18
  - 雰囲気: 18
  - ファッション: 18
  - カリスマ性: 17
- **コンテンツ**
  - **プロフィール:** メンズノンノの専属モデルを経て俳優に転身。『とと姉ちゃん』『シグナル』など話題作に出演。「塩顔イケメン」の代表格として、透明感のあるルックスで幅広い世代から支持される。
  - **編集部コメント:** いわゆる「塩顔」の完成形とも言える坂口健太郎。派手さはないが、見れば見るほど引き込まれる端正な顔立ちが特徴。モデル出身ならではのスタイルの良さと、自然体の佇まいが清潔感を際立たせている。シンプルな服装でも十分にサマになる、素材の良さが光る。
- **Links:** Instagram: https://www.instagram.com/sakaguchikentaro_official/
- [ ] Image + alt
- [ ] Final review

---

### 町田啓太 (Machida Keita)

- **Slug:** `machida-keita`
- **Category:** `actor`（モデル枠なら `model`）
- **Name (JA):** 町田啓太
- **Name (Kana):** マチダケイタ
- **Title:** 俳優（劇団EXILE）
- **Tags:** エレガント · 大人系 · 知的 · クール
- **Weekly Pick:** No
- **Score（各0–20点、合計: 91点）**
  - 清潔感: 19
  - 顔立ち: 19
  - 雰囲気: 18
  - ファッション: 18
  - カリスマ性: 17
- **コンテンツ**
  - **プロフィール:** 劇団EXILEのメンバーとして活動しながら、俳優として『SUPER RICH』『恋なんて、本気でやってどうするの?』などのドラマに出演。日本体育大学出身で、端正な顔立ちと鍛え上げられた肉体を兼ね備える。
  - **編集部コメント:** 「正統派イケメン」という言葉が最も似合う俳優の一人。知的な雰囲気を持ちながらも、体育大学出身というギャップが魅力的。スーツの着こなしは業界でもトップクラスで、ドラマでのスーツ姿がSNSでたびたび話題になるほど。品格と力強さが同居する稀有な存在。
- **Links:** Instagram: https://www.instagram.com/keita_machida_official/
- [ ] Image + alt
- [ ] Final review

---

## YouTube・インフルエンサー → `youtuber`

---

### ヒカキン (Hikakin)

- **Slug:** `hikakin`
- **Category:** `youtuber`
- **Name (JA):** ヒカキン
- **Name (Kana):** ヒカキン
- **Title:** YouTuber・実業家
- **Tags:** フレンドリー · 親しみやすい · 爽やか · アクティブ
- **Weekly Pick:** No
- **Score（各0–20点、合計: 82点）**
  - 清潔感: 18
  - 顔立ち: 15
  - 雰囲気: 17
  - ファッション: 15
  - カリスマ性: 17
- **コンテンツ**
  - **プロフィール:** 日本のYouTube界のパイオニア。登録者数1,000万人を超える国内トップクラスのYouTuber。ヒューマンビートボックスから始まり、商品レビュー、ゲーム実況など幅広いコンテンツを展開。UUUMの創業にも関わるなど実業家としての顔も持つ。
  - **編集部コメント:** 「イケメン」という枠にとどまらない、唯一無二の存在感を持つヒカキン。清潔感のある見た目と、子どもから大人まで安心して見られるキャラクターが最大の武器。年々洗練されていくファッションと、変わらない親しみやすさの共存が、長年にわたり支持される理由。
- **Links:** X: https://x.com/hiaboriyasukin · Instagram: https://www.instagram.com/hikakin/ · Official: https://hikakin.com/
- [ ] Image + alt
- [ ] Final review

---

### はじめしゃちょー (Hajime Syacho)

- **Slug:** `hajime-shacho`
- **Category:** `youtuber`
- **Name (JA):** はじめしゃちょー
- **Name (Kana):** ハジメシャチョー
- **Title:** YouTuber
- **Tags:** 爽やか · 若々しい · フレンドリー · アクティブ
- **Weekly Pick:** No
- **Score（各0–20点、合計: 85点）**
  - 清潔感: 18
  - 顔立ち: 17
  - 雰囲気: 17
  - ファッション: 16
  - カリスマ性: 17
- **コンテンツ**
  - **プロフィール:** 日本で最も登録者数の多いYouTuberの一人。186cmの長身と爽やかなルックスを持ち、体を張った実験系動画やチャレンジ企画で人気を博す。静岡大学出身で、知的な一面も。
  - **編集部コメント:** 長身で細身のスタイルと、整った顔立ちはYouTuber界でも随一のビジュアル。それでいて体を張った企画に全力で取り組む姿勢が、飾らない魅力として映る。カメラの前での自然体な振る舞いと、時折見せるシャイな表情のバランスが好感を生む。
- **Links:** X: https://x.com/hajaboriyasumeSyaworiyasu · Instagram: https://www.instagram.com/hajimesyachodesu/ · Official: https://www.uuum.co.jp/creator/hajime
- [ ] Image + alt
- [ ] Final review

---

### フィッシャーズ — メンバー別に追加する場合

- **Suggested category:** `youtuber`
- **Slug pattern:** `fischers-{lowercase-nickname}`（例: `fischers-ndaho`）。メンバーごとに**公式プロフィールのローマ字**に合わせること。
- [ ] メンバー1
- [ ] メンバー2
- [ ] …（グループ全体を1行にしない前提）

---

## 起業家・経営者・メディア → `startup`（または別カテゴリ）

---

### 堀江貴文 (Horie Takafumi)

- **Slug:** `horie-takafumi`
- **Category:** `startup`
- **Name (JA):** 堀江貴文
- **Name (Kana):** ホリエタカフミ
- **Title:** 実業家・著作家
- **Tags:** 知的 · 個性的 · 大人系 · アクティブ
- **Weekly Pick:** No
- **Score（各0–20点、合計: 82点）**
  - 清潔感: 16
  - 顔立ち: 15
  - 雰囲気: 17
  - ファッション: 16
  - カリスマ性: 18
- **コンテンツ**
  - **プロフィール:** 「ホリエモン」の愛称で知られる実業家。ライブドア元社長として一世を風靡し、現在はロケット開発（インターステラテクノロジズ）、オンラインサロン、著作、YouTubeなど多岐にわたる事業を展開。歯に衣着せぬ発言で常に注目を集める。
  - **編集部コメント:** 従来のイケメン像とは一線を画すが、その圧倒的な行動力と知性が生み出すカリスマ性は唯一無二。発言の一つひとつが世間を動かす影響力を持ち、ビジネス界における存在感は他の追随を許さない。近年はヘルスケアへの関心から体型管理にも取り組み、年齢を感じさせないエネルギッシュな姿を見せている。
- **Links:** X: https://x.com/takapon_jp · Instagram: https://www.instagram.com/takapon_jp/ · Official: https://horiemon.com/
- [ ] Image + alt
- [ ] Final review

---

### 西村博之 — ひろゆき (Nishimura Hiroyuki)

- **Slug:** `nishimura-hiroyuki`
- **Category:** `startup`
- **Name (JA):** 西村博之（ひろゆき）
- **Name (Kana):** ニシムラヒロユキ
- **Title:** 実業家・2ちゃんねる創設者
- **Tags:** 知的 · 個性的 · クール · フレンドリー
- **Weekly Pick:** No
- **Score（各0–20点、合計: 81点）**
  - 清潔感: 16
  - 顔立ち: 15
  - 雰囲気: 17
  - ファッション: 15
  - カリスマ性: 18
- **コンテンツ**
  - **プロフィール:** 2ちゃんねる（現5ちゃんねる）の創設者として知られ、現在はフランス・パリ在住。YouTube切り抜き動画が大ブームとなり、若い世代からも絶大な支持を得る。論破スタイルの討論が話題を呼び、テレビ・ネットメディアに多数出演。
  - **編集部コメント:** ビジュアル面でのスコアは控えめだが、その知性とユーモアが生み出す独特の魅力は数字では測れない。飄々とした佇まいと切れ味鋭い論理展開のギャップが、多くの視聴者を惹きつける。ファッションに無頓着なようでいて、パリ在住の洒脱さがにじみ出ている点も面白い。
- **Links:** X: https://x.com/hirox246 · Official: https://hiroyuki.colopl.co.jp/
- [ ] Image + alt
- [ ] Final review

---

## Reminders

- Use **photos and facts you are allowed to use** (official / licensed / fair use per your counsel).
- **Slug uniqueness**: if two people could clash in Romanization, add a disambiguator (year, middle initial, domain).
- After bulk add, spot-check **category filters** and **public profile pages** (`/p/[slug]`).
