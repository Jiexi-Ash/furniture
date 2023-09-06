import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

function SigninButton() {
  return (
    <Button
      className="bg-primaryGreen text-xs lg:text-sm text-white max-w-max h-8 px-4 lg:px-6 rounded-lg hover:bg-primaryGreen/80 transition-all duration-100 ease-in-out"
      asChild
    >
      <Link href="/sign-in">Sign In</Link>
    </Button>
  );
}

export default SigninButton;
