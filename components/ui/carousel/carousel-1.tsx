import SectionContainer from "@/components/ui/section-container";
import { stegaClean } from "next-sanity";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselDots,
  CarouselCounter,
} from "@/components/ui/carousel";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";
import { cn } from "@/lib/utils";
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

// Define os tamanhos do carrossel para diferentes números de itens
const CAROUSEL_SIZES = {
  one: "basis-full",
  two: "basis-full md:basis-1/2",
  three: "basis-full md:basis-1/2 lg:basis-1/3",
} as const;

// Define os tamanhos das imagens para diferentes números de itens
const IMAGE_SIZES = {
  one: "h-[30rem] sm:h-[40rem] lg:h-[31.25rem] xl:h-[35rem]",
  two: "h-[30rem] md:h-[22rem] lg:h-[30rem] xl:h-[35rem]",
  three: "h-[30rem] md:h-[20rem] xl:h-[25rem]",
} as const;

// Define o tipo para o tamanho do carrossel
type CarouselSize = keyof typeof CAROUSEL_SIZES;

// Define as propriedades aceitas pelo componente Carousel1
export interface Carousel1Props {
  padding: {
    top: boolean;
    bottom: boolean;
    left: boolean;
  };
  colorVariant:
    | "primary"
    | "secondary"
    | "card"
    | "accent"
    | "destructive"
    | "background"
    | "transparent";
  size: CarouselSize;
  indicators: "none" | "dots" | "count";
  images?: SanityImage[];
}

// Componente principal do carrossel
export default function Carousel1({
  padding,
  colorVariant,
  size = "one",
  indicators = "none",
  images,
}: Partial<Carousel1Props>) {
  // Limpa a cor e os indicadores usando a função stegaClean
  const color = stegaClean(colorVariant);
  const stegaIndicators = stegaClean(indicators);

  return (
    <SectionContainer color={color} padding={padding}>
      {images && images.length > 0 && (
        // Componente Carousel com loop habilitado
        <Carousel loop={true}>
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem
                key={`${index}-${image.alt}`}
                className={CAROUSEL_SIZES[stegaClean(size)]}
              >
                {image && (
                  <div
                    className={cn(
                      "relative mx-auto overflow-hidden rounded-2xl",
                      IMAGE_SIZES[stegaClean(size)],
                      stegaClean(size) === "one" ? "max-w-[35rem]" : undefined
                    )}
                  >
                    <Image
                      className="object-cover"
                      src={
                        image.asset?.['_type'] === "sanity.imageAsset" && image.asset._id === "static"
                          ? "/images/placeholder.svg"
                          : urlForImage(image)?.url() || "/images/placeholder.svg"
                      }
                      alt={image.alt || ""}
                      fill
                      placeholder={
                        image?.asset?.metadata?.lqip ? "blur" : undefined
                      }
                      blurDataURL={image.asset?.metadata?.lqip || undefined}
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      quality={100}
                    />
                  </div>
                )}
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious
            variant="secondary"
            className="-left-3 md:-left-8 xl:-left-12"
          />
          <CarouselNext
            variant="secondary"
            className="-right-3 md:-right-8 xl:-right-12"
          />
          {stegaIndicators !== "none" && (
            <div className="w-full flex justify-center">
              {stegaIndicators === "dots" && <CarouselDots />}
              {stegaIndicators === "count" && <CarouselCounter />}
            </div>
          )}
        </Carousel>
      )}
    </SectionContainer>
  );
}
