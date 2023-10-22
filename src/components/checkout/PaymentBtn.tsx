"use client";
import React from "react";
import { Button } from "../ui/button";
import axios from "axios";

function PaymentBtn() {
  const handlePayment = async () => {
    try {
      const { data } = await axios.post("/api/checkout");
      //  redirect to url
      window.location.href = data.url;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Button onClick={handlePayment} className="bg-primaryGreen max-w-fit">
      Continue to payment
    </Button>
  );
}

export default PaymentBtn;
