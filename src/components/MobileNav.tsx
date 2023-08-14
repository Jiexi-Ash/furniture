import React, { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { Bars3Icon } from "@heroicons/react/24/solid";
import Link from "next/link";

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
        <ul className="px-2 flex flex-col mt-10 space-y-4 w-full">
          <Link className="border-b border-gray-200 py-2" href="/">
            Home
          </Link>
          <Link className="border-b border-gray-200 py-2" href="/products">
            Shop
          </Link>
          <Link className="border-b border-gray-200 py-2" href="/">
            About
          </Link>
          <Link className="border-b border-gray-200 py-2" href="/">
            About
          </Link>
        </ul>
      </SheetContent>
    </Sheet>
  );
}

export default MobileNav;
