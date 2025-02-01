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
            <a
              className="hover:text-primary"
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                `${title}\n\n${process.env.NEXT_PUBLIC_SITE_URL}/blog/${slug?.current}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Compartilhe no WhatsApp"
              title="Compartilhe no WhatsApp"
            >
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 32 32" 
                fill="currentColor" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M16 2C8.27812 2 2 8.27812 2 16C2 18.8375 2.925 21.5031 4.52187 23.7156L2.25625 29.7438L8.45312 27.5219C10.5844 28.9781 13.1969 29.8438 16 29.8438C23.7219 29.8438 30 23.5656 30 15.8438C30 8.12187 23.7219 2 16 2ZM22.7031 20.5219C22.4094 21.2625 21.2563 21.9156 20.3813 22.0781C19.7281 22.1969 18.8844 22.2844 16.8781 21.4406C14.1844 20.2875 12.4406 17.5312 12.2781 17.3063C12.1156 17.0812 10.9 15.4813 10.9 13.8188C10.9 12.1562 11.7844 11.3344 12.1406 10.9469C12.4344 10.6219 12.8844 10.5031 13.3031 10.5031C13.4344 10.5031 13.5656 10.5031 13.6969 10.5031C14.0531 10.5031 14.2156 10.5344 14.4406 11.0156C14.7344 11.6062 15.3250 13.2688 15.4063 13.4313C15.4875 13.5938 15.5688 13.8188 15.4469 14.0438C14.7344 15.4813 13.9531 15.4 14.3719 16.0531C15.7469 17.9969 16.8781 18.5875 18.5406 19.3281C18.9594 19.5219 19.1844 19.4813 19.3875 19.2156C19.5906 18.9906 20.1406 18.3375 20.3438 17.9594C20.5469 17.5406 20.8094 17.5813 21.1031 17.6844C21.4281 17.7875 23.0500 18.5875 23.4063 18.7500C23.7625 18.9125 24.0156 18.9938 24.0969 19.1156C24.1781 19.3188 24.1781 19.9094 23.8844 20.6500L22.7031 20.5219Z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
