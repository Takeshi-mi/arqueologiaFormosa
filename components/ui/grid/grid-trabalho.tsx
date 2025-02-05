import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";
import { ChevronRight } from "lucide-react";
import { Badge } from "../badge";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export interface GridTrabalhoProps {
  _type?: string;
  _key?: string;
  colorVariant?: "primary" | "secondary" | "card" | "accent" | "destructive" | "background" | "transparent";
  trabalho: Sanity.TrabalhoEscrito;
}

export default function GridTrabalho({
  colorVariant = "background",
  trabalho,
}: GridTrabalhoProps) {
  if (!trabalho) return null;

  const getBorderClass = (variant: string) => {
    return variant === "primary" 
      ? "group-hover:border-primary-foreground/50"
      : "group-hover:border-primary";
  };

  return (
    <Link
      key={trabalho._id}
      className="flex w-full rounded-3xl ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 group"
      href={`/trabalhos/${trabalho.slug.current}`}
    >
      <div
        className={cn(
          "flex w-full flex-col justify-between overflow-hidden transition ease-in-out group border rounded-3xl p-4",
          getBorderClass(colorVariant)
        )}
      >
        <div className="flex flex-col">
          {trabalho.image && trabalho.image.asset && (
            <div className="mb-4 relative h-[15rem] sm:h-[20rem] md:h-[25rem] lg:h-[12rem] xl:h-[15rem] rounded-2xl overflow-hidden">
              <Image
                src={
                  trabalho.image.asset?.['_type'] === "sanity.imageAsset" && trabalho.image.asset._id === "static"
                    ? "/images/placeholder.svg"
                    : urlForImage(trabalho.image)?.url() || "/images/placeholder.svg"
                }
                alt={trabalho.image.alt || trabalho.title}
                placeholder={trabalho.image?.asset?.metadata?.lqip ? "blur" : undefined}
                blurDataURL={trabalho.image.asset?.metadata?.lqip || undefined}
                fill
                style={{
                  objectFit: "cover",
                }}
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                quality={100}
              />
            </div>
          )}
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {trabalho.tipos?.map((tipo) => (
              <Badge key={tipo._id} variant="secondary" className="bg-orange-200 hover:bg-white text-black-500">
                {tipo.title}
              </Badge>
            ))}
            {trabalho.sitios?.map((sitio) => (
              <Badge key={sitio._id} variant="secondary" className="bg-orange-200 hover:bg-white text-black -500">
                {sitio.title}
              </Badge>
            ))}
          </div>

          {/* Título */}
          {trabalho.title && (
            <div className="mb-2">
              <h3 className="font-bold text-[1.5rem] leading-[1.2]">{trabalho.title}</h3>
            </div>
          )}

          {/* Resumo */}
          {trabalho.excerpt && (
            <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{trabalho.excerpt}</p>
          )}

          {/* Metadados */}
          <div className="flex flex-col gap-2 mt-auto">
            {/* Data */}
            {trabalho.publishedAt && (
              <div className="text-sm text-muted-foreground">
                {format(new Date(trabalho.publishedAt), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
              </div>
            )}

            {/* Autores */}
            {trabalho.authors && trabalho.authors.length > 0 && (
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {trabalho.authors.map((author) => (
                    author.image && author.image.asset && (
                      <div
                        key={author._id}
                        className="relative w-6 h-6 rounded-full border-2 border-background overflow-hidden"
                      >
                        <Image
                          src={urlForImage(author.image)?.url() || "/images/placeholder.svg"}
                          alt={author.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  por {trabalho.authors.map(a => a.name).join(", ")}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Ícone de seta */}
        <div className="mt-4 w-10 h-10 border rounded-full flex items-center justify-center group-hover:border-primary">
          <ChevronRight
            className="text-border group-hover:text-primary"
            size={24}
          />
        </div>
      </div>
    </Link>
  );
} 