import { contentfulClient } from "./contentful"; // your Contentful client
import type { CategorySkeleton } from "@/lib/contentful";
import type { Entry } from "contentful";

export async function fetchCategories() {
  const response = await contentfulClient.getEntries<CategorySkeleton>({
    content_type: "category",
  });

  return response.items as Entry<
    CategorySkeleton,
    "WITHOUT_UNRESOLVABLE_LINKS",
    string
  >[];
}
