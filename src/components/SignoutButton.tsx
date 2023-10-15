"use client";
import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/app/(store)/userStore";

function SignoutButton() {
  const router = useRouter();

  const handleSignout = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };
  return (
    <button type="button" onClick={handleSignout}>
      Sign out
    </button>
  );
}

export default SignoutButton;
