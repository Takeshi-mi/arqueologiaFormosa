import { cn } from "@/lib/utils";

export const DEFAULT_PADDING = {
  top: true,
  bottom: true,
};

export interface ISectionPadding {
  top: boolean;
  bottom: boolean;
}

export interface ISectionContainer {
  color?:
    | "primary"
    | "secondary"
    | "card"
    | "accent"
    | "destructive"
    | "background"
    | "transparent";
  children: React.ReactNode;
  className?: string;
  padding?: ISectionPadding | null | undefined;
  fluid?: boolean;
  id?: string;
}

export default function SectionContainer({
  color = "background",
  padding,
  children,
  className,
  fluid = false,
  id,
}: ISectionContainer) {
  console.log("SectionContainer ID:", id);
  return (
    <section
      id={id}
      data-section-id={id}
      className={cn(
        `bg-${color} relative`,
        padding?.top ? "pt-16 xl:pt-20" : undefined,
        padding?.bottom ? "pb-16 xl:pb-20" : undefined,
        className
      )}
    >
      <div className={fluid ? "w-full" : "container"}>{children}</div>
    </section>
  );
}
