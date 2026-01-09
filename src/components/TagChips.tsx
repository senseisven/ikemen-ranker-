import { TagOption } from '@/data/types';

interface TagChipsProps {
  tags: string[];
  selectedTags?: TagOption[];
  onTagClick?: (tag: TagOption) => void;
  interactive?: boolean;
}

const TagChips = ({ tags, selectedTags = [], onTagClick, interactive = false }: TagChipsProps) => {
  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.map((tag) => {
        const isSelected = selectedTags.includes(tag as TagOption);
        
        if (interactive && onTagClick) {
          return (
            <button
              key={tag}
              onClick={() => onTagClick(tag as TagOption)}
              className={`text-xs px-2 py-0.5 border transition-colors ${
                isSelected
                  ? 'bg-foreground text-background border-foreground'
                  : 'bg-tag-bg text-tag-text border-tag-border hover:border-foreground/30'
              }`}
            >
              {tag}
            </button>
          );
        }
        
        return (
          <span
            key={tag}
            className="text-xs px-2 py-0.5 bg-tag-bg text-tag-text border border-tag-border"
          >
            {tag}
          </span>
        );
      })}
    </div>
  );
};

export default TagChips;
