"use client";

import SectionContainer, {
  ISectionContainer,
  ISectionPadding,
  DEFAULT_PADDING,
} from "@/components/ui/section-container";
import { stegaClean } from "next-sanity";

export interface IEmbedContainer {
  _type: 'embedContainer';
  _key: string;
  embedCode: string;
  minHeight?: string;
  padding?: ISectionPadding;
  colorVariant?: ISectionContainer["color"];
}

export default function EmbedContainer({
  _key,
  embedCode,
  minHeight = '400px',
  padding = DEFAULT_PADDING,
  colorVariant = 'primary',
}: IEmbedContainer) {
  const color = stegaClean(colorVariant);

  if (!embedCode) return null;

  return (
    <SectionContainer key={_key} color={color} padding={padding}>
      <div className="container">
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
      </div>
    </SectionContainer>
  );
} 