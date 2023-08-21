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

export default async function UserCart() {
  const cart = await getCartItems();

  const totalAmount = cart.reduce((acc, item) => {
    return acc + item.price * item.userQuantity!;
  }, 0);

  const cartItemsCount = cart.reduce((acc, item) => {
    return acc + item.userQuantity!;
  }, 0);
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
      <SheetContent className=" flex flex-col w-[800px]" side="right">
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
          <div className="mt-4 flex w-full flex-col">
            <div className="w-full flex justify-between items-center">
              <p className="text-sm font-bold">Shipping fee</p>
              <p className="text-sm">R{100.0}</p>
            </div>
            <div className="w-full flex justify-between items-center">
              <p className="text-sm font-bold">Taxes</p>
              <p className="text-sm">R{40.0}</p>
            </div>
            <Separator className="my-2" />
            <div className="w-full flex justify-between items-center">
              <p className="text-sm font-bold">Total Price</p>
              <p className="text-sm font-bold">R{totalAmount.toFixed(2)}</p>
            </div>
            <Button className="mt-4 w-full bg-primaryGreen">
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
