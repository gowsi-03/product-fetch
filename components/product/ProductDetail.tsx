"use client";

import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import type { Document } from "@contentful/rich-text-types";
import type { Asset, Entry } from "contentful";
import type { ProductSkeleton } from "@/lib/contentful";

type ResolvedProductSkeleton = Omit<
  ProductSkeleton,
  "primaryImage" | "galleryImages"
> & {
  primaryImage: Asset<"WITHOUT_UNRESOLVABLE_LINKS", string>;
  galleryImages?: Asset<"WITHOUT_UNRESOLVABLE_LINKS", string>[];
};

type ResolvedProductEntry = Entry<
  ResolvedProductSkeleton,
  "WITHOUT_UNRESOLVABLE_LINKS",
  string
>;

type ProductDetailProps = {
  product: ResolvedProductEntry;
};

export function ProductDetail({ product }: ProductDetailProps) {
  const { fields } = product;
  const featuresList = Array.isArray(fields.features)
    ? fields.features
    : typeof fields.features === "string"
      ? fields.features.split(",").map((feature) => feature.trim())
      : [];

  return (
    <div className="space-y-12 px-4 sm:px-6 md:px-3">
      <div
        key={product.sys.id}
        className="mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12 items-center border border-gray-200 rounded-lg sm:p-8 shadow-md hover:shadow-xl transition-shadow"
      >
        {/* Primary Image */}
        {fields.primaryImage?.fields?.file?.url && (
          <div className="relative max-w-xs mx-auto lg:max-w-none">
            <Image
              width={288}
              height={320}
              src={`https:${fields.primaryImage.fields.file.url}`}
              alt={fields.name}
              className="object-cover rounded-md transition-transform duration-500 hover:scale-105"
            />
            
            {/* Gallery Images inside Primary Image */}
            {fields.galleryImages && fields.galleryImages.length > 0 && (
              <div className="flex gap-2 mt-4 justify-center">
                {(fields.galleryImages as Asset[]).map((image, index) =>
                  image.fields.file?.url ? (
                    <div key={index} className="relative">
                      <Image
                        src={`https:${image.fields.file.url}`}
                        alt={
                          typeof image.fields.title === "string"
                            ? image.fields.title
                            : `Gallery Image ${index + 1}`
                        }
                        width={100}
                        height={100}
                        className="w-20 h-20 object-cover rounded-lg transition-all duration-300"
                      />
                    </div>
                  ) : null
                )}
              </div>
            )}
          </div>
        )}

        {/* Product Info */}
        <div className="text-center lg:text-left flex-1 md:-mt-16 py-4 md:py-0">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-4">{fields.name}</h2>
          <p className="text-xl text-gray-700 font-medium mb-2">
            Price: <span className="font-bold text-green-600">${fields.price}</span>
          </p>

          {/* Product Description */}
          {fields.description &&
            typeof fields.description === "object" &&
            "content" in fields.description ? (
            <div className="text-gray-600 mb-6">
              {documentToReactComponents(fields.description as Document)}
            </div>
          ) : typeof fields.description === "string" ? (
            <p className="text-gray-600 mb-6">{fields.description}</p>
          ) : null}

          {/* Features List */}
          {featuresList.length > 0 && (
            <ul className="list-disc list-inside space-y-1 text-gray-700 mt-6">
              {featuresList.map((feature, index) => (
                <li key={index} className="text-sm">{feature}</li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-12">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Related Products</h3>
        <div className="flex flex-wrap gap-6 justify-center sm:justify-start">
          {fields.relatedProducts?.map((relatedProduct) => {
            if (!relatedProduct) return null;

            const imageUrl =
              relatedProduct?.fields?.primaryImage?.fields?.file?.url;

            return (
              <div
                key={relatedProduct.sys.id}
                className="border p-4 rounded-lg hover:shadow-lg transition-shadow border-gray-200"
              >
                <h4 className="font-medium text-gray-900">{relatedProduct.fields.name}</h4>
                {imageUrl && (
                  <Image
                    src={`https:${imageUrl}`}
                    alt={relatedProduct.fields.name}
                    width={150}
                    height={150}
                    className="rounded-lg mt-2"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
