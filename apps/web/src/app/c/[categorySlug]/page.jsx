import {
  categories,
  getCategoryBySlug,
  getPeopleByCategory,
  getTagsByCategory,
} from "@/lib/data";
import CategoryFilters from "@/components/CategoryFilters";

export async function generateStaticParams() {
  return categories.map((cat) => ({ categorySlug: cat.slug }));
}

export async function generateMetadata({ params }) {
  const category = getCategoryBySlug(params.categorySlug);
  if (!category) return {};

  return {
    title: `${category.nameJa} | イケメン名鑑`,
    description: category.description,
  };
}

export default function CategoryPage({ params }) {
  const category = getCategoryBySlug(params.categorySlug);

  if (!category) {
    return (
      <div className="max-w-[1200px] mx-auto px-6 py-16">
        カテゴリが見つかりません
      </div>
    );
  }

  const allPeople = getPeopleByCategory(params.categorySlug);
  const tags = getTagsByCategory(params.categorySlug);

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-12">
      <div className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight mb-4">
          {category.nameJa}
        </h1>
        <p className="text-[#666] leading-relaxed max-w-[800px]">
          {category.description}
        </p>
      </div>

      <CategoryFilters
        allPeople={allPeople}
        tags={tags}
        categorySlug={params.categorySlug}
      />
    </div>
  );
}
