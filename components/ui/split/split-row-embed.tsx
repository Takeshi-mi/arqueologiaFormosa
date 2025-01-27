import SectionContainer, {
  ISectionContainer,
  ISectionPadding,
} from "@/components/ui/section-container";
import { stegaClean } from "next-sanity";
import { PortableText } from "@portabletext/react";

interface ISplitColumnEmbed {
  position?: "left" | "right";
  tagLine?: string;
  title?: string;
  body?: any[];
  embedCode?: string;
  link?: {
    label: string;
    href: string;
  };
}

export default function SplitRowEmbed({
  padding,
  colorVariant,
  splitColumns,
}: Partial<{
  padding: ISectionPadding;
  colorVariant: ISectionContainer["color"];
  splitColumns: ISplitColumnEmbed[];
}>) {
  const color = stegaClean(colorVariant);

  return (
    <SectionContainer color={color} padding={padding}>
      {splitColumns && splitColumns?.length > 0 && (
        <div className="grid grid-col-1 gap-6 xl:gap-16">
          {splitColumns?.map((column, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-8 items-center">
              <div className={`flex-1 ${column.position === 'right' ? 'md:order-2' : ''}`}>
                <div className="prose dark:prose-invert">
                  {column.tagLine && (
                    <span className="text-sm font-medium uppercase tracking-wider">
                      {column.tagLine}
                    </span>
                  )}
                  {column.title && <h2>{column.title}</h2>}
                  {column.body && <PortableText value={column.body} />}
                  {column.link && (
                    <a href={column.link.href} className="inline-flex items-center">
                      {column.link.label}
                    </a>
                  )}
                </div>
              </div>
              {column.embedCode && (
                <div className={`flex-1 ${column.position === 'right' ? 'md:order-1' : ''}`}>
                  <div 
                    className="w-full aspect-video"
                    dangerouslySetInnerHTML={{ __html: column.embedCode }} 
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </SectionContainer>
  );
} 