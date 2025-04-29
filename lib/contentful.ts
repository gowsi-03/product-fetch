import { createClient, Entry, EntryFieldTypes, EntrySkeletonType } from 'contentful'

export const contentfulClient = createClient({
    space: 'sihfhbb207j5',
    accessToken: 'v4CyQyVfDQ-uqLSj8_0DPqCIsrzGLMCXHY_OfJg0tNs',
    environment: 'master',
  })

export interface CategorySkeleton extends EntrySkeletonType {
  contentTypeId: "category";
  fields: {
    name: EntryFieldTypes.Text;
    slug: EntryFieldTypes.Text;
    description: EntryFieldTypes.Text; 
    image: EntryFieldTypes.AssetLink;
    order: EntryFieldTypes.Integer;
  };
}
  
  export interface ProductSkeleton extends EntrySkeletonType {
    contentTypeId: "product";
    fields: {
        name: EntryFieldTypes.Text;
        slug: EntryFieldTypes.Text;
        category: Entry<CategorySkeleton>;
        price: EntryFieldTypes.Integer;
        description: EntryFieldTypes.Text;
        features: EntryFieldTypes.Text | EntryFieldTypes.Text[];
        primaryImage: EntryFieldTypes.AssetLink;
        galleryImages?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
        relatedProducts?:EntryFieldTypes.Array<EntryFieldTypes.EntryLink<ProductSkeleton>>;
        featured?: EntryFieldTypes.Boolean;
      };
  }

  export interface HomepageEntrySkeleton extends EntrySkeletonType {
    contentTypeId: "homepage";
    fields: {
      title: EntryFieldTypes.Text;
      heroBanner: EntryFieldTypes.AssetLink
      heroHeadline: EntryFieldTypes.Text;
      heroSubtext: EntryFieldTypes.Text;
      featuredCategories: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<CategorySkeleton>>;
      featuredProducts: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<ProductSkeleton>>;
    };
  }
  
