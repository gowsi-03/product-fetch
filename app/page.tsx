import { contentfulClient, CategorySkeleton, HomepageEntrySkeleton, ProductSkeleton } from "@/lib/contentful";
import { HeroSection } from "@/components/homepage/HeroSection";
import { FeaturedCategories } from "@//components/homepage/FeaturedCategories";
import { FeaturedProducts } from "@/components/homepage/FeaturedProducts";
import { Entry } from "contentful";

type ResolvedCategoryEntry = Entry<CategorySkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>;
type ResolvedProductEntry = Entry<ProductSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>;

export default async function Home() {
  const res = await contentfulClient
    .withoutUnresolvableLinks
    .getEntries<HomepageEntrySkeleton>({
      content_type: "homepage",
      limit: 1,
      include: 2,
    });

  const homepage = res.items[0];

  if (!homepage) {
    return <p>No homepage content found.</p>;
  }

  const { heroBanner, heroHeadline, heroSubtext, featuredCategories = [], featuredProducts = [] } = homepage.fields;

  const resolvedCategories = featuredCategories.filter((cat): cat is ResolvedCategoryEntry => !!cat);
  const resolvedProducts = featuredProducts.filter((prod): prod is ResolvedProductEntry => !!prod);

  return (
    <main className="max-w-[1350px] mx-auto px-4">
      
      <HeroSection
        heroBanner={heroBanner}
        heroHeadline={heroHeadline}
        heroSubtext={heroSubtext}
      />
      
      <FeaturedCategories categories={resolvedCategories} />
      
      <FeaturedProducts products={resolvedProducts} />
    </main>
  );
}




// // pages/index.tsx (or your component file)

// import { Asset, Entry } from "contentful";
// import Image from "next/image";
// import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
// import type { Document } from "@contentful/rich-text-types";

// import {
//   contentfulClient,
//   CategorySkeleton,
//   HomepageEntrySkeleton,
//   ProductSkeleton,
// } from "@/lib/contentful";

// type ResolvedCategoryEntry = Entry<
//   CategorySkeleton,
//   "WITHOUT_UNRESOLVABLE_LINKS",
//   string
// >;

// // type ResolvedProductEntry = Entry<ProductSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>;

// type ResolvedProductSkeleton = Omit<ProductSkeleton, "primaryImage" | "galleryImages"> & {
//   primaryImage: Asset<"WITHOUT_UNRESOLVABLE_LINKS", string>;
//   galleryImages?: Asset<"WITHOUT_UNRESOLVABLE_LINKS", string>[];
// };

// type ResolvedProductEntry = Entry<ResolvedProductSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>;

// export default async function Home() {
//   // Fetch homepage entry with resolved links
//   const res = await contentfulClient
//    .withoutUnresolvableLinks 
//     .getEntries<HomepageEntrySkeleton>({
//       content_type: "homepage",
//     });

//   const homepage = res.items[0];
// console.log(homepage);

//   if (!homepage) {
//     return <p>No homepage content found.</p>;
//   }

//   const {
//     title,
//     heroBanner,
//     heroHeadline,
//     heroSubtext,
//     featuredCategories = [],
//     featuredProducts = [],
//   } = homepage.fields;

//   // Cast heroBanner to Asset type safely
//   const heroBannerUrl = heroBanner?.fields?.file?.url;

//   // Filter out any undefined categories (due to typing)
//   const resolvedCategories = featuredCategories.filter(
//     (cat): cat is ResolvedCategoryEntry => !!cat
//   );

//   const resolvedProducts = featuredProducts.filter(
//     (prod): prod is ResolvedProductEntry => !!prod
//   );

//   return (
//     <main className="p-6">
//       <h1 className="text-3xl font-bold">{title}</h1>

//       {/* Hero Section */}
//       <section className="my-8">
//         {heroBannerUrl ? (
//           <Image
//             src={`https:${heroBannerUrl}`}
//             alt={heroBanner.fields.title ?? "Hero Banner"}
//             width={1200}
//             height={600}
//             className="w-full rounded-lg shadow-md"
//           />
//         ) : (
//           <p>Hero banner image not available.</p>
//         )}

//         <h2 className="text-2xl font-semibold mt-4">{heroHeadline}</h2>

//         {heroSubtext && typeof heroSubtext === "object" && "content" in heroSubtext ? (
//           <div>{documentToReactComponents(heroSubtext as Document)}</div>
//         ) : typeof heroSubtext === "string" ? (
//           <p>{heroSubtext}</p>
//         ) : null}
//       </section>

//       {/* Featured Categories Section */}
//       <section className="my-8">
//         <h2 className="text-2xl font-semibold mb-4">Featured Categories</h2>
//         <ul className="grid grid-cols-2 gap-4">
//           {resolvedCategories.map((category) => {
//             const imageUrl = category.fields.image?.fields?.file?.url;
//             return (
//               <li
//                 key={category.sys.id}
//                 className="p-4 border rounded-lg shadow-sm"
//               >
//                 <h3 className="text-lg font-bold">{category.fields.name}</h3>
//                 {imageUrl ? (
//                   <Image
//                     src={`https:${imageUrl}`}
//                     alt={category.fields.name}
//                     width={300}
//                     height={200}
//                     className="rounded-md"
//                   />
//                 ) : (
//                   <p>Image not available</p>
//                 )}
//               </li>
//             );
//           })}
//         </ul>
//       </section>

//       <section>
//       <h2 className="text-2xl font-semibold mb-4">Featured Categories</h2>
//         <ul className="grid grid-cols-2 gap-4">
//         {resolvedProducts.map((product) => {
//   const primaryImageUrl = product.fields.primaryImage?.fields?.file?.url;
//   return (
//     <li
//       key={product.sys.id}
//       className="p-4 border rounded-lg shadow-sm"
//     >
//       <h3 className="text-lg font-bold">{product.fields.name}</h3>
//       {primaryImageUrl ? (
//         <Image
//           src={`https:${primaryImageUrl}`}
//           alt={product.fields.name}
//           width={300}
//           height={200}
//           className="rounded-md"
//         />
//       ) : (
//         <p>Image not available</p>
//       )}

//       {/* Render rich text description properly */}
//       {product.fields.description && typeof product.fields.description === "object" && "content" in product.fields.description ? (
//         <div>{documentToReactComponents(product.fields.description as Document)}</div>
//       ) : typeof product.fields.description === "string" ? (
//         <p>{product.fields.description}</p>
//       ) : null}
//     </li>
//   );
// })}
//         </ul>
//       </section>
//     </main>
//   );
// }