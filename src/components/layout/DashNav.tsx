"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function DashNav() {
  const pathname = usePathname();
  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      <Link
        href="/dashboard"
        className={cn(
          "text-sm text-gray-400 hover:text-black",
          pathname === "/dashboard" && "text-black"
        )}
      >
        Overview
      </Link>
      <Link
        href="/dashboard/products"
        className={cn(
          "text-sm text-gray-400 hover:text-black",
          pathname === "/dashboard/products" && "text-black"
        )}
      >
        Products
      </Link>
      <Link
        href="/dashboard/products"
        className={cn(
          "text-sm text-gray-400 hover:text-black",
          pathname === "/dashboard/orders" && "text-black"
        )}
      >
        Orders
      </Link>
    </nav>
  );
}

export default DashNav;
