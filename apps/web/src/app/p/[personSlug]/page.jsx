import {
  people,
  getPersonBySlug,
  getRelatedPeople,
  getTopInCategory,
  getCategoryBySlug,
} from "@/lib/data";
import VoteButton from "@/components/VoteButton";
import ScoreBreakdown from "@/components/ScoreBreakdown";

export async function generateStaticParams() {
  return people.map((p) => ({ personSlug: p.slug }));
}

export async function generateMetadata({ params }) {
  const person = getPersonBySlug(params.personSlug);
  if (!person) return {};

  const category = getCategoryBySlug(person.categorySlug);

  return {
    title: `${person.nameJa} | ${category?.nameJa} | イケメン名鑑`,
    description: person.bioShort,
  };
}

export default function PersonPage({ params }) {
  const person = getPersonBySlug(params.personSlug);

  if (!person) {
    return (
      <div className="max-w-[1200px] mx-auto px-6 py-16">
        ページが見つかりません
      </div>
    );
  }

  const category = getCategoryBySlug(person.categorySlug);
  const related = getRelatedPeople(person, 4);
  const topInCategory = getTopInCategory(person.categorySlug, 5);

  return (
    <div>
      <div className="max-w-[1000px] mx-auto px-6 py-12">
        <div className="mb-4 text-sm">
          <a href="/" className="text-[#999] hover:text-[#1e3a8a]">
            ホーム
          </a>
          <span className="text-[#999] mx-2">/</span>
          <a
            href={`/c/${category?.slug}`}
            className="text-[#999] hover:text-[#1e3a8a]"
          >
            {category?.nameJa}
          </a>
          <span className="text-[#999] mx-2">/</span>
          <span>{person.nameJa}</span>
        </div>

        <div className="grid grid-cols-5 gap-12 mb-16">
          <div className="col-span-2">
            <div className="aspect-[3/4] bg-[#f5f5f5] mb-4 relative overflow-hidden">
              <img
                src={person.image.src}
                alt={person.image.alt}
                className="w-full h-full object-cover"
              />
            </div>
            <VoteButton personId={person.id} />
          </div>

          <div className="col-span-3">
            <div className="mb-6">
              <h1 className="text-4xl font-bold tracking-tight mb-2">
                {person.nameJa}
              </h1>
              {person.nameKana && (
                <p className="text-sm text-[#999] mb-4">{person.nameKana}</p>
              )}
              <p className="text-lg text-[#666]">{person.title}</p>
            </div>

            <div className="mb-8">
              <div className="flex gap-2 mb-4">
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

            <div className="mb-8 pb-8 border-b border-[#e5e5e5]">
              <h2 className="font-bold mb-3">プロフィール</h2>
              <p className="text-[#666] leading-relaxed">{person.bioShort}</p>
            </div>

            <div className="mb-8 pb-8 border-b border-[#e5e5e5]">
              <h2 className="font-bold mb-3">イケメン評</h2>
              <p className="text-[#666] leading-relaxed">{person.editorial}</p>
            </div>

            {person.links && Object.keys(person.links).length > 0 && (
              <div className="mb-8">
                <h2 className="font-bold mb-3">リンク</h2>
                <div className="flex flex-col gap-2">
                  {person.links.x && (
                    <a
                      href={person.links.x}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[#1e3a8a] hover:underline"
                    >
                      X (Twitter)
                    </a>
                  )}
                  {person.links.instagram && (
                    <a
                      href={person.links.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[#1e3a8a] hover:underline"
                    >
                      Instagram
                    </a>
                  )}
                  {person.links.official && (
                    <a
                      href={person.links.official}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[#1e3a8a] hover:underline"
                    >
                      公式サイト
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">スコア内訳</h2>
          <ScoreBreakdown scores={person.scores} total={person.scoreTotal} />
        </div>

        {related.length > 0 && (
          <div className="mb-16 pb-16 border-b border-[#e5e5e5]">
            <h2 className="text-2xl font-bold mb-6">似ているタイプ</h2>
            <div className="grid grid-cols-4 gap-6">
              {related.map((p) => (
                <a key={p.id} href={`/p/${p.slug}`} className="group">
                  <div className="aspect-[3/4] bg-[#f5f5f5] mb-3 relative overflow-hidden">
                    <img
                      src={p.image.src}
                      alt={p.image.alt}
                      className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
                    />
                  </div>
                  <h3 className="font-bold text-sm mb-1">{p.nameJa}</h3>
                  <p className="text-xs text-[#666]">{p.title}</p>
                </a>
              ))}
            </div>
          </div>
        )}

        {topInCategory.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">同カテゴリの上位</h2>
            <div className="space-y-4">
              {topInCategory.map((p, index) => (
                <a
                  key={p.id}
                  href={`/p/${p.slug}`}
                  className="flex items-center gap-4 pb-4 border-b border-[#f0f0f0] hover:bg-[#fafafa] px-4 -mx-4 transition-colors"
                >
                  <div className="w-8 text-center">
                    <span className="text-lg font-bold text-[#999]">
                      {index + 1}
                    </span>
                  </div>
                  <div className="w-16 h-16 bg-[#f5f5f5] flex-shrink-0 relative overflow-hidden">
                    <img
                      src={p.image.src}
                      alt={p.image.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-sm mb-1">{p.nameJa}</h3>
                    <p className="text-xs text-[#666]">{p.title}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold">{p.scoreTotal}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
