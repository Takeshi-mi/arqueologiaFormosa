import SectionContainer, {
  ISectionContainer,
  ISectionPadding,
} from "@/components/ui/section-container";
import { stegaClean } from "next-sanity";
import FeatureCard from "./feature-card";

interface IFeatureCards {
  _type: "featureCards";
  _key: string;
  padding?: ISectionPadding;
  colorVariant?: ISectionContainer["color"];
  cards: Array<{
    icon?: {
      asset: any;
      alt?: string;
    };
    title: string;
    description?: string;
  }>;
}

export default function FeatureCards({
  _key,
  padding,
  colorVariant = "background",
  cards,
}: IFeatureCards) {
  const color = stegaClean(colorVariant);

  if (!cards?.length) return null;

  return (
    <SectionContainer key={_key} color={color} padding={padding}>
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <FeatureCard
              key={index}
              icon={card.icon}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>
      </div>
    </SectionContainer>
  );
} 