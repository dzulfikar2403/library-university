import { auth } from "@/auth"
import { clsx, type ClassValue } from "clsx"
import { cache } from "react"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getSession = cache(async() => {
  const session = await auth();
  return session;
})