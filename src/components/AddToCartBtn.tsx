"use client";
import React, { useState, useTransition } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import Loader from "./Loader";
import { addToCart } from "@/app/_actions/cart";

type AddToCartBtnProps = {
  id: number;
  quantity: number;
};
function AddToCartBtn({ id, quantity }: AddToCartBtnProps) {
  const [isPending, startTransition] = useTransition();
  const [title, setTitle] = useState("Add to cart");

  return (
    <Button
      className={cn(
        "bg-primaryGreen text-white w-[300px] disabled::bg-gray-200"
      )}
      onClick={() =>
        startTransition(() => addToCart({ productId: id, quantity }))
      }
    >
      {isPending ? <Loader /> : title}
    </Button>
  );
}

export default AddToCartBtn;
