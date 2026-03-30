import { getRankingsByCategory, getWeeklyPicks, getArticles } from "@/lib/supabase";
import { useState } from "react";
import { useLoaderData } from "react-router";
import { useTranslation, localizeCategory, localizePerson } from "@/lib/i18n";
import { ListingRequestForm } from "@/components/ListingRequestForm";

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
    const [categoryRankings, weeklyPicks, articles] = await Promise.all([
      getRankingsByCategory(5),
      getWeeklyPicks(5),
      getArticles(null, 6),
    ]);

    const categories = categoryRankings.map((r) => r.category);

    return {
      categories: categories ?? [],
      categoryRankings: categoryRankings ?? [],
      weeklyPicks: weeklyPicks ?? [],
      articles: articles ?? [],
      loadError: null,
    };
  } catch (err) {
    console.error("Supabase loader error:", err);
    return {
      categories: [],
      categoryRankings: [],
      weeklyPicks: [],
      articles: [],
      loadError: err?.message || String(err),
    };
  }
}

function CategoryNav({ categories, lang, t }) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="mt-8 sm:mt-10" aria-label={t("nav.ariaLabel")}>
      {/* Mobile: collapsible dropdown */}
      <div className="sm:hidden">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm transition-all active:bg-slate-50"
        >
          <span>{t("home.hero.browseCategories")}</span>
          <svg
            className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m19 9-7 7-7-7" />
          </svg>
        </button>
        {open && (
          <div className="mt-2 flex flex-col gap-1 rounded-xl border border-slate-200 bg-white p-2 shadow-sm">
            {categories.map((cat) => {
              const lc = localizeCategory(cat, lang);
              return (
                <a
                  key={cat.id}
                  href={`/${cat.slug}`}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 active:bg-slate-100"
                >
                  {lc.name_ja}
                </a>
              );
            })}
          </div>
        )}
      </div>

      {/* Desktop: pill row */}
      <div className="hidden flex-wrap gap-2 sm:flex">
        {categories.map((cat) => {
          const lc = localizeCategory(cat, lang);
          return (
            <a
              key={cat.id}
              href={`/${cat.slug}`}
              className="rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-sm font-medium text-slate-700 shadow-sm transition-all hover:border-slate-300 hover:shadow-md"
            >
              {lc.name_ja}
            </a>
          );
        })}
      </div>
    </nav>
  );
}

