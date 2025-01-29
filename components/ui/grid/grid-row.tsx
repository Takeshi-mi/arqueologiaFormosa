import { cn } from "@/lib/utils";
import SectionContainer from "@/components/ui/section-container";
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
  id?: string;
}

// map all components you need
const componentMap: { [key: string]: React.ComponentType<any> } = {
  "grid-card": GridCard,
  "pricing-card": PricingCard,
  "grid-post": GridPost,
  "grid-trabalho": GridTrabalho,
};

const getGridClass = (columns: string = "grid-cols-3") => {
  switch (columns) {
    case "grid-cols-2":
      return "lg:grid-cols-2";
    case "grid-cols-3":
      return "lg:grid-cols-3";
    case "grid-cols-4":
      return "lg:grid-cols-4";
    default:
      return "lg:grid-cols-3";
  }
};

export default function GridRow({
  padding,
  colorVariant = "background",
  gridColumns = "grid-cols-3",
  title,
  tagLine,
  body,
  columns,
  id,
}: GridRowProps) {
  return (
    <SectionContainer color={colorVariant} padding={padding} id={id}>
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
            getGridClass(gridColumns)
          )}
        >
          {columns.map((block: Sanity.Block) => {
            const Component = componentMap[block._type];
            if (!Component) {
              return null;
            }
            return <Component {...block} colorVariant={colorVariant} key={block._key} />;
          })}
        </div>
      )}
    </SectionContainer>
  );
}
