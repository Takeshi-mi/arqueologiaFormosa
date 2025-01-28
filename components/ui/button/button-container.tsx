import SectionContainer, {
  ISectionContainer,
  ISectionPadding,
} from "@/components/ui/section-container";
import PostButtons from "./post-buttons";
import { stegaClean } from "next-sanity";

interface IButtonContainer {
  _type: "buttonContainer";
  _key: string;
  padding?: ISectionPadding;
  colorVariant?: ISectionContainer["color"];
  alignment?: "left" | "center" | "right";
  buttons: Array<{
    title: string;
    href: string;
    target?: boolean;
    buttonVariant?: "default" | "secondary" | "link" | "destructive" | "outline" | "ghost";
  }>;
}

export default function ButtonContainer({
  _key,
  padding,
  colorVariant = "background",
  alignment = "left",
  buttons,
}: IButtonContainer) {
  const color = stegaClean(colorVariant);

  if (!buttons?.length) return null;

  // Debug: Verificar o valor do alinhamento
  console.log('ButtonContainer - alignment:', alignment);
  console.log('ButtonContainer - raw props:', { _key, padding, colorVariant, alignment, buttons });

  return (
    <SectionContainer key={_key} color={color} padding={padding}>
      <div className="container">
        <PostButtons 
          buttons={buttons} 
          alignment={stegaClean(alignment) as "left" | "center" | "right"} 
        />
      </div>
    </SectionContainer>
  );
} 
