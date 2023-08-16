import React from "react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

function NavMenu() {
  return (
    <NavigationMenu className="hidden lg:block">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="uppercase">
            Shop
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[600px] p-6 md:grid-cols-2">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    aria-label="Shop-all"
                    className="w-full p-6 hover:bg-gray-100 rounded-lg select-none flex justify-start outline-none focus:shadowm-md"
                    href="/products"
                  >
                    All Products
                  </a>
                </NavigationMenuLink>
              </li>
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    aria-label="Shop-all"
                    className="w-full p-6 hover:bg-gray-100 rounded-lg select-none flex justify-start outline-none focus:shadowm-md"
                    href="/products/deals"
                  >
                    Deals
                  </a>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="uppercase">
            Living Room
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[600px] p-6 md:grid-cols-2">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    aria-label="Shop-all"
                    className="w-full p-6 hover:bg-gray-100 rounded-lg select-none flex justify-start outline-none focus:shadowm-md"
                    href="/products"
                  >
                    Coffee Tables
                  </a>
                </NavigationMenuLink>
              </li>
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    aria-label="Shop-all"
                    className="w-full p-6 hover:bg-gray-100 rounded-lg select-none flex justify-start outline-none focus:shadowm-md"
                    href="/products/deals"
                  >
                    Lounge Set
                  </a>
                </NavigationMenuLink>
              </li>
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    aria-label="Shop-all"
                    className="w-full p-6 hover:bg-gray-100 rounded-lg select-none flex justify-start outline-none focus:shadowm-md"
                    href="/products/deals"
                  >
                    Plasma Stand
                  </a>
                </NavigationMenuLink>
              </li>
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    aria-label="Shop-all"
                    className="w-full p-6 hover:bg-gray-100 rounded-lg select-none flex justify-start outline-none focus:shadowm-md"
                    href="/products/deals"
                  >
                    Chairs
                  </a>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="uppercase">
            Dining Room
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[600px] p-6 md:grid-cols-2">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    aria-label="Shop-all"
                    className="w-full p-6 hover:bg-gray-100 rounded-lg select-none flex justify-start outline-none focus:shadowm-md"
                    href="/products"
                  >
                    Dining Chairs
                  </a>
                </NavigationMenuLink>
              </li>
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    aria-label="Shop-all"
                    className="w-full p-6 hover:bg-gray-100 rounded-lg select-none flex justify-start outline-none focus:shadowm-md"
                    href="/products/deals"
                  >
                    Dining Tables
                  </a>
                </NavigationMenuLink>
              </li>
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    aria-label="Shop-all"
                    className="w-full p-6 hover:bg-gray-100 rounded-lg select-none flex justify-start outline-none focus:shadowm-md"
                    href="/products/deals"
                  >
                    Dining Sets
                  </a>
                </NavigationMenuLink>
              </li>
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    aria-label="Shop-all"
                    className="w-full p-6 hover:bg-gray-100 rounded-lg select-none flex justify-start outline-none focus:shadowm-md"
                    href="/products/deals"
                  >
                    Sideboards
                  </a>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="uppercase">
            Bedroom
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[600px] p-6 md:grid-cols-2">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    aria-label="Shop-all"
                    className="w-full p-6 hover:bg-gray-100 rounded-lg select-none flex justify-start outline-none focus:shadowm-md"
                    href="/products"
                  >
                    Beds
                  </a>
                </NavigationMenuLink>
              </li>
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    aria-label="Shop-all"
                    className="w-full p-6 hover:bg-gray-100 rounded-lg select-none flex justify-start outline-none focus:shadowm-md"
                    href="/products/deals"
                  >
                    Chest of Drawers
                  </a>
                </NavigationMenuLink>
              </li>
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    aria-label="Shop-all"
                    className="w-full p-6 hover:bg-gray-100 rounded-lg select-none flex justify-start outline-none focus:shadowm-md"
                    href="/products/deals"
                  >
                    Dressing Tables
                  </a>
                </NavigationMenuLink>
              </li>
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    aria-label="Shop-all"
                    className="w-full p-6 hover:bg-gray-100 rounded-lg select-none flex justify-start outline-none focus:shadowm-md"
                    href="/products/deals"
                  >
                    Headboard
                  </a>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="uppercase">
            Office
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[600px] p-6 md:grid-cols-2">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    aria-label="Shop-all"
                    className="w-full p-6 hover:bg-gray-100 rounded-lg select-none flex justify-start outline-none focus:shadowm-md"
                    href="/products"
                  >
                    Cabinets
                  </a>
                </NavigationMenuLink>
              </li>
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    aria-label="Shop-all"
                    className="w-full p-6 hover:bg-gray-100 rounded-lg select-none flex justify-start outline-none focus:shadowm-md"
                    href="/products/deals"
                  >
                    Desks
                  </a>
                </NavigationMenuLink>
              </li>
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    aria-label="Shop-all"
                    className="w-full p-6 hover:bg-gray-100 rounded-lg select-none flex justify-start outline-none focus:shadowm-md"
                    href="/products/deals"
                  >
                    Office Chairs
                  </a>
                </NavigationMenuLink>
              </li>
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    aria-label="Shop-all"
                    className="w-full p-6 hover:bg-gray-100 rounded-lg select-none flex justify-start outline-none focus:shadowm-md"
                    href="/products/deals"
                  >
                    Office Sofas
                  </a>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export default NavMenu;
