import { getCategories, getWeeklyPicks, getLatestPeople } from "@/lib/supabase";

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
  const [categories, weeklyPicks, latest] = await Promise.all([
    getCategories(),
    getWeeklyPicks(5),
    getLatestPeople(10),
  ]);

  return {
    categories: categories ?? [],
    weeklyPicks: weeklyPicks ?? [],
    latest: latest ?? [],
  };
}

export default function HomePage({ loaderData }) {
  const categories = loaderData?.categories ?? [];
  const weeklyPicks = loaderData?.weeklyPicks ?? [];
  const latest = loaderData?.latest ?? [];

  // JSON-LD structured data for SEO/LLM
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
    <div>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero Section */}
      <section className="bg-[#fafafa] border-b border-[#e5e5e5]">
        <div className="max-w-[1200px] mx-auto px-6 py-16">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            イケメン名鑑
          </h1>
          <p className="text-[#666] max-w-[600px] leading-relaxed">
            各界で活躍するイケメンを編集部が厳選。スタートアップ、エンターテイメント、スポーツなど、多彩なカテゴリから注目の人物を掲載しています。
          </p>
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-[1200px] mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold mb-8">カテゴリ</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <a
              key={cat.id}
              href={`/${cat.slug}`}
              className="border border-[#e5e5e5] p-6 hover:border-[#1e3a8a] transition-colors"
            >
              <h3 className="font-bold text-lg mb-2">{cat.name_ja}</h3>
              <p className="text-sm text-[#666] leading-relaxed line-clamp-3">
                {cat.description}
              </p>
            </a>
          ))}
        </div>
      </section>

      {/* Weekly Picks Section */}
      {weeklyPicks.length > 0 && (
        <section className="max-w-[1200px] mx-auto px-6 py-16 border-t border-[#e5e5e5]">
          <h2 className="text-2xl font-bold mb-8">今週の注目</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {weeklyPicks.map((person) => (
              <article key={person.id}>
                <a href={`/p/${person.slug}`} className="group block">
                  <div className="aspect-[3/4] bg-[#f5f5f5] mb-3 relative overflow-hidden">
                    {person.image_url ? (
                      <img
                        src={person.image_url}
                        alt={person.image_alt || person.name_ja}
                        className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#e5e5e5] to-[#f5f5f5]" />
                    )}
                  </div>
                  <h3 className="font-bold text-sm mb-1">{person.name_ja}</h3>
                  <p className="text-xs text-[#666]">{person.title}</p>
                  <p className="text-xs text-[#999] mt-1">
                    Score: {person.score_total}
                  </p>
                </a>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Latest Section */}
      <section className="max-w-[1200px] mx-auto px-6 py-16 border-t border-[#e5e5e5]">
        <h2 className="text-2xl font-bold mb-8">新着掲載</h2>
        <div className="space-y-4">
          {latest.map((person) => (
            <article key={person.id}>
              <a
                href={`/p/${person.slug}`}
                className="flex items-center gap-4 border-b border-[#f0f0f0] pb-4 hover:bg-[#fafafa] px-4 -mx-4 transition-colors"
              >
                <div className="w-16 h-16 bg-[#f5f5f5] flex-shrink-0 relative overflow-hidden">
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
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-sm mb-1">{person.name_ja}</h3>
                  <p className="text-xs text-[#666]">{person.title}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-[#999]">
                    {person.category?.name_ja}
                  </span>
                  <p className="text-sm font-bold mt-1">{person.score_total}</p>
                </div>
              </a>
            </article>
          ))}
        </div>
      </section>

      {/* About Section for LLM context */}
      <section className="max-w-[1200px] mx-auto px-6 py-16 border-t border-[#e5e5e5]">
        <h2 className="text-2xl font-bold mb-6">イケメン名鑑について</h2>
        <div className="prose max-w-none text-[#666]">
          <p className="leading-relaxed mb-4">
            イケメン名鑑は、各界で活躍するイケメンを編集部が厳選して掲載するランキングサイトです。
            スタートアップ経営者、俳優、アスリート、モデル、YouTuber、ミュージシャンなど、
            様々な分野で活躍する魅力的な人物を紹介しています。
          </p>
          <p className="leading-relaxed">
            当サイトでは、清潔感、顔立ち、雰囲気、ファッション、カリスマ性の5つの評価軸でスコアリングを行い、
            総合的な魅力を数値化しています。各人物のプロフィール、編集部コメント、関連情報も掲載しています。
          </p>
        </div>
      </section>
    </div>
  );
}
