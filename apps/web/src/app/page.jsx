import { getCategories, getWeeklyPicks, getLatestPeople, getRankingsByCategory } from "@/lib/supabase";
import { useLoaderData } from "react-router";
import { useTranslation, localizeCategory, localizePerson } from "@/lib/i18n";

export function meta() {
  return [
    { title: "イケメン名鑑 | 各界で活躍するイケメンランキング" },
    {
      name: "description",
      content:
        "スタートアップ、俳優、アスリート、モデル、YouTuber、ミュージシャンなど、各界で活躍するイケメンを厳選して掲載。",
    },
    { name: "robots", content: "index,follow" },
  ];
}

export async function loader() {
  try {
    const [categoryRankings, weeklyPicks, latest] = await Promise.all([
      getRankingsByCategory(5),
      getWeeklyPicks(5),
      getLatestPeople(10),
    ]);

    const categories = categoryRankings.map(r => r.category);

    return {
      categories: categories ?? [],
      categoryRankings: categoryRankings ?? [],
      weeklyPicks: weeklyPicks ?? [],
      latest: latest ?? [],
      loadError: null,
    };
  } catch (err) {
    console.error('Supabase loader error:', err);
    return {
      categories: [],
      categoryRankings: [],
      weeklyPicks: [],
      latest: [],
      loadError: err?.message || String(err),
    };
  }
}

