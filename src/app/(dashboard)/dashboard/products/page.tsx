import { redirect } from "next/navigation";
import React from "react";
import supabaseServerComponentClient from "@/lib/supabaseServer";

import { Input } from "@/components/ui/input";
import { getAllProducts } from "@/app/_actions/products";
import Products from "@/components/dashboard/Products";
import AddProduct from "@/components/forms/AddProduct";

export default async function DashboardProductsPage() {
  const supabase = await supabaseServerComponentClient();

  const user = await supabase.auth.getSession();

  if (!user.data.session) {
    redirect("/sign-in");
  }

  const products = await getAllProducts();
  return (
    <div className="min-h-screen w-full flex flex-col px-8">
      <div className="w-full flex items-center justify-between my-8">
        <Input
          type="search"
          placeholder="Search products..."
          className="w-[200px] lg:w-[400px]"
        />

        <AddProduct />
      </div>
      <Products products={products} />
    </div>
  );
}
