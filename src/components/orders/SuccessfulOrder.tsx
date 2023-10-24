"use client";
import { CheckCircle2Icon } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

function SuccessfulOrder() {
  const searchParams = useSearchParams();
  const search = searchParams.get("success") === "1";

  return (
    <div className="flex flex-col items-center w-full  lg:max-w-[1336px] mx-auto container px-4 xl:px-0">
      {search ? (
        <div className="bg-primaryGreen text-white p-6 m-6 w-[600px] flex gap-6">
          <CheckCircle2Icon size={60} />
          <div className="flex flex-col space-y-6">
            <p className="text-sm">
              Payment successful click the link below to view your order history
            </p>
            <Link href="/orders" className="text-sm underline">
              View Order history
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default SuccessfulOrder;
