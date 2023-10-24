import Products from "@/components/products/Products";

import MainLayout from "@/components/layout/MainLayout";
import { getProducts } from "@/app/_actions/products";

export const revalidate = 3600;
export default async function ProductsPage() {
  const products = await getProducts();
  return (
    <MainLayout>
      <main className="">
        <Products data={products} />
      </main>
    </MainLayout>
  );
}
