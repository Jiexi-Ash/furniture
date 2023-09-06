import { Product } from "@prisma/client";
import React from "react";
import ProductCard from "./ProductCard";
import { ProductItems } from "@/types";

interface ProductsProps {
  products: ProductItems[];
}

function Products({ products }: ProductsProps) {
  return (
    <div className="w-full h-full grid sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default Products;
