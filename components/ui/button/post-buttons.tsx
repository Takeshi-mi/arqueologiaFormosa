import { Button } from "@/components/ui/button";
import Link from "next/link";
import { stegaClean } from "next-sanity";
import { cn } from "@/lib/utils";

interface IPostButtons {
  buttons?: Array<{
    title: string;
    href: string;
    target?: boolean;
    buttonVariant?: "default" | "secondary" | "link" | "destructive" | "outline" | "ghost";
  }>;
  className?: string;
  alignment?: "left" | "center" | "right";
}

export default function PostButtons({
  buttons,
  className,
  alignment = "left",
}: IPostButtons) {
  if (!buttons?.length) return null;

  // Debug: Verificar o valor do alinhamento
  console.log('PostButtons - alignment:', alignment);

  const alignmentClasses = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
  };

  return (
    <div
      className={cn(
        "flex gap-4 flex-wrap mt-8",
        alignmentClasses[alignment as keyof typeof alignmentClasses],
        className
      )}
    >
      {buttons.map((button, index) => {
        if (!button.href) return null;
        
        return (
          <Button
            key={index}
            variant={stegaClean(button.buttonVariant)}
            asChild
          >
            <Link
              href={button.href}
              target={button.target ? "_blank" : undefined}
            >
              {button.title}
            </Link>
          </Button>
        );
      })}
    </div>
  );
} 
