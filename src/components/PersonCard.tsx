import { Link } from 'react-router-dom';
import { Person } from '@/data/types';
import ScoreBadge from './ScoreBadge';

interface PersonCardProps {
  person: Person;
  showRank?: number;
}

const PersonCard = ({ person, showRank }: PersonCardProps) => {
  return (
    <Link
      to={`/p/${person.slug}`}
      className="group block card-editorial overflow-hidden transition-all hover:border-foreground/20"
    >
      <div className="aspect-[4/5] bg-secondary relative overflow-hidden">
        <img
          src={person.image.src}
          alt={person.image.alt}
          className="w-full h-full object-cover"
        />
        {showRank && (
          <div className="absolute top-2 left-2 w-6 h-6 bg-foreground text-background flex items-center justify-center text-xs font-mono">
            {showRank}
          </div>
        )}
      </div>
      <div className="p-3">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-heading font-medium text-foreground group-hover:text-primary transition-colors text-sm">
            {person.nameJa}
          </h3>
          <ScoreBadge score={person.scoreTotal} size="sm" />
        </div>
        <p className="text-xs text-muted-foreground truncate">
          {person.title}
        </p>
      </div>
    </Link>
  );
};

export default PersonCard;
