import SectionContainer, {
  ISectionContainer,
  ISectionPadding,
} from "@/components/ui/section-container";
import { stegaClean } from "next-sanity";
import { PortableText } from "@portabletext/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ISplitColumnEmbed {
  position?: "left" | "right";
  titlePosition?: "content" | "top";
  tagLine?: string;
  title?: string;
  titleDescription?: string;
  body?: any[];
  embedCode?: string;
  link?: {
    title: string;
    href: string;
    target?: boolean;
    buttonVariant:
      | "default"
      | "secondary"
      | "link"
      | "destructive"
      | "outline"
      | "ghost"
      | null
      | undefined;
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
    <SectionContainer color={color} padding={padding} fluid={true}>
      {splitColumns && splitColumns?.length > 0 && (
        <div className="container mx-auto grid grid-col-1 gap-6 xl:gap-16">
          {splitColumns?.map((column, index) => (
            <div key={index} className="flex flex-col gap-8">
              {column.titlePosition === "top" && (
                <div className="text-center max-w-3xl mx-auto">
                  {column.tagLine && (
                    <span className="text-sm font-medium uppercase tracking-wider">
                      {column.tagLine}
                    </span>
                  )}
                  {column.title && <h2 className="mt-4 text-4xl font-bold">{column.title}</h2>}
                  {column.titleDescription && (
                    <p className="mt-4 text-lg text-muted-foreground">
                      {column.titleDescription}
                    </p>
                  )}
                </div>
              )}
              <div className="flex flex-col md:flex-row gap-8">
                <div className={cn(
                  "flex-1 flex items-center",
                  column.position === 'right' ? 'md:order-2 md:pl-12 lg:pl-16 xl:pl-20' : 'md:pr-12 lg:pr-16 xl:pr-20'
                )}>
                  <div className={cn(
                    "prose dark:prose-invert max-w-none w-full",
                    color === 'accent' && "[&>*]:text-accent-foreground"
                  )}>
                    {column.titlePosition !== "top" && (
                      <>
                        {column.tagLine && (
                          <span className="text-sm font-medium uppercase tracking-wider">
                            {column.tagLine}
                          </span>
                        )}
                        {column.title && <h2 className="mt-4">{column.title}</h2>}
                      </>
                    )}
                    {column.body && <div className="mt-4"><PortableText value={column.body} /></div>}
                    {column.link && (
                      <Button
                        className="mt-6"
                        variant={stegaClean(column.link.buttonVariant)}
                        asChild
                      >
                        <Link
                          href={column.link.href}
                          target={column.link.target ? "_blank" : undefined}
                        >
                          {column.link.title}
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
                {column.embedCode && (
                  <div className={cn(
                    "flex-1 min-h-[400px] flex items-center",
                    column.position === 'right' ? 'md:order-1' : ''
                  )}>
                    <div 
                      className="w-full h-full rounded-lg overflow-hidden"
                      dangerouslySetInnerHTML={{ __html: column.embedCode }} 
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </SectionContainer>
  );
} 