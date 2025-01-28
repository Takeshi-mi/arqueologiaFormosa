import Image from "next/image";
import PostDate from "./date";
import { Mail, Facebook } from "lucide-react";
import { urlForImage } from "@/sanity/lib/image";
import type { SanityDocument } from "next-sanity";
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

export interface HeroProps {
  title: string;
  excerpt: string;
  image: Sanity.Image;
  author: {
    name: string;
    image?: Sanity.Image;
  };
  categories: {
    title: string;
  }[];
  date: string;
}

export default function PostHero({
  title,
  author,
  image,
  slug,
  _createdAt,
}: Partial<{
  title: string;
  author: SanityDocument & {
    name: string;
    image?: Sanity.Image;
  };
  excerpt: string;
  image: Sanity.Image;
  slug: { current: string };
  _createdAt: string;
}>) {
  const imageUrl = image && urlForImage(image)?.url();
  const authorImageUrl = author?.image && urlForImage(author.image)?.url();

  return (
    <>
      {title && <h1 className="mb-4 md:mb-6 text-3xl lg:text-5xl">{title}</h1>}
      {image && image.asset && imageUrl && (
        <div className="my-4 md:my-6 rounded-2xl overflow-hidden">
          <Image
            src={imageUrl}
            alt={image.alt || ""}
            placeholder={image.asset?.metadata?.lqip ? "blur" : undefined}
            blurDataURL={image.asset?.metadata?.lqip || undefined}
            width={image.asset?.metadata?.dimensions?.width || 1200}
            height={image.asset?.metadata?.dimensions?.height || 630}
            quality={100}
          />
        </div>
      )}
      <div className="flex items-center justify-between gap-2 text-sm md:text-base">
        <div className="flex flex-col md:flex-row md:items-center gap-2">
          <div className="flex items-center gap-2">
            {author?.image && author.image.asset && authorImageUrl && (
              <div className="relative w-6 h-6 md:w-10 md:h-10">
                <Image
                  src={authorImageUrl}
                  alt={author.image.alt || ""}
                  fill
                  style={{
                    objectFit: "cover",
                  }}
                  placeholder={author.image.asset?.metadata?.lqip ? "blur" : undefined}
                  blurDataURL={author.image.asset?.metadata?.lqip || undefined}
                  sizes="40px"
                  className="w-10 h-10 rounded-full mr-2"
                />
              </div>
            )}
            {author?.name && <div>{author.name}</div>}
            <div className="hidden md:block">•</div>
          </div>
          <PostDate date={_createdAt as string} />
        </div>
        <div className="flex flex-col md:flex-row gap-2">
          <div>Compartilhar</div>
          <div className="flex gap-2">
            <a
              href={`mailto:?subject=${title}&body=Confira este artigo: ${title}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary"
            >
              <Mail size={20} />
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${slug?.current}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary"
            >
              <Facebook size={20} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
