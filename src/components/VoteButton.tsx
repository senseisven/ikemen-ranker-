'use client';

import { useState, useEffect } from 'react';
import { vote, hasVoted, getVoteCount } from '@/lib/voting';
import { useToast } from '@/hooks/use-toast';

interface VoteButtonProps {
  personId: string;
  personName: string;
}

const VoteButton = ({ personId, personName }: VoteButtonProps) => {
  const { toast } = useToast();
  const [voted, setVoted] = useState(false);
  const [count, setCount] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setVoted(hasVoted(personId));
    setCount(getVoteCount(personId));
  }, [personId]);

  const handleVote = () => {
    if (voted) {
      toast({
        title: '投票済み',
        description: 'この人物にはすでに投票しています',
      });
      return;
    }

    const success = vote(personId);
    if (success) {
      setVoted(true);
      setCount((prev) => prev + 1);
      toast({
        title: '投票しました',
        description: `${personName}に投票しました`,
      });
    }
  };

  if (!mounted) {
    return (
      <button
        disabled
        className="inline-flex items-center gap-2 px-4 py-2 border border-border bg-secondary text-muted-foreground text-sm"
      >
        <span>投票する</span>
      </button>
    );
  }

  return (
    <button
      onClick={handleVote}
      disabled={voted}
      className={`inline-flex items-center gap-2 px-4 py-2 border text-sm transition-colors ${
        voted
          ? 'border-border bg-secondary text-muted-foreground cursor-not-allowed'
          : 'border-foreground bg-foreground text-background hover:bg-foreground/90'
      }`}
    >
      <span>{voted ? '投票済み' : '投票する'}</span>
      {count > 0 && (
        <span className="font-mono text-xs tabular-nums">
          {count}
        </span>
      )}
    </button>
  );
};

export default VoteButton;
