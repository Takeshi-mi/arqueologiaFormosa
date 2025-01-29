"use client";

import SectionContainer, {
  ISectionContainer,
  ISectionPadding,
} from "@/components/ui/section-container";
import { stegaClean } from "next-sanity";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

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

const isWistiaEmbed = (code: string) => {
  return code.includes('wistia-player');
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
  const [isMounted, setIsMounted] = useState(false);
  const color = stegaClean(colorVariant);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && isWistiaEmbed(embedCode)) {
      // Carrega os scripts do Wistia dinamicamente
      const playerScript = document.createElement('script');
      playerScript.src = 'https://fast.wistia.com/player.js';
      playerScript.async = true;
      document.head.appendChild(playerScript);

      // Extrai o ID do vídeo do código do embed
      const mediaIdMatch = embedCode.match(/media-id=['"]([^'"]+)['"]/);
      if (mediaIdMatch) {
        const mediaId = mediaIdMatch[1];
        const embedScript = document.createElement('script');
        embedScript.src = `https://fast.wistia.com/embed/${mediaId}.js`;
        embedScript.async = true;
        embedScript.type = 'module';
        document.head.appendChild(embedScript);
      }

      return () => {
        // Limpa os scripts quando o componente é desmontado
        document.head.removeChild(playerScript);
        const embedScript = document.querySelector(`script[src*="${mediaIdMatch?.[1]}"]`);
        if (embedScript) {
          document.head.removeChild(embedScript);
        }
      };
    }
  }, [isMounted, embedCode]);

  if (!embedCode) return null;

  const isWistia = isWistiaEmbed(embedCode);

  // Para embeds que não são do Wistia, mantém o comportamento original
  if (!isWistia) {
    const cleanedEmbedCode = embedCode.replace(
      /<iframe/g,
      '<iframe style="width: 100%; height: 100%; position: absolute; top: 0; left: 0; border: 0;"'
    );

    const paddingBottom = aspectRatio === "custom" && customHeight 
      ? "0" 
      : aspectRatioMap[aspectRatio as keyof typeof aspectRatioMap] || "56.25%";

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
            {isMounted && (
              <div
                className="absolute inset-0 rounded-lg overflow-hidden"
                dangerouslySetInnerHTML={{ __html: cleanedEmbedCode }}
              />
            )}
          </div>
        </div>
      </SectionContainer>
    );
  }

  // Para embeds do Wistia
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
            maxWidth: maxWidth || undefined,
            "--max-width": maxWidth,
          } as React.CSSProperties}
        >
          {isMounted && (
            <div
              className="rounded-lg overflow-hidden"
              dangerouslySetInnerHTML={{ __html: embedCode }}
            />
          )}
        </div>
      </div>
    </SectionContainer>
  );
} 