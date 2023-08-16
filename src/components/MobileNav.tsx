"use client";

import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { Bars3Icon } from "@heroicons/react/24/solid";
import Link from "next/link";

import { navData } from "@/config/site";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          className="border-none focus-visible:bg-transparent focus-visible:ring-0 lg:hidden"
          variant="ghost"
        >
          <Bars3Icon className="h-6 w-6 text-black" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        {/* change to logo */}
        <Link
          className="text-sm mt-4"
          href="/"
          onClick={() => setIsOpen(false)}
        >
          Home
        </Link>
        <NavLinks onClick={() => setIsOpen(false)} />
      </SheetContent>
    </Sheet>
  );
}

export default MobileNav;

type NavLinksProps = {
  onClick?: () => void;
};

const NavLinks = ({ onClick }: NavLinksProps) => {
  return (
    <Accordion className="mt-6" type="single" collapsible>
      {navData.map((item, index) => (
        <AccordionItem value={item.title} key={index}>
          <AccordionTrigger className="text-sm capitalize">
            {item.title}
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col space-y-2">
              {item.items.map((subItem, index) => (
                <Link
                  className="text-[12px] capitalize"
                  href={subItem.href}
                  key={index}
                  onClick={onClick}
                >
                  {subItem.title}
                </Link>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
