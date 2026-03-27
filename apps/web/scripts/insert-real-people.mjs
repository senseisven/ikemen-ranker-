/**
 * Insert real people from docs/real-people-input-checklist.md into Supabase.
 *
 * Run:  node apps/web/scripts/insert-real-people.mjs
 *
 * Requires SUPABASE_SERVICE_ROLE_KEY in apps/web/.env (bypasses RLS).
 * Get it from: Supabase Dashboard → Project Settings → API → service_role
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
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or key in apps/web/.env"
  );
  process.exit(1);
}

if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.warn(
    "⚠  Using anon key — inserts may fail due to RLS. Add SUPABASE_SERVICE_ROLE_KEY to .env\n"
  );
}

const supabase = createClient(supabaseUrl, supabaseKey);

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const PEOPLE = [
  // ── actor ──
  {
    slug: "kimura-takuya",
    category_slug: "actor",
    name_ja: "木村拓哉",
    name_kana: "キムラタクヤ",
    title: "俳優・元SMAP",
    bio_short:
      "元SMAPメンバーとして一世を風靡し、「キムタク」の愛称で国民的スターに。俳優としても『HERO』『華麗なる一族』など数々のヒット作に主演。50代を迎えてなお圧倒的な存在感を放ち続けている。",
    editorial:
      "日本のエンターテインメント史において唯一無二の存在。年齢を重ねるごとに増す色気と風格は、まさにレジェンド。ファッションアイコンとしても長年にわたり影響力を持ち続け、彼のスタイルは常にトレンドを生み出してきた。スクリーンでもプライベートでも、その佇まいには誰もが目を奪われる。",
    score_cleanliness: 18,
    score_facial: 19,
    score_vibe: 19,
    score_fashion: 18,
    score_charisma: 18,
    score_total: 92,
    tags: ["大人系", "セクシー", "ワイルド"],
    link_instagram: "https://www.instagram.com/takuya.kimura_tak/",
    is_weekly_pick: true,
    is_active: true,
  },
  {
    slug: "yamazaki-kento",
    category_slug: "actor",
    name_ja: "山崎賢人",
    name_kana: "ヤマザキケント",
    title: "俳優",
    bio_short:
      "少女漫画原作の実写映画で次々と主演を務め、「実写化の王子」と称される。『キングダム』シリーズでは肉体改造にも挑み、俳優としてのスケールを拡大。端正な顔立ちと真摯な姿勢で幅広い層から支持を集める。",
    editorial:
      "漫画から飛び出したかのような完璧な顔立ちが最大の武器。それでいて気負いのない爽やかさが同世代の男性からも好感を得ている理由だろう。作品ごとに異なる表情を見せる演技力と、変わらぬ清潔感のバランスが秀逸。",
    score_cleanliness: 19,
    score_facial: 19,
    score_vibe: 18,
    score_fashion: 17,
    score_charisma: 18,
    score_total: 91,
    tags: ["爽やか", "若々しい", "クール", "エレガント"],
    link_x: "https://x.com/kentooyamazaki",
    is_weekly_pick: false,
    is_active: true,
  },
  {
    slug: "satoh-takeru",
    category_slug: "actor",
    name_ja: "佐藤健",
    name_kana: "サトウタケル",
    title: "俳優",
    bio_short:
      "『仮面ライダー電王』で注目を集め、『るろうに剣心』シリーズで国際的評価を確立。繊細な演技からハードなアクションまでこなす実力派。近年はYouTubeやSNSでも独自の発信を行い、ファンとの距離感も絶妙。",
    editorial:
      "知的で控えめな雰囲気の奥に秘めた情熱が、佐藤健の最大の魅力。作品へのストイックな姿勢は業界内でも評価が高い。シンプルな私服スタイルにも品があり、飾らない美しさが際立つ。年齢を重ねるほどに深みを増す、稀有な俳優。",
    score_cleanliness: 19,
    score_facial: 19,
    score_vibe: 19,
    score_fashion: 18,
    score_charisma: 18,
    score_total: 93,
    tags: ["クール", "知的", "大人系", "ミニマル"],
    link_x: "https://x.com/takerusatoh",
    link_instagram: "https://www.instagram.com/takeru_satoh/",
    link_official: "https://www.amuse.co.jp/artist/A8312/",
    is_weekly_pick: false,
    is_active: true,
  },
  {
    slug: "suda-masaki",
    category_slug: "actor",
    name_ja: "菅田将暉",
    name_kana: "スダマサキ",
    title: "俳優・歌手",
    bio_short:
      "『仮面ライダーW』でデビュー後、映画・ドラマ・音楽と多方面で活躍。『共喰い』『あゝ、荒野』など社会派作品での体当たり演技でも高い評価を得る。歌手としてもヒット曲を持つマルチな才能。",
    editorial:
      "カメレオン俳優と称される菅田将暉の魅力は、役柄によってまったく異なる顔を見せるところ。ファッションにおいても独自の美学を貫き、ハイブランドからヴィンテージまで自在に着こなす。その個性的な存在感は、従来の「イケメン」の枠を超えた新しい美の基準を提示している。",
    score_cleanliness: 17,
    score_facial: 18,
    score_vibe: 19,
    score_fashion: 18,
    score_charisma: 18,
    score_total: 90,
    tags: ["個性的", "ワイルド", "クール", "大人系"],
    link_instagram: "https://www.instagram.com/masaki.suda/",
    link_official: "https://www.topcoat.co.jp/artist/suda-masaki/",
    is_weekly_pick: false,
    is_active: true,
  },
  {
    slug: "yokohama-ryusei",
    category_slug: "actor",
    name_ja: "横浜流星",
    name_kana: "ヨコハマリュウセイ",
    title: "俳優",
    bio_short:
      "空手の全国大会で優勝経験を持つ俳優。『初めて恋をした日に読む話』で一躍ブレイクし、以降ドラマ・映画の主演作が続く。アクションもこなせる身体能力と、正統派のルックスを兼ね備えた次世代のトップスター。",
    editorial:
      "端正な顔立ちと鍛え抜かれた肉体のバランスが圧倒的。空手で培った所作の美しさは演技にも反映されており、立ち姿だけで絵になる稀有な俳優。普段の穏やかな笑顔と、役に入った時の鋭い眼差しのギャップもファンを魅了するポイント。",
    score_cleanliness: 19,
    score_facial: 20,
    score_vibe: 18,
    score_fashion: 18,
    score_charisma: 18,
    score_total: 93,
    tags: ["爽やか", "若々しい", "たくましい", "セクシー"],
    link_instagram:
      "https://www.instagram.com/ryusei_yokohama_official/",
    is_weekly_pick: true,
    is_active: true,
  },
  {
    slug: "meguro-ren",
    category_slug: "actor",
    name_ja: "目黒蓮",
    name_kana: "メグロレン",
    title: "俳優・Snow Manメンバー",
    bio_short:
      "Snow Manのメンバーとして活動しながら、俳優としても『silent』『海のはじまり』などの話題作に出演。アイドルと俳優を高いレベルで両立させ、幅広いファン層を獲得。端正な顔立ちとクールな佇まいで「国宝級イケメン」とも称される。",
    editorial:
      "その端整な顔立ちは、まさに「彫刻のような」という形容がふさわしい。クールな印象の中に時折見せる柔らかい笑顔が、多くの人の心を掴む理由。ステージ上でのパフォーマンスとドラマでの繊細な演技、どちらにおいても洗練された美しさを放つ。",
    score_cleanliness: 19,
    score_facial: 20,
    score_vibe: 19,
    score_fashion: 18,
    score_charisma: 18,
    score_total: 94,
    tags: ["クール", "エレガント", "セクシー", "若々しい"],
    is_weekly_pick: true,
    is_active: true,
  },
  {
    slug: "abe-hiroshi",
    category_slug: "actor",
    name_ja: "阿部寛",
    name_kana: "アベヒロシ",
    title: "俳優・元モデル",
    bio_short:
      "189cmの長身を武器にモデルとしてキャリアをスタート。『TRICK』『テルマエ・ロマエ』『ドラゴン桜』など代表作多数。シリアスからコメディまでこなす演技の幅広さで、日本映画界に欠かせない存在。",
    editorial:
      "彫りの深い顔立ちと圧倒的な長身は、日本の俳優の中でも異彩を放つ。コミカルな役どころでもその存在感は損なわれず、むしろ親しみやすさが増す。モデル出身ならではのスタイルの良さは健在で、スーツ姿の格好良さは業界随一。",
    score_cleanliness: 17,
    score_facial: 18,
    score_vibe: 18,
    score_fashion: 17,
    score_charisma: 18,
    score_total: 88,
    tags: ["大人系", "ワイルド", "たくましい", "知的"],
    link_official: "https://www.abehiroshi.jp/",
    is_weekly_pick: false,
    is_active: true,
  },

  // ── musician ──
  {
    slug: "hirano-sho",
    category_slug: "musician",
    name_ja: "平野紫耀",
    name_kana: "ヒラノショウ",
    title: "アイドル・Number_iメンバー",
    bio_short:
      "元King & Princeのセンターとして絶大な人気を誇り、現在はNumber_iのメンバーとして活動。圧倒的なビジュアルに加え、天然キャラとしてバラエティでも人気を博す。歌、ダンス、演技とマルチに才能を発揮。",
    editorial:
      "「顔面国宝」とも称されるその容姿は、文字通り非の打ちどころがない。しかし最大の魅力は、その完璧なルックスと天然で飾らない性格のギャップにある。ステージ上での圧倒的なオーラと、カメラオフでの無邪気な笑顔の両面を持つ、まさに天性のアイドル。",
    score_cleanliness: 19,
    score_facial: 20,
    score_vibe: 19,
    score_fashion: 18,
    score_charisma: 18,
    score_total: 94,
    tags: ["爽やか", "若々しい", "セクシー", "フレンドリー"],
    link_instagram: "https://www.instagram.com/and_and_sho/",
    is_weekly_pick: true,
    is_active: true,
  },
  {
    slug: "iwata-takanori",
    category_slug: "musician",
    name_ja: "岩田剛典",
    name_kana: "イワタタカノリ",
    title: "パフォーマー・俳優（三代目J SOUL BROTHERS）",
    bio_short:
      "三代目J SOUL BROTHERSのパフォーマーとして活躍しながら、俳優としても『植物図鑑』『去年の冬、きみと別れ』などに出演。慶應義塾大学法学部卒の知性派でもあり、その洗練された雰囲気で「最もファッショナブルなLDHメンバー」と評される。",
    editorial:
      "ダンスで鍛え抜かれた肉体と、品のある顔立ちの組み合わせが唯一無二。高学歴でありながら努力を惜しまない姿勢が、外見だけでなく内面的な魅力にもつながっている。ファッションセンスも群を抜いており、ハイブランドのアンバサダーを複数務めるのも納得。",
    score_cleanliness: 19,
    score_facial: 19,
    score_vibe: 18,
    score_fashion: 18,
    score_charisma: 17,
    score_total: 91,
    tags: ["エレガント", "クール", "大人系", "セクシー"],
    link_instagram:
      "https://www.instagram.com/takanori_iwata_official/",
    is_weekly_pick: false,
    is_active: true,
  },
  {
    slug: "yonezu-kenshi",
    category_slug: "musician",
    name_ja: "米津玄師",
    name_kana: "ヨネヅケンシ",
    title: "ミュージシャン・シンガーソングライター",
    bio_short:
      "「Lemon」「KICK BACK」など社会現象クラスのヒット曲を連発する天才ミュージシャン。ボカロP「ハチ」としての活動を経てメジャーデビュー。作詞作曲編曲に加え、MVのイラストも手掛けるなど、圧倒的なクリエイティブ能力を持つ。",
    editorial:
      "従来の「イケメン」とは異なる、唯一無二の存在感が米津玄師の魅力。長身で独特のシルエットを持ち、ファッションにも強いこだわりが見える。内省的でミステリアスな雰囲気は、彼の音楽そのもの。顔を隠す時期を経て表舞台に立つようになった今、その存在自体がアートと言える。",
    score_cleanliness: 17,
    score_facial: 17,
    score_vibe: 19,
    score_fashion: 17,
    score_charisma: 17,
    score_total: 87,
    tags: ["個性的", "知的", "クール", "ミニマル"],
    link_x: "https://x.com/haborym",
    link_instagram: "https://www.instagram.com/kenshi_yonezu/",
    link_official: "https://reissuerecords.net/",
    is_weekly_pick: false,
    is_active: true,
  },
  {
    slug: "noda-yojiro",
    category_slug: "musician",
    name_ja: "野田洋次郎",
    name_kana: "ノダヨウジロウ",
    title: "ミュージシャン（RADWIMPS）・俳優",
    bio_short:
      "RADWIMPSのボーカル・ギターとして「前前前世」「なんでもないや」など新海誠作品の主題歌で世界的知名度を獲得。ソロプロジェクト「illion」でも活動。俳優としても『トイレのピエタ』で主演を務めるなど多才。",
    editorial:
      "長身で端正な顔立ちを持ちながら、それを前面に出さない知的な佇まいが魅力。詩的な歌詞を紡ぎ出すその感性は、容姿以上に人を惹きつける。海外育ちのバイリンガルという経歴も加わり、知性と感性を兼ね備えた稀有なアーティスト。",
    score_cleanliness: 17,
    score_facial: 18,
    score_vibe: 19,
    score_fashion: 17,
    score_charisma: 17,
    score_total: 88,
    tags: ["知的", "個性的", "大人系", "エレガント"],
    link_instagram: "https://www.instagram.com/yojiro_noda/",
    link_official: "https://radwimps.jp/",
    is_weekly_pick: false,
    is_active: true,
  },

  // ── athlete ──
  {
    slug: "ohtani-shohei",
    category_slug: "athlete",
    name_ja: "大谷翔平",
    name_kana: "オオタニショウヘイ",
    title: "プロ野球選手（MLB・ロサンゼルス・ドジャース）",
    bio_short:
      "投打「二刀流」でMLBの常識を覆した世界的スーパースター。エンゼルスを経てドジャースへ移籍。MVP複数回受賞、歴史的な記録を次々と更新し続ける。193cmの恵まれた体格と少年のような笑顔で世界中のファンを魅了。",
    editorial:
      "スポーツ界のみならず、あらゆるジャンルの中で最も輝いている日本人と言っても過言ではない。恵まれた体格、爽やかな笑顔、そして謙虚な人柄。すべてが揃った大谷翔平は、まさに「リアルヒーロー」。グラウンド上の圧倒的パフォーマンスとベンチでの無邪気な笑顔のギャップが、老若男女を問わず人々を惹きつける。",
    score_cleanliness: 20,
    score_facial: 19,
    score_vibe: 19,
    score_fashion: 18,
    score_charisma: 19,
    score_total: 95,
    tags: ["爽やか", "たくましい", "アクティブ", "フレンドリー"],
    link_instagram: "https://www.instagram.com/sholohtani/",
    is_weekly_pick: true,
    is_active: true,
  },
  {
    slug: "nishikori-kei",
    category_slug: "athlete",
    name_ja: "錦織圭",
    name_kana: "ニシコリケイ",
    title: "元プロテニス選手",
    bio_short:
      "日本男子テニス界のパイオニア。全米オープン準優勝、世界ランキング最高4位という偉業を達成。小柄ながらも世界のトップ選手と渡り合った技術と精神力は、日本テニス界に新たな歴史を刻んだ。",
    editorial:
      "コート上での集中した表情と、インタビューでの穏やかな受け答えの対比が印象的。スポーツマンとしての引き締まった体型と、知的で落ち着いた雰囲気を持つ。世界の舞台で戦い続けた経験が、内面からにじみ出る風格として現れている。",
    score_cleanliness: 18,
    score_facial: 17,
    score_vibe: 18,
    score_fashion: 17,
    score_charisma: 17,
    score_total: 87,
    tags: ["クール", "知的", "スポーティ", "爽やか"],
    link_official: "https://www.keinishikori.com/",
    is_weekly_pick: false,
    is_active: true,
  },
  {
    slug: "hanyu-yuzuru",
    category_slug: "athlete",
    name_ja: "羽生結弦",
    name_kana: "ハニュウユヅル",
    title: "プロフィギュアスケーター",
    bio_short:
      "オリンピック2連覇を達成したフィギュアスケート界のレジェンド。競技者としてのキャリアを経て、プロスケーターとして単独公演を開催。氷上での圧倒的な表現力と技術力は世界中から称賛を受けている。",
    editorial:
      "氷上の王子と呼ばれるにふさわしい、透明感のある美しさ。しかしその内面は驚くほどストイックで、限界に挑戦し続ける強い意志を持つ。演技中の鬼気迫る表情と、リンク外でのはにかんだ笑顔のギャップが、世界中のファンを虜にしている。その存在自体が芸術作品のよう。",
    score_cleanliness: 20,
    score_facial: 19,
    score_vibe: 19,
    score_fashion: 18,
    score_charisma: 18,
    score_total: 94,
    tags: ["エレガント", "クール", "知的", "個性的"],
    link_official: "https://yuzuruhanyu.jp/",
    is_weekly_pick: true,
    is_active: true,
  },
  {
    slug: "kubo-takefusa",
    category_slug: "athlete",
    name_ja: "久保建英",
    name_kana: "クボタケフサ",
    title: "プロサッカー選手（レアル・ソシエダ）",
    bio_short:
      "FCバルセロナの下部組織出身という異色の経歴を持つ日本代表MF。レアル・マドリードを経てレアル・ソシエダで主力として活躍。若くしてスペインのトップリーグで存在感を示す、日本サッカー界の至宝。",
    editorial:
      "まだ若さの残る顔立ちと、ピッチ上で見せる大人びたプレーのギャップが魅力的。スペインでの生活で身につけた洗練された雰囲気も加わり、日本人サッカー選手の中でも独特の存在感を放つ。フィールドでボールを持った時の自信に満ちた表情は、見る者を惹きつける。",
    score_cleanliness: 18,
    score_facial: 18,
    score_vibe: 18,
    score_fashion: 17,
    score_charisma: 17,
    score_total: 88,
    tags: ["若々しい", "爽やか", "アクティブ", "スポーティ"],
    link_instagram: "https://www.instagram.com/takefusa.kubo/",
    is_weekly_pick: false,
    is_active: true,
  },

  // ── model / actor ──
  {
    slug: "sakaguchi-kentaro",
    category_slug: "actor",
    name_ja: "坂口健太郎",
    name_kana: "サカグチケンタロウ",
    title: "俳優・モデル",
    bio_short:
      "メンズノンノの専属モデルを経て俳優に転身。『とと姉ちゃん』『シグナル』など話題作に出演。「塩顔イケメン」の代表格として、透明感のあるルックスで幅広い世代から支持される。",
    editorial:
      "いわゆる「塩顔」の完成形とも言える坂口健太郎。派手さはないが、見れば見るほど引き込まれる端正な顔立ちが特徴。モデル出身ならではのスタイルの良さと、自然体の佇まいが清潔感を際立たせている。シンプルな服装でも十分にサマになる、素材の良さが光る。",
    score_cleanliness: 19,
    score_facial: 18,
    score_vibe: 18,
    score_fashion: 18,
    score_charisma: 17,
    score_total: 90,
    tags: ["爽やか", "エレガント", "ミニマル", "クール"],
    link_instagram:
      "https://www.instagram.com/sakaguchikentaro_official/",
    is_weekly_pick: false,
    is_active: true,
  },
  {
    slug: "machida-keita",
    category_slug: "actor",
    name_ja: "町田啓太",
    name_kana: "マチダケイタ",
    title: "俳優（劇団EXILE）",
    bio_short:
      "劇団EXILEのメンバーとして活動しながら、俳優として『SUPER RICH』『恋なんて、本気でやってどうするの?』などのドラマに出演。日本体育大学出身で、端正な顔立ちと鍛え上げられた肉体を兼ね備える。",
    editorial:
      "「正統派イケメン」という言葉が最も似合う俳優の一人。知的な雰囲気を持ちながらも、体育大学出身というギャップが魅力的。スーツの着こなしは業界でもトップクラスで、ドラマでのスーツ姿がSNSでたびたび話題になるほど。品格と力強さが同居する稀有な存在。",
    score_cleanliness: 19,
    score_facial: 19,
    score_vibe: 18,
    score_fashion: 18,
    score_charisma: 17,
    score_total: 91,
    tags: ["エレガント", "大人系", "知的", "クール"],
    link_instagram:
      "https://www.instagram.com/keita_machida_official/",
    is_weekly_pick: false,
    is_active: true,
  },

  // ── youtuber ──
  {
    slug: "hikakin",
    category_slug: "youtuber",
    name_ja: "ヒカキン",
    name_kana: "ヒカキン",
    title: "YouTuber・実業家",
    bio_short:
      "日本のYouTube界のパイオニア。登録者数1,000万人を超える国内トップクラスのYouTuber。ヒューマンビートボックスから始まり、商品レビュー、ゲーム実況など幅広いコンテンツを展開。UUUMの創業にも関わるなど実業家としての顔も持つ。",
    editorial:
      "「イケメン」という枠にとどまらない、唯一無二の存在感を持つヒカキン。清潔感のある見た目と、子どもから大人まで安心して見られるキャラクターが最大の武器。年々洗練されていくファッションと、変わらない親しみやすさの共存が、長年にわたり支持される理由。",
    score_cleanliness: 18,
    score_facial: 15,
    score_vibe: 17,
    score_fashion: 15,
    score_charisma: 17,
    score_total: 82,
    tags: ["フレンドリー", "親しみやすい", "爽やか", "アクティブ"],
    link_instagram: "https://www.instagram.com/hikakin/",
    link_official: "https://hikakin.com/",
    is_weekly_pick: false,
    is_active: true,
  },
  {
    slug: "hajime-shacho",
    category_slug: "youtuber",
    name_ja: "はじめしゃちょー",
    name_kana: "ハジメシャチョー",
    title: "YouTuber",
    bio_short:
      "日本で最も登録者数の多いYouTuberの一人。186cmの長身と爽やかなルックスを持ち、体を張った実験系動画やチャレンジ企画で人気を博す。静岡大学出身で、知的な一面も。",
    editorial:
      "長身で細身のスタイルと、整った顔立ちはYouTuber界でも随一のビジュアル。それでいて体を張った企画に全力で取り組む姿勢が、飾らない魅力として映る。カメラの前での自然体な振る舞いと、時折見せるシャイな表情のバランスが好感を生む。",
    score_cleanliness: 18,
    score_facial: 17,
    score_vibe: 17,
    score_fashion: 16,
    score_charisma: 17,
    score_total: 85,
    tags: ["爽やか", "若々しい", "フレンドリー", "アクティブ"],
    link_instagram: "https://www.instagram.com/hajimesyachodesu/",
    is_weekly_pick: false,
    is_active: true,
  },

  // ── startup ──
  {
    slug: "horie-takafumi",
    category_slug: "startup",
    name_ja: "堀江貴文",
    name_kana: "ホリエタカフミ",
    title: "実業家・著作家",
    bio_short:
      "「ホリエモン」の愛称で知られる実業家。ライブドア元社長として一世を風靡し、現在はロケット開発（インターステラテクノロジズ）、オンラインサロン、著作、YouTubeなど多岐にわたる事業を展開。歯に衣着せぬ発言で常に注目を集める。",
    editorial:
      "従来のイケメン像とは一線を画すが、その圧倒的な行動力と知性が生み出すカリスマ性は唯一無二。発言の一つひとつが世間を動かす影響力を持ち、ビジネス界における存在感は他の追随を許さない。近年はヘルスケアへの関心から体型管理にも取り組み、年齢を感じさせないエネルギッシュな姿を見せている。",
    score_cleanliness: 16,
    score_facial: 15,
    score_vibe: 17,
    score_fashion: 16,
    score_charisma: 18,
    score_total: 82,
    tags: ["知的", "個性的", "大人系", "アクティブ"],
    link_x: "https://x.com/takapon_jp",
    link_instagram: "https://www.instagram.com/takapon_jp/",
    link_official: "https://horiemon.com/",
    is_weekly_pick: false,
    is_active: true,
  },
  {
    slug: "nishimura-hiroyuki",
    category_slug: "startup",
    name_ja: "西村博之",
    name_kana: "ニシムラヒロユキ",
    title: "実業家・2ちゃんねる創設者",
    bio_short:
      "2ちゃんねる（現5ちゃんねる）の創設者として知られ、現在はフランス・パリ在住。YouTube切り抜き動画が大ブームとなり、若い世代からも絶大な支持を得る。論破スタイルの討論が話題を呼び、テレビ・ネットメディアに多数出演。",
    editorial:
      "ビジュアル面でのスコアは控えめだが、その知性とユーモアが生み出す独特の魅力は数字では測れない。飄々とした佇まいと切れ味鋭い論理展開のギャップが、多くの視聴者を惹きつける。ファッションに無頓着なようでいて、パリ在住の洒脱さがにじみ出ている点も面白い。",
    score_cleanliness: 16,
    score_facial: 15,
    score_vibe: 17,
    score_fashion: 15,
    score_charisma: 18,
    score_total: 81,
    tags: ["知的", "個性的", "クール", "フレンドリー"],
    link_x: "https://x.com/hirox246",
    is_weekly_pick: false,
    is_active: true,
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

async function getOrCreateTags(tagNames) {
  const { data: existing } = await supabase
    .from("tags")
    .select("id, name");

  const tagMap = new Map((existing || []).map((t) => [t.name, t.id]));
  const result = {};

  for (const name of tagNames) {
    if (tagMap.has(name)) {
      result[name] = tagMap.get(name);
    } else {
      const { data, error } = await supabase
        .from("tags")
        .insert({ name, display_order: 0 })
        .select("id")
        .single();
      if (error) {
        console.warn(`  Tag insert failed: ${name} — ${error.message}`);
      } else {
        result[name] = data.id;
        tagMap.set(name, data.id);
      }
    }
  }
  return result;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log("Fetching categories...");
  const { data: categories, error: catErr } = await supabase
    .from("categories")
    .select("id, slug");

  if (catErr) {
    console.error("Failed to fetch categories:", catErr.message);
    process.exit(1);
  }

  const catBySlug = Object.fromEntries(
    (categories || []).map((c) => [c.slug, c.id])
  );
  console.log(
    `  Found ${Object.keys(catBySlug).length} categories:`,
    Object.keys(catBySlug).join(", ")
  );

  console.log("\nEnsuring tags exist...");
  const allTagNames = [...new Set(PEOPLE.flatMap((p) => p.tags))];
  const tagIdMap = await getOrCreateTags(allTagNames);
  console.log(`  ${Object.keys(tagIdMap).length} tags ready`);

  console.log(`\nInserting ${PEOPLE.length} people...\n`);

  let inserted = 0;
  let skipped = 0;
  let failed = 0;

  for (const p of PEOPLE) {
    const categoryId = catBySlug[p.category_slug];
    if (!categoryId) {
      console.warn(
        `  ✗ Category "${p.category_slug}" not found — skipping ${p.name_ja}`
      );
      failed++;
      continue;
    }

    // Check if person already exists
    const { data: existing } = await supabase
      .from("people")
      .select("id")
      .eq("slug", p.slug)
      .maybeSingle();

    if (existing) {
      console.log(`  ⊘ ${p.name_ja} (${p.slug}) — already exists, skipping`);
      skipped++;
      continue;
    }

    const { tags: tagNames, category_slug, ...personFields } = p;

    const { data: newPerson, error: insertErr } = await supabase
      .from("people")
      .insert({ ...personFields, category_id: categoryId })
      .select("id")
      .single();

    if (insertErr) {
      console.error(
        `  ✗ ${p.name_ja} — insert failed: ${insertErr.message}`
      );
      failed++;
      continue;
    }

    // Assign tags
    const tagInserts = tagNames
      .map((name) => {
        const tagId = tagIdMap[name];
        return tagId ? { person_id: newPerson.id, tag_id: tagId } : null;
      })
      .filter(Boolean);

    if (tagInserts.length > 0) {
      const { error: tagErr } = await supabase
        .from("people_tags")
        .insert(tagInserts);
      if (tagErr) {
        console.warn(
          `  ⚠ ${p.name_ja} — tags failed: ${tagErr.message}`
        );
      }
    }

    inserted++;
    console.log(
      `  ✓ ${p.name_ja} (${p.slug}) → ${p.category_slug} [${p.score_total}pts]`
    );
  }

  console.log(
    `\nDone. Inserted: ${inserted}, Skipped: ${skipped}, Failed: ${failed}`
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
