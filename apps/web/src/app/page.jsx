import { categories, people } from "@/lib/data";

export default function HomePage() {
  const weeklyPicks = people.filter((p) => p.weeklyPick).slice(0, 5);
  const latest = [...people]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 10);

  return (
    <div>
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

      <section className="max-w-[1200px] mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold mb-8">カテゴリ</h2>
        <div className="grid grid-cols-3 gap-6">
          {categories.map((cat) => (
            <a
              key={cat.id}
              href={`/c/${cat.slug}`}
              className="border border-[#e5e5e5] p-6 hover:border-[#1e3a8a] transition-colors"
            >
              <h3 className="font-bold text-lg mb-2">{cat.nameJa}</h3>
              <p className="text-sm text-[#666] leading-relaxed line-clamp-3">
                {cat.description}
              </p>
            </a>
          ))}
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-6 py-16 border-t border-[#e5e5e5]">
        <h2 className="text-2xl font-bold mb-8">今週の注目</h2>
        <div className="grid grid-cols-5 gap-6">
          {weeklyPicks.map((person) => (
            <a key={person.id} href={`/p/${person.slug}`} className="group">
              <div className="aspect-[3/4] bg-[#f5f5f5] mb-3 relative overflow-hidden">
                <img
                  src={person.image.src}
                  alt={person.image.alt}
                  className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
                />
              </div>
              <h3 className="font-bold text-sm mb-1">{person.nameJa}</h3>
              <p className="text-xs text-[#666]">{person.title}</p>
              <p className="text-xs text-[#999] mt-1">
                Score: {person.scoreTotal}
              </p>
            </a>
          ))}
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-6 py-16 border-t border-[#e5e5e5]">
        <h2 className="text-2xl font-bold mb-8">新着掲載</h2>
        <div className="space-y-4">
          {latest.map((person) => (
            <a
              key={person.id}
              href={`/p/${person.slug}`}
              className="flex items-center gap-4 border-b border-[#f0f0f0] pb-4 hover:bg-[#fafafa] px-4 -mx-4 transition-colors"
            >
              <div className="w-16 h-16 bg-[#f5f5f5] flex-shrink-0 relative overflow-hidden">
                <img
                  src={person.image.src}
                  alt={person.image.alt}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-sm mb-1">{person.nameJa}</h3>
                <p className="text-xs text-[#666]">{person.title}</p>
              </div>
              <div className="text-right">
                <span className="text-xs text-[#999]">
                  {
                    categories.find((c) => c.slug === person.categorySlug)
                      ?.nameJa
                  }
                </span>
                <p className="text-sm font-bold mt-1">{person.scoreTotal}</p>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
