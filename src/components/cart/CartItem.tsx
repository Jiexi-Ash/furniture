"use client";
import React, { useTransition } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Product } from "@prisma/client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Minus, Plus, Trash } from "lucide-react";
import { CartItems } from "@/types";

import {
  deleteCartItem,
  incrementCartItem,
  decreaseCartItem,
} from "@/app/_actions/cart";

function CartItem({
  id,
  quantity,
  userQuantity,
  name,
  price,
  images,
  itemId,
}: CartItems) {
  const [isPending, startTransition] = useTransition();
  return (
    <div className="flex space-x-4 items-center">
      <div className="w-24 h-24  relative rouneded-lg">
        <Image
          src={images[0].url}
          alt=""
          fill
          className="object-cover rounded-lg"
        />
      </div>
      <div className="flex flex-col space-y-1">
        <div className="flex justify-between items-center">
          <div className="w-full h-full flex justify-between items-center gap-4">
            <div className="flex flex-col space-y-1">
              <h3 className="text-[12px]">{name}</h3>
              <span className="text-[12px] text-gray-400">
                R{price.toFixed(2)}
              </span>
            </div>
            <div className="flex space-x-2">
              <Button
                className="h-8 w-8"
                variant="outline"
                size="icon"
                onClick={() =>
                  startTransition(
                    async () =>
                      await decreaseCartItem({
                        itemId: itemId!,
                        productId: id,
                      })
                  )
                }
              >
                <Minus className="w-3 h-3" />
              </Button>
              <Input
                type="number"
                value={userQuantity}
                disabled
                className="w-[60px] h-[30px] text-[10px] text-black text-center focus:visible:ring-0 focus:outline-none focus:ring-0"
                readOnly
              />
              <Button
                className="h-8 w-8"
                variant="outline"
                size="icon"
                onClick={() =>
                  startTransition(
                    async () =>
                      await incrementCartItem({
                        itemId: itemId!,
                        productId: id,
                      })
                  )
                }
              >
                <Plus className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>
        <button
          type="button"
          className="text-[12px] text-gray-400 max-w-fit hover:border-b"
          disabled={isPending}
          onClick={() =>
            startTransition(async () => await deleteCartItem({ productId: id }))
          }
        >
          remove
        </button>
      </div>
    </div>
  );
}

export default CartItem;
