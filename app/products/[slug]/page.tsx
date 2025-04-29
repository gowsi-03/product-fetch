import { contentfulClient, ProductSkeleton, CategorySkeleton } from "@/lib/contentful";
import { Entry } from "contentful";
import { ProductDetail } from "@/components/product/ProductDetail";

// Define the product entry type
type ResolvedProductEntry = Entry<ProductSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>;

// Static Params Generation for Dynamic Routes
export async function generateStaticParams() {
  const products = await contentfulClient.getEntries<ProductSkeleton>({
    content_type: "product",
  });

  // Extract unique slugs from products and their categories
  const slugs = products.items.map((product) => {
    const category = product.fields.category as Entry<CategorySkeleton>;
    return category.fields.slug;
  });

  return slugs.map((slug) => ({ slug })); // Generate static params for each slug
}

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  // You need to await `params` before using its properties
  const { slug } = await params; // Explicitly await the params

  // Fetch products based on the slug from Contentful
  const products = await contentfulClient.getEntries<ProductSkeleton>({
    content_type: "product",
    "fields.slug": slug, // Use the dynamic slug from params
  });

  return (
    <section className="my-8 max-w-[1350px] mx-auto">
      <h1 className="text-2xl font-bold capitalize mb-5 px-4 sm:px-6 md:px-3">
        Product Detail Page
      </h1>

      {products.items.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <div className="space-y-10">
          {products.items.map((product) => (
            <ProductDetail
              key={product.sys.id}
              product={product as ResolvedProductEntry} // Type casting here
            />
          ))}
        </div>
      )}
    </section>
  );
}
