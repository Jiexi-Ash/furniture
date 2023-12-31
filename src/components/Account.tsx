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
import exp from "constants";
import supabaseServerComponentClient from "@/lib/supabaseServer";
import SignoutButton from "./SignoutButton";
import SigninButton from "./SigninButton";

async function Account() {
  const supabase = await supabaseServerComponentClient();

  const user = await supabase.auth.getUser();

  return (
    <>
      {user?.data.user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="hover:cursor-pointer">
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
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
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            forceMount
            className=" bg-white border border-gray-200 w-64 p-2"
          >
            <DropdownMenuLabel>
              <div className="text-xs">{user?.data.user?.email}</div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className="text-sm text-gray-400">
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="text-sm text-gray-400">
                Orders
              </DropdownMenuItem>
              <DropdownMenuItem className="text-sm text-gray-400">
                <SignoutButton />
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <SigninButton />
      )}
    </>
  );
}

export default Account;
