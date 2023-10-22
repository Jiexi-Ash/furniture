import React from "react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingBagIcon } from "@heroicons/react/24/solid";
import { Separator } from "../ui/separator";
import CartItem from "./CartItem";
import { ScrollArea } from "../ui/scroll-area";
import { getCartItems, deleteCartItem } from "@/app/_actions/cart";
import CheckoutBtn from "./CheckoutBtn";
import Link from "next/link";

export default async function UserCart() {
  const cart = await getCartItems();
  console.log(cart);

  const subtotalAmount = cart.reduce((acc, item) => {
    return acc + item.price * item.userQuantity!;
  }, 0);

  const totalTax = subtotalAmount * 0.15;

  const cartItemsCount = cart.reduce((acc, item) => {
    return acc + item.userQuantity!;
  }, 0);

  const totalAmount = subtotalAmount + totalTax;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative hover:bg-transparent"
          aria-label="open cart"
        >
          <Badge className="bg-primaryGreen text-white text-[10px] p-0 rounded-full w-4 h-4 flex items-center justify-center absolute left-3 -top-2 lg:left-4">
            {cartItemsCount ?? 0}
          </Badge>
          <ShoppingBagIcon className="w-6 h-6 lg:h-8 lg:w-8  text-gray-500" />
        </Button>
      </SheetTrigger>
      <SheetContent className=" flex flex-col w-full lg:w-[800px]" side="right">
        <SheetHeader>
          <SheetTitle className="text-2xl">My Cart</SheetTitle>
          <SheetDescription>{cartItemsCount} items</SheetDescription>
        </SheetHeader>
        <Separator className="my-4" />
        <div className="overflow-hidden flex flex-col flex-1">
          <ScrollArea className="h-full">
            <div className="flex flex-col space-y-4">
              {cart.map((item) => (
                <CartItem key={item.id} {...item} itemId={item.itemId} />
              ))}
            </div>
          </ScrollArea>
          <Separator className="my-2" />
          <div className="mt-4 flex w-full flex-col space-y-2">
            <div className="w-full flex justify-between items-center">
              <p className="text-sm font-bold">Shipping fee</p>
              <p className="text-[12px]">calculated on next step</p>
            </div>
            <div className="w-full flex justify-between items-center">
              <p className="text-sm font-bold">Subtotal</p>
              <p className="text-sm font-bold">R{subtotalAmount.toFixed(2)}</p>
            </div>
            <Separator className="my-2" />

            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-[1px]">
                <p className="text-sm font-bold">Total Price</p>
                <p className="text-slate-400 text-[10px]">
                  {`incl. R${totalTax.toFixed(2)} in taxes`}
                </p>
              </div>
              <p className="text-sm font-bold">R{totalAmount.toFixed(2)}</p>
            </div>
            <Link href="/checkout" className="mt-4 w-full bg-primaryGreen">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
