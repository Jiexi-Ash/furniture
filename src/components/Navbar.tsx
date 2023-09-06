import React from "react";
import Link from "next/link";

import MobileNav from "./MobileNav";
import NavMenu from "./layout/NavMenu";
import UserCart from "./cart/UserCart";
import Account from "./Account";

function Navbar() {
  return (
    <header className="py-6 border-b flex items-center w-full  lg:max-w-[1336px] mx-auto container px-6 xl:px-0">
      <div className="w-full flex justify-between items-center">
        <div className="w-14 h-14 rounded-full bg-gray-200 hidden lg:block"></div>
        <NavMenu />

        <MobileNav />

        <div className="flex items-center space-x-4 justify-between">
          <UserCart />
          <Account />
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
