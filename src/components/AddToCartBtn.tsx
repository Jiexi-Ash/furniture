"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/app/(store)/cartStore";
import exp from "constants";
import { Loader2 } from "lucide-react";
import Loader from "./Loader";

type AddToCartBtnProps = {
  id: number;
  handleClick: () => void;
};
function AddToCartBtn({ id, handleClick }: AddToCartBtnProps) {
  const [title, setTitle] = useState("Add to cart");
  const { cart, isLoading } = useCartStore();
  const item = cart.find((item) => item.id === id);

  useEffect(() => {
    if (item) {
      setTitle("Added to cart");
    } else {
      setTitle("Add to cart");
    }
  }, [item]);

  return (
    <Button
      className={cn(
        "bg-primaryGreen text-white w-[300px] disabled::bg-gray-200"
      )}
      disabled={item ? true : false}
      onClick={item ? undefined : () => handleClick()}
    >
      {isLoading ? <Loader /> : title}
    </Button>
  );
}

export default AddToCartBtn;
