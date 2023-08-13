import { Suspense, useEffect } from "react";
import ProductsLoading from "./loading";
import Products from "@/components/products/Products";

export default function ProductsPage() {
  return (
    <main className="">
      <Products />
    </main>
  );
}
