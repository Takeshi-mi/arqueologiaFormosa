import type {
  SanityImageObject,
  SanityImageDimensions,
  SanityReference,
  SanityAsset,
} from "@sanity/image-url/lib/types/types";
import type { SanityDocument } from "next-sanity";

declare global {
  namespace Sanity {
    // pages
    type PageBase = SanityDocument<{
      title?: string;
      slug: { current: string };
      meta_title: string;
      meta_description: string;
      ogImage?: Image;
      noindex: boolean;
    }>;

    type Page = PageBase & {
      readonly _type: "page";
      blocks?: Block[];
    };

    type Post = PageBase &
      SanityDocument<{
        readonly _type: "post";
        excerpt?: string;
        author?: Author;
        categories?: Category[];
        body: any;
        image?: Image;
      }>;

    type Author = SanityDocument<{
      name: string;
      slug: { current: string };
      image?: Image;
    }>;

    type Category = SanityDocument<{
      title: string;
    }>;

    type Image = SanityImageObject & {
      alt?: string;
      asset?: (SanityReference & {
        _type: "reference";
        _id: string;
        metadata?: {
          dimensions?: {
            width: number;
            height: number;
          };
          lqip?: string;
        };
      }) | (SanityAsset & {
        _type: "sanity.imageAsset";
        _id: string;
        metadata?: {
          dimensions?: {
            width: number;
            height: number;
          };
          lqip?: string;
        };
      });
    };

    // objects
    type Block<T = string> = {
      _type: T;
      _key: string;
      uid?: string;
    };
  }
}

export {};
