import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req:NextRequest){
    const session = await auth();
    const isAuthProtect = ['/sign-in','/sign-up'];

    // cek kalo diluar auth route dan gada sesion email, tendang.
    if(!isAuthProtect.includes(req.nextUrl.pathname) && !session?.user?.email) { 
        return NextResponse.redirect(new URL('/sign-in',req.url));
    };
    
    // cek kalo didalam auth route dan ada sesion email, tendang ke home (karna dh login).
    if(isAuthProtect.includes(req.nextUrl.pathname) && session?.user?.email) {
        return NextResponse.redirect(new URL('/',req.url));
    };
    
    return NextResponse.next();
}

export const config = {
    matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}