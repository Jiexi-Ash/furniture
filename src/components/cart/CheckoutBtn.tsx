"use client";
import React from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { CartItem } from "@prisma/client";
import { CartItems } from "@/types";

function CheckoutBtn() {
  const handleCheckout = async () => {
    try {
      const { data } = await axios.post("/api/checkout");
      //  redirect to url
      window.location.href = data.url;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button className="mt-4 w-full bg-primaryGreen" onClick={handleCheckout}>
      Proceed to Checkout
    </Button>
  );
}

export default CheckoutBtn;
