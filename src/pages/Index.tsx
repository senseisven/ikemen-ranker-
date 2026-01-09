import { Link } from 'react-router-dom';
import { categories } from '@/data/categories';
import { people, getWeeklyPicks, getLatestPeople, getPeopleByCategory } from '@/data/people';
import CategoryCard from '@/components/CategoryCard';
import PersonCard from '@/components/PersonCard';
import ScoreBadge from '@/components/ScoreBadge';

const Index = () => {
  const weeklyPicks = getWeeklyPicks();
  const latestPeople = getLatestPeople(10);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="border-b border-border">
        <div className="container-editorial py-16 sm:py-20">
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
            イケメン名鑑
          </h1>
          <p className="mt-3 text-muted-foreground max-w-xl">
            各界で活躍するイケメンを独自の視点で紹介。スタートアップ、俳優、アスリートなど、
            多彩なカテゴリーから注目の人物をピックアップ。
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="section-spacing border-b border-border">
        <div className="container-editorial">
          <h2 className="font-heading text-lg font-bold text-foreground mb-6">
            カテゴリー
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                count={getPeopleByCategory(category.slug).length}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Weekly Picks */}
      <section className="section-spacing border-b border-border">
        <div className="container-editorial">
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="font-heading text-lg font-bold text-foreground">
              今週の注目
            </h2>
            <span className="text-xs text-muted-foreground">
              編集部セレクト
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {weeklyPicks.map((person, index) => (
              <PersonCard
                key={person.id}
                person={person}
                showRank={index + 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Latest */}
      <section className="section-spacing">
        <div className="container-editorial">
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="font-heading text-lg font-bold text-foreground">
              新着掲載
            </h2>
          </div>
          <div className="divide-y divide-border border-t border-b border-border">
            {latestPeople.map((person) => (
              <Link
                key={person.id}
                to={`/p/${person.slug}`}
                className="flex items-center gap-4 py-3 hover:bg-secondary/50 transition-colors -mx-2 px-2"
              >
                <div className="w-10 h-10 bg-secondary flex-shrink-0 overflow-hidden">
                  <img
                    src={person.image.src}
                    alt={person.image.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="font-heading text-sm text-foreground">
                    {person.nameJa}
                  </span>
                  <span className="text-xs text-muted-foreground ml-2">
                    {person.title}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground">
                    {categories.find(c => c.slug === person.categorySlug)?.nameJa}
                  </span>
                  <ScoreBadge score={person.scoreTotal} size="sm" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
