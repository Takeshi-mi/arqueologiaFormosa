import { cn } from "@/lib/utils";
import GridTrabalho from "./grid-trabalho";

interface TrabalhosGridProps {
  className?: string;
  trabalhos: Sanity.TrabalhoEscrito[];
}

export default function TrabalhosGrid({
  className,
  trabalhos,
}: TrabalhosGridProps) {
  return (
    <div className={cn("grid gap-8 md:grid-cols-2 lg:grid-cols-3", className)}>
      {trabalhos.map((trabalho) => (
        <GridTrabalho key={trabalho._id} trabalho={trabalho} />
      ))}
    </div>
  );
} 