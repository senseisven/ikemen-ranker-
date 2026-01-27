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
      <div className="max-w-[1200px] mx-auto px-6 py-16">
        <h1 className="text-2xl font-bold mb-4">カテゴリが見つかりません</h1>
        <p className="text-[#666]">お探しのカテゴリは存在しないか、削除された可能性があります。</p>
        <a href="/" className="text-[#1e3a8a] hover:underline mt-4 inline-block">ホームに戻る</a>
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
    <div className="max-w-[1200px] mx-auto px-6 py-12">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Header Section - Full content for LLM readability */}
      <header className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight mb-4">
          {category.name_ja}
        </h1>
        <p className="text-[#666] leading-relaxed max-w-[800px]">
          {category.description}
        </p>
      </header>

      {/* Tags Section - Displayed as static content, no tabs */}
      {tags.length > 0 && (
        <section className="mb-8 pb-6 border-b border-[#e5e5e5]">
          <h2 className="font-bold text-lg mb-4">タグ一覧</h2>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-sm border border-[#e5e5e5] bg-[#fafafa]"
              >
                {tag}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* People List - All content visible for SEO/LLM */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">
          {category.name_ja}ランキング（{sortedPeople.length}名）
        </h2>
        
        <div className="space-y-0">
          {sortedPeople.map((person, index) => (
            <article
              key={person.id}
              className="flex items-center gap-6 py-6 border-b border-[#e5e5e5] hover:bg-[#fafafa] px-6 -mx-6 transition-colors"
            >
              <div className="w-12 text-center flex-shrink-0">
                <span className="text-2xl font-bold text-[#999]" aria-label={`ランキング${index + 1}位`}>
                  {index + 1}
                </span>
              </div>
              <a href={`/p/${person.slug}`} className="w-20 h-20 bg-[#f5f5f5] flex-shrink-0 relative overflow-hidden block">
                {person.image_url ? (
                  <img
                    src={person.image_url}
                    alt={person.image_alt || person.name_ja}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#e5e5e5] to-[#f5f5f5]" />
                )}
              </a>
              <div className="flex-1">
                <a href={`/p/${person.slug}`} className="hover:text-[#1e3a8a]">
                  <h3 className="font-bold mb-1">{person.name_ja}</h3>
                </a>
                <p className="text-sm text-[#666] mb-2">{person.title}</p>
                {/* All tags visible - no hidden content */}
                <div className="flex flex-wrap gap-2">
                  {person.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-[#999] border border-[#e5e5e5] px-2 py-0.5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {/* Bio visible for LLM */}
                {person.bio_short && (
                  <p className="text-sm text-[#888] mt-2 line-clamp-2">{person.bio_short}</p>
                )}
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-sm text-[#999] mb-1">Total Score</div>
                <div className="text-3xl font-bold">{person.score_total}</div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Related Articles - SEO friendly content */}
      {articles.length > 0 && (
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">{category.name_ja}関連記事</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles.map((article) => (
              <article key={article.id} className="border border-[#e5e5e5] p-6 hover:border-[#1e3a8a] transition-colors">
                <a href={`/article/${article.slug}`}>
                  <h3 className="font-bold text-lg mb-2 hover:text-[#1e3a8a]">{article.title}</h3>
                </a>
                {article.excerpt && (
                  <p className="text-sm text-[#666] leading-relaxed">{article.excerpt}</p>
                )}
                {article.published_at && (
                  <time className="text-xs text-[#999] mt-2 block">
                    {new Date(article.published_at).toLocaleDateString('ja-JP')}
                  </time>
                )}
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Detailed Person Info Section - Full content for LLM */}
      <section>
        <h2 className="text-2xl font-bold mb-6">{category.name_ja}詳細情報</h2>
        <div className="space-y-8">
          {sortedPeople.slice(0, 10).map((person) => (
            <article key={person.id} className="border-b border-[#e5e5e5] pb-8">
              <h3 className="text-xl font-bold mb-2">
                <a href={`/p/${person.slug}`} className="hover:text-[#1e3a8a]">
                  {person.name_ja}
                </a>
              </h3>
              <p className="text-[#666] mb-2">{person.title}</p>
              {person.bio_short && (
                <p className="text-[#888] leading-relaxed mb-3">{person.bio_short}</p>
              )}
              {person.editorial && (
                <div className="bg-[#fafafa] p-4 text-sm text-[#666] leading-relaxed">
                  <strong className="block mb-2">編集部コメント:</strong>
                  {person.editorial}
                </div>
              )}
              <div className="mt-3 text-sm">
                <strong>スコア:</strong> {person.score_total}点
                {person.tags.length > 0 && (
                  <span className="ml-4">
                    <strong>タグ:</strong> {person.tags.join('、')}
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
