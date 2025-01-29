"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";
import { stegaClean } from "next-sanity";
import PortableTextRenderer from "@/components/portable-text-renderer";
import type { SanityImageObject, SanityReference, SanityAsset } from "@sanity/image-url/lib/types/types";
import SectionContainer from "@/components/ui/section-container";

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

export interface Hero1Props {
  padding: {
    top: boolean;
    bottom: boolean;
  };
  colorVariant: "primary" | "secondary" | "card" | "accent" | "destructive" | "background" | "transparent";
  title: string;
  tagLine: string | null;
  body: any;
  image: SanityImage;
  links?: Array<{
    title: string;
    href: string;
    target?: boolean;
    buttonVariant?: "default" | "secondary" | "link" | "destructive" | "outline" | "ghost" | null | undefined;
  }>;
  id?: string;
}

export default function Hero1({
  padding,
  colorVariant = "background",
  title,
  tagLine,
  body,
  image,
  links,
  id,
}: Hero1Props) {
  console.log("Hero1 ID:", id);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      const element = document.getElementById(targetId);
      
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
        
        // Ajuste adicional para o header fixo
        const headerOffset = 96;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = window.scrollY + elementPosition - headerOffset;
        
        setTimeout(() => {
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }, 0);
      }
    }
  };

  return (
    <SectionContainer color={colorVariant} padding={padding} id={id}>
      <div className="container dark:bg-background py-20 lg:pt-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="flex flex-col justify-center">
            {tagLine && (
              <h1 className="leading-[0] font-sans">
                <span className="text-base font-semibold">{tagLine}</span>
              </h1>
            )}
            {title && <h2 className="mt-6 font-bold leading-[1.1]">{title}</h2>}
            {body && (
              <div className="text-lg mt-6">
                <PortableTextRenderer value={body} />
              </div>
            )}
            {links && links.length > 0 && (
              <div className="mt-10 flex gap-4">
                {links.map((link, index) => (
                  <Button
                    key={index}
                    variant={stegaClean(link.buttonVariant)}
                    asChild
                  >
                    <Link
                      href={link.href}
                      target={link.target ? "_blank" : undefined}
                      rel={link.target ? "noopener" : undefined}
                      onClick={(e) => handleScroll(e, link.href)}
                    >
                      {link.title}
                    </Link>
                  </Button>
                ))}
              </div>
            )}
          </div>
          <div className="flex flex-col justify-center">
            {image && image.asset?._id && (
              <Image
                className="rounded-xl"
                src={urlForImage(image)?.url() || "/images/placeholder.svg"}
                alt={image.alt || ""}
                width={image.asset?.metadata?.dimensions?.width || 800}
                height={image.asset?.metadata?.dimensions?.height || 800}
                placeholder={image?.asset?.metadata?.lqip ? "blur" : undefined}
                blurDataURL={image?.asset?.metadata?.lqip || ""}
                quality={100}
              />
            )}
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
