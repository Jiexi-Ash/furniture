import React, { Suspense } from "react";

import Product from "@/components/product/Product";
import { prisma } from "@/lib/prisma";
import supabaseServerComponentClient from "@/lib/supabaseServer";

interface Props {
  params: {
    id: string;
  };
}

export default async function ProductPage({ params }: Props) {
  const { id } = params;

  const supabaseServer = await supabaseServerComponentClient();
  const product = await prisma.product.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  const { data } = supabaseServer?.storage
    .from("products")
    .getPublicUrl(product!.primaryImage);

  if (!product) return <div className="">not found</div>;
  const productData = {
    ...product,
    primaryImage: data.publicUrl,
  };
  return (
    <div className="flex flex-col  items-center py-12 w-full lg:max-w-[1336px] mx-auto container px-6 xl:px-0">
      <Product data={productData} />
    </div>
  );
}
