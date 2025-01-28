import createImageUrlBuilder from "@sanity/image-url";
import type { SanityImageObject, SanityReference, SanityAsset } from "@sanity/image-url/lib/types/types";
import { dataset, projectId } from "@/sanity/env";

// https://www.sanity.io/docs/image-url

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

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || "",
  dataset: dataset || "",
});

export const urlForImage = (source: SanityImage) => {
  if (!source?.asset?._id && !source?.asset?._ref) {
    return undefined;
  }

  return imageBuilder.image(source).auto("format").fit("max");
};
