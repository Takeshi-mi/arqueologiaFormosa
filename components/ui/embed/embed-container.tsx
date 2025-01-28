"use client";

import SectionContainer, {
  ISectionContainer,
  ISectionPadding,
} from "@/components/ui/section-container";
import { stegaClean } from "next-sanity";
import { cn } from "@/lib/utils";

interface IEmbedContainer {
  _type: "embedContainer";
  _key: string;
  embedCode: string;
  aspectRatio?: "16:9" | "4:3" | "1:1" | "9:16" | "custom";
  customHeight?: string;
  maxWidth?: string;
  padding?: ISectionPadding;
  colorVariant?: ISectionContainer["color"];
}

const aspectRatioMap = {
  "16:9": "56.25%",
  "4:3": "75%",
  "1:1": "100%",
  "9:16": "177.78%",
};

export default function EmbedContainer({
  _key,
  embedCode,
  aspectRatio = "16:9",
  customHeight,
  maxWidth,
  padding,
  colorVariant = "background",
}: IEmbedContainer) {
  const color = stegaClean(colorVariant);

  if (!embedCode) return null;

  // Limpa o código do iframe e adiciona os estilos necessários
  const cleanedEmbedCode = embedCode.replace(
    /<iframe/g,
    '<iframe style="width: 100%; height: 100%; position: absolute; top: 0; left: 0; border: 0;"'
  );

  // Calcula o padding-bottom baseado na proporção ou altura personalizada
  const paddingBottom = aspectRatio === "custom" && customHeight 
    ? "0" 
    : aspectRatioMap[aspectRatio as keyof typeof aspectRatioMap] || "56.25%";

  // Estilo para altura personalizada
  const containerStyle = {
    paddingBottom: aspectRatio === "custom" ? "0" : paddingBottom,
    height: aspectRatio === "custom" ? customHeight : undefined,
    maxWidth: maxWidth || undefined,
  };

  return (
    <SectionContainer key={_key} color={color} padding={padding} fluid>
      <div className={cn(
        "container mx-auto",
        maxWidth && "flex justify-center"
      )}>
        <div 
          className={cn(
            "relative w-full",
            maxWidth && "max-w-[var(--max-width)]"
          )}
          style={{ 
            ...containerStyle,
            "--max-width": maxWidth,
          } as React.CSSProperties}
        >
          <div
            className="absolute inset-0 rounded-lg overflow-hidden"
            dangerouslySetInnerHTML={{ __html: cleanedEmbedCode }}
          />
        </div>
      </div>
    </SectionContainer>
  );
} 