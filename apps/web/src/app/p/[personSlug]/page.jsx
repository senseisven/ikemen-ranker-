import { useLoaderData } from "react-router";
import {
  getPersonBySlug,
  getRelatedPeople,
  getTopInCategory,
  getArticles,
} from "@/lib/supabase";
import { useTranslation, localizeCategory, localizePerson } from "@/lib/i18n";
import { articleUrl } from "@/lib/slug";

export async function loader({ params }) {
  const personSlug = params?.personSlug;
  const person = personSlug ? await getPersonBySlug(personSlug) : null;
  if (!person) {
    return { person: null, related: [], topInCategory: [], articles: [] };
  }

  const [related, topInCategory, articles] = await Promise.all([
    getRelatedPeople(person.id, person.category_id, person.tags, 4),
    getTopInCategory(person.category_id, 5),
    getArticles(person.category_id, 3),
  ]);

  return {
    person,
    related: related ?? [],
    topInCategory: topInCategory ?? [],
    articles: articles ?? [],
  };
}

export function meta({ data }) {
  const person = data?.person;
  if (!person) {
    return [{ title: "ページが見つかりません | イケメン名鑑" }];
  }
  const title =
    person.meta_title || `${person.name_ja} | ${person.category?.name_ja} | イケメン名鑑`;
  const description = person.meta_description || person.bio_short || "";
  return [
    { title },
    { name: "description", content: description },
    { name: "robots", content: "index,follow" },
  ];
}

