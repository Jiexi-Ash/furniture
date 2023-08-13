"use client";
import React from "react";
import Link from "next/link";

import { ShoppingBagIcon } from "@heroicons/react/24/solid";

function Navbar() {
  return (
    <header className="py-6 border-b flex items-center py w-full  lg:max-w-[1336px] mx-auto container px-6 xl:px-0">
      <div className="w-full flex justify-between items-center">
        <div className="w-14 h-14 rounded-full bg-gray-200"></div>
        <NavLinks />

        <div className="flex items-center space-x-4">
          <ShoppingBagIcon className="h-8 w-8 text-gray-500" />
          <div className="h-10 w-[1px] bg-gray-200"></div>
          <Link
            href="/sign-in"
            className="bg-primaryGreen text-white max-w-max py-2 px-6 rounded-lg hover:bg-primaryGreen/80 transition-all duration-100 ease-in-out"
          >
            SIGN IN
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;

export const NavLinks = () => {
  return (
    <nav className="hidden lg:flex lg:items-center">
      <ul className="flex space-x-8">
        <li>
          <Link className="uppercase text-black" href="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="uppercase text-black" href="/products">
            Shop
          </Link>
        </li>
        <li>
          <Link className="uppercase text-black" href="/">
            About
          </Link>
        </li>
        <li>
          <Link className="uppercase text-black" href="/">
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
};
