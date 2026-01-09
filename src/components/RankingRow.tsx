import { Link } from 'react-router-dom';
import { Person } from '@/data/types';
import ScoreBadge from './ScoreBadge';
import TagChips from './TagChips';

interface RankingRowProps {
  person: Person;
  rank: number;
  onOpenScoreModal?: (person: Person) => void;
}

const RankingRow = ({ person, rank, onOpenScoreModal }: RankingRowProps) => {
  return (
    <div className="flex items-center gap-4 py-4 border-b border-border last:border-b-0">
      <div className="w-8 text-center">
        <span className={`font-mono text-sm tabular-nums ${
          rank <= 3 ? 'font-bold text-foreground' : 'text-muted-foreground'
        }`}>
          {rank}
        </span>
      </div>
      
      <div className="w-14 h-14 bg-secondary flex-shrink-0 overflow-hidden">
        <img
          src={person.image.src}
          alt={person.image.alt}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="flex-1 min-w-0">
        <Link
          to={`/p/${person.slug}`}
          className="font-heading font-medium text-foreground hover:text-primary transition-colors"
        >
          {person.nameJa}
        </Link>
        <p className="text-sm text-muted-foreground truncate">
          {person.title}
        </p>
        <div className="mt-1.5 hidden sm:block">
          <TagChips tags={person.tags} />
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="text-right">
          <ScoreBadge score={person.scoreTotal} />
          {onOpenScoreModal && (
            <button
              onClick={() => onOpenScoreModal(person)}
              className="block text-xs text-muted-foreground hover:text-foreground mt-1 transition-colors"
            >
              詳細
            </button>
          )}
        </div>
        
        <Link
          to={`/p/${person.slug}`}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden md:block"
        >
          詳細
        </Link>
      </div>
    </div>
  );
};

export default RankingRow;
