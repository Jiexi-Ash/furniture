import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { AspectRatio } from "../ui/aspect-ratio";
import Image from "next/image";
import { Button } from "../ui/button";

import { Product } from "@prisma/client";
import { ProductItems } from "@/types";
import { EyeIcon, PhotoIcon } from "@heroicons/react/24/solid";
import ProductQuickView from "./ProductQuickView";

type productCardProps = {
  product: ProductItems;
};

function ProductCard({ product }: productCardProps) {
  return (
    <Card>
      <CardHeader className="p-0">
        <AspectRatio className="relative group" ratio={4 / 3}>
          <div className="absolute bottom-0 right-0 bg-black/60 w-full max-h-0 z-50 hidden lg:block lg:group-hover:max-h-[300px] overflow-hidden group-hover:h-auto transition-all duration-500 ease-in-out">
            <div className="w-full h-full flex flex-col">
              <p className="text-white text-xs p-4 select-none">
                {product.description}
              </p>
            </div>
          </div>

          <ProductQuickView product={product} />

          {product.images.length < 1 ? (
            <div className="w-full h-full flex items-center justify-center">
              <PhotoIcon className="h-12 w-12 text-gray-200" />
            </div>
          ) : (
            <>
              <Image
                src={product.images[0].url}
                fill={true}
                alt=""
                objectFit="cover"
              />
            </>
          )}
        </AspectRatio>
      </CardHeader>
      <CardContent className="py-4">
        <CardTitle className="text-sm lg:text-lg">{product.name}</CardTitle>
        <CardDescription>R{product.price.toFixed(2)}</CardDescription>
        <div className="flex space-x-2">
          <p className="text-sm text-slate-500">Quantity:</p>
          <p className="text-sm text-slate-500">{product.quantity}</p>
        </div>
        <div className="flex space-x-2">
          <p className="text-sm text-slate-500">IsActive:</p>
          <p className="text-sm text-red-500 font-bold ">
            {product.isActive === true ? "Yes" : "No"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default ProductCard;
