import { cn } from "@/lib/utils";
import GridTrabalho from "./grid-trabalho";
import type { TrabalhoEscrito } from "@/types/Sanity";

interface TrabalhosGridProps {
  className?: string;
  trabalhos: TrabalhoEscrito[];
  colorVariant?: "primary" | "secondary" | "card" | "accent" | "destructive" | "background" | "transparent";
}

export default function TrabalhosGrid({
  className,
  trabalhos,
  colorVariant = "background",
}: TrabalhosGridProps) {
  if (!trabalhos?.length) return null;

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6",
        className
      )}
    >
      {trabalhos.map((trabalho) => (
        <GridTrabalho
          key={trabalho._id}
          title={trabalho.title}
          slug={trabalho.slug}
          excerpt={trabalho.excerpt}
          image={trabalho.image}
          tipos={trabalho.tipos}
          colorVariant={colorVariant}
        />
      ))}
    </div>
  );
} 