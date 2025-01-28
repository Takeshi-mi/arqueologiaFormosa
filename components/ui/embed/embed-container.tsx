import SectionContainer, {
  ISectionContainer,
  ISectionPadding,
} from "@/components/ui/section-container";
import { stegaClean } from "next-sanity";

interface IEmbedContainer {
  embedCode?: string;
  minHeight?: string;
  padding?: ISectionPadding;
  colorVariant?: ISectionContainer["color"];
}

export default function EmbedContainer({
  embedCode,
  minHeight = '400px',
  padding = 'lg',
  colorVariant = 'default',
}: IEmbedContainer) {
  const color = stegaClean(colorVariant);

  return (
    <SectionContainer color={color} padding={padding}>
      {embedCode && (
        <div className="flex justify-center items-center">
          <div 
            className="w-full rounded-lg overflow-hidden"
            style={{ minHeight }}
          >
            <div 
              className="w-full h-full"
              dangerouslySetInnerHTML={{ __html: embedCode }} 
            />
          </div>
        </div>
      )}
    </SectionContainer>
  );
} 