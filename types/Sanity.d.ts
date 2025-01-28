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

    export interface TrabalhoEscrito extends SanityDocument {
      _type: "trabalho-escrito";
      title: string;
      slug: Slug;
      excerpt?: string;
      authors: Author[];
      tipos: TipoTrabalho[];
      sitios?: Sitio[];
      publishedAt?: string;
      image?: Image;
      categories?: Category[];
      body?: Block[];
      buttons?: Link[];
      meta_title?: string;
      meta_description?: string;
      noindex?: boolean;
      ogImage?: Image;
    }

    export interface TipoTrabalho extends SanityDocument {
      _type: "tipo-trabalho";
      title: string;
      description?: string;
      orderRank?: number;
    }
  }
}

export {};
