import supabaseServerComponentClient from "@/lib/supabaseServer";
import { redirect } from "next/navigation";
import React from "react";

export default async function page() {
  const supabase = await supabaseServerComponentClient();

  const user = await supabase.auth.getSession();

  if (!user.data.session) {
    redirect("/sign-in");
  }

  return <div className="min-h-screen w-full flex flex-col px-8">Overview</div>;
}
