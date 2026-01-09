'use client';

import { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCategoryBySlug } from '@/data/categories';
import { getPeopleByCategory } from '@/data/people';
import { Person, SortOption, TagOption } from '@/data/types';
import { applyFiltersAndSort } from '@/lib/sorting';
import { getVotes } from '@/lib/voting';
import RankingRow from '@/components/RankingRow';
import SortBar from '@/components/SortBar';
import TagChips from '@/components/TagChips';
import ScoreBreakdownModal from '@/components/ScoreBreakdownModal';

const allTags: TagOption[] = ['爽やか', 'ワイルド', '知的', '大人系', 'クール', 'ナチュラル'];

const CategoryPage = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const category = getCategoryBySlug(categorySlug || '');
  const allPeople = getPeopleByCategory(categorySlug || '');

  const [sortBy, setSortBy] = useState<SortOption>('total');
  const [selectedTags, setSelectedTags] = useState<TagOption[]>([]);
  const [votes, setVotes] = useState<Record<string, number>>({});
  const [modalPerson, setModalPerson] = useState<Person | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  
  const itemsPerPage = 10;

  useEffect(() => {
    setVotes(getVotes());
  }, []);

  const filteredPeople = useMemo(() => {
    return applyFiltersAndSort(allPeople, sortBy, selectedTags, votes);
  }, [allPeople, sortBy, selectedTags, votes]);

  const paginatedPeople = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredPeople.slice(start, start + itemsPerPage);
  }, [filteredPeople, currentPage]);

  const totalPages = Math.ceil(filteredPeople.length / itemsPerPage);

  const handleTagClick = (tag: TagOption) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
    setCurrentPage(1);
  };

  if (!category) {
    return (
      <div className="container-editorial py-20 text-center">
        <h1 className="text-xl font-heading font-bold text-foreground mb-4">
          カテゴリーが見つかりません
        </h1>
        <Link to="/" className="text-primary hover:underline">
          トップへ戻る
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="border-b border-border">
        <div className="container-editorial py-10">
          <nav className="text-sm text-muted-foreground mb-4">
            <Link to="/" className="hover:text-foreground transition-colors">
              トップ
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{category.nameJa}</span>
          </nav>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">
            {category.nameJa}
          </h1>
          <p className="mt-2 text-muted-foreground max-w-2xl">
            {category.description}
          </p>
        </div>
      </section>

      {/* Filters and Ranking */}
      <section className="section-spacing">
        <div className="container-editorial">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <aside className="lg:w-48 flex-shrink-0">
              <div className="lg:sticky lg:top-4">
                <h3 className="text-sm font-medium text-foreground mb-3">
                  タグで絞り込み
                </h3>
                <TagChips
                  tags={allTags}
                  selectedTags={selectedTags}
                  onTagClick={handleTagClick}
                  interactive
                />
                {selectedTags.length > 0 && (
                  <button
                    onClick={() => {
                      setSelectedTags([]);
                      setCurrentPage(1);
                    }}
                    className="mt-3 text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    クリア
                  </button>
                )}
              </div>
            </aside>

            {/* Main content */}
            <main className="flex-1">
              <SortBar currentSort={sortBy} onSortChange={(sort) => {
                setSortBy(sort);
                setCurrentPage(1);
              }} />

              <div className="mt-4">
                {paginatedPeople.length === 0 ? (
                  <p className="py-10 text-center text-muted-foreground">
                    該当する人物がいません
                  </p>
                ) : (
                  paginatedPeople.map((person, index) => (
                    <RankingRow
                      key={person.id}
                      person={person}
                      rank={(currentPage - 1) * itemsPerPage + index + 1}
                      onOpenScoreModal={setModalPerson}
                    />
                  ))
                )}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-8 flex items-center justify-center gap-2">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1.5 text-sm border border-border disabled:opacity-40 disabled:cursor-not-allowed hover:bg-secondary transition-colors"
                  >
                    前へ
                  </button>
                  <span className="text-sm text-muted-foreground px-4">
                    {currentPage} / {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1.5 text-sm border border-border disabled:opacity-40 disabled:cursor-not-allowed hover:bg-secondary transition-colors"
                  >
                    次へ
                  </button>
                </div>
              )}
            </main>
          </div>
        </div>
      </section>

      {/* Score Modal */}
      {modalPerson && (
        <ScoreBreakdownModal
          isOpen={!!modalPerson}
          onClose={() => setModalPerson(null)}
          personName={modalPerson.nameJa}
          scores={modalPerson.scores}
          total={modalPerson.scoreTotal}
        />
      )}
    </div>
  );
};

export default CategoryPage;
