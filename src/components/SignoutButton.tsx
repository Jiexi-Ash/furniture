"use client";
import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/app/(store)/userStore";

function SignoutButton() {
  const { user } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      console.log("no user");
      router.push("/");
    }
  }, [user, router]);
  const handleSignout = async () => {
    await supabase.auth.signOut();
  };
  return (
    <button type="button" onClick={handleSignout}>
      Sign out
    </button>
  );
}

export default SignoutButton;
