import { Suspense, useEffect } from "react";
import ProductsLoading from "./loading";
import Products from "@/components/products/Products";
import { prisma } from "@/lib/prisma";
import axios from "axios";
import { getProducts } from "../_actions/products";
import { getCartItems } from "../_actions/cart";
import MainLayout from "@/components/layout/MainLayout";

const revalidate = 60;

export default async function ProductsPage() {
  const products = await getProducts();
  return (
    <MainLayout>
      <main className="">
        <Suspense fallback={<ProductsLoading />}>
          <Products data={products} />
        </Suspense>
      </main>
    </MainLayout>
  );
}
