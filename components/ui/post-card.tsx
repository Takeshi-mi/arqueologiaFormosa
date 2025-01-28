import { cn } from "@/lib/utils";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";
import { ChevronRight } from "lucide-react";
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

export interface PostCardProps {
  title: string;
  excerpt: string;
  slug: string;
  image: SanityImage;
  author: {
    name: string;
    image: SanityImage;
  };
  categories: {
    title: string;
  }[];
  date: string;
}

export default function PostCard({
  className,
  title,
  excerpt,
  image,
}: Partial<{
  className: string;
  title: string;
  excerpt: string;
  image: SanityImage;
}>) {
  return (
    <div
      className={cn(
        "flex w-full flex-col justify-between overflow-hidden transition ease-in-out group border rounded-3xl p-4 hover:border-primary",
        className
      )}
    >
      <div className="flex flex-col">
        {image && image.asset && (
          <div className="mb-4 relative h-[15rem] sm:h-[20rem] md:h-[25rem] lg:h-[9.5rem] xl:h-[12rem] rounded-2xl overflow-hidden">
            <Image
              src={urlForImage(image)?.url() || "/images/placeholder.svg"}
              alt={image.alt || ""}
              placeholder={image.asset?.metadata?.lqip ? "blur" : undefined}
              blurDataURL={image.asset?.metadata?.lqip || undefined}
              fill
              style={{
                objectFit: "cover",
              }}
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              quality={100}
            />
          </div>
        )}
        {title && (
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-[1.5rem] leading-[1.2]">{title}</h3>
          </div>
        )}
        {excerpt && <p>{excerpt}</p>}
      </div>
      <div className="mt-3 xl:mt-6 w-10 h-10 border rounded-full flex items-center justify-center group-hover:border-primary">
        <ChevronRight
          className="text-border group-hover:text-primary"
          size={24}
        />
      </div>
    </div>
  );
}
