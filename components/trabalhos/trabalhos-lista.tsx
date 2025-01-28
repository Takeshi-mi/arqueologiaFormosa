"use client";

import { useState } from "react";
import { TrabalhosFilter, FilterState } from "@/components/ui/filters/trabalhos-filter";
import { Card } from "@/components/ui/card";
import { urlForImage } from "@/sanity/lib/image";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Props {
  initialTrabalhos: any[];
  sitios: { title: string; _id: string }[];
  tipos: { title: string; _id: string }[];
}

export function TrabalhosLista({ initialTrabalhos, sitios, tipos }: Props) {
  const [trabalhos, setTrabalhos] = useState(initialTrabalhos);

  const handleFilterChange = (filters: FilterState) => {
    let filteredTrabalhos = [...initialTrabalhos];

    // Filtrar por texto
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredTrabalhos = filteredTrabalhos.filter(
        (trabalho) =>
          trabalho.title.toLowerCase().includes(searchLower) ||
          trabalho.excerpt?.toLowerCase().includes(searchLower)
      );
    }

    // Filtrar por sítios
    if (filters.sitios.length > 0) {
      filteredTrabalhos = filteredTrabalhos.filter((trabalho) =>
        trabalho.sitios?.some((sitio: any) =>
          filters.sitios.includes(sitio._id)
        )
      );
    }

    // Filtrar por tipos
    if (filters.tipos.length > 0) {
      filteredTrabalhos = filteredTrabalhos.filter((trabalho) =>
        trabalho.tipos?.some((tipo: any) =>
          filters.tipos.includes(tipo._id)
        )
      );
    }

    // Filtrar por data
    if (filters.dateRange.from || filters.dateRange.to) {
      filteredTrabalhos = filteredTrabalhos.filter((trabalho) => {
        if (!trabalho.publishedAt) return false;
        const publishedDate = new Date(trabalho.publishedAt);
        
        if (filters.dateRange.from && publishedDate < filters.dateRange.from) {
          return false;
        }
        
        if (filters.dateRange.to && publishedDate > filters.dateRange.to) {
          return false;
        }
        
        return true;
      });
    }

    setTrabalhos(filteredTrabalhos);
  };

  return (
    <div className="flex gap-8">
      {/* Filtro Lateral */}
      <aside className="shrink-0">
        <TrabalhosFilter
          sitios={sitios}
          tipos={tipos}
          onFilterChange={handleFilterChange}
        />
      </aside>

      {/* Lista de Trabalhos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
        {trabalhos.map((trabalho: any) => (
          <Link
            key={trabalho.slug.current}
            href={`/trabalhos/${trabalho.slug.current}`}
            className="no-underline"
          >
            <Card className="h-full hover:shadow-lg transition-shadow">
              <div className="aspect-[16/9] relative">
                {trabalho.image && trabalho.image.asset && (
                  <Image
                    src={urlForImage(trabalho.image)?.url() || "/images/placeholder.svg"}
                    alt={trabalho.image.alt || trabalho.title}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                )}
              </div>
              <div className="p-4 space-y-2">
                <h2 className="text-xl font-semibold line-clamp-2">
                  {trabalho.title}
                </h2>
                
                {trabalho.tipos && trabalho.tipos.length > 0 && (
                  <div className="flex gap-2 flex-wrap">
                    {trabalho.tipos.map((tipo: any) => (
                      <span
                        key={tipo.title}
                        className="bg-primary/10 text-primary text-sm px-2 py-1 rounded"
                      >
                        {tipo.title}
                      </span>
                    ))}
                  </div>
                )}

                {trabalho.excerpt && (
                  <p className="text-muted-foreground line-clamp-2">
                    {trabalho.excerpt}
                  </p>
                )}

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  {trabalho.publishedAt && (
                    <time>
                      {format(new Date(trabalho.publishedAt), "d 'de' MMMM 'de' yyyy", {
                        locale: ptBR,
                      })}
                    </time>
                  )}
                </div>

                {trabalho.authors && trabalho.authors.length > 0 && (
                  <div className="flex items-center gap-2 text-sm">
                    <span>por</span>
                    <div className="font-medium">
                      {trabalho.authors
                        .map((author: any) => author.name)
                        .join(", ")}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
} 