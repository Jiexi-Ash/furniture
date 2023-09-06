"use client";
import React, { Suspense, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Product } from "@prisma/client";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Image from "next/image";
import ProductImageCarousel from "./ProductImageCarousel";
import Carousel from "./ProductImageCarousel";

import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

import AddToCartBtn from "../AddToCartBtn";
import { ProductItems } from "@/types";

interface Props {
  data: ProductItems;
}

function Product({ data }: Props) {
  const [quantity, setQuantity] = useState(1);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="w-full  min-h-screen flex flex-col lg:flex-row lg:gap-10">
        <div className="flex-1">
          <ProductImageCarousel images={data.images} options={{ loop: true }} />
        </div>
        <div className="flex-1 h-full mt-10 lg:mt-0">
          <div className="w-full flex flex-col space-y-6">
            <div className="flex flex-col space-y-2">
              <h1 className="font-bold text-2xl text-black">{data?.name}</h1>
              <p className="text-base text-black">R{data?.price.toFixed(2)}</p>
            </div>
            <hr className="border-1 border-gray-200 w-full" />
            <div className="flex w-full gap-4 flex-col">
              <Label className="font-bold">Quantity</Label>
              <Input
                type="number"
                value={quantity}
                className={cn("w-[300px]")}
                readOnly
              />

              <AddToCartBtn id={data?.id} quantity={quantity} />
            </div>
            <hr className="border-1 border-gray-200 w-full" />
            <div className="flex w-full gap-4 flex-col">
              <Label className="font-bold">Description</Label>
              <p className="text-sm">{data?.description}</p>
            </div>
            <div className="flex w-full gap-4 flex-col">
              <Label className="font-bold">Features</Label>
              <p className="text-sm whitespace-pre-wrap">{data?.features}</p>
            </div>
            <div className="flex w-full gap-4 flex-col">
              <Label className="font-bold">Dimensions</Label>
              <p className="text-sm whitespace-pre-wrap">{data?.dimensions}</p>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
}

export default Product;
