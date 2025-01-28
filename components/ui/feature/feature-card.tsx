import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";

interface IFeatureCard {
  icon?: {
    asset: any;
    alt?: string;
  };
  title: string;
  description?: string;
}

export default function FeatureCard({
  icon,
  title,
  description,
}: IFeatureCard) {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg">
      {/* Ícone */}
      {icon?.asset && (
        <div className="mb-4 relative w-16 h-16">
          <Image
            src={urlForImage(icon)?.url() || ""}
            alt={icon.alt || title}
            fill
            className="object-contain"
          />
        </div>
      )}

      {/* Título */}
      <h3 className="text-lg font-semibold mb-2">{title}</h3>

      {/* Descrição */}
      {description && (
        <p className="text-muted-foreground text-sm">{description}</p>
      )}
    </div>
  );
} 