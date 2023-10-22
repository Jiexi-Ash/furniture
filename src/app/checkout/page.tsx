import CartItem from "@/components/cart/CartItem";
import React from "react";
import { getCartItems } from "../_actions/cart";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import ShippingDetails from "@/components/forms/ShippingDetails";
import { getShippingAddress } from "../_actions/user";
import { supabase } from "@/lib/supabaseClient";
import PaymentBtn from "@/components/checkout/PaymentBtn";
import { calculateSizeAdjustValues } from "next/dist/server/font-utils";
import { calculateShippingCost } from "@/lib/helpers";

async function SuccessPage() {
  const cart = await getCartItems();
  const shippingDetails = await getShippingAddress();

  console.log(shippingDetails);
  const subtotalAmount = cart.reduce((acc, item) => {
    return acc + item.price * item.userQuantity!;
  }, 0);

  const totalTax = subtotalAmount * 0.15;

  const cartItemsCount = cart.reduce((acc, item) => {
    return acc + item.userQuantity!;
  }, 0);

  const shippingFee = shippingDetails
    ? calculateShippingCost(subtotalAmount, shippingDetails?.province!)
    : 0;
  const totalAmount = shippingFee
    ? subtotalAmount + totalTax + shippingFee
    : subtotalAmount + totalTax;

  return (
    <div className="w-full h-screen flex flex-col mx-auto container mt-20">
      <div className="w-[50%] flex items-center justify-between">
        <h1 className="text-2xl">Checkout</h1>
        <Link
          href="/"
          className="text-primaryGreen mr-3 text-sm hover:underline"
        >
          Continue shopping
        </Link>
      </div>
      <div className="flex items-center justify-between gap-6">
        {/* form */}
        <div className="flex-1 w-full h-full bg-gray-100">
          <ShippingDetails
            id={shippingDetails?.id}
            complexOrApartment={shippingDetails?.complexOrApartment}
            lastName={shippingDetails?.lastName}
            firstName={shippingDetails?.firstName}
            address={shippingDetails?.address}
            city={shippingDetails?.city}
            province={shippingDetails?.province}
            postcode={shippingDetails?.postcode}
            phone={shippingDetails?.phone}
          />
        </div>
        <div className="flex-1 flex flex-col w-full h-full">
          <ScrollArea className="h-full py-6">
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
              <p className="text-[12px]">R{shippingFee?.toFixed(2)}</p>
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
          </div>
          <div className="flex justify-end w-full">
            <PaymentBtn />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuccessPage;
