import { Person, SortOption, TagOption } from '@/data/types';

export const sortPeople = (people: Person[], sortBy: SortOption, votes: Record<string, number> = {}): Person[] => {
  const sorted = [...people];
  
  switch (sortBy) {
    case 'total':
      // Combined score: base score + vote bonus
      return sorted.sort((a, b) => {
        const aScore = a.scoreTotal + (votes[a.id] || 0) * 0.1;
        const bScore = b.scoreTotal + (votes[b.id] || 0) * 0.1;
        return bScore - aScore;
      });
    case 'popular':
      // Sort by votes
      return sorted.sort((a, b) => (votes[b.id] || 0) - (votes[a.id] || 0));
    case 'newest':
      return sorted.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    case 'score':
      return sorted.sort((a, b) => b.scoreTotal - a.scoreTotal);
    default:
      return sorted;
  }
};

export const filterByTags = (people: Person[], tags: TagOption[]): Person[] => {
  if (tags.length === 0) return people;
  return people.filter(person => 
    tags.some(tag => person.tags.includes(tag))
  );
};

export const filterByAgeRange = (people: Person[], ageRange?: [number, number]): Person[] => {
  // For MVP, we don't have age data, so this is a placeholder
  return people;
};

export const applyFiltersAndSort = (
  people: Person[],
  sortBy: SortOption,
  tags: TagOption[],
  votes: Record<string, number> = {}
): Person[] => {
  const filtered = filterByTags(people, tags);
  return sortPeople(filtered, sortBy, votes);
};
