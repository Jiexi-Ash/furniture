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
import { useCartStore } from "@/app/(store)/cartStore";
import AddToCartBtn from "../AddToCartBtn";

type Props = {
  data: Product;
};

function Product({ data }: Props) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCartStore();

  const images = [
    data.primaryImage,
    "https://images.unsplash.com/photo-1631679706909-1844bbd07221?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1692&q=80",
    "https://images.unsplash.com/photo-1599008633587-95b5da16d29f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1588471980726-8346cb477a33?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1670&q=80",
  ];
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="w-full  min-h-screen flex flex-col lg:flex-row lg:gap-10">
        <div className="flex-1">
          <ProductImageCarousel images={images} options={{ loop: true }} />
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

              <AddToCartBtn
                id={data?.id}
                handleClick={() => addToCart(data.id, quantity)}
              />
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
