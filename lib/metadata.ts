import { urlForImage } from "@/sanity/lib/image";
import type { SanityImageObject, SanityReference, SanityAsset } from "@sanity/image-url/lib/types/types";

type SanityImage = SanityImageObject & {
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

const isProduction = process.env.NEXT_PUBLIC_SITE_ENV === "production";

export function generatePageMetadata({
  page,
  slug,
}: {
  page: {
    meta_title: string;
    meta_description: string;
    ogImage?: SanityImage;
    noindex: boolean;
  };
  slug: string;
}) {
  const imageUrl = page?.ogImage ? urlForImage(page.ogImage)?.url() : null;
  const dimensions = page?.ogImage?.asset?.metadata?.dimensions;

  return {
    title: page?.meta_title,
    description: page?.meta_description,
    openGraph: imageUrl && dimensions
      ? {
          title: page?.meta_title,
          description: page?.meta_description,
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/${slug}`,
          images: [
            {
              url: imageUrl,
              width: dimensions.width,
              height: dimensions.height,
            },
          ],
        }
      : {},
    robots: {
      index: !page?.noindex,
      follow: !page?.noindex,
    },
    alternates: {
      canonical: `/${slug === "index" ? "" : slug}`,
    },
  };
}
