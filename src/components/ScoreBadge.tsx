interface ScoreBadgeProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
}

const ScoreBadge = ({ score, size = 'md' }: ScoreBadgeProps) => {
  const sizeClasses = {
    sm: 'text-xs px-1.5 py-0.5',
    md: 'text-sm px-2 py-1',
    lg: 'text-base px-3 py-1.5',
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'bg-primary text-primary-foreground';
    if (score >= 70) return 'bg-secondary text-secondary-foreground';
    return 'bg-muted text-muted-foreground';
  };

  return (
    <span className={`inline-block font-mono tabular-nums ${sizeClasses[size]} ${getScoreColor(score)}`}>
      {score}
    </span>
  );
};

export default ScoreBadge;
