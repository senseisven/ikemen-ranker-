export interface Category {
  id: string;
  slug: string;
  nameJa: string;
  description: string;
}

export interface PersonScores {
  cleanliness: number; // 清潔感 0-20
  facial: number;      // 顔立ち 0-20
  vibe: number;        // 雰囲気 0-20
  fashion: number;     // ファッション 0-20
  charisma: number;    // カリスマ 0-20
}

export interface PersonLinks {
  x?: string;
  instagram?: string;
  wikipedia?: string;
  official?: string;
}

export interface Person {
  id: string;
  slug: string;
  nameJa: string;
  nameKana?: string;
  categorySlug: string;
  title: string;
  tags: string[];
  scoreTotal: number;
  scores: PersonScores;
  image: {
    src: string;
    alt: string;
  };
  bioShort: string;
  editorial: string;
  links?: PersonLinks;
  createdAt: string;
  weeklyPick: boolean;
}

export type SortOption = 'total' | 'popular' | 'newest' | 'score';

export type TagOption = '爽やか' | 'ワイルド' | '知的' | '大人系' | 'クール' | 'ナチュラル';
