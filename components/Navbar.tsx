"use client";
import { cn } from "@/lib/utils";
import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/action/auth";

const Navbar = ({ session }: { session?: Session }) => {
  const pathname = usePathname();
  const initialUsername = session?.user?.name
    ?.split(" ")
    .map((el) => el.slice(0, 1))
    .join("")
    .toUpperCase();

  return (
    <div className="flex justify-between items-center gap-5 pt-4">
      <Link href={"/"}>
        <Image src={"/icons/logo.svg"} alt="logo" width={40} height={40} /> 
      </Link>

      <ul className="flex gap-8 items-center">
        <li>
          <Link
            href={"/library"}
            className={cn(
              "cursor-pointer",
              pathname === "/library" ? "text-light-200" : "text-light-100"
            )}
          >
            library
          </Link>
        </li>
        {session && (
          <li>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarFallback className="bg-teal-500 text-white">
                    {initialUsername ?? "IN"}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-slate-800 text-white">
                <DropdownMenuLabel>{session.user?.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-400 cursor-pointer" onClick={async() => logout()}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
