'use client';

import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPersonBySlug, getRelatedPeople, getTopInCategory } from '@/data/people';
import { getCategoryBySlug } from '@/data/categories';
import { PersonScores } from '@/data/types';
import ScoreBadge from '@/components/ScoreBadge';
import TagChips from '@/components/TagChips';
import PersonCard from '@/components/PersonCard';
import VoteButton from '@/components/VoteButton';

const scoreLabels: Record<keyof PersonScores, string> = {
  cleanliness: '清潔感',
  facial: '顔立ち',
  vibe: '雰囲気',
  fashion: 'ファッション',
  charisma: 'カリスマ',
};

const PersonPage = () => {
  const { personSlug } = useParams<{ personSlug: string }>();
  const person = getPersonBySlug(personSlug || '');

  if (!person) {
    return (
      <div className="container-editorial py-20 text-center">
        <h1 className="text-xl font-heading font-bold text-foreground mb-4">
          人物が見つかりません
        </h1>
        <Link to="/" className="text-primary hover:underline">
          トップへ戻る
        </Link>
      </div>
    );
  }

  const category = getCategoryBySlug(person.categorySlug);
  const relatedPeople = getRelatedPeople(person, 4);
  const topInCategory = getTopInCategory(person.categorySlug, person.id, 3);

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <section className="border-b border-border">
        <div className="container-editorial py-4">
          <nav className="text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">
              トップ
            </Link>
            <span className="mx-2">/</span>
            {category && (
              <>
                <Link
                  to={`/c/${category.slug}`}
                  className="hover:text-foreground transition-colors"
                >
                  {category.nameJa}
                </Link>
                <span className="mx-2">/</span>
              </>
            )}
            <span className="text-foreground">{person.nameJa}</span>
          </nav>
        </div>
      </section>

      {/* Main content */}
      <article className="section-spacing">
        <div className="container-editorial">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left column - Image */}
            <div className="lg:col-span-1">
              <div className="aspect-[3/4] bg-secondary overflow-hidden sticky top-4">
                <img
                  src={person.image.src}
                  alt={person.image.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right column - Info */}
            <div className="lg:col-span-2">
              {/* Header */}
              <header className="mb-8">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h1 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">
                      {person.nameJa}
                    </h1>
                    {person.nameKana && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {person.nameKana}
                      </p>
                    )}
                  </div>
                  <ScoreBadge score={person.scoreTotal} size="lg" />
                </div>
                <p className="text-muted-foreground mb-3">{person.title}</p>
                <TagChips tags={person.tags} />
              </header>

              {/* Bio */}
              <section className="mb-8">
                <p className="text-foreground leading-relaxed">
                  {person.bioShort}
                </p>
              </section>

              {/* Editorial */}
              <section className="mb-8 border-l-2 border-border pl-4">
                <h2 className="text-sm font-medium text-muted-foreground mb-2">
                  イケメン評
                </h2>
                <p className="text-foreground leading-relaxed">
                  {person.editorial}
                </p>
              </section>

              {/* Score breakdown */}
              <section className="mb-8 p-5 bg-secondary/50 border border-border">
                <h2 className="text-sm font-medium text-foreground mb-4">
                  スコア内訳
                </h2>
                <div className="space-y-3">
                  {(Object.keys(person.scores) as Array<keyof PersonScores>).map((key) => (
                    <div key={key} className="flex items-center justify-between gap-4">
                      <span className="text-sm text-muted-foreground w-28">
                        {scoreLabels[key]}
                      </span>
                      <div className="flex-1 h-1.5 bg-background overflow-hidden">
                        <div
                          className="h-full bg-foreground"
                          style={{ width: `${(person.scores[key] / 20) * 100}%` }}
                        />
                      </div>
                      <span className="font-mono text-sm tabular-nums w-6 text-right">
                        {person.scores[key]}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
                  <span className="text-sm font-medium">合計</span>
                  <span className="font-mono font-bold">{person.scoreTotal}/100</span>
                </div>
              </section>

              {/* Vote */}
              <section className="mb-8">
                <VoteButton personId={person.id} personName={person.nameJa} />
              </section>

              {/* Links */}
              {person.links && Object.keys(person.links).length > 0 && (
                <section className="mb-8">
                  <h2 className="text-sm font-medium text-muted-foreground mb-3">
                    関連リンク
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {person.links.x && (
                      <a
                        href={person.links.x}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        X (Twitter)
                      </a>
                    )}
                    {person.links.instagram && (
                      <a
                        href={person.links.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Instagram
                      </a>
                    )}
                    {person.links.wikipedia && (
                      <a
                        href={person.links.wikipedia}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Wikipedia
                      </a>
                    )}
                    {person.links.official && (
                      <a
                        href={person.links.official}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        公式サイト
                      </a>
                    )}
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </article>

      {/* Related people */}
      {relatedPeople.length > 0 && (
        <section className="section-spacing border-t border-border">
          <div className="container-editorial">
            <h2 className="font-heading text-lg font-bold text-foreground mb-6">
              似ているタイプ
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {relatedPeople.map((p) => (
                <PersonCard key={p.id} person={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Top in category */}
      {topInCategory.length > 0 && (
        <section className="section-spacing border-t border-border">
          <div className="container-editorial">
            <div className="flex items-baseline justify-between mb-6">
              <h2 className="font-heading text-lg font-bold text-foreground">
                {category?.nameJa}の上位
              </h2>
              <Link
                to={`/c/${person.categorySlug}`}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                すべて見る
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {topInCategory.map((p, i) => (
                <PersonCard key={p.id} person={p} showRank={i + 1} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default PersonPage;
