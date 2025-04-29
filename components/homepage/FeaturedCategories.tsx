"use client";

import type { Entry } from "contentful";
import type { CategorySkeleton } from "@/lib/contentful";
import { CategoryCard } from "../Category/CategoryCard";

type ResolvedCategoryEntry = Entry<CategorySkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>;

type FeaturedCategoriesProps = {
  categories: ResolvedCategoryEntry[];
};

export function FeaturedCategories({ categories }: FeaturedCategoriesProps) {
  if (categories.length === 0) return <p>No categories available.</p>;

  return (
    <section className="my-8">
      <h2 className="text-2xl font-semibold mb-4">Featured Categories</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {categories.map((category) => (
          <li key={category.sys.id}>
            <CategoryCard category={category} />
          </li>
        ))}
      </ul>
    </section>
  );
}
