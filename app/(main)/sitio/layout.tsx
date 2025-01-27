import { Breadcrumb } from "@/components/breadcrumb";

interface SitioLayoutProps {
  children: React.ReactNode;
  params: {
    slug: string;
  };
}

export default function SitioLayout({ children }: SitioLayoutProps) {
  return (
    <div className="container py-8">
      {children}
    </div>
  );
} 