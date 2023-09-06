"use client";
import React from "react";
import { Button } from "./ui/button";
import { supabase } from "@/lib/supabaseClient";

function SignoutButton() {
  const handleSignout = async () => {
    await supabase.auth.signOut();
  };
  return <button onClick={handleSignout}>Sign out</button>;
}

export default SignoutButton;
