"use client";
import SectionContainer from "@/components/ui/section-container";
import { stegaClean } from "next-sanity";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";
import { Fragment } from "react";
import { motion } from "motion/react";
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

export interface LogoCloud1Props {
  padding: {
    top: boolean;
    bottom: boolean;
  };
  colorVariant:
    | "primary"
    | "secondary"
    | "card"
    | "accent"
    | "destructive"
    | "background"
    | "transparent";
  title: string;
  tagLine: string | null;
  body: any;
  images: SanityImage[];
}

export default function LogoCloud1({
  padding,
  colorVariant,
  title,
  images,
}: Partial<LogoCloud1Props>) {
  const color = stegaClean(colorVariant);

  return (
    <SectionContainer
      color={color}
      padding={padding}
      className="overflow-hidden"
    >
      {title && (
        <h2 className="text-lg font-medium tracking-tighter text-center mb-4">
          {title}
        </h2>
      )}
      <div
        className="flex relative overflow-hidden 
            before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-10 
            before:bg-gradient-to-r before:from-background before:to-transparent before:content-[''] 
            after:absolute after:right-0 after:top-0 after:h-full after:w-10 
            after:bg-gradient-to-l after:from-background after:to-transparent after:content-['']"
      >
        <motion.div
          transition={{
            duration: 20,
            ease: "linear",
            repeat: Infinity,
          }}
          animate={{
            x: ["0%", "-50%"],
          }}
          className="flex w-max gap-24 pr-24"
        >
          {[0, 1].map((arrayIndex) => (
            <div key={`group-${arrayIndex}`} className="flex">
              {images?.map((image) => {
                const assetId = image.asset?.['_type'] === "sanity.imageAsset" 
                  ? image.asset._id 
                  : image.asset?.['_type'] === "reference"
                    ? image.asset._ref
                    : '';

                return (
                  <div
                    key={`${assetId}-${arrayIndex}`}
                    className="flex-shrink-0 w-24 h-24 flex items-center justify-center"
                  >
                    <Image
                      src={urlForImage(image)?.url() || "/images/placeholder.svg"}
                      alt={image.alt || ""}
                      placeholder={
                        image?.asset?.metadata?.lqip ? "blur" : undefined
                      }
                      blurDataURL={image?.asset?.metadata?.lqip || undefined}
                      width={image.asset?.metadata?.dimensions?.width || 220}
                      height={image?.asset?.metadata?.dimensions?.height || 90}
                    />
                  </div>
                );
              })}
            </div>
          ))}
        </motion.div>
      </div>
    </SectionContainer>
  );
}
