import { getCategories, getWeeklyPicks, getLatestPeople, getTopPeople } from "@/lib/supabase";

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
    const [categories, weeklyPicks, latest, topRanked] = await Promise.all([
      getCategories(),
      getWeeklyPicks(5),
      getLatestPeople(10),
      getTopPeople(10),
    ]);

    return {
      categories: categories ?? [],
      weeklyPicks: weeklyPicks ?? [],
      latest: latest ?? [],
      topRanked: topRanked ?? [],
      loadError: null,
    };
  } catch (err) {
    console.error('Supabase loader error:', err);
    return {
      categories: [],
      weeklyPicks: [],
      latest: [],
      topRanked: [],
      loadError: err?.message || String(err),
    };
  }
}

export default function HomePage({ loaderData }) {
  const categories = loaderData?.categories ?? [];
  const weeklyPicks = loaderData?.weeklyPicks ?? [];
  const latest = loaderData?.latest ?? [];
  const topRanked = loaderData?.topRanked ?? [];
  const loadError = loaderData?.loadError;
  const hasNoData = categories.length === 0 && topRanked.length === 0 && latest.length === 0;

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
    <div className="relative overflow-hidden">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Background */}
      <div className="fixed inset-0 -z-10 bg-slate-50" aria-hidden="true" />

      {/* Supabase fetch error */}
      {loadError && (
        <div className="bg-red-50 border-b border-red-200">
          <div className="max-w-[1200px] mx-auto px-6 py-4">
            <p className="text-red-800 font-medium text-sm">Supabase接続エラー</p>
            <p className="text-red-700 text-sm mt-1">{loadError}</p>
            <p className="text-red-600 text-xs mt-2">
              Supabaseダッシュボードで RLS ポリシーを確認するか、<code className="bg-red-100 px-1 rounded">.env</code> に
              <code className="bg-red-100 px-1 rounded">NEXT_PUBLIC_SUPABASE_URL</code> と
              <code className="bg-red-100 px-1 rounded">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> を設定してください。
            </p>
          </div>
        </div>
      )}

      {/* No data banner */}
      {!loadError && hasNoData && (
        <div className="bg-amber-50 border-b border-amber-200">
          <div className="max-w-[1200px] mx-auto px-6 py-4 flex items-center justify-between gap-4 flex-wrap">
            <p className="text-amber-800 text-sm">
              ランキングデータがありません。管理画面からカテゴリと人物を追加してください。
            </p>
            <a
              href="/admin"
              className="text-amber-800 font-medium hover:text-amber-900 underline text-sm shrink-0"
            >
              管理画面へ →
            </a>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative border-b border-slate-200 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 py-24 md:py-32">
          <h1 className="font-display text-5xl md:text-6xl font-bold tracking-widest mb-6 text-gradient-neon">
            イケメン名鑑
          </h1>
          <p className="text-slate-600 max-w-[600px] leading-relaxed text-lg">
            各界で活躍するイケメンを編集部が厳選。スタートアップ、エンターテイメント、スポーツなど、多彩なカテゴリから注目の人物を掲載しています。
          </p>
          <div className="mt-8 flex gap-4">
            {categories.slice(0, 3).map((cat) => (
              <a
                key={cat.id}
                href={`/${cat.slug}`}
                className="px-5 py-2.5 bg-white border border-slate-200 rounded-sm text-indigo-600 text-sm font-medium hover:bg-indigo-50 hover:border-indigo-300 transition-all duration-300 shadow-sm"
              >
                {cat.name_ja}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Empty data banner */}
      {hasNoData && (
        <section className="max-w-[1200px] mx-auto px-6 py-8">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 text-amber-900">
            <h3 className="font-bold mb-2">ランキングデータがありません</h3>
            <p className="text-sm mb-4">
              カテゴリと人物を追加すると、ランキングが表示されます。
              <a href="/admin" className="text-indigo-600 hover:underline font-medium ml-1">管理画面</a>
              からログインしてデータを登録してください。（ログイン: admin@ikemen.jp / admin123）
            </p>
            <p className="text-xs text-amber-700">
              Supabaseの <code className="bg-amber-100 px-1 rounded">categories</code> と <code className="bg-amber-100 px-1 rounded">people</code> テーブルにデータがあるか確認してください。people は <code className="bg-amber-100 px-1 rounded">is_active = true</code> である必要があります。
            </p>
          </div>
        </section>
      )}

      {/* Current Rankings Section */}
      <section className="max-w-[1200px] mx-auto px-6 py-20 border-b border-slate-200">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-px bg-gradient-to-r from-transparent to-indigo-400" />
            <span className="text-xs uppercase tracking-[0.2em] text-indigo-600 font-display">Top 10</span>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-indigo-400" />
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-indigo-600 tracking-wide">
            — 現在のランキング —
          </h2>
          <p className="mt-2 text-slate-500 text-sm">
            全カテゴリを通じたスコア上位 {topRanked.length > 0 ? `${topRanked.length} 名` : '（データなし）'}
          </p>
        </div>
        {topRanked.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {topRanked.map((person, index) => (
              <article key={person.id}>
                <a href={`/p/${person.slug}`} className="group block">
                  <div className="aspect-[3/4] mb-4 relative overflow-hidden rounded-sm border border-slate-200 group-hover:border-indigo-300 transition-all duration-300 bg-white shadow-sm">
                    <div className="absolute top-2 left-2 z-10 font-display text-xl font-bold text-indigo-600 bg-white/95 px-2 py-0.5 rounded shadow-sm">
                      {index + 1}
                    </div>
                    {person.image_url ? (
                      <img
                        src={person.image_url}
                        alt={person.image_alt || person.name_ja}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-100" />
                    )}
                  </div>
                  <h3 className="font-bold text-sm mb-1 text-slate-800">{person.name_ja}</h3>
                  <p className="text-xs text-slate-600">{person.title}</p>
                  <p className="text-xs text-indigo-600 mt-1 font-mono font-semibold">
                    Score: {person.score_total}
                  </p>
                  {person.category?.name_ja && (
                    <p className="text-xs text-slate-500 mt-0.5">{person.category.name_ja}</p>
                  )}
                </a>
              </article>
            ))}
          </div>
        ) : (
          <p className="text-slate-500 text-sm py-8">ランキングデータがありません。<a href="/admin" className="text-indigo-600 hover:underline">管理画面</a>から人物を追加してください。</p>
        )}
      </section>

      {/* Categories Section */}
      <section className="max-w-[1200px] mx-auto px-6 py-20">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-px bg-gradient-to-r from-transparent to-indigo-400" />
            <span className="text-xs uppercase tracking-[0.2em] text-indigo-600 font-display">分野</span>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-indigo-400" />
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-indigo-600 tracking-wide">
            — カテゴリ —
          </h2>
          <p className="mt-2 text-slate-500 text-sm">
            分野別にランキングを閲覧。スタートアップ、エンタメ、スポーツなど {categories.length} カテゴリ
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <a
              key={cat.id}
              href={`/${cat.slug}`}
              className="group bg-white p-6 rounded-sm border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all duration-300 shadow-sm"
            >
              <div className="w-10 h-0.5 bg-gradient-to-r from-indigo-500 to-indigo-400 mb-4" />
              <h3 className="font-display font-bold text-lg mb-2 text-slate-800 group-hover:text-indigo-600 transition-colors">{cat.name_ja}</h3>
              <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 group-hover:text-slate-700 transition-colors">
                {cat.description}
              </p>
            </a>
          ))}
        </div>
      </section>

      {/* Weekly Picks Section */}
      {weeklyPicks.length > 0 && (
        <section className="max-w-[1200px] mx-auto px-6 py-20 border-t border-slate-200">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-10 text-indigo-600 tracking-wide">
            — 今週の注目 —
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {weeklyPicks.map((person) => (
              <article key={person.id}>
                <a href={`/p/${person.slug}`} className="group block">
                  <div className="aspect-[3/4] mb-4 relative overflow-hidden rounded-sm border border-slate-200 group-hover:border-indigo-300 transition-all duration-300 bg-white shadow-sm">
                    {person.image_url ? (
                      <img
                        src={person.image_url}
                        alt={person.image_alt || person.name_ja}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-100" />
                    )}
                  </div>
                  <h3 className="font-bold text-sm mb-1 text-slate-800">{person.name_ja}</h3>
                  <p className="text-xs text-slate-600">{person.title}</p>
                  <p className="text-xs text-indigo-600 mt-1 font-mono font-semibold">
                    Score: {person.score_total}
                  </p>
                </a>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Latest Section */}
      <section className="max-w-[1200px] mx-auto px-6 py-20 border-t border-slate-200">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-px bg-gradient-to-r from-transparent to-indigo-400" />
            <span className="text-xs uppercase tracking-[0.2em] text-indigo-600 font-display">新着</span>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-indigo-400" />
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-indigo-600 tracking-wide">
            — 新着掲載 —
          </h2>
          <p className="mt-2 text-slate-500 text-sm">
            編集部が新たに追加した注目の人物。最新 {latest.length} 名を掲載中
          </p>
        </div>
        <div className="space-y-0">
          {latest.map((person, index) => (
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
                      alt={person.image_alt || person.name_ja}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-100" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-sm mb-1 text-slate-800">{person.name_ja}</h3>
                  <p className="text-xs text-slate-600">{person.title}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-600">{person.category?.name_ja}</span>
                  <p className="text-sm font-bold mt-1 text-indigo-600 font-mono">{person.score_total}</p>
                </div>
              </a>
            </article>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="max-w-[1200px] mx-auto px-6 py-20 border-t border-slate-200">
        <h2 className="font-display text-2xl md:text-3xl font-bold mb-8 text-indigo-600 tracking-wide">
          イケメン名鑑について
        </h2>
        <div className="max-w-none text-slate-600">
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
