import { cn } from "@/lib/utils";
import SectionContainer from "@/components/ui/section-container";
import { stegaClean } from "next-sanity";
// import only the components you need
import GridCard from "./grid-card";
import PricingCard from "./pricing-card";
import GridPost from "./grid-post";
import GridTrabalho from "./grid-trabalho";

export interface GridRowProps {
  _type?: string;
  _key?: string;
  padding?: {
    top: boolean;
    bottom: boolean;
  };
  colorVariant?: "primary" | "secondary" | "card" | "accent" | "destructive" | "background" | "transparent";
  gridColumns?: "grid-cols-2" | "grid-cols-3" | "grid-cols-4";
  title?: string;
  tagLine?: string | null;
  body?: any;
  columns?: Sanity.Block[];
}

// map all components you need
const componentMap: { [key: string]: React.ComponentType<any> } = {
  "grid-card": GridCard,
  "pricing-card": PricingCard,
  "grid-post": GridPost,
  "grid-trabalho": GridTrabalho,
};

export default function GridRow({
  padding,
  colorVariant = "background",
  gridColumns = "grid-cols-3",
  title,
  tagLine,
  body,
  columns,
}: GridRowProps) {
  const color = stegaClean(colorVariant);
  const cleanGridColumns = stegaClean(gridColumns);

  console.log('Grid Columns:', cleanGridColumns); // Para debug

  return (
    <SectionContainer color={color} padding={padding}>
      {title && (
        <div className="text-center mb-10">
          {tagLine && (
            <h2 className="leading-[0] mb-4">
              <span className="text-base font-semibold">{tagLine}</span>
            </h2>
          )}
          <h3 className="font-bold">{title}</h3>
          {body && <div className="mt-4">{body}</div>}
        </div>
      )}
      {columns && columns?.length > 0 && (
        <div
          className={cn(
            "grid grid-cols-1 gap-6 md:grid-cols-2",
            {
              "lg:grid-cols-2": cleanGridColumns === "grid-cols-2",
              "lg:grid-cols-3": cleanGridColumns === "grid-cols-3",
              "lg:grid-cols-4": cleanGridColumns === "grid-cols-4",
            }
          )}
        >
          {columns.map((block: Sanity.Block) => {
            console.log('Block data:', block); // Para debug
            const Component = componentMap[block._type];
            if (!Component) {
              // Fallback for unknown block types to debug
              console.log('Unknown block type:', block._type); // Para debug
              return <div data-type={block._type} key={block._key} />;
            }
            return <Component {...block} colorVariant={color} key={block._key} />;
          })}
        </div>
      )}
    </SectionContainer>
  );
}
