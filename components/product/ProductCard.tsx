"use client";

import Image from "next/image";
import Link from "next/link";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import type { Document } from "@contentful/rich-text-types";
import type { Entry } from "contentful";
import type { ProductSkeleton } from "@/lib/contentful";

type ResolvedProductEntry = Entry<ProductSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>;

type ProductCardProps = {
  product: ResolvedProductEntry;
};

export function ProductCard({ product }: ProductCardProps) {
  const primaryImageUrl = product.fields.primaryImage?.fields?.file?.url;

  return (
    <div className="w-full bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl border border-gray-200">
      <Link href={`/products/${product.fields.slug}`} className="block">
        {primaryImageUrl ? (
          <Image
            src={`https:${primaryImageUrl}`}
            alt={product.fields.name}
            width={288}
            height={320}
            className="h-full w-full object-cover rounded-t-xl"
          />
        ) : (
          <div className="h-48 sm:h-80 w-full bg-gray-200 flex items-center justify-center rounded-t-xl">
            <p className="text-gray-500">Image not available</p>
          </div>
        )}
        <div className="px-4 py-3">
          <span className="text-gray-400 mr-3 uppercase text-xs">Brand</span>
          <p className="text-lg font-bold text-black truncate capitalize">
            {product.fields.name}
          </p>
          <div className="flex items-center">
            <p className="text-lg font-semibold text-black cursor-auto my-3">
              ${product.fields.price}
            </p>
            <div className="ml-auto">
              {/* Shopping Bag Icon */}
              {product.fields.featured && (
                <div>
                  <span className="text-xs text-green-600">Featured</span>
                </div>
              )}
            </div>
          </div>

          {/* If you want description below (optional) */}
          {product.fields.description && typeof product.fields.description === "object" && "content" in product.fields.description ? (
            <div className="text-sm text-gray-600">
              {documentToReactComponents(product.fields.description as Document)}
            </div>
          ) : typeof product.fields.description === "string" ? (
            <p className="text-sm text-gray-600">{product.fields.description}</p>
          ) : null}
        </div>
      </Link>
    </div>
  );
}