export default function PersonPage() {
  const loaderData = useLoaderData();
  const { t, lang } = useTranslation();
  const rawPerson = loaderData?.person;

  if (!rawPerson) {
    return (
      <div className="max-w-[1200px] mx-auto px-6 py-16">
        <h1 className="text-2xl font-bold mb-4">{t("person.notFound.title")}</h1>
        <p className="text-[#666]">{t("person.notFound.description")}</p>
        <a href="/" className="text-[#1e3a8a] hover:underline mt-4 inline-block">{t("person.goHome")}</a>
      </div>
    );
  }

  const person = localizePerson(rawPerson, lang);
  const related = (loaderData?.related ?? []).map((p) => localizePerson(p, lang));
  const topInCategory = (loaderData?.topInCategory ?? []).map((p) => localizePerson(p, lang));
  const articles = loaderData?.articles ?? [];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": person.name_ja,
    "alternateName": person.name_kana,
    "jobTitle": person.title,
    "description": person.bio_short,
    "image": person.image_url,
    "url": `https://ikemen.jp/p/${person.slug}`,
    "sameAs": [
      person.link_x,
      person.link_instagram,
      person.link_official,
    ].filter(Boolean),
  };

  const scores = [
    { name: t("score.cleanliness"), value: person.score_cleanliness, max: 20 },
    { name: t("score.facial"), value: person.score_facial, max: 20 },
    { name: t("score.vibe"), value: person.score_vibe, max: 20 },
    { name: t("score.fashion"), value: person.score_fashion, max: 20 },
    { name: t("score.charisma"), value: person.score_charisma, max: 20 },
  ];

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="max-w-[1000px] mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <nav className="mb-4 text-sm" aria-label={t("person.breadcrumb.ariaLabel")}>
          <ol className="flex items-center">
            <li>
              <a href="/" className="text-[#999] hover:text-[#1e3a8a]">
                {t("person.breadcrumb.home")}
              </a>
            </li>
            <li className="mx-2 text-[#999]">/</li>
            <li>
              <a
                href={`/${person.category?.slug}`}
                className="text-[#999] hover:text-[#1e3a8a]"
              >
                {localizeCategory(person.category, lang)?.name_ja}
              </a>
            </li>
            <li className="mx-2 text-[#999]">/</li>
            <li>
              <span className="text-[#333]">{person.name_ja}</span>
            </li>
          </ol>
        </nav>

        {/* Main Content */}
        <article className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-16">
          {/* Image */}
          <div className="md:col-span-2">
            <div className="aspect-[3/4] bg-[#f5f5f5] mb-4 relative overflow-hidden">
              {person.image_url ? (
                <img
                  src={person.image_url}
                  alt={person.image_alt || person.name_ja}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#e5e5e5] to-[#f5f5f5]" />
              )}
            </div>
          </div>

          {/* Details */}
          <div className="md:col-span-3">
            <header className="mb-6">
              <h1 className="text-4xl font-bold tracking-tight mb-2">
                {person.name_ja}
              </h1>
              {person.name_kana && (
                <p className="text-sm text-[#999] mb-4">{person.name_kana}</p>
              )}
              <p className="text-lg text-[#666]">{person.title}</p>
            </header>

            {/* Tags */}
            {person.tags.length > 0 && (
              <div className="mb-8">
                <h2 className="sr-only">{t("person.tags.srOnly")}</h2>
                <div className="flex flex-wrap gap-2 mb-4">
                  {person.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs border border-[#e5e5e5] px-3 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Profile */}
            <section className="mb-8 pb-8 border-b border-[#e5e5e5]">
              <h2 className="font-bold mb-3">{t("person.profile")}</h2>
              <p className="text-[#666] leading-relaxed">{person.bio_short}</p>
            </section>

            {/* Editorial */}
            {person.editorial && (
              <section className="mb-8 pb-8 border-b border-[#e5e5e5]">
                <h2 className="font-bold mb-3">{t("person.editorialComment")}</h2>
                <p className="text-[#666] leading-relaxed">{person.editorial}</p>
              </section>
            )}

            {/* Links */}
            {(person.link_x || person.link_instagram || person.link_official) && (
              <section className="mb-8">
                <h2 className="font-bold mb-3">{t("person.links")}</h2>
                <div className="flex flex-col gap-2">
                  {person.link_x && (
                    <a
                      href={person.link_x}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[#1e3a8a] hover:underline"
                    >
                      X (Twitter)
                    </a>
                  )}
                  {person.link_instagram && (
                    <a
                      href={person.link_instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[#1e3a8a] hover:underline"
                    >
                      Instagram
                    </a>
                  )}
                  {person.link_official && (
                    <a
                      href={person.link_official}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[#1e3a8a] hover:underline"
                    >
                      {t("person.officialSite")}
                    </a>
                  )}
                </div>
              </section>
            )}
          </div>
        </article>

        {/* Score Breakdown */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">{t("person.scoreBreakdown")}</h2>
          <div className="bg-[#fafafa] p-6">
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm text-[#666]">{t("person.overallScore")}</span>
              <span className="text-4xl font-bold">{person.score_total}</span>
            </div>
            <div className="space-y-4">
              {scores.map((score) => (
                <div key={score.name} className="flex items-center gap-4">
                  <span className="w-24 text-sm text-[#666]">{score.name}</span>
                  <div className="flex-1 bg-[#e5e5e5] h-2">
                    <div
                      className="bg-[#1e3a8a] h-full"
                      style={{ width: `${(score.value / score.max) * 100}%` }}
                    />
                  </div>
                  <span className="w-12 text-right text-sm font-bold">
                    {score.value}/{score.max}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related People */}
        {related.length > 0 && (
          <section className="mb-16 pb-16 border-b border-[#e5e5e5]">
            <h2 className="text-2xl font-bold mb-6">{t("person.relatedType")}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {related.map((p) => (
                <article key={p.id}>
                  <a href={`/p/${p.slug}`} className="group block">
                    <div className="aspect-[3/4] bg-[#f5f5f5] mb-3 relative overflow-hidden">
                      {p.image_url ? (
                        <img
                          src={p.image_url}
                          alt={p.image_alt || p.name_ja}
                          className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#e5e5e5] to-[#f5f5f5]" />
                      )}
                    </div>
                    <h3 className="font-bold text-sm mb-1">{p.name_ja}</h3>
                    <p className="text-xs text-[#666]">{p.title}</p>
                  </a>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Top in Category */}
        {topInCategory.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">{t("person.topRanking", { name: localizeCategory(person.category, lang)?.name_ja })}</h2>
            <div className="space-y-4">
              {topInCategory.map((p, index) => (
                <article key={p.id}>
                  <a
                    href={`/p/${p.slug}`}
                    className="flex items-center gap-4 pb-4 border-b border-[#f0f0f0] hover:bg-[#fafafa] px-4 -mx-4 transition-colors"
                  >
                    <div className="w-8 text-center">
                      <span className="text-lg font-bold text-[#999]">
                        {index + 1}
                      </span>
                    </div>
                    <div className="w-16 h-16 bg-[#f5f5f5] flex-shrink-0 relative overflow-hidden">
                      {p.image_url ? (
                        <img
                          src={p.image_url}
                          alt={p.image_alt || p.name_ja}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#e5e5e5] to-[#f5f5f5]" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-sm mb-1">{p.name_ja}</h3>
                      <p className="text-xs text-[#666]">{p.title}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold">{p.score_total}</p>
                    </div>
                  </a>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Related Articles */}
        {articles.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-6">{t("person.relatedArticles")}</h2>
            <div className="space-y-4">
              {articles.map((article) => (
                <article key={article.id} className="border-b border-[#e5e5e5] pb-4">
                  <a href={articleUrl(article.slug)} className="hover:text-[#1e3a8a]">
                    <h3 className="font-bold mb-2">{article.title}</h3>
                  </a>
                  {article.excerpt && (
                    <p className="text-sm text-[#666] line-clamp-2">{article.excerpt}</p>
                  )}
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
