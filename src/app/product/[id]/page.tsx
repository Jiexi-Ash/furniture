import React, { Suspense } from "react";

import Product from "@/components/product/Product";

interface Props {
  params: {
    id: string;
  };
}

export default function ProductPage({ params }: Props) {
  const { id } = params;

  return (
    <div className="flex flex-col  items-center py-12 w-full lg:max-w-[1336px] mx-auto container px-6 xl:px-0">
      <Product id={id} />
    </div>
  );
}
