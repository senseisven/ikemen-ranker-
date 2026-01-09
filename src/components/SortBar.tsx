import { SortOption } from '@/data/types';

interface SortBarProps {
  currentSort: SortOption;
  onSortChange: (sort: SortOption) => void;
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'total', label: '総合' },
  { value: 'popular', label: '人気' },
  { value: 'newest', label: '新着' },
  { value: 'score', label: 'スコア順' },
];

const SortBar = ({ currentSort, onSortChange }: SortBarProps) => {
  return (
    <div className="flex items-center gap-1 border-b border-border">
      {sortOptions.map((option) => (
        <button
          key={option.value}
          onClick={() => onSortChange(option.value)}
          className={`px-3 py-2 text-sm transition-colors border-b-2 -mb-px ${
            currentSort === option.value
              ? 'border-foreground text-foreground'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default SortBar;
