"use client";
import React from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { AxiosError } from "axios";
import { useToast } from "../ui/use-toast";

function PaymentBtn() {
  const { toast } = useToast();
  const handlePayment = async () => {
    try {
      const { data } = await axios.post("/api/checkout");
      //  redirect to url
      window.location.href = data.url;
    } catch (error) {
      const axiosError = error as AxiosError;
      if (!axios.isAxiosError(axiosError)) {
        toast({
          description: "Something went wrong, please try again",
        });
      } else {
        toast({
          title: "Payment Failed",
          description:
            (axiosError?.response?.data as { message?: string })?.message ||
            "Unknown error occurred",
        });
      }
    }
  };
  return (
    <Button onClick={handlePayment} className="bg-primaryGreen max-w-fit">
      Continue to payment
    </Button>
  );
}

export default PaymentBtn;
