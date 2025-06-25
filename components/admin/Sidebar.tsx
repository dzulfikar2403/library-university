"use client";
import { adminSideBarLinks } from "@/constant";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Session } from "next-auth";

const Sidebar = ({ session }: { session: Session }) => {
  const pathname = usePathname();
  const initialUsername = session?.user?.name
    ?.split(" ")
    .map((el) => el.slice(0, 1))
    .join("")
    .toUpperCase();

  return (
    <div className="admin-sidebar">
      <div>
        <div className="logo">
          <Image
            src={"/icons/admin/logo.svg"}
            alt="logo"
            width={37}
            height={37}
          />
          <h1>Bookwise</h1>
        </div>
        <div className="flex flex-col gap-5 mt-10">
          {adminSideBarLinks.map((el) => {
            const { img, route, text } = el;
            const isSelected = pathname.includes(route) && pathname === route;

            return (
              <Link href={route} key={route}>
                <div
                  className={cn(
                    "link",
                    isSelected && "bg-primary-admin shadow-sm"
                  )}
                >
                  <div className="relative size-5">
                    <Image
                      src={img}
                      alt={text}
                      fill
                      className={cn(
                        "object-contain",
                        isSelected && "brightness-0 invert"
                      )}
                    />
                  </div>
                  <p
                    className={cn(isSelected ? "text-white" : "text-dark-100")}
                  >
                    {text}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="user">
        <Avatar>
          <AvatarFallback className="bg-teal-500 text-white">
            {initialUsername ?? "IN"}
          </AvatarFallback>
        </Avatar>
        <div className="hidden md:flex flex-col">
          <p className="font-semibold text-dark-200">{session.user?.name}</p>
          <p className="text-xs text-light-500">{session.user?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
