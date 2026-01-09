// Full dataset with 30 people across all categories
export const categories = [
  {
    id: "startup",
    slug: "startup",
    nameJa: "スタートアップ",
    description:
      "テクノロジーとビジネスで未来を切り開く、スタートアップ界のイケメン経営者たち。革新的なビジョンとリーダーシップを兼ね備えた人物を掲載。",
  },
  {
    id: "actor",
    slug: "actor",
    nameJa: "俳優",
    description:
      "映画、ドラマ、舞台で活躍する俳優陣。演技力と存在感、そして確かなビジュアルで観客を魅了する実力派を厳選。",
  },
  {
    id: "athlete",
    slug: "athlete",
    nameJa: "アスリート",
    description:
      "スポーツの世界で結果を残し続けるトップアスリート。鍛え抜かれた肉体美と精神力、競技への情熱を持つ選手たち。",
  },
  {
    id: "model",
    slug: "model",
    nameJa: "モデル",
    description:
      "ファッション業界を牽引するプロフェッショナルモデル。洗練されたスタイルと表現力で、ランウェイから広告まで幅広く活躍。",
  },
  {
    id: "youtuber",
    slug: "youtuber",
    nameJa: "YouTuber",
    description:
      "デジタルネイティブ世代を代表するクリエイター。独自の企画力とキャラクター、そしてルックスで多くのファンを獲得。",
  },
  {
    id: "musician",
    slug: "musician",
    nameJa: "ミュージシャン",
    description:
      "音楽シーンで独自の存在感を放つアーティスト。楽曲のクオリティはもちろん、ビジュアル面でも高い評価を得る才能。",
  },
];

export const allTags = [
  "知的",
  "大人系",
  "クール",
  "爽やか",
  "若々しい",
  "フレンドリー",
  "ワイルド",
  "セクシー",
  "エレガント",
  "ミニマル",
  "個性的",
  "アクティブ",
  "たくましい",
  "親しみやすい",
  "スポーティ",
];

