import Hero1 from "@/components/ui/hero/hero-1";
import SectionHeader from "@/components/ui/section-header";
import SplitRow from "@/components/ui/split/split-row";
import SplitRowEmbed from "@/components/ui/split/split-row-embed";
import GridRow from "@/components/ui/grid/grid-row";
import Carousel1 from "@/components/ui/carousel/carousel-1";
import Carousel2 from "@/components/ui/carousel/carousel-2";
import TimelineRow from "@/components/ui/timeline/timeline-row";
import Cta1 from "@/components/ui/cta/cta-1";
import LogoCloud1 from "@/components/ui/logo-cloud/logo-cloud-1";
import FAQs from "@/components/ui/faqs";
import FormNewsletter from "@/components/ui/forms/newsletter";
import EmbedContainer from "@/components/ui/embed/embed-container";

const componentMap = {
  "hero-1": Hero1,
  "section-header": SectionHeader,
  "split-row": SplitRow,
  "split-row-embed": SplitRowEmbed,
  "grid-row": GridRow,
  "carousel-1": Carousel1,
  "carousel-2": Carousel2,
  "timeline-row": TimelineRow,
  "cta-1": Cta1,
  "logo-cloud-1": LogoCloud1,
  faqs: FAQs,
  "form-newsletter": FormNewsletter,
  embedContainer: EmbedContainer,
} as const;

type ComponentKey = keyof typeof componentMap;

interface Block {
  _key: string;
  _type: string;
  [key: string]: any;
}

export default function Blocks({ blocks }: { blocks?: Block[] }) {
  if (!blocks) return null;

  return (
    <>
      {blocks.map((block) => {
        const blockType = block._type as ComponentKey;
        const Component = componentMap[blockType];
        
        if (!Component) {
          console.log('Unknown block type:', block._type);
          return null;
        }

        // @ts-expect-error - Os blocos do Sanity podem ter propriedades adicionais
        return <Component key={block._key} {...block} />;
      })}
    </>
  );
}
