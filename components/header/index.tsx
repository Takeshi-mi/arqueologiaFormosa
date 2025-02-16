import Link from "next/link";
import Logo from "@/components/logo";
import MobileNav from "@/components/header/mobile-nav";
import DesktopNav from "@/components/header/desktop-nav";
import { ModeToggle } from "@/components/menu-toggle";

const navItems = [
  {
    label: "Sítios arqueológicos",
    href: "/sitios-arqueologicos",
    target: false,
  },
  {
    label: "Trabalhos escritos",
    href: "/trabalhos",
    target: false,
  },
  {
    label: "Blog",
    href: "/blog",
    target: false,
  },
  {
    label: "Contato",
    href: "/contato",
    target: false,
  },
];

export default function Header() {
  return (
    <header className="sticky top-0 w-full border-b border-border/40 bg-background/95 backdrop-blur-sm z-50">
      <div className="container flex items-center justify-between h-14">
        <div className="flex-1 flex justify-start gap-7 items-center">
          <div className="hidden xl:block">
            <DesktopNav navItems={navItems.slice(0, 2)} />
          </div>
        </div>
        <div className="flex-1 flex justify-center">
          <Link href="/" aria-label="Home page">
            <Logo />
          </Link>
        </div>
        <div className="flex-1 flex justify-end gap-7 items-center">
          <div className="hidden xl:block">
            <DesktopNav navItems={navItems.slice(2)} />
          </div>
          <ModeToggle />
          <div className="xl:hidden">
            <MobileNav navItems={navItems} />
          </div>
        </div>
      </div>
    </header>
  );
}