export const people = [
  {
    id: "1",
    slug: "takeshi-yamamoto",
    nameJa: "山本剛志",
    nameKana: "ヤマモトタケシ",
    categorySlug: "startup",
    title: "AI×医療スタートアップCEO",
    tags: ["知的", "大人系", "クール"],
    scoreTotal: 92,
    scores: {
      cleanliness: 19,
      facial: 18,
      vibe: 19,
      fashion: 18,
      charisma: 18,
    },
    image: { src: "/people/placeholder-01.jpg", alt: "山本剛志" },
    bioShort:
      "東大医学部卒業後、シリコンバレーでAI研究に従事。帰国後、医療AIスタートアップを創業し、業界に革新をもたらす。",
    editorial:
      "医療とテクノロジーの融合という難題に挑む山本氏。その知性と情熱は、端正な容姿と相まって多くの投資家を魅了してきた。ビジネスの場でも私生活でも一切の妥協を許さない姿勢が、洗練された雰囲気として表れている。黒縁メガネとシンプルなシャツスタイルが定番だが、その佇まいには確かなオーラがある。",
    links: { x: "https://x.com/example" },
    createdAt: "2026-01-05T10:00:00Z",
    weeklyPick: true,
  },
  {
    id: "2",
    slug: "kenji-sato",
    nameJa: "佐藤賢二",
    categorySlug: "startup",
    title: "フィンテック企業創業者",
    tags: ["爽やか", "若々しい", "フレンドリー"],
    scoreTotal: 88,
    scores: {
      cleanliness: 18,
      facial: 17,
      vibe: 18,
      fashion: 17,
      charisma: 18,
    },
    image: { src: "/people/placeholder-02.jpg", alt: "佐藤賢二" },
    bioShort:
      "25歳で決済サービスを立ち上げ、わずか3年で業界トップクラスに成長させた若き経営者。親しみやすい人柄で知られる。",
    editorial:
      "若さと実績を兼ね備えた佐藤氏。カジュアルな服装を好むが、その選択には確かなセンスが光る。爽やかな笑顔と柔軟な発想で、従来の金融業界に新風を吹き込んでいる。",
    createdAt: "2026-01-04T10:00:00Z",
    weeklyPick: false,
  },
  {
    id: "3",
    slug: "hiroshi-tanaka",
    nameJa: "田中寛",
    categorySlug: "startup",
    title: "SaaS企業CTO",
    tags: ["知的", "ミニマル", "クール"],
    scoreTotal: 85,
    scores: {
      cleanliness: 17,
      facial: 17,
      vibe: 17,
      fashion: 17,
      charisma: 17,
    },
    image: { src: "/people/placeholder-03.jpg", alt: "田中寛" },
    bioShort:
      "京都大学情報学科出身。大手IT企業を経て独立し、エンタープライズ向けSaaSを開発。技術力と経営手腕を両立。",
    editorial:
      "エンジニアとしての実力と経営者としての視点を併せ持つ田中氏。控えめな性格ながら、その確かな技術力と落ち着いた雰囲気が多くの支持を集める。",
    createdAt: "2026-01-03T10:00:00Z",
    weeklyPick: false,
  },
  {
    id: "4",
    slug: "ryo-nakamura",
    nameJa: "中村涼",
    categorySlug: "actor",
    title: "映画俳優",
    tags: ["ワイルド", "大人系", "セクシー"],
    scoreTotal: 94,
    scores: {
      cleanliness: 18,
      facial: 19,
      vibe: 19,
      fashion: 19,
      charisma: 19,
    },
    image: { src: "/people/placeholder-04.jpg", alt: "中村涼" },
    bioShort:
      "数々の映画賞を受賞し、国際的にも評価される実力派俳優。ハードボイルドな役柄から繊細な演技まで幅広くこなす。",
    editorial:
      "日本映画界を代表する俳優の一人。鍛え抜かれた肉体と彫りの深い顔立ちは、スクリーン映えする存在感を放つ。私生活では寡黙だが、その男性的な魅力は多くのファンを虜にしている。",
    links: { instagram: "https://instagram.com/example" },
    createdAt: "2026-01-06T10:00:00Z",
    weeklyPick: true,
  },
  {
    id: "5",
    slug: "yuki-ishikawa",
    nameJa: "石川優希",
    categorySlug: "actor",
    title: "ドラマ俳優",
    tags: ["爽やか", "若々しい", "親しみやすい"],
    scoreTotal: 90,
    scores: {
      cleanliness: 19,
      facial: 18,
      vibe: 18,
      fashion: 17,
      charisma: 18,
    },
    image: { src: "/people/placeholder-05.jpg", alt: "石川優希" },
    bioShort:
      "連続ドラマで主演を務め、視聴率を牽引する若手実力派。爽やかな笑顔と確かな演技力で幅広い層から支持される。",
    editorial:
      "次世代を担う若手俳優として注目される石川氏。透明感のある肌と整った顔立ち、そして親しみやすい笑顔が魅力。",
    createdAt: "2026-01-05T10:00:00Z",
    weeklyPick: false,
  },
  {
    id: "6",
    slug: "tatsuya-kondo",
    nameJa: "近藤達也",
    categorySlug: "actor",
    title: "舞台俳優",
    tags: ["知的", "大人系", "エレガント"],
    scoreTotal: 87,
    scores: {
      cleanliness: 18,
      facial: 17,
      vibe: 18,
      fashion: 17,
      charisma: 17,
    },
    image: { src: "/people/placeholder-06.jpg", alt: "近藤達也" },
    bioShort:
      "劇団四季出身。シェイクスピアから現代劇まで幅広いレパートリーを持つ。舞台での圧倒的な存在感で知られる。",
    editorial:
      "舞台という空間で磨かれた表現力と、知的な佇まいが魅力の近藤氏。クラシックなスーツスタイルを好み、その洗練された着こなしは同業者からも一目置かれている。",
    createdAt: "2026-01-02T10:00:00Z",
    weeklyPick: false,
  },
  {
    id: "7",
    slug: "daichi-matsumoto",
    nameJa: "松本大地",
    categorySlug: "athlete",
    title: "プロサッカー選手",
    tags: ["ワイルド", "アクティブ", "たくましい"],
    scoreTotal: 91,
    scores: {
      cleanliness: 18,
      facial: 18,
      vibe: 19,
      fashion: 18,
      charisma: 18,
    },
    image: { src: "/people/placeholder-07.jpg", alt: "松本大地" },
    bioShort:
      "日本代表のエースストライカー。欧州リーグでも活躍し、世界的な評価を得る。そのルックスでも注目を集める。",
    editorial:
      "ピッチ上での圧倒的なパフォーマンスと、整った容姿で国内外から注目される松本選手。鍛え抜かれた肉体美と、試合後の爽やかな笑顔のギャップが魅力。",
    links: { instagram: "https://instagram.com/example" },
    createdAt: "2026-01-06T10:00:00Z",
    weeklyPick: true,
  },
  {
    id: "8",
    slug: "shun-hayashi",
    nameJa: "林駿",
    categorySlug: "athlete",
    title: "プロテニス選手",
    tags: ["爽やか", "スポーティ", "クール"],
    scoreTotal: 89,
    scores: {
      cleanliness: 19,
      facial: 18,
      vibe: 18,
      fashion: 17,
      charisma: 17,
    },
    image: { src: "/people/placeholder-08.jpg", alt: "林駿" },
    bioShort:
      "グランドスラムでベスト8進出を果たした実力派。クールなプレースタイルと端正な顔立ちでファン層を拡大中。",
    editorial:
      "テニスコートでの冷静な判断力と、コート外での礼儀正しさが印象的な林選手。スポーツマンらしい引き締まった体型と、清潔感あふれるルックスが魅力。",
    createdAt: "2026-01-04T10:00:00Z",
    weeklyPick: false,
  },
  {
    id: "9",
    slug: "kenta-yoshida",
    nameJa: "吉田健太",
    categorySlug: "athlete",
    title: "プロ野球選手",
    tags: ["爽やか", "親しみやすい", "たくましい"],
    scoreTotal: 86,
    scores: {
      cleanliness: 17,
      facial: 17,
      vibe: 18,
      fashion: 17,
      charisma: 17,
    },
    image: { src: "/people/placeholder-09.jpg", alt: "吉田健太" },
    bioShort:
      "プロ野球界を代表する投手。圧倒的な球速と制球力で、数々のタイトルを獲得。ファンサービスでも知られる。",
    editorial:
      "マウンド上での迫力あるピッチングと、オフでの親しみやすい笑顔のギャップが人気の吉田選手。",
    createdAt: "2026-01-01T10:00:00Z",
    weeklyPick: false,
  },
  {
    id: "10",
    slug: "kaito-suzuki",
    nameJa: "鈴木海斗",
    categorySlug: "model",
    title: "ファッションモデル",
    tags: ["エレガント", "クール", "ミニマル"],
    scoreTotal: 95,
    scores: {
      cleanliness: 20,
      facial: 19,
      vibe: 19,
      fashion: 19,
      charisma: 18,
    },
    image: { src: "/people/placeholder-10.jpg", alt: "鈴木海斗" },
    bioShort:
      "パリコレクションにも出演する国際派モデル。182cmの長身と彫刻のような顔立ちで、世界中のデザイナーから指名される。",
    editorial:
      "日本を代表するトップモデルの一人。完璧なプロポーションと、中性的でありながら力強い表情が特徴。ランウェイでの圧倒的な存在感は、多くのファッション関係者を魅了してきた。",
    links: { instagram: "https://instagram.com/example" },
    createdAt: "2026-01-07T10:00:00Z",
    weeklyPick: true,
  },
  {
    id: "11",
    slug: "haruto-kimura",
    nameJa: "木村悠人",
    categorySlug: "model",
    title: "広告モデル",
    tags: ["爽やか", "親しみやすい", "若々しい"],
    scoreTotal: 88,
    scores: {
      cleanliness: 19,
      facial: 18,
      vibe: 17,
      fashion: 17,
      charisma: 17,
    },
    image: { src: "/people/placeholder-11.jpg", alt: "木村悠人" },
    bioShort:
      "CM、広告で幅広く活躍。親しみやすい笑顔と確かなビジュアルで、企業からのオファーが絶えない人気モデル。",
    editorial:
      "広告業界で引っ張りだこの木村氏。爽やかな笑顔と整った顔立ちは、どんな商品のイメージにもマッチする汎用性の高さが魅力。",
    createdAt: "2026-01-03T10:00:00Z",
    weeklyPick: false,
  },
  {
    id: "12",
    slug: "ren-takahashi",
    nameJa: "高橋蓮",
    categorySlug: "model",
    title: "ストリートモデル",
    tags: ["クール", "ミニマル", "個性的"],
    scoreTotal: 84,
    scores: {
      cleanliness: 17,
      facial: 17,
      vibe: 17,
      fashion: 17,
      charisma: 16,
    },
    image: { src: "/people/placeholder-12.jpg", alt: "高橋蓮" },
    bioShort:
      "原宿系ブランドを中心に活動。独自のスタイリングセンスで若者から絶大な支持を得る、次世代ファッションアイコン。",
    editorial:
      "ストリートファッションシーンで確固たる地位を築く高橋氏。細身の体型と個性的なスタイリングが特徴。",
    createdAt: "2025-12-30T10:00:00Z",
    weeklyPick: false,
  },
  {
    id: "13",
    slug: "sho-watanabe",
    nameJa: "渡辺翔",
    categorySlug: "youtuber",
    title: "ライフスタイル系YouTuber",
    tags: ["爽やか", "親しみやすい", "アクティブ"],
    scoreTotal: 87,
    scores: {
      cleanliness: 18,
      facial: 17,
      vibe: 18,
      fashion: 17,
      charisma: 17,
    },
    image: { src: "/people/placeholder-13.jpg", alt: "渡辺翔" },
    bioShort:
      "チャンネル登録者200万人超。旅行、グルメ、ファッションを中心に発信。親しみやすいキャラクターで幅広い層に人気。",
    editorial:
      "デジタルネイティブ世代を代表するクリエイター。動画内での自然体な姿勢と、清潔感のあるルックスが支持される理由。",
    links: {
      x: "https://x.com/example",
      instagram: "https://instagram.com/example",
    },
    createdAt: "2026-01-05T10:00:00Z",
    weeklyPick: false,
  },
  {
    id: "14",
    slug: "yuta-nakajima",
    nameJa: "中島悠太",
    categorySlug: "youtuber",
    title: "ビジネス系YouTuber",
    tags: ["知的", "大人系", "クール"],
    scoreTotal: 85,
    scores: {
      cleanliness: 18,
      facial: 17,
      vibe: 17,
      fashion: 16,
      charisma: 17,
    },
    image: { src: "/people/placeholder-14.jpg", alt: "中島悠太" },
    bioShort:
      "元外資系コンサル。ビジネススキルや自己啓発をテーマに発信し、20〜30代のビジネスパーソンから支持される。",
    editorial:
      "論理的な話し方と、洗練された見た目で差別化を図る中島氏。スーツ姿での撮影が多いが、その着こなしは視聴者の参考にもなっている。",
    createdAt: "2026-01-02T10:00:00Z",
    weeklyPick: false,
  },
  {
    id: "15",
    slug: "ryota-ito",
    nameJa: "伊藤涼太",
    categorySlug: "youtuber",
    title: "フィットネス系YouTuber",
    tags: ["アクティブ", "たくましい", "ワイルド"],
    scoreTotal: 83,
    scores: {
      cleanliness: 17,
      facial: 16,
      vibe: 17,
      fashion: 16,
      charisma: 17,
    },
    image: { src: "/people/placeholder-15.jpg", alt: "伊藤涼太" },
    bioShort:
      "パーソナルトレーナーとして活動しながら、筋トレ・栄養学を発信。鍛え抜かれた肉体と丁寧な解説で人気を集める。",
    editorial:
      "フィットネス業界で確かな実績を持つ伊藤氏。理想的な体型を維持しながら、視聴者に寄り添った発信スタイルが特徴。",
    createdAt: "2025-12-28T10:00:00Z",
    weeklyPick: false,
  },
  {
    id: "16",
    slug: "kazuki-morita",
    nameJa: "森田和樹",
    categorySlug: "musician",
    title: "シンガーソングライター",
    tags: ["エレガント", "大人系", "セクシー"],
    scoreTotal: 93,
    scores: {
      cleanliness: 19,
      facial: 19,
      vibe: 19,
      fashion: 18,
      charisma: 18,
    },
    image: { src: "/people/placeholder-16.jpg", alt: "森田和樹" },
    bioShort:
      "オリコン1位を複数獲得。繊細な歌詞と伸びやかな歌声で、幅広い世代から支持される。ルックスの良さでも話題に。",
    editorial:
      "音楽性の高さと、ビジュアルの美しさを兼ね備えた森田氏。ステージ上での佇まいは、まさにアーティストという言葉がふさわしい。",
    links: {
      instagram: "https://instagram.com/example",
      official: "https://example.com",
    },
    createdAt: "2026-01-06T10:00:00Z",
    weeklyPick: true,
  },
  {
    id: "17",
    slug: "takumi-fujiwara",
    nameJa: "藤原拓海",
    categorySlug: "musician",
    title: "ロックバンドボーカル",
    tags: ["ワイルド", "クール", "個性的"],
    scoreTotal: 88,
    scores: {
      cleanliness: 17,
      facial: 18,
      vibe: 18,
      fashion: 18,
      charisma: 17,
    },
    image: { src: "/people/placeholder-17.jpg", alt: "藤原拓海" },
    bioShort:
      "人気ロックバンドのフロントマン。力強いボーカルとカリスマ性で、ライブ会場を熱狂の渦に巻き込む。",
    editorial:
      "ステージ上での圧倒的な存在感が魅力の藤原氏。ロッカーらしいワイルドな雰囲気と、整った顔立ちのバランスが絶妙。",
    createdAt: "2026-01-04T10:00:00Z",
    weeklyPick: false,
  },
  {
    id: "18",
    slug: "hiroki-saito",
    nameJa: "斎藤大樹",
    categorySlug: "musician",
    title: "ジャズピアニスト",
    tags: ["知的", "エレガント", "大人系"],
    scoreTotal: 86,
    scores: {
      cleanliness: 18,
      facial: 17,
      vibe: 18,
      fashion: 17,
      charisma: 16,
    },
    image: { src: "/people/placeholder-18.jpg", alt: "斎藤大樹" },
    bioShort:
      "ニューヨークで研鑽を積んだジャズピアニスト。帰国後、都内の一流ジャズクラブで演奏を続ける実力派。",
    editorial:
      "ジャズという音楽ジャンルが似合う、洗練された雰囲気を持つ斎藤氏。クラシックなスーツスタイルを好み、その着こなしは大人の男性の理想形。",
    createdAt: "2026-01-01T10:00:00Z",
    weeklyPick: false,
  },
  {
    id: "19",
    slug: "akira-ogawa",
    nameJa: "小川晃",
    categorySlug: "startup",
    title: "EC×物流スタートアップCOO",
    tags: ["クール", "大人系", "知的"],
    scoreTotal: 84,
    scores: {
      cleanliness: 17,
      facial: 17,
      vibe: 17,
      fashion: 16,
      charisma: 17,
    },
    image: { src: "/people/placeholder-19.jpg", alt: "小川晃" },
    bioShort:
      "大手商社出身。物流の効率化を実現するスタートアップでCOOを務め、業界の構造改革を推進している。",
    editorial:
      "ビジネスの最前線で活躍する小川氏。商社時代に培った交渉力と、スタートアップでの柔軟な発想を兼ね備える。",
    createdAt: "2025-12-29T10:00:00Z",
    weeklyPick: false,
  },
  {
    id: "20",
    slug: "sota-nishimura",
    nameJa: "西村颯太",
    categorySlug: "actor",
    title: "舞台・映像俳優",
    tags: ["爽やか", "若々しい", "フレンドリー"],
    scoreTotal: 82,
    scores: {
      cleanliness: 17,
      facial: 16,
      vibe: 17,
      fashion: 16,
      charisma: 16,
    },
    image: { src: "/people/placeholder-20.jpg", alt: "西村颯太" },
    bioShort:
      "舞台から映像まで幅広く活躍する若手俳優。フレッシュな魅力と確かな演技力で、次世代を担う存在として注目される。",
    editorial:
      "舞台での経験を活かした確かな演技力を持つ西村氏。爽やかな笑顔と親しみやすい性格で、共演者からの評判も良い。",
    createdAt: "2025-12-27T10:00:00Z",
    weeklyPick: false,
  },
  {
    id: "21",
    slug: "masato-endo",
    nameJa: "遠藤正人",
    categorySlug: "athlete",
    title: "総合格闘家",
    tags: ["ワイルド", "たくましい", "アクティブ"],
    scoreTotal: 85,
    scores: {
      cleanliness: 16,
      facial: 17,
      vibe: 18,
      fashion: 17,
      charisma: 17,
    },
    image: { src: "/people/placeholder-21.jpg", alt: "遠藤正人" },
    bioShort:
      "国内トップクラスの総合格闘家。圧倒的なフィジカルと戦略的な試合運びで、タイトルマッチ常連の実力者。",
    editorial:
      "格闘技界で確固たる地位を築く遠藤選手。鍛え抜かれた肉体美と、リング外での紳士的な振る舞いのギャップが魅力。",
    createdAt: "2025-12-26T10:00:00Z",
    weeklyPick: false,
  },
  {
    id: "22",
    slug: "jun-nakano",
    nameJa: "中野純",
    categorySlug: "model",
    title: "ヘアモデル",
    tags: ["エレガント", "ミニマル", "クール"],
    scoreTotal: 86,
    scores: {
      cleanliness: 18,
      facial: 17,
      vibe: 17,
      fashion: 17,
      charisma: 17,
    },
    image: { src: "/people/placeholder-22.jpg", alt: "中野純" },
    bioShort:
      "美容業界で活躍するヘアモデル。雑誌、広告で多数起用され、そのビジュアルとヘアスタイルが常にトレンドを作り出す。",
    editorial:
      "ヘアスタイルを活かした撮影で業界をリードする中野氏。シンプルながらも洗練されたファッションセンスで、ヘア以外の要素でも注目を集める。",
    createdAt: "2025-12-25T10:00:00Z",
    weeklyPick: false,
  },
  {
    id: "23",
    slug: "riku-yamada",
    nameJa: "山田陸",
    categorySlug: "youtuber",
    title: "トラベル系YouTuber",
    tags: ["爽やか", "アクティブ", "フレンドリー"],
    scoreTotal: 81,
    scores: {
      cleanliness: 17,
      facial: 16,
      vibe: 16,
      fashion: 16,
      charisma: 16,
    },
    image: { src: "/people/placeholder-23.jpg", alt: "山田陸" },
    bioShort:
      "世界中を旅しながら動画を配信。現地の文化や人々との交流を丁寧に伝え、視聴者を旅に誘うスタイルで人気。",
    editorial:
      "旅する姿が絵になる山田氏。アクティブな活動と、爽やかなビジュアルが視聴者を魅了している。",
    createdAt: "2025-12-24T10:00:00Z",
    weeklyPick: false,
  },
  {
    id: "24",
    slug: "koki-matsuda",
    nameJa: "松田光希",
    categorySlug: "musician",
    title: "DJ / プロデューサー",
    tags: ["クール", "個性的", "ミニマル"],
    scoreTotal: 84,
    scores: {
      cleanliness: 17,
      facial: 17,
      vibe: 17,
      fashion: 17,
      charisma: 16,
    },
    image: { src: "/people/placeholder-24.jpg", alt: "松田光希" },
    bioShort:
      "クラブシーンで活躍するDJ。独自のサウンドで国内外のフェスに出演し、音楽プロデューサーとしても評価される。",
    editorial:
      "ナイトシーンを盛り上げる松田氏。DJブースでの集中した表情と、オフでのミニマルなファッションが印象的。",
    createdAt: "2025-12-23T10:00:00Z",
    weeklyPick: false,
  },
  {
    id: "25",
    slug: "tsubasa-inoue",
    nameJa: "井上翼",
    categorySlug: "startup",
    title: "EdTechスタートアップCEO",
    tags: ["知的", "爽やか", "フレンドリー"],
    scoreTotal: 83,
    scores: {
      cleanliness: 17,
      facial: 17,
      vibe: 16,
      fashion: 16,
      charisma: 17,
    },
    image: { src: "/people/placeholder-25.jpg", alt: "井上翼" },
    bioShort:
      "教育の民主化を目指し、オンライン学習プラットフォームを展開。元教師という経歴を活かし、教育業界に革新を起こす。",
    editorial:
      "教育への情熱と、ビジネスセンスを併せ持つ井上氏。親しみやすい笑顔と知的な雰囲気で、投資家からも教育関係者からも信頼を集める。",
    createdAt: "2025-12-22T10:00:00Z",
    weeklyPick: false,
  },
  {
    id: "26",
    slug: "eiji-mizuno",
    nameJa: "水野英二",
    categorySlug: "actor",
    title: "アクション俳優",
    tags: ["ワイルド", "たくましい", "セクシー"],
    scoreTotal: 89,
    scores: {
      cleanliness: 17,
      facial: 18,
      vibe: 18,
      fashion: 18,
      charisma: 18,
    },
    image: { src: "/people/placeholder-26.jpg", alt: "水野英二" },
    bioShort:
      "アクション映画を中心に活躍。本格的なスタントもこなす身体能力と、存在感のあるルックスで国際的にも注目される。",
    editorial:
      "日本のアクション映画界を牽引する水野氏。鍛え抜かれた肉体と、男性的な魅力が光る。",
    createdAt: "2025-12-21T10:00:00Z",
    weeklyPick: false,
  },
  {
    id: "27",
    slug: "yuto-sakamoto",
    nameJa: "坂本悠斗",
    categorySlug: "athlete",
    title: "プロバスケットボール選手",
    tags: ["アクティブ", "爽やか", "スポーティ"],
    scoreTotal: 87,
    scores: {
      cleanliness: 18,
      facial: 17,
      vibe: 18,
      fashion: 17,
      charisma: 17,
    },
    image: { src: "/people/placeholder-27.jpg", alt: "坂本悠斗" },
    bioShort:
      "190cmの長身を活かしたプレーで、リーグを代表するポイントガード。コート内外での影響力も大きい。",
    editorial:
      "バスケットボール界で確かな実力を持つ坂本選手。長身ながら均整の取れた体型と、爽やかな笑顔が魅力。",
    createdAt: "2025-12-20T10:00:00Z",
    weeklyPick: false,
  },
  {
    id: "28",
    slug: "seiya-ueda",
    nameJa: "上田誠也",
    categorySlug: "model",
    title: "ライフスタイルモデル",
    tags: ["大人系", "エレガント", "知的"],
    scoreTotal: 85,
    scores: {
      cleanliness: 18,
      facial: 17,
      vibe: 17,
      fashion: 17,
      charisma: 16,
    },
    image: { src: "/people/placeholder-28.jpg", alt: "上田誠也" },
    bioShort:
      "ライフスタイル誌を中心に活躍。30代の理想的なライフスタイルを体現し、ファッションからインテリアまで幅広く提案。",
    editorial:
      "大人の男性のロールモデルとして支持される上田氏。洗練されたファッションセンスと、知的な雰囲気が特徴。",
    createdAt: "2025-12-19T10:00:00Z",
    weeklyPick: false,
  },
  {
    id: "29",
    slug: "naoki-hasegawa",
    nameJa: "長谷川直樹",
    categorySlug: "youtuber",
    title: "テック系YouTuber",
    tags: ["知的", "クール", "ミニマル"],
    scoreTotal: 80,
    scores: {
      cleanliness: 17,
      facial: 16,
      vibe: 16,
      fashion: 15,
      charisma: 16,
    },
    image: { src: "/people/placeholder-29.jpg", alt: "長谷川直樹" },
    bioShort:
      "最新ガジェットやテクノロジーをレビュー。理系出身の知識と、わかりやすい解説で技術好きから支持される。",
    editorial:
      "テック系YouTuberとして確固たる地位を築く長谷川氏。知的な雰囲気と、シンプルなスタイリングが特徴。",
    createdAt: "2025-12-18T10:00:00Z",
    weeklyPick: false,
  },
  {
    id: "30",
    slug: "ryohei-aoki",
    nameJa: "青木良平",
    categorySlug: "musician",
    title: "R&Bシンガー",
    tags: ["セクシー", "大人系", "クール"],
    scoreTotal: 88,
    scores: {
      cleanliness: 18,
      facial: 18,
      vibe: 18,
      fashion: 17,
      charisma: 17,
    },
    image: { src: "/people/placeholder-30.jpg", alt: "青木良平" },
    bioShort:
      "都会的で洗練されたR&Bサウンドで人気を集める。甘い歌声と、セクシーなパフォーマンスで女性ファンを魅了。",
    editorial:
      "R&Bシーンで独自の存在感を放つ青木氏。都会的で洗練された雰囲気と、ステージ上でのセクシーなパフォーマンスが魅力。",
    createdAt: "2025-12-17T10:00:00Z",
    weeklyPick: false,
  },
];

export function getCategoryBySlug(slug) {
  return categories.find((c) => c.slug === slug);
}

export function getPeopleByCategory(categorySlug) {
  return people.filter((p) => p.categorySlug === categorySlug);
}

export function getPersonBySlug(slug) {
  return people.find((p) => p.slug === slug);
}

export function getRelatedPeople(person, limit = 4) {
  return people
    .filter(
      (p) =>
        p.id !== person.id &&
        p.categorySlug === person.categorySlug &&
        p.tags.some((tag) => person.tags.includes(tag)),
    )
    .slice(0, limit);
}

export function getTopInCategory(categorySlug, limit = 5) {
  return people
    .filter((p) => p.categorySlug === categorySlug)
    .sort((a, b) => b.scoreTotal - a.scoreTotal)
    .slice(0, limit);
}

export function getTagsByCategory(categorySlug) {
  const tagSet = new Set();
  people
    .filter((p) => p.categorySlug === categorySlug)
    .forEach((p) => p.tags.forEach((tag) => tagSet.add(tag)));
  return Array.from(tagSet);
}
