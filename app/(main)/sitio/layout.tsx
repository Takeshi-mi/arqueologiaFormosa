import { Breadcrumb } from "@/components/breadcrumb";

type SitioLayoutProps = {
  children: React.ReactNode;
  params: {
    slug: string;
  };
}

export default function SitioLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="py-8">
      {children}
    </div>
  );
} 