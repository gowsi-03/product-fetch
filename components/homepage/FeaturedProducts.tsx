import { ProductCard } from "@/components/product/ProductCard"; // Import it!
import { ProductSkeleton } from "@/lib/contentful";
import { Entry } from "contentful";

type ResolvedProductEntry = Entry<ProductSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>;

type FeaturedProductsProps = {
  products: ResolvedProductEntry[];
};

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  if (products.length === 0) return <p>No products available.</p>;

  return (
    <section className="my-8">
      <h2 className="text-2xl font-semibold mb-4">Featured Products</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-5">
        {products.map((product) => (
          <li key={product.sys.id} className="flex justify-center">
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </section>
  );
}
