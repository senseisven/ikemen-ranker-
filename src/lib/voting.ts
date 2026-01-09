const VOTES_KEY = 'ikemen_votes';
const VOTED_KEY = 'ikemen_voted';

export const getVotes = (): Record<string, number> => {
  if (typeof window === 'undefined') return {};
  try {
    const stored = localStorage.getItem(VOTES_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
};

export const getVotedPersons = (): Record<string, boolean> => {
  if (typeof window === 'undefined') return {};
  try {
    const stored = localStorage.getItem(VOTED_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
};

export const hasVoted = (personId: string): boolean => {
  const voted = getVotedPersons();
  return !!voted[personId];
};

export const vote = (personId: string): boolean => {
  if (hasVoted(personId)) return false;
  
  try {
    const votes = getVotes();
    votes[personId] = (votes[personId] || 0) + 1;
    localStorage.setItem(VOTES_KEY, JSON.stringify(votes));
    
    const voted = getVotedPersons();
    voted[personId] = true;
    localStorage.setItem(VOTED_KEY, JSON.stringify(voted));
    
    return true;
  } catch {
    return false;
  }
};

export const getVoteCount = (personId: string): number => {
  const votes = getVotes();
  return votes[personId] || 0;
};
