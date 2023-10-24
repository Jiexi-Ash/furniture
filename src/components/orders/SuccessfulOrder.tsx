"use client";
import { CheckCircle2Icon } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { useToast } from "../ui/use-toast";

function SuccessfulOrder() {
  const searchParams = useSearchParams();
  const [show, setShow] = React.useState(false);
  const search = searchParams.get("success") === "1";
  const { toast } = useToast();

  useEffect(() => {
    if (searchParams?.get("success") === "1") {
      toast({
        title: "Payment Successful",
        description: "Click the link below to view your order history",
      });
    } else {
      toast({
        title: "Payment Failed",
        description: "Click the link below to try again",
      });
    }
  }, [toast, searchParams]);

  return (
    <div className="flex flex-col items-center w-full  lg:max-w-[1336px] mx-auto container px-4 xl:px-0">
      <></>
    </div>
  );
}

export default SuccessfulOrder;
