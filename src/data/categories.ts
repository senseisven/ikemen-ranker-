import { Category } from './types';

export const categories: Category[] = [
  {
    id: 'startup',
    slug: 'startup',
    nameJa: 'スタートアップ',
    description: 'テクノロジー業界で活躍する起業家・経営者たち。ビジネスの世界で存在感を放つ次世代のリーダーを紹介。'
  },
  {
    id: 'actor',
    slug: 'actor',
    nameJa: '俳優',
    description: '映画、ドラマ、舞台で活躍する俳優陣。演技力と存在感で日本のエンターテインメントを牽引する男性俳優を特集。'
  },
  {
    id: 'athlete',
    slug: 'athlete',
    nameJa: 'アスリート',
    description: '各競技のトップで戦うアスリートたち。競技中の真剣な表情から普段の姿まで、スポーツ界のイケメンを紹介。'
  },
  {
    id: 'model',
    slug: 'model',
    nameJa: 'モデル',
    description: 'ファッション誌や広告で活躍するモデル。スタイルとルックスで業界を牽引するトップモデルたち。'
  },
  {
    id: 'youtuber',
    slug: 'youtuber',
    nameJa: 'YouTuber',
    description: '動画配信で人気を集めるクリエイター。エンタメから教育まで、多様なジャンルで活躍するYouTuberを紹介。'
  },
  {
    id: 'musician',
    slug: 'musician',
    nameJa: 'ミュージシャン',
    description: '音楽シーンで活躍するアーティスト。バンドマンからソロシンガーまで、音楽界のイケメンを特集。'
  }
];

export const getCategoryBySlug = (slug: string): Category | undefined => {
  return categories.find(c => c.slug === slug);
};
