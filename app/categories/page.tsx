
import { CategorySkeleton } from "@/lib/contentful";
import { Entry } from "contentful";
import { fetchCategories } from "@/lib/fetchCategories";
import { CategoryCard } from "@/components/Category/CategoryCard";

type ResolvedProductEntry = Entry<CategorySkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>;

export default async function CategoryPage() {
  const categories = await fetchCategories();

  if (!categories || categories.length === 0) {
    return <p>No products available.</p>;
  }

  return (
    <section className="max-w-[1350px] mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">All Categories</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {categories.map((category: ResolvedProductEntry) => (
          <CategoryCard key={category.sys.id} category={category} />
        ))}
      </div>
    </section>
  );
}
