import React, { Suspense } from "react";

import Product from "@/components/product/Product";
import { prisma } from "@/lib/prisma";
import supabaseServerComponentClient from "@/lib/supabaseServer";
import MainLayout from "@/components/layout/MainLayout";
import { getProduct } from "@/app/_actions/products";

interface Props {
  params: {
    id: string;
  };
}

export default async function ProductPage({ params }: Props) {
  const { id } = params;

  const productData = await getProduct(Number(id));
  return (
    <MainLayout>
      <div className="flex flex-col  items-center py-12 w-full lg:max-w-[1336px] mx-auto container px-6 xl:px-0">
        <Product data={productData} />
      </div>
    </MainLayout>
  );
}
