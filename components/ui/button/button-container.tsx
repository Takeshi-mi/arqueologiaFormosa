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

type ButtonVariant = "default" | "secondary" | "link" | "destructive" | "outline" | "ghost";
type ColorVariant = "primary" | "secondary" | "card" | "accent" | "destructive" | "background" | "transparent";

export default function ButtonContainer({
  _key,
  padding,
  colorVariant = "background",
  alignment = "left",
  buttons,
}: IButtonContainer) {
  // Limpa os dados corrompidos
  const cleanColor = (stegaClean(colorVariant)?.trim() || "background") as ColorVariant;
  const cleanAlignment = (stegaClean(alignment)?.trim() || "left") as "left" | "center" | "right";
  const cleanButtons = buttons?.map(button => {
    const cleanButtonVariant = stegaClean(button.buttonVariant)?.trim() || "default";
    return {
      ...button,
      title: stegaClean(button.title)?.trim() || "",
      href: stegaClean(button.href)?.trim() || "#",
      buttonVariant: cleanButtonVariant as ButtonVariant
    };
  });

  if (!cleanButtons?.length) return null;

  // Debug: Verificar o valor do alinhamento
  console.log('ButtonContainer - alignment:', cleanAlignment);
  console.log('ButtonContainer - raw props:', { _key, padding, colorVariant, alignment, buttons });

  return (
    <SectionContainer key={_key} color={cleanColor} padding={padding}>
      <div className="container">
        <PostButtons 
          buttons={cleanButtons} 
          alignment={cleanAlignment} 
        />
      </div>
    </SectionContainer>
  );
} 
