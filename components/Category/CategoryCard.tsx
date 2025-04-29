"use client";

import Image from "next/image";
import Link from "next/link";
import type { Entry } from "contentful";
import type { CategorySkeleton } from "@/lib/contentful"; 
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

type ResolvedCategoryEntry = Entry<
  CategorySkeleton,
  "WITHOUT_UNRESOLVABLE_LINKS",
  string
>;

type CategoryCardProps = {
  category: ResolvedCategoryEntry;
};

export function CategoryCard({ category }: CategoryCardProps) {
  const imageUrl = category.fields.image?.fields?.file?.url;

  return (
    <Link
      href={`/categories/${category.fields.slug}`}
      className="flex flex-col lg:flex-row bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 w-full max-w-2xl mx-auto"
    >
      {imageUrl ? (
        <Image
          src={`https:${imageUrl}`}
          alt={category.fields.name}
          width={400}
          height={400}
          className="w-full lg:w-48 sm:h-48 xl:h-36 rounded-t-lg sm:rounded-l-lg object-cover"
        />
      ) : (
        <div className="flex items-center justify-center w-full sm:w-48 sm:h-48 bg-gray-200 rounded-t-lg sm:rounded-l-lg">
          <p className="text-gray-500 dark:text-gray-400">No Image</p>
        </div>
      )}

      <div className="flex flex-col justify-between p-4 md:p-6 leading-normal">
        <h5 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {category.fields.name}
        </h5>
        {category.fields.description &&
        typeof category.fields.description === "object" &&
        "content" in category.fields.description ? (
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {documentToReactComponents(category.fields.description)}
          </div>
        ) : typeof category.fields.description === "string" ? (
          <p className="text-sm text-gray-600 dark:text-gray-400">{category.fields.description}</p>
        ) : null}
      </div>
    </Link>
  );
}
