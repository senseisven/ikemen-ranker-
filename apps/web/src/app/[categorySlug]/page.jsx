import {
  getCategoryBySlug,
  getPeopleByCategorySlug,
  getTagsByCategory,
  getArticles,
} from "@/lib/supabase";

export async function loader({ params }) {
  const categorySlug = params?.categorySlug;
  const category = categorySlug ? await getCategoryBySlug(categorySlug) : null;

  if (!category) {
    return { category: null, people: [], tags: [], articles: [] };
  }

  const [people, tags, articles] = await Promise.all([
    getPeopleByCategorySlug(category.slug),
    getTagsByCategory(category.id),
    getArticles(category.id, 5),
  ]);

  return {
    category,
    people: people ?? [],
    tags: tags ?? [],
    articles: articles ?? [],
  };
}

export function meta({ data }) {
  const category = data?.category;
  if (!category) {
    return [{ title: "カテゴリが見つかりません | イケメン名鑑" }];
  }
  return [
    { title: category.meta_title || `${category.name_ja} | イケメン名鑑` },
    { name: "description", content: category.meta_description || category.description || "" },
    { name: "robots", content: "index,follow" },
  ];
}

export default function CategoryPage({ loaderData }) {
  const category = loaderData?.category;

  if (!category) {
    return (
      <div className="max-w-[1200px] mx-auto px-6 py-24">
        <h1 className="font-display text-2xl font-bold mb-4 text-slate-800">カテゴリが見つかりません</h1>
        <p className="text-slate-600 mb-4">お探しのカテゴリは存在しないか、削除された可能性があります。</p>
        <a href="/" className="text-indigo-600 hover:underline mt-4 inline-block">ホームに戻る</a>
      </div>
    );
  }

  const allPeople = loaderData?.people ?? [];
  const tags = loaderData?.tags ?? [];
  const articles = loaderData?.articles ?? [];

  // Sort by score for display
  const sortedPeople = [...allPeople].sort((a, b) => b.score_total - a.score_total);

  // Generate JSON-LD structured data for SEO/LLM
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": category.name_ja,
    "description": category.description,
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": sortedPeople.map((person, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Person",
          "name": person.name_ja,
          "jobTitle": person.title,
          "description": person.bio_short,
          "url": `https://ikemen.jp/p/${person.slug}`,
        }
      }))
    }
  };

  return (
    <div className="relative">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Background */}
      <div className="fixed inset-0 -z-10 bg-slate-50" aria-hidden="true" />

      <div className="max-w-[1200px] mx-auto px-6 py-16">
        {/* Header Section */}
        <header className="mb-16">
          <div className="w-12 h-0.5 bg-gradient-to-r from-cyber-cyan to-cyber-purple mb-6" />
          <h1 className="font-display text-4xl md:text-5xl font-bold tracking-wide mb-4 text-gradient-neon">
            {category.name_ja}
          </h1>
          <p className="text-slate-600 leading-relaxed max-w-[800px]">
            {category.description}
          </p>
        </header>

        {/* Tags Section */}
        {tags.length > 0 && (
          <section className="mb-12 pb-8 border-b border-slate-200">
            <h2 className="font-display font-bold text-lg mb-4 text-indigo-600">タグ一覧</h2>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 text-sm border border-slate-200 bg-white text-slate-600 hover:border-indigo-300 hover:text-indigo-600 transition-colors rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* People List */}
        <section className="mb-20">
          <h2 className="font-display text-2xl font-bold mb-8 text-cyber-cyan">
            — {category.name_ja}ランキング（{sortedPeople.length}名） —
          </h2>
          <div className="space-y-0">
            {sortedPeople.map((person, index) => (
              <article
                key={person.id}
                className="flex items-center gap-6 py-6 border-b border-slate-200 hover:bg-slate-50 px-6 -mx-6 transition-all duration-200 rounded-sm"
              >
                <div className="w-12 text-center flex-shrink-0">
                  <span className="font-display text-2xl font-bold text-cyber-cyan/80" aria-label={`ランキング${index + 1}位`}>
                    {index + 1}
                  </span>
                </div>
                <a href={`/p/${person.slug}`} className="w-20 h-20 flex-shrink-0 relative overflow-hidden block rounded-sm border border-slate-200">
                  {person.image_url ? (
                    <img
                      src={person.image_url}
                      alt={person.image_alt || person.name_ja}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-cyber-dark to-cyber-darker" />
                  )}
                </a>
                <div className="flex-1">
                  <a href={`/p/${person.slug}`} className="hover:text-cyber-cyan transition-colors">
                    <h3 className="font-bold mb-1 text-slate-800">{person.name_ja}</h3>
                  </a>
                  <p className="text-sm text-slate-500 mb-2">{person.title}</p>
                  <div className="flex flex-wrap gap-2">
                    {(person.tags || []).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs text-slate-600 border border-slate-200 px-2 py-0.5 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {person.bio_short && (
                    <p className="text-sm text-slate-500 mt-2 line-clamp-2">{person.bio_short}</p>
                  )}
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-sm text-slate-500 mb-1">Total Score</div>
                  <div className="font-display text-3xl font-bold text-cyber-cyan">{person.score_total}</div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Related Articles */}
        {articles.length > 0 && (
          <section className="mb-20">
            <h2 className="font-display text-2xl font-bold mb-8 text-cyber-cyan">
              — {category.name_ja}関連記事 —
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {articles.map((article) => (
                <article key={article.id} className="glass p-6 rounded-sm hover:border-indigo-300 transition-all duration-300">
                  <a href={`/article/${article.slug}`}>
                    <h3 className="font-bold text-lg mb-2 text-slate-800 hover:text-indigo-600 transition-colors">{article.title}</h3>
                  </a>
                  {article.excerpt && (
                    <p className="text-sm text-slate-500 leading-relaxed">{article.excerpt}</p>
                  )}
                  {article.published_at && (
                    <time className="text-xs text-slate-500 mt-2 block">
                      {new Date(article.published_at).toLocaleDateString('ja-JP')}
                    </time>
                  )}
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Detailed Person Info Section */}
        <section>
          <h2 className="font-display text-2xl font-bold mb-8 text-cyber-cyan">
            — {category.name_ja}詳細情報 —
          </h2>
          <div className="space-y-8">
            {sortedPeople.slice(0, 10).map((person) => (
              <article key={person.id} className="pb-8 border-b border-slate-200 last:border-0">
                <h3 className="text-xl font-bold mb-2">
                  <a href={`/p/${person.slug}`} className="text-slate-800 hover:text-indigo-600 transition-colors">
                    {person.name_ja}
                  </a>
                </h3>
                <p className="text-slate-500 mb-2">{person.title}</p>
                {person.bio_short && (
                  <p className="text-slate-500 leading-relaxed mb-3">{person.bio_short}</p>
                )}
                {person.editorial && (
                  <div className="glass p-4 text-sm text-slate-600 leading-relaxed rounded-sm">
                    <strong className="block mb-2 text-cyber-cyan">編集部コメント:</strong>
                    {person.editorial}
                  </div>
                )}
                <div className="mt-3 text-sm text-slate-500">
                  <strong>スコア:</strong> <span className="text-cyber-cyan font-mono">{person.score_total}</span>点
                  {(person.tags || []).length > 0 && (
                    <span className="ml-4">
                      <strong>タグ:</strong> {(person.tags || []).join('、')}
                    </span>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
