import Image from "next/image";
import { CategorySkeleton, contentfulClient, ProductSkeleton } from "@/lib/contentful";
import { Entry } from "contentful";

type CategoryPageProps = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  const products = await contentfulClient.getEntries<ProductSkeleton>({
    content_type: "product",
  });

  const slugs = products.items.map((product) => {
    const category = product.fields.category as Entry<CategorySkeleton>;
    return category.fields.slug;
  });

  return slugs.map((slug) => ({ slug }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = params;

  const products = await contentfulClient.getEntries<ProductSkeleton>({
    content_type: "product",
  });

  const filteredProducts = products.items.filter((product) => {
    const category = product.fields.category as Entry<CategorySkeleton>;
    return category.fields.slug === slug;
  });

  return (
    <section className="my-8 max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-4">
      <h1 className="text-3xl font-bold capitalize mb-6">{slug} Products</h1>
      {filteredProducts.length === 0 ? (
        <p>No products found in {slug} category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.sys.id} className="border border-gray-200 rounded-lg p-4">
              <h2 className="text-xl font-semibold">{product.fields.name}</h2>
              <p>Price: ${product.fields.price}</p>
              {product.fields.primaryImage &&
                "fields" in product.fields.primaryImage &&
                product.fields.primaryImage.fields?.file?.url && (
                  <Image
                    width={400}
                    height={400}
                    src={`https:${product.fields.primaryImage.fields.file.url}`}
                    alt={product.fields.name}
                    className="w-full h-auto rounded-md mt-2"
                  />
                )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
