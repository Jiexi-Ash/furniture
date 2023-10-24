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
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";
import { useUserStore } from "@/app/(store)/userStore";
import Link from "next/link";

function UserAccount() {
  const { user } = useUserStore();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      window.location.reload();
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 rounded-full relative">
          <Avatar className="w-8 h-8">
            <AvatarFallback>
              <UserCircleIcon className="h-full  w-full" />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        forceMount
        className=" bg-white border border-gray-200 w-64 p-2"
      >
        <DropdownMenuLabel>
          <div className="text-xs">{user?.email}</div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="text-sm text-gray-400">
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem className="text-sm text-gray-400">
            <Link href="/orders">Orders</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="text-sm text-gray-400" asChild>
            <button
              className="w-full text-sm text-gray-200"
              onClick={() => handleSignOut()}
            >
              Sign out
            </button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserAccount;