export default function HomePage() {
  const loaderData = useLoaderData();
  const { t, lang } = useTranslation();
  const categories = loaderData?.categories ?? [];
  const categoryRankings = loaderData?.categoryRankings ?? [];
  const weeklyPicks = loaderData?.weeklyPicks ?? [];
  const latest = loaderData?.latest ?? [];
  const loadError = loaderData?.loadError;
  const hasNoData = categories.length === 0 && categoryRankings.length === 0 && latest.length === 0;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "イケメン名鑑",
    "description": "各界で活躍するイケメンを編集部が厳選して掲載するランキングサイト",
    "url": "https://ikemen.jp",
    "mainEntity": {
      "@type": "ItemList",
      "name": "カテゴリ一覧",
      "itemListElement": categories.map((cat, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "CollectionPage",
          "name": cat.name_ja,
          "description": cat.description,
          "url": `https://ikemen.jp/${cat.slug}`,
        }
      }))
    }
  };

  return (
    <div className="relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="fixed inset-0 -z-10 bg-slate-50" aria-hidden="true" />

      {loadError && (
        <div className="bg-red-50 border-b border-red-200">
          <div className="max-w-[1200px] mx-auto px-6 py-4">
            <p className="text-red-800 font-medium text-sm">{t("home.error.supabase")}</p>
            <p className="text-red-700 text-sm mt-1">{loadError}</p>
            <p className="text-red-600 text-xs mt-2">
              {t("home.error.rlsHint")} <code className="bg-red-100 px-1 rounded">.env</code>{" "}
              <code className="bg-red-100 px-1 rounded">NEXT_PUBLIC_SUPABASE_URL</code>{" / "}
              <code className="bg-red-100 px-1 rounded">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> {t("home.error.envHint")}
            </p>
          </div>
        </div>
      )}

      {!loadError && hasNoData && (
        <div className="bg-amber-50 border-b border-amber-200">
          <div className="max-w-[1200px] mx-auto px-6 py-4 flex items-center justify-between gap-4 flex-wrap">
            <p className="text-amber-800 text-sm">
              {t("home.noData.banner")}
            </p>
            <a
              href="/admin"
              className="text-amber-800 font-medium hover:text-amber-900 underline text-sm shrink-0"
            >
              {t("home.noData.link")}
            </a>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative border-b border-slate-200 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 py-24 md:py-32">
          <h1 className="font-display text-5xl md:text-6xl font-bold tracking-widest mb-6 text-gradient-neon">
            {t("home.hero.title")}
          </h1>
          <p className="text-slate-600 max-w-[600px] leading-relaxed text-lg">
            {t("home.hero.description")}
          </p>
          <div className="mt-8 flex gap-4">
            {categories.slice(0, 3).map((cat) => {
              const lc = localizeCategory(cat, lang);
              return (
              <a
                key={cat.id}
                href={`/${cat.slug}`}
                className="px-5 py-2.5 bg-white border border-slate-200 rounded-sm text-indigo-600 text-sm font-medium hover:bg-indigo-50 hover:border-indigo-300 transition-all duration-300 shadow-sm"
              >
                {lc.name_ja}
              </a>
              );
            })}
          </div>
        </div>
      </section>

      {hasNoData && (
        <section className="max-w-[1200px] mx-auto px-6 py-8">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 text-amber-900">
            <h3 className="font-bold mb-2">{t("home.noData.title")}</h3>
            <p className="text-sm mb-4">
              {t("home.noData.description")}
              <a href="/admin" className="text-indigo-600 hover:underline font-medium ml-1">{t("home.noData.adminLink")}</a>
              {t("home.noData.instructions")}
            </p>
            <p className="text-xs text-amber-700">
              {t("home.noData.tableHint")} <code className="bg-amber-100 px-1 rounded">categories</code> / <code className="bg-amber-100 px-1 rounded">people</code> {t("home.noData.activeHint")} <code className="bg-amber-100 px-1 rounded">is_active = true</code> {t("home.noData.activeCondition")}
            </p>
          </div>
        </section>
      )}

      {/* Per-Category Rankings */}
      {categoryRankings.map(({ category: cat, people }) => {
        const lc = localizeCategory(cat, lang);
        return (
        <section key={cat.id} className="max-w-[1200px] mx-auto px-6 py-16 border-b border-slate-200">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-px bg-gradient-to-r from-transparent to-indigo-400" />
                <span className="text-xs uppercase tracking-[0.2em] text-indigo-600 font-display">{t("home.ranking.label")}</span>
                <div className="flex-1 h-px bg-gradient-to-l from-transparent to-indigo-400" />
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-indigo-600 tracking-wide">
                — {lc.name_ja} —
              </h2>
              {lc.description && (
                <p className="mt-2 text-slate-500 text-sm max-w-[600px]">{lc.description}</p>
              )}
            </div>
            <a
              href={`/${cat.slug}`}
              className="text-sm text-indigo-600 hover:text-indigo-800 font-medium whitespace-nowrap transition-colors"
            >
              {t("home.seeAll")}
            </a>
          </div>

          {people.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {people.map((person, index) => {
                const lp = localizePerson(person, lang);
                return (
                <article key={person.id}>
                  <a href={`/p/${person.slug}`} className="group block">
                    <div className="aspect-[3/4] mb-4 relative overflow-hidden rounded-sm border border-slate-200 group-hover:border-indigo-300 transition-all duration-300 bg-white shadow-sm">
                      <div className="absolute top-2 left-2 z-10 font-display text-xl font-bold text-indigo-600 bg-white/95 px-2 py-0.5 rounded shadow-sm">
                        {index + 1}
                      </div>
                      {person.image_url ? (
                        <img
                          src={person.image_url}
                          alt={person.image_alt || lp.name_ja}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full bg-slate-100" />
                      )}
                    </div>
                    <h3 className="font-bold text-sm mb-1 text-slate-800">{lp.name_ja}</h3>
                    <p className="text-xs text-slate-600">{lp.title}</p>
                    <p className="text-xs text-indigo-600 mt-1 font-mono font-semibold">
                      Score: {person.score_total}
                    </p>
                  </a>
                </article>
                );
              })}
            </div>
          ) : (
            <p className="text-slate-500 text-sm py-4">{t("home.noEntries")}</p>
          )}
        </section>
        );
      })}

      {/* Weekly Picks Section */}
      {weeklyPicks.length > 0 && (
        <section className="max-w-[1200px] mx-auto px-6 py-20 border-t border-slate-200">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-10 text-indigo-600 tracking-wide">
            {t("home.weeklyPicks")}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {weeklyPicks.map((person) => {
              const lp = localizePerson(person, lang);
              return (
              <article key={person.id}>
                <a href={`/p/${person.slug}`} className="group block">
                  <div className="aspect-[3/4] mb-4 relative overflow-hidden rounded-sm border border-slate-200 group-hover:border-indigo-300 transition-all duration-300 bg-white shadow-sm">
                    {person.image_url ? (
                      <img
                        src={person.image_url}
                        alt={person.image_alt || lp.name_ja}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-100" />
                    )}
                  </div>
                  <h3 className="font-bold text-sm mb-1 text-slate-800">{lp.name_ja}</h3>
                  <p className="text-xs text-slate-600">{lp.title}</p>
                  <p className="text-xs text-indigo-600 mt-1 font-mono font-semibold">
                    Score: {person.score_total}
                  </p>
                </a>
              </article>
              );
            })}
          </div>
        </section>
      )}

      {/* Latest Section */}
      <section className="max-w-[1200px] mx-auto px-6 py-20 border-t border-slate-200">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-px bg-gradient-to-r from-transparent to-indigo-400" />
            <span className="text-xs uppercase tracking-[0.2em] text-indigo-600 font-display">{t("home.latest.label")}</span>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-indigo-400" />
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-indigo-600 tracking-wide">
            {t("home.latest.title")}
          </h2>
          <p className="mt-2 text-slate-500 text-sm">
            {t("home.latest.description", { count: latest.length })}
          </p>
        </div>
        <div className="space-y-0">
          {latest.map((person, index) => {
            const lp = localizePerson(person, lang);
            return (
            <article key={person.id}>
              <a
                href={`/p/${person.slug}`}
                className="flex items-center gap-4 py-4 border-b border-slate-100 hover:bg-slate-50 px-4 -mx-4 transition-all duration-200 rounded-sm group"
              >
                <div className="w-8 text-center flex-shrink-0">
                  <span className="font-display text-lg font-bold text-indigo-500 group-hover:text-indigo-600 transition-colors">
                    {index + 1}
                  </span>
                </div>
                <div className="w-16 h-16 flex-shrink-0 relative overflow-hidden rounded-sm border border-slate-200 group-hover:border-indigo-300 transition-colors">
                  {person.image_url ? (
                    <img
                      src={person.image_url}
                      alt={person.image_alt || lp.name_ja}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-100" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-sm mb-1 text-slate-800">{lp.name_ja}</h3>
                  <p className="text-xs text-slate-600">{lp.title}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-600">{localizeCategory(person.category, lang)?.name_ja}</span>
                  <p className="text-sm font-bold mt-1 text-indigo-600 font-mono">{person.score_total}</p>
                </div>
              </a>
            </article>
            );
          })}
        </div>
      </section>

      {/* About Section */}
      <section className="max-w-[1200px] mx-auto px-6 py-20 border-t border-slate-200">
        <h2 className="font-display text-2xl md:text-3xl font-bold mb-8 text-indigo-600 tracking-wide">
          {t("home.about.title")}
        </h2>
        <div className="max-w-none text-slate-600">
          <p className="leading-relaxed mb-4">
            {t("home.about.p1")}
          </p>
          <p className="leading-relaxed">
            {t("home.about.p2")}
          </p>
        </div>
      </section>
    </div>
  );
}
