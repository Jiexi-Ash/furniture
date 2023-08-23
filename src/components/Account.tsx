"use client";
import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { UserCircleIcon } from "@heroicons/react/24/solid";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserStore } from "@/app/(store)/userStore";
import Link from "next/link";
import { Button } from "./ui/button";
import { supabase } from "@/lib/supabaseClient";

function Account() {
  const { user } = useUserStore();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
  };

  return (
    <>
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="hover:cursor-pointer">
            <Avatar>
              <AvatarImage
                className="w-full h-full"
                src="https://github.com/shadcn.png"
                alt="@shadcn"
              />
              <AvatarFallback className="bg-transparent">
                {<UserCircleIcon className="h-full  w-full" />}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            forceMount
            className=" bg-white border border-gray-200 w-64 p-2"
          >
            <DropdownMenuLabel>
              <div className="text-xs">{user.email}</div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className="text-sm text-gray-400">
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="text-sm text-gray-400">
                Orders
              </DropdownMenuItem>
              <DropdownMenuItem className="text-sm text-gray-400" asChild>
                <button
                  className="w-full text-sm text-gray-200"
                  onClick={handleSignOut}
                >
                  Sign out
                </button>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link
          href="/sign-in"
          className="bg-primaryGreen text-xs lg:text-sm text-white max-w-max py-2 px-4 lg:px-6 rounded-lg hover:bg-primaryGreen/80 transition-all duration-100 ease-in-out"
        >
          SIGN IN
        </Link>
      )}
    </>
  );
}

export default Account;
