import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { stegaClean } from "next-sanity";
import Link from "next/link";
import Image from "next/image";
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

export interface GridCardProps {
  _type?: string;
  _key?: string;
  padding?: {
    top: boolean;
    bottom: boolean;
  };
  colorVariant?: "primary" | "secondary" | "card" | "accent" | "destructive" | "background" | "transparent";
  title?: string;
  tagLine?: string | null;
  excerpt?: string;
  body?: any;
  image?: SanityImage;
  link?: {
    title: string;
    href: string;
    target?: boolean;
    buttonVariant?:
      | "default"
      | "secondary"
      | "link"
      | "destructive"
      | "outline"
      | "ghost"
      | null
      | undefined;
  };
}

export default function GridCard({
  colorVariant = "background",
  title,
  excerpt,
  image,
  link,
}: GridCardProps) {
  const color = stegaClean(colorVariant);

  return (
    <Link
      key={title}
      className="flex w-full rounded-3xl ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 group"
      href={link?.href ? link.href : "#"}
      target={link?.target ? "_blank" : undefined}
    >
      <div
        className={cn(
          "flex w-full flex-col justify-between overflow-hidden transition ease-in-out border rounded-3xl p-4",
          color === "primary"
            ? "group-hover:border-primary-foreground/50"
            : "group-hover:border-primary"
        )}
      >
        <div>
          {image && image.asset && (
            <div className="mb-4 relative h-[15rem] sm:h-[20rem] md:h-[25rem] lg:h-[9.5rem] xl:h-[12rem] rounded-2xl overflow-hidden">
              <Image
                src={
                  image.asset?.['_type'] === "sanity.imageAsset" && image.asset._id === "static"
                    ? "/images/placeholder.svg"
                    : urlForImage(image)?.url() || "/images/placeholder.svg"
                }
                alt={image.alt || ""}
                placeholder={image?.asset?.metadata?.lqip ? "blur" : undefined}
                blurDataURL={image?.asset?.metadata?.lqip || undefined}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
                quality={100}
              />
            </div>
          )}
          <div
            className={cn(color === "primary" ? "text-background" : undefined)}
          >
            {title && (
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-2xl">{title}</h3>
              </div>
            )}
            {excerpt && <p>{excerpt}</p>}
          </div>
        </div>
        {link && (
          <Button
            className="mt-6"
            size="lg"
            variant={stegaClean(link.buttonVariant)}
            asChild
          >
            <div>{link.title}</div>
          </Button>
        )}
      </div>
    </Link>
  );
}
