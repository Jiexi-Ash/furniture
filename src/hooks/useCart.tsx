import { useCartStore } from "@/app/(store)/cartStore";
import { Product } from "@prisma/client";
import { useState, useEffect } from "react";
import type { cartItem } from "@/app/(store)/cartStore";

const getFromLocalStorage = () => {
  if (typeof window === "undefined") return null;
  const cart = localStorage.getItem("cart");

  if (cart) {
    return JSON.parse(cart) as cartItem[];
  }

  return null;
};

export default function useCart() {
  const [cartState] = useState<cartItem[]>(getFromLocalStorage() || []);
  const setCart = useCartStore((state) => state.setCart);

  useEffect(() => {
    const cart = getFromLocalStorage();
    if (cart) {
      setCart(cart);
    }
  }, [cartState, setCart]);
}
