import { Link } from 'react-router-dom';
import { Category } from '@/data/types';

interface CategoryCardProps {
  category: Category;
  count?: number;
}

const CategoryCard = ({ category, count }: CategoryCardProps) => {
  return (
    <Link
      to={`/c/${category.slug}`}
      className="group block card-editorial p-5 transition-all hover:border-foreground/20"
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-heading font-bold text-foreground group-hover:text-primary transition-colors">
          {category.nameJa}
        </h3>
        {count !== undefined && (
          <span className="text-xs text-muted-foreground tabular-nums">
            {count}名
          </span>
        )}
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
        {category.description}
      </p>
    </Link>
  );
};

export default CategoryCard;
