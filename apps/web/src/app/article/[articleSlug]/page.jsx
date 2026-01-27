import { getArticleBySlug, getArticles } from "@/lib/supabase";

export async function loader({ params }) {
  const articleSlug = params?.articleSlug;
  const article = articleSlug ? await getArticleBySlug(articleSlug) : null;

  if (!article) {
    return { article: null, relatedArticles: [] };
  }

  const relatedArticles = await getArticles(article.category_id, 3);
  return { article, relatedArticles: relatedArticles ?? [] };
}

export function meta({ data }) {
  const article = data?.article;
  if (!article) {
    return [{ title: "記事が見つかりません | イケメン名鑑" }];
  }

  return [
    { title: article.meta_title || `${article.title} | イケメン名鑑` },
    { name: "description", content: article.meta_description || article.excerpt || "" },
    { name: "robots", content: "index,follow" },
  ];
}

export default function ArticlePage({ loaderData }) {
  const article = loaderData?.article;

  if (!article) {
    return (
      <div className="max-w-[800px] mx-auto px-6 py-16">
        <h1 className="text-2xl font-bold mb-4">記事が見つかりません</h1>
        <p className="text-[#666]">お探しの記事は存在しないか、削除された可能性があります。</p>
        <a href="/" className="text-[#1e3a8a] hover:underline mt-4 inline-block">ホームに戻る</a>
      </div>
    );
  }

  const relatedArticles = loaderData?.relatedArticles ?? [];

  // JSON-LD structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.excerpt,
    "image": article.featured_image_url,
    "datePublished": article.published_at,
    "dateModified": article.updated_at,
    "author": {
      "@type": "Organization",
      "name": "イケメン名鑑編集部"
    },
    "publisher": {
      "@type": "Organization",
      "name": "イケメン名鑑",
      "url": "https://ikemen.jp"
    }
  };

  return (
    <article className="max-w-[800px] mx-auto px-6 py-12">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Breadcrumb */}
      <nav className="mb-6 text-sm" aria-label="パンくずリスト">
        <ol className="flex items-center">
          <li>
            <a href="/" className="text-[#999] hover:text-[#1e3a8a]">
              ホーム
            </a>
          </li>
          {article.category && (
            <>
              <li className="mx-2 text-[#999]">/</li>
              <li>
                <a
                  href={`/${article.category.slug}`}
                  className="text-[#999] hover:text-[#1e3a8a]"
                >
                  {article.category.name_ja}
                </a>
              </li>
            </>
          )}
          <li className="mx-2 text-[#999]">/</li>
          <li>
            <span className="text-[#333]">記事</span>
          </li>
        </ol>
      </nav>

      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-4">
          {article.title}
        </h1>
        {article.excerpt && (
          <p className="text-lg text-[#666] leading-relaxed mb-4">
            {article.excerpt}
          </p>
        )}
        <div className="flex items-center gap-4 text-sm text-[#999]">
          {article.published_at && (
            <time dateTime={article.published_at}>
              {new Date(article.published_at).toLocaleDateString("ja-JP", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          )}
          {article.category && (
            <a
              href={`/${article.category.slug}`}
              className="text-[#1e3a8a] hover:underline"
            >
              {article.category.name_ja}
            </a>
          )}
        </div>
      </header>

      {/* Featured Image */}
      {article.featured_image_url && (
        <div className="mb-8">
          <img
            src={article.featured_image_url}
            alt={article.title}
            className="w-full h-auto"
          />
        </div>
      )}

      {/* Content - Full HTML content for LLM readability */}
      <div
        className="prose prose-lg max-w-none mb-12"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      {/* Related Person */}
      {article.person && (
        <section className="mb-12 p-6 bg-[#fafafa] border border-[#e5e5e5]">
          <h2 className="font-bold mb-4">関連人物</h2>
          <a
            href={`/p/${article.person.slug}`}
            className="flex items-center gap-4 hover:text-[#1e3a8a]"
          >
            <span className="font-medium">{article.person.name_ja}</span>
            <span className="text-sm text-[#666]">→ プロフィールを見る</span>
          </a>
        </section>
      )}

      {/* Related Articles */}
      {relatedArticles.length > 1 && (
        <section className="border-t border-[#e5e5e5] pt-8">
          <h2 className="text-xl font-bold mb-6">関連記事</h2>
          <div className="space-y-4">
            {relatedArticles
              .filter((a) => a.id !== article.id)
              .slice(0, 3)
              .map((relatedArticle) => (
                <article key={relatedArticle.id} className="border-b border-[#e5e5e5] pb-4">
                  <a href={`/article/${relatedArticle.slug}`} className="hover:text-[#1e3a8a]">
                    <h3 className="font-bold mb-2">{relatedArticle.title}</h3>
                  </a>
                  {relatedArticle.excerpt && (
                    <p className="text-sm text-[#666] line-clamp-2">
                      {relatedArticle.excerpt}
                    </p>
                  )}
                </article>
              ))}
          </div>
        </section>
      )}
    </article>
  );
}
