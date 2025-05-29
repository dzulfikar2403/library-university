"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Navbar = () => {
  const pathname = usePathname();

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
      </ul>
    </div>
  );
};

export default Navbar;
