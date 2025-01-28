"use client";

import SectionContainer, {
  ISectionContainer,
  ISectionPadding,
} from "@/components/ui/section-container";
import { stegaClean } from "next-sanity";

interface IEmbedContainer {
  _type: "embedContainer";
  _key: string;
  embedCode: string;
  padding?: ISectionPadding;
  colorVariant?: ISectionContainer["color"];
}

export default function EmbedContainer({
  _key,
  embedCode,
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

  return (
    <SectionContainer key={_key} color={color} padding={padding} fluid>
      <div className="container mx-auto">
        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
          <div
            className="absolute inset-0 rounded-lg overflow-hidden"
            dangerouslySetInnerHTML={{ __html: cleanedEmbedCode }}
          />
        </div>
      </div>
    </SectionContainer>
  );
} 