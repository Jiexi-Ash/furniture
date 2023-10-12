"use client";
import React from "react";
import { Button } from "../ui/button";
import axios from "axios";

function CheckoutBtn() {
  const handleCheckout = async () => {
    try {
      const reponse = await axios.post("/api/checkout");
      //  redirect to url
      window.location.href = reponse.data.url;
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
