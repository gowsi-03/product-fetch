import { contentfulClient } from "./contentful"; // your Contentful client
import type { CategorySkeleton, ProductSkeleton } from "@/lib/contentful";
import type { Entry } from "contentful";

export async function fetchProducts() {
  const response = await contentfulClient.getEntries<ProductSkeleton>({
    content_type: "product",
  });

  return response.items as Entry<ProductSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>[];
}


export async function fetchCategories() {
    const response = await contentfulClient.getEntries<CategorySkeleton>({
      content_type: "category",
    });
  
    return response.items as Entry<CategorySkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>[];
  }
  