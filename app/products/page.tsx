import { fetchProducts } from "@/lib/fetchProducts";
import { ProductCard } from "@/components/product/ProductCard"; 
import { ProductSkeleton } from "@/lib/contentful";
import { Entry } from "contentful";

type ResolvedProductEntry = Entry<ProductSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>;

export default async function ProductsPage() {
  const products = await fetchProducts();

  if (!products || products.length === 0) {
    return <p>No products available.</p>;
  }

  return (
    <section className="max-w-[1350px] mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">All Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product: ResolvedProductEntry) => (
          <ProductCard key={product.sys.id} product={product} />
        ))}
      </div>
    </section>
  );
}