function PicksCarousel({ people, lang }) {
  const items = [...people, ...people];
  const count = people.length;
  const cardW = 220;
  const gap = 20;
  const totalW = count * (cardW + gap);

  return (
    <div
      className="group/carousel relative overflow-hidden"
      aria-label="Weekly picks carousel"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-slate-50/90 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-slate-50/90 to-transparent" />

      <div
        className="flex animate-marquee group-hover/carousel:[animation-play-state:paused]"
        style={{
          gap: `${gap}px`,
          width: `${totalW * 2}px`,
          animationDuration: `${count * 4}s`,
        }}
      >
        {items.map((person, i) => {
          const lp = localizePerson(person, lang);
          return (
            <a
              key={`${person.id}-${i}`}
              href={`/p/${person.slug}`}
              className="group/card block flex-shrink-0"
              style={{ width: `${cardW}px` }}
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-slate-100 shadow-sm ring-1 ring-slate-900/5 transition-all duration-300 group-hover/card:shadow-lg group-hover/card:ring-slate-900/10">
                {person.image_url ? (
                  <img
                    src={person.image_url}
                    alt={person.image_alt || lp.name_ja}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover/card:scale-[1.03]"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-slate-100 text-2xl text-slate-300">
                    {(i % people.length) + 1}
                  </div>
                )}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent px-3 pb-3 pt-10">
                  <p className="text-sm font-semibold text-white drop-shadow">{lp.name_ja}</p>
                  <p className="mt-0.5 text-xs text-white/80">{lp.title}</p>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}

export default function HomePage() {
  const loaderData = useLoaderData();
  const { t, lang } = useTranslation();
  const categories = loaderData?.categories ?? [];
  const categoryRankings = loaderData?.categoryRankings ?? [];
  const weeklyPicks = loaderData?.weeklyPicks ?? [];
  const articles = loaderData?.articles ?? [];
  const loadError = loaderData?.loadError;
  const hasNoData = categories.length === 0 && categoryRankings.length === 0;

  const spotlightPeople =
    weeklyPicks.length > 0
      ? weeklyPicks.slice(0, 8)
      : (categoryRankings[0]?.people ?? []).slice(0, 8);

  const spotlightHeading =
    weeklyPicks.length > 0 ? t("home.minimal.headingPicks") : t("home.minimal.headingRankings");

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "イケメン名鑑",
    description: "各界で活躍するイケメンを編集部が厳選して掲載するランキングサイト",
    url: "https://ikemen.jp",
    mainEntity: {
      "@type": "ItemList",
      name: "カテゴリ一覧",
      itemListElement: categories.map((cat, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "CollectionPage",
          name: cat.name_ja,
          description: cat.description,
          url: `https://ikemen.jp/${cat.slug}`,
        },
      })),
    },
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* ── Error / no-data banners ── */}
      {loadError && (
        <div className="border-b border-red-200 bg-red-50">
          <div className="mx-auto max-w-3xl px-6 py-4">
            <p className="text-sm font-medium text-red-800">{t("home.error.supabase")}</p>
            <p className="mt-1 text-sm text-red-700">{loadError}</p>
          </div>
        </div>
      )}

      {!loadError && hasNoData && (
        <div className="border-b border-amber-200 bg-amber-50">
          <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-4 px-6 py-3">
            <p className="text-sm text-amber-900">{t("home.noData.banner")}</p>
            <a href="/admin" className="shrink-0 text-sm font-medium text-amber-900 underline">
              {t("home.noData.link")}
            </a>
          </div>
        </div>
      )}

      {/* ── Hero ── */}
      <header className="relative overflow-hidden">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full bg-gradient-to-br from-slate-100 to-transparent opacity-60" aria-hidden />
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-28">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
            {t("nav.brand")}
          </p>
          <h1 className="mt-4 max-w-2xl text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl">
            {t("home.hero.title")}
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-500 sm:mt-5 sm:text-base">
            {t("home.hero.description")}
          </p>

          {categories.length > 0 && (
            <CategoryNav categories={categories} lang={lang} t={t} />
          )}
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      </header>

      {/* ── Weekly picks / spotlight — infinite scroll carousel ── */}
      {!hasNoData && spotlightPeople.length > 0 && (
        <section className="bg-slate-50/40">
          <div className="py-16 sm:py-20">
            <div className="mx-auto mb-10 max-w-5xl px-4 text-center sm:px-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                {t("home.minimal.headingLabel")}
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                {spotlightHeading}
              </h2>
            </div>

            <PicksCarousel people={spotlightPeople} lang={lang} />

            {weeklyPicks.length === 0 && categoryRankings[0] && (
              <div className="mt-10 text-center">
                <a
                  href={`/${categoryRankings[0].category.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 underline-offset-4 transition-colors hover:text-slate-900 hover:underline"
                >
                  {t("home.seeAll")}
                </a>
              </div>
            )}
          </div>
          <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        </section>
      )}

      {/* ── News / Latest Articles ── */}
      {articles.length > 0 && (
        <section className="bg-white">
          <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
            <div className="mb-10 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                {t("home.news.label")}
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                {t("home.news.title")}
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
              {articles.map((article, i) => (
                <a
                  key={article.id}
                  href={`/article/${article.slug}`}
                  className="group flex flex-row items-start gap-4 rounded-xl border border-slate-100 bg-white p-4 transition-all hover:border-slate-200 hover:shadow-md sm:flex-col sm:gap-0 sm:p-0 sm:overflow-hidden"
                >
                  {article.featured_image_url ? (
                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg sm:h-44 sm:w-full sm:rounded-none sm:rounded-t-xl">
                      <img
                        src={article.featured_image_url}
                        alt={article.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        loading={i < 3 ? "eager" : "lazy"}
                      />
                    </div>
                  ) : (
                    <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-lg bg-slate-50 sm:h-44 sm:w-full sm:rounded-none sm:rounded-t-xl">
                      <svg className="h-8 w-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                      </svg>
                    </div>
                  )}

                  <div className="flex min-w-0 flex-1 flex-col sm:p-4">
                    {article.category?.name_ja && (
                      <span className="mb-1.5 text-xs font-medium text-slate-400">
                        {article.category.name_ja}
                      </span>
                    )}
                    <h3 className="text-sm font-semibold leading-snug text-slate-900 transition-colors group-hover:text-slate-600 sm:text-base">
                      {article.title}
                    </h3>
                    {article.excerpt && (
                      <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-slate-500 sm:text-sm">
                        {article.excerpt}
                      </p>
                    )}
                    <div className="mt-2 flex items-center gap-3 sm:mt-3">
                      {article.published_at && (
                        <time className="text-xs tabular-nums text-slate-400">
                          {new Date(article.published_at).toLocaleDateString(t("common.dateLocale"))}
                        </time>
                      )}
                      <span className="hidden text-xs font-medium text-slate-400 transition-colors group-hover:text-slate-600 sm:inline">
                        {t("home.news.readMore")}
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
          <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        </section>
      )}

      {/* ── Listing request form (bottom) ── */}
      <section className="bg-white">
        <div className="mx-auto max-w-xl px-4 py-16 sm:px-6 sm:py-20">
          <ListingRequestForm variant="embedded" />
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-slate-100 py-8">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-6 gap-y-2 px-4 text-sm text-slate-400 sm:px-6">
          <a
            href="/about"
            className="underline-offset-4 transition-colors hover:text-slate-700 hover:underline"
          >
            {t("nav.editorial")}
          </a>
          <span className="hidden sm:inline" aria-hidden>·</span>
          <a
            href="/submit"
            className="underline-offset-4 transition-colors hover:text-slate-700 hover:underline"
          >
            {t("submit.title")}
          </a>
        </div>
      </footer>
    </div>
  );
}
