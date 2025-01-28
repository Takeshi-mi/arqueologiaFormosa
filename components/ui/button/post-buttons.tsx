import { Button } from "@/components/ui/button";
import Link from "next/link";
import { stegaClean } from "next-sanity";
import { cn } from "@/lib/utils";

type ButtonVariant = "default" | "secondary" | "link" | "destructive" | "outline" | "ghost";

interface IPostButtons {
  buttons?: Array<{
    title: string;
    href: string;
    target?: boolean;
    buttonVariant?: ButtonVariant;
  }>;
  className?: string;
  alignment?: "left" | "center" | "right";
}

const isValidButtonVariant = (variant: string): variant is ButtonVariant => {
  const validVariants: ButtonVariant[] = ["default", "secondary", "link", "destructive", "outline", "ghost"];
  return validVariants.includes(variant as ButtonVariant);
};

const cleanStegaString = (str: string | undefined | null): string => {
  if (!str) return "";
  try {
    const cleaned = stegaClean(str);
    return cleaned ? cleaned.trim() : str.trim();
  } catch (error) {
    console.warn("Erro ao limpar string stega:", error);
    return str.trim();
  }
};

const getButtonVariant = (variant: string | undefined | null): ButtonVariant => {
  if (!variant) return "default";
  try {
    const cleaned = cleanStegaString(variant);
    return isValidButtonVariant(cleaned) ? cleaned : "default";
  } catch (error) {
    console.warn("Erro ao processar variante do botão:", error);
    return "default";
  }
};

const getAlignment = (alignment: string | undefined): "left" | "center" | "right" => {
  try {
    const cleaned = cleanStegaString(alignment);
    return (cleaned === "center" || cleaned === "right") ? cleaned : "left";
  } catch (error) {
    console.warn("Erro ao processar alinhamento:", error);
    return "left";
  }
};

export default function PostButtons({
  buttons,
  className,
  alignment = "left",
}: IPostButtons) {
  if (!Array.isArray(buttons) || buttons.length === 0) return null;

  const cleanAlignment = getAlignment(alignment);

  const alignmentClasses = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
  };

  return (
    <div
      className={cn(
        "flex gap-4 flex-wrap mt-8",
        alignmentClasses[cleanAlignment],
        className
      )}
    >
      {buttons.map((button, index) => {
        try {
          if (!button?.href) return null;
          
          const cleanTitle = cleanStegaString(button.title);
          const cleanHref = cleanStegaString(button.href);
          const cleanButtonVariant = getButtonVariant(button.buttonVariant);
          
          if (!cleanTitle || !cleanHref) return null;
          
          return (
            <Button
              key={`button-${index}-${cleanTitle.substring(0, 20)}`}
              variant={cleanButtonVariant}
              asChild
            >
              <Link
                href={cleanHref}
                target={button.target ? "_blank" : undefined}
              >
                {cleanTitle}
              </Link>
            </Button>
          );
        } catch (error) {
          console.warn("Erro ao renderizar botão:", error);
          return null;
        }
      })}
    </div>
  );
} 
