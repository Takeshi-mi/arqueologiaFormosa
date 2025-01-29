"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { NavItem } from "@/types";
import Logo from "@/components/logo";
import { useState } from "react";
import { TextAlignRightIcon, Cross2Icon } from "@radix-ui/react-icons";

export default function MobileNav({ navItems }: { navItems: NavItem[] }) {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          aria-label="Open Menu"
          variant="ghost"
          size="icon"
          className="relative focus-visible:ring-1 focus-visible:ring-offset-1"
        >
          {open ? (
            <Cross2Icon className="h-5 w-5" />
          ) : (
            <TextAlignRightIcon className="h-5 w-5" />
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:w-[300px] px-0">
        <SheetHeader className="px-4 border-b pb-6">
          <div className="flex justify-end">
            <Logo />
          </div>
          <div className="sr-only">
            <SheetTitle>Menu de Navegação</SheetTitle>
            <SheetDescription>Navegue pelas páginas do site</SheetDescription>
          </div>
        </SheetHeader>
        <nav className="px-4">
          <ul className="space-y-3 pt-6">
            {navItems.map((navItem) => (
              <li key={navItem.label}>
                <Link
                  onClick={() => setOpen(false)}
                  href={navItem.href}
                  target={navItem.target ? "_blank" : undefined}
                  rel={navItem.target ? "noopener noreferrer" : undefined}
                  className="flex w-full py-2 text-lg font-medium transition-colors hover:text-primary"
                >
                  {navItem.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
