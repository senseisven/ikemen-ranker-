import { Person } from './types';

export const people: Person[] = [
  // スタートアップ
  {
    id: 'st-001',
    slug: 'takeshi-yamamoto',
    nameJa: '山本 健',
    nameKana: 'やまもと たけし',
    categorySlug: 'startup',
    title: 'AIスタートアップ CEO',
    tags: ['知的', 'クール'],
    scoreTotal: 87,
    scores: { cleanliness: 18, facial: 17, vibe: 18, fashion: 16, charisma: 18 },
    image: { src: '/placeholder.svg', alt: '山本 健' },
    bioShort: 'MIT卒業後、AIスタートアップを創業。30歳で累計100億円の資金調達に成功した若手経営者。',
    editorial: '山本氏の魅力は、知性と野心が同居する独特の存在感にある。プレゼンテーション時の落ち着いた語り口と、時折見せる情熱的な表情のギャップが印象的。シンプルながら上質なファッションセンスも、経営者としての審美眼を感じさせる。',
    links: { x: 'https://x.com', official: 'https://example.com' },
    createdAt: '2024-01-15',
    weeklyPick: true
  },
  {
    id: 'st-002',
    slug: 'ryota-suzuki',
    nameJa: '鈴木 涼太',
    nameKana: 'すずき りょうた',
    categorySlug: 'startup',
    title: 'フィンテック企業 創業者',
    tags: ['爽やか', '知的'],
    scoreTotal: 82,
    scores: { cleanliness: 17, facial: 16, vibe: 17, fashion: 15, charisma: 17 },
    image: { src: '/placeholder.svg', alt: '鈴木 涼太' },
    bioShort: '決済プラットフォームを開発するフィンテック企業を28歳で創業。Forbes 30 Under 30 Asia選出。',
    editorial: '爽やかな笑顔と堅実な経営手腕を併せ持つ鈴木氏。カジュアルな装いでもどこか品の良さが漂う。業界カンファレンスでの登壇姿は、多くの起業家志望者の憧れとなっている。',
    links: { x: 'https://x.com', instagram: 'https://instagram.com' },
    createdAt: '2024-02-01',
    weeklyPick: false
  },
  {
    id: 'st-003',
    slug: 'kenji-tanaka',
    nameJa: '田中 賢二',
    categorySlug: 'startup',
    title: 'SaaS企業 代表取締役',
    tags: ['大人系', '知的'],
    scoreTotal: 79,
    scores: { cleanliness: 16, facial: 15, vibe: 16, fashion: 16, charisma: 16 },
    image: { src: '/placeholder.svg', alt: '田中 賢二' },
    bioShort: 'エンタープライズ向けSaaSを展開。東証グロース上場を果たした敏腕経営者。',
    editorial: '落ち着いた佇まいと確かな実績。田中氏は「大人のイケメン」の代名詞的存在。経営者としての重厚感と、インタビュー時に見せる茶目っ気のバランスが魅力。',
    createdAt: '2024-02-10',
    weeklyPick: false
  },
  {
    id: 'st-004',
    slug: 'yuki-watanabe',
    nameJa: '渡辺 悠希',
    categorySlug: 'startup',
    title: 'D2Cブランド 創業者',
    tags: ['ナチュラル', '爽やか'],
    scoreTotal: 81,
    scores: { cleanliness: 17, facial: 16, vibe: 16, fashion: 17, charisma: 15 },
    image: { src: '/placeholder.svg', alt: '渡辺 悠希' },
    bioShort: 'サステナブルファッションD2Cブランドを創業。環境意識と美意識を両立させた新世代の起業家。',
    editorial: 'ナチュラルな雰囲気と確かなファッションセンスが魅力の渡辺氏。自身のブランドの世界観を体現するかのような装いは、多くのファンを惹きつける。',
    links: { instagram: 'https://instagram.com' },
    createdAt: '2024-03-01',
    weeklyPick: false
  },
  {
    id: 'st-005',
    slug: 'shota-kimura',
    nameJa: '木村 翔太',
    categorySlug: 'startup',
    title: 'ヘルステック CEO',
    tags: ['クール', '知的'],
    scoreTotal: 78,
    scores: { cleanliness: 16, facial: 15, vibe: 16, fashion: 15, charisma: 16 },
    image: { src: '/placeholder.svg', alt: '木村 翔太' },
    bioShort: '医療×AIのヘルステックスタートアップを率いる。元医師という異色の経歴を持つ経営者。',
    editorial: '知的な眼差しとクールな佇まい。木村氏は医療現場の経験を活かし、テクノロジーで医療を変革しようとしている。その真摯な姿勢が、静かな魅力を放つ。',
    createdAt: '2024-03-15',
    weeklyPick: false
  },

  // 俳優
  {
    id: 'ac-001',
    slug: 'haruki-sato',
    nameJa: '佐藤 春樹',
    nameKana: 'さとう はるき',
    categorySlug: 'actor',
    title: '映画俳優',
    tags: ['ワイルド', '大人系'],
    scoreTotal: 91,
    scores: { cleanliness: 18, facial: 19, vibe: 18, fashion: 18, charisma: 18 },
    image: { src: '/placeholder.svg', alt: '佐藤 春樹' },
    bioShort: '日本アカデミー賞最優秀主演男優賞受賞。国内外の映画祭で高い評価を受ける演技派俳優。',
    editorial: '佐藤氏の魅力は、一見ワイルドに見えながらも繊細さを併せ持つその存在感にある。役によって全く異なる表情を見せるカメレオン俳優としての実力は、イケメン度をさらに高めている。',
    links: { instagram: 'https://instagram.com', official: 'https://example.com' },
    createdAt: '2024-01-10',
    weeklyPick: true
  },
  {
    id: 'ac-002',
    slug: 'ren-takahashi',
    nameJa: '高橋 蓮',
    nameKana: 'たかはし れん',
    categorySlug: 'actor',
    title: '俳優・モデル',
    tags: ['爽やか', 'クール'],
    scoreTotal: 88,
    scores: { cleanliness: 18, facial: 18, vibe: 17, fashion: 18, charisma: 17 },
    image: { src: '/placeholder.svg', alt: '高橋 蓮' },
    bioShort: 'ドラマを中心に活躍する若手俳優。モデル出身ならではのスタイルと端正な顔立ちが特徴。',
    editorial: '清潔感と爽やかさを兼ね備えた高橋氏。その端正な顔立ちは「正統派イケメン」と評される。一方で、コメディ作品での意外な一面も人気の秘密。',
    links: { x: 'https://x.com', instagram: 'https://instagram.com' },
    createdAt: '2024-01-20',
    weeklyPick: false
  },
  {
    id: 'ac-003',
    slug: 'kaito-ito',
    nameJa: '伊藤 海斗',
    categorySlug: 'actor',
    title: '舞台俳優',
    tags: ['知的', '大人系'],
    scoreTotal: 84,
    scores: { cleanliness: 17, facial: 16, vibe: 17, fashion: 17, charisma: 17 },
    image: { src: '/placeholder.svg', alt: '伊藤 海斗' },
    bioShort: '舞台を中心に活動。シェイクスピア作品での評価が高く、演劇界の実力派として知られる。',
    editorial: '知的で深みのある演技が魅力の伊藤氏。舞台での存在感はスクリーンでも健在。大人の色気と品格を兼ね備えた稀有な俳優。',
    createdAt: '2024-02-05',
    weeklyPick: false
  },
  {
    id: 'ac-004',
    slug: 'sota-nakamura',
    nameJa: '中村 颯太',
    categorySlug: 'actor',
    title: '若手俳優',
    tags: ['爽やか', 'ナチュラル'],
    scoreTotal: 83,
    scores: { cleanliness: 17, facial: 17, vibe: 16, fashion: 16, charisma: 17 },
    image: { src: '/placeholder.svg', alt: '中村 颯太' },
    bioShort: '注目の若手俳優。青春映画での瑞々しい演技が話題を呼び、新人賞を多数受賞。',
    editorial: 'ナチュラルな演技と飾らない人柄が魅力の中村氏。カメラの前でも自然体を貫くその姿勢が、多くのファンを惹きつけている。',
    links: { instagram: 'https://instagram.com' },
    createdAt: '2024-03-01',
    weeklyPick: false
  },
  {
    id: 'ac-005',
    slug: 'tsubasa-kato',
    nameJa: '加藤 翼',
    categorySlug: 'actor',
    title: '俳優',
    tags: ['クール', 'ワイルド'],
    scoreTotal: 86,
    scores: { cleanliness: 17, facial: 18, vibe: 17, fashion: 17, charisma: 17 },
    image: { src: '/placeholder.svg', alt: '加藤 翼' },
    bioShort: 'アクション映画を中心に活躍。自らスタントをこなす身体能力の高さも魅力の一つ。',
    editorial: 'クールな外見とワイルドなアクションのギャップが魅力の加藤氏。私服でもブレない独自のスタイルを持ち、ファッションアイコンとしても注目される。',
    createdAt: '2024-02-20',
    weeklyPick: true
  },

  // アスリート
  {
    id: 'at-001',
    slug: 'daiki-honda',
    nameJa: '本田 大輝',
    nameKana: 'ほんだ だいき',
    categorySlug: 'athlete',
    title: 'サッカー選手',
    tags: ['爽やか', 'ワイルド'],
    scoreTotal: 89,
    scores: { cleanliness: 18, facial: 18, vibe: 18, fashion: 17, charisma: 18 },
    image: { src: '/placeholder.svg', alt: '本田 大輝' },
    bioShort: 'Jリーグを代表するストライカー。ヨーロッパリーグでの活躍経験も持つ日本代表選手。',
    editorial: 'ピッチ上での闘志溢れる表情と、インタビュー時の爽やかな笑顔のギャップが魅力。鍛え上げられた肉体と端正な顔立ちは、スポーツ界屈指のイケメンとして評価が高い。',
    links: { x: 'https://x.com', instagram: 'https://instagram.com' },
    createdAt: '2024-01-05',
    weeklyPick: true
  },
  {
    id: 'at-002',
    slug: 'yuto-shimizu',
    nameJa: '清水 悠人',
    categorySlug: 'athlete',
    title: 'バスケットボール選手',
    tags: ['クール', '大人系'],
    scoreTotal: 85,
    scores: { cleanliness: 17, facial: 17, vibe: 17, fashion: 17, charisma: 17 },
    image: { src: '/placeholder.svg', alt: '清水 悠人' },
    bioShort: 'Bリーグのスター選手。190cmを超える長身とクールなルックスで人気を集める。',
    editorial: '長身でクールな清水選手。コート上での冷静なプレーと、勝利後に見せる笑顔のコントラストが印象的。モデル並みのスタイルも魅力のひとつ。',
    links: { instagram: 'https://instagram.com' },
    createdAt: '2024-02-01',
    weeklyPick: false
  },
  {
    id: 'at-003',
    slug: 'kenta-aoki',
    nameJa: '青木 健太',
    categorySlug: 'athlete',
    title: '野球選手',
    tags: ['爽やか', 'ナチュラル'],
    scoreTotal: 82,
    scores: { cleanliness: 17, facial: 16, vibe: 16, fashion: 16, charisma: 17 },
    image: { src: '/placeholder.svg', alt: '青木 健太' },
    bioShort: 'プロ野球の若手エース。甲子園での活躍から注目を集め、プロ入り後も順調に成長中。',
    editorial: '爽やかな笑顔とひたむきなプレーが魅力の青木選手。ファンサービスの良さでも知られ、老若男女問わず人気が高い。',
    createdAt: '2024-02-15',
    weeklyPick: false
  },
  {
    id: 'at-004',
    slug: 'riku-yamada',
    nameJa: '山田 陸',
    categorySlug: 'athlete',
    title: '陸上選手',
    tags: ['ナチュラル', '知的'],
    scoreTotal: 80,
    scores: { cleanliness: 16, facial: 16, vibe: 16, fashion: 16, charisma: 16 },
    image: { src: '/placeholder.svg', alt: '山田 陸' },
    bioShort: '短距離走の日本記録保持者。オリンピックでのメダル獲得が期待される期待の星。',
    editorial: '均整の取れた体型と知的な雰囲気が魅力の山田選手。競技に対する真摯な姿勢と、メディア対応の丁寧さが好感度を高めている。',
    links: { x: 'https://x.com' },
    createdAt: '2024-03-01',
    weeklyPick: false
  },
  {
    id: 'at-005',
    slug: 'shun-mori',
    nameJa: '森 駿',
    categorySlug: 'athlete',
    title: 'フィギュアスケート選手',
    tags: ['クール', '知的'],
    scoreTotal: 88,
    scores: { cleanliness: 18, facial: 18, vibe: 17, fashion: 17, charisma: 18 },
    image: { src: '/placeholder.svg', alt: '森 駿' },
    bioShort: '世界選手権メダリスト。芸術性の高い演技と端正なルックスで国際的な人気を誇る。',
    editorial: '氷上での優雅な演技と、オフアイスでの知的な佇まいが魅力の森選手。日本のみならず海外にもファンが多く、SNSのフォロワー数はアスリートとして国内トップクラス。',
    links: { x: 'https://x.com', instagram: 'https://instagram.com', official: 'https://example.com' },
    createdAt: '2024-01-25',
    weeklyPick: false
  },

  // モデル
  {
    id: 'md-001',
    slug: 'naoki-fujita',
    nameJa: '藤田 直樹',
    nameKana: 'ふじた なおき',
    categorySlug: 'model',
    title: 'ファッションモデル',
    tags: ['クール', '大人系'],
    scoreTotal: 92,
    scores: { cleanliness: 19, facial: 19, vibe: 18, fashion: 19, charisma: 17 },
    image: { src: '/placeholder.svg', alt: '藤田 直樹' },
    bioShort: 'パリコレにも出演するトップモデル。ハイブランドの広告を多数担当する業界の顔。',
    editorial: '完璧なプロポーションとクールな表情が魅力の藤田氏。ランウェイでの存在感は圧倒的で、「服が映える」モデルとしてデザイナーからの信頼も厚い。',
    links: { instagram: 'https://instagram.com', official: 'https://example.com' },
    createdAt: '2024-01-08',
    weeklyPick: true
  },
  {
    id: 'md-002',
    slug: 'hikaru-ogawa',
    nameJa: '小川 光',
    categorySlug: 'model',
    title: 'モデル・俳優',
    tags: ['爽やか', 'ナチュラル'],
    scoreTotal: 86,
    scores: { cleanliness: 18, facial: 17, vibe: 17, fashion: 17, charisma: 17 },
    image: { src: '/placeholder.svg', alt: '小川 光' },
    bioShort: 'ファッション誌のレギュラーモデルから俳優業にも進出。自然体の魅力で幅広い層に人気。',
    editorial: '作り込まないナチュラルな魅力が持ち味の小川氏。カメラの前でもリラックスした表情を見せる姿勢が、見る者を惹きつける。',
    links: { instagram: 'https://instagram.com' },
    createdAt: '2024-02-10',
    weeklyPick: false
  },
  {
    id: 'md-003',
    slug: 'takumi-sakamoto',
    nameJa: '坂本 匠',
    categorySlug: 'model',
    title: 'メンズモデル',
    tags: ['ワイルド', '大人系'],
    scoreTotal: 84,
    scores: { cleanliness: 17, facial: 17, vibe: 17, fashion: 17, charisma: 16 },
    image: { src: '/placeholder.svg', alt: '坂本 匠' },
    bioShort: 'アウトドアブランドを中心に活躍するモデル。鍛え上げられた肉体美が売り。',
    editorial: 'ワイルドな魅力と大人の色気を併せ持つ坂本氏。アウトドアシーンでの撮影では、その逞しさが一層際立つ。',
    createdAt: '2024-02-20',
    weeklyPick: false
  },
  {
    id: 'md-004',
    slug: 'yuma-hayashi',
    nameJa: '林 悠真',
    categorySlug: 'model',
    title: 'モデル',
    tags: ['クール', '知的'],
    scoreTotal: 83,
    scores: { cleanliness: 17, facial: 17, vibe: 16, fashion: 17, charisma: 16 },
    image: { src: '/placeholder.svg', alt: '林 悠真' },
    bioShort: 'モード系ファッションを得意とするモデル。独特の雰囲気で若い世代から支持を集める。',
    editorial: '知的でミステリアスな雰囲気が魅力の林氏。ファッションへの造詣も深く、スタイリングにも定評がある。',
    links: { instagram: 'https://instagram.com' },
    createdAt: '2024-03-05',
    weeklyPick: false
  },
  {
    id: 'md-005',
    slug: 'sora-nishida',
    nameJa: '西田 空',
    categorySlug: 'model',
    title: 'モデル',
    tags: ['爽やか', 'クール'],
    scoreTotal: 81,
    scores: { cleanliness: 17, facial: 16, vibe: 16, fashion: 16, charisma: 16 },
    image: { src: '/placeholder.svg', alt: '西田 空' },
    bioShort: '新進気鋭の若手モデル。透明感のある雰囲気と長い手足が特徴。',
    editorial: '爽やかさとクールさを併せ持つ西田氏。まだ若手ながら、将来性を感じさせる逸材として業界内での評価も高い。',
    createdAt: '2024-03-10',
    weeklyPick: false
  },

  // YouTuber
  {
    id: 'yt-001',
    slug: 'kohei-ando',
    nameJa: '安藤 航平',
    nameKana: 'あんどう こうへい',
    categorySlug: 'youtuber',
    title: 'YouTuber・実業家',
    tags: ['知的', '大人系'],
    scoreTotal: 83,
    scores: { cleanliness: 17, facial: 16, vibe: 17, fashion: 16, charisma: 17 },
    image: { src: '/placeholder.svg', alt: '安藤 航平' },
    bioShort: 'ビジネス系YouTuberとして登録者100万人を突破。わかりやすい解説と落ち着いた語り口が人気。',
    editorial: '知的でありながら親しみやすい安藤氏。ビジネスの複雑な話題を噛み砕いて説明する手腕は、視聴者から高い信頼を得ている。',
    links: { x: 'https://x.com', instagram: 'https://instagram.com' },
    createdAt: '2024-01-20',
    weeklyPick: false
  },
  {
    id: 'yt-002',
    slug: 'ryusei-matsuda',
    nameJa: '松田 流星',
    categorySlug: 'youtuber',
    title: 'ゲーム実況者',
    tags: ['爽やか', 'ナチュラル'],
    scoreTotal: 79,
    scores: { cleanliness: 16, facial: 16, vibe: 16, fashion: 15, charisma: 16 },
    image: { src: '/placeholder.svg', alt: '松田 流星' },
    bioShort: '人気ゲーム実況者。爽やかなトークと的確なプレイで幅広い年齢層に支持される。',
    editorial: 'ゲーム実況界の爽やかイケメンとして知られる松田氏。視聴者とのコミュニケーションを大切にする姿勢が、長年のファンを生んでいる。',
    links: { x: 'https://x.com' },
    createdAt: '2024-02-05',
    weeklyPick: false
  },
  {
    id: 'yt-003',
    slug: 'ken-ueda',
    nameJa: '上田 健',
    categorySlug: 'youtuber',
    title: 'YouTuber',
    tags: ['ワイルド', '爽やか'],
    scoreTotal: 81,
    scores: { cleanliness: 16, facial: 16, vibe: 17, fashion: 16, charisma: 16 },
    image: { src: '/placeholder.svg', alt: '上田 健' },
    bioShort: 'アウトドア系YouTuber。キャンプやサバイバル動画で人気を集める。',
    editorial: 'ワイルドな魅力と爽やかな人柄が同居する上田氏。過酷な環境でも崩れない笑顔が、視聴者の心を掴んでいる。',
    links: { instagram: 'https://instagram.com' },
    createdAt: '2024-02-20',
    weeklyPick: false
  },
  {
    id: 'yt-004',
    slug: 'taiga-inoue',
    nameJa: '井上 大河',
    categorySlug: 'youtuber',
    title: 'クリエイター',
    tags: ['クール', '知的'],
    scoreTotal: 80,
    scores: { cleanliness: 16, facial: 16, vibe: 16, fashion: 16, charisma: 16 },
    image: { src: '/placeholder.svg', alt: '井上 大河' },
    bioShort: 'テック系レビュアー。ガジェットへの深い知識と洗練された映像で人気。',
    editorial: 'クールで知的な井上氏。ガジェットを語る時の真剣な眼差しと、時折見せるユーモアのバランスが魅力。',
    links: { x: 'https://x.com', official: 'https://example.com' },
    createdAt: '2024-03-01',
    weeklyPick: false
  },
  {
    id: 'yt-005',
    slug: 'masato-okazaki',
    nameJa: '岡崎 雅人',
    categorySlug: 'youtuber',
    title: 'YouTuber・タレント',
    tags: ['爽やか', 'ナチュラル'],
    scoreTotal: 77,
    scores: { cleanliness: 16, facial: 15, vibe: 15, fashion: 15, charisma: 16 },
    image: { src: '/placeholder.svg', alt: '岡崎 雅人' },
    bioShort: 'バラエティ系YouTuber。テレビ出演も増え、マルチタレントとして活躍中。',
    editorial: '自然体で親しみやすい岡崎氏。視聴者目線のコンテンツ作りで、着実にファンを増やしている。',
    createdAt: '2024-03-10',
    weeklyPick: false
  },

  // ミュージシャン
  {
    id: 'mu-001',
    slug: 'itsuki-morimoto',
    nameJa: '森本 樹',
    nameKana: 'もりもと いつき',
    categorySlug: 'musician',
    title: 'シンガーソングライター',
    tags: ['ナチュラル', '知的'],
    scoreTotal: 85,
    scores: { cleanliness: 17, facial: 17, vibe: 17, fashion: 17, charisma: 17 },
    image: { src: '/placeholder.svg', alt: '森本 樹' },
    bioShort: '繊細な歌詞と心に響くメロディで人気のシンガーソングライター。ドラマ主題歌を多数担当。',
    editorial: 'ナチュラルで知的な雰囲気が魅力の森本氏。ステージ上での真摯なパフォーマンスと、曲に込められた深い思いが、多くのリスナーの心を捉えて離さない。',
    links: { x: 'https://x.com', instagram: 'https://instagram.com', official: 'https://example.com' },
    createdAt: '2024-01-12',
    weeklyPick: true
  },
  {
    id: 'mu-002',
    slug: 'kai-hashimoto',
    nameJa: '橋本 海',
    categorySlug: 'musician',
    title: 'ロックバンド ボーカル',
    tags: ['ワイルド', 'クール'],
    scoreTotal: 87,
    scores: { cleanliness: 17, facial: 18, vibe: 18, fashion: 17, charisma: 17 },
    image: { src: '/placeholder.svg', alt: '橋本 海' },
    bioShort: '人気ロックバンドのフロントマン。パワフルなライブパフォーマンスで観客を熱狂させる。',
    editorial: 'ワイルドな外見とクールなカリスマ性が魅力の橋本氏。ステージ上での存在感は圧倒的で、そのオーラに魅了されるファンは後を絶たない。',
    links: { x: 'https://x.com', instagram: 'https://instagram.com' },
    createdAt: '2024-01-25',
    weeklyPick: false
  },
  {
    id: 'mu-003',
    slug: 'shu-okamoto',
    nameJa: '岡本 柊',
    categorySlug: 'musician',
    title: 'ジャズピアニスト',
    tags: ['知的', '大人系'],
    scoreTotal: 82,
    scores: { cleanliness: 17, facial: 16, vibe: 17, fashion: 16, charisma: 16 },
    image: { src: '/placeholder.svg', alt: '岡本 柊' },
    bioShort: '若手ジャズピアニスト。国際コンクール入賞の実力派として注目を集める。',
    editorial: '知的で大人の魅力を持つ岡本氏。ピアノを奏でる姿は芸術そのもので、その繊細な表現力は見る者を魅了する。',
    links: { instagram: 'https://instagram.com', official: 'https://example.com' },
    createdAt: '2024-02-08',
    weeklyPick: false
  },
  {
    id: 'mu-004',
    slug: 'hayato-nagai',
    nameJa: '永井 隼人',
    categorySlug: 'musician',
    title: 'ヒップホップアーティスト',
    tags: ['クール', 'ワイルド'],
    scoreTotal: 80,
    scores: { cleanliness: 16, facial: 16, vibe: 16, fashion: 16, charisma: 16 },
    image: { src: '/placeholder.svg', alt: '永井 隼人' },
    bioShort: 'ヒップホップシーンで台頭する若手ラッパー。独自のフローとファッションセンスが話題。',
    editorial: 'クールでワイルドな永井氏。独自のスタイルを貫く姿勢と、リリックに込められたメッセージ性が、若い世代から支持を集めている。',
    links: { x: 'https://x.com', instagram: 'https://instagram.com' },
    createdAt: '2024-02-25',
    weeklyPick: false
  },
  {
    id: 'mu-005',
    slug: 'asahi-kuroda',
    nameJa: '黒田 朝陽',
    categorySlug: 'musician',
    title: 'アイドル・歌手',
    tags: ['爽やか', 'ナチュラル'],
    scoreTotal: 84,
    scores: { cleanliness: 17, facial: 17, vibe: 17, fashion: 16, charisma: 17 },
    image: { src: '/placeholder.svg', alt: '黒田 朝陽' },
    bioShort: '人気アイドルグループのセンター。ソロ活動も開始し、俳優としても活動の幅を広げる。',
    editorial: '爽やかで親しみやすい黒田氏。ファンへの感謝を忘れない姿勢と、パフォーマンスへの真摯な取り組みが、長年愛される理由。',
    links: { x: 'https://x.com', instagram: 'https://instagram.com', official: 'https://example.com' },
    createdAt: '2024-03-05',
    weeklyPick: false
  }
];

export const getPersonBySlug = (slug: string): Person | undefined => {
  return people.find(p => p.slug === slug);
};

export const getPeopleByCategory = (categorySlug: string): Person[] => {
  return people.filter(p => p.categorySlug === categorySlug);
};

export const getWeeklyPicks = (): Person[] => {
  return people.filter(p => p.weeklyPick).slice(0, 5);
};

export const getLatestPeople = (count: number = 10): Person[] => {
  return [...people]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, count);
};

export const getRelatedPeople = (person: Person, limit: number = 4): Person[] => {
  return people
    .filter(p => 
      p.id !== person.id && 
      (p.categorySlug === person.categorySlug || p.tags.some(t => person.tags.includes(t)))
    )
    .slice(0, limit);
};

export const getTopInCategory = (categorySlug: string, excludeId: string, limit: number = 3): Person[] => {
  return people
    .filter(p => p.categorySlug === categorySlug && p.id !== excludeId)
    .sort((a, b) => b.scoreTotal - a.scoreTotal)
    .slice(0, limit);
};
