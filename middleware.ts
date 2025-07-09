import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/utils";

export async function middleware(req:NextRequest){
    const session = await getSession();
    
    const currentPath = req.nextUrl.pathname;
    const isAuthProtect = ['/sign-in','/sign-up'];
    const isAdminProtect = ['/admin'];
    const userEmail = session?.user?.email;
    
    // cek kalo lagi diluar auth route dan ngk ada email , tendang.
    if(!isAuthProtect.includes(currentPath) && !userEmail){
        return NextResponse.redirect(new URL("/sign-in", req.url));
    }
    
    // cek kalo didalam auth route dan ada sesion email, tendang ke home (karna dh login).
    if(isAuthProtect.includes(currentPath) && userEmail) {
        return NextResponse.redirect(new URL('/',req.url));
    };
    
    return NextResponse.next();
}

export const config = {
    matcher: [
    // Skip Next.js internals and all static files and api route, unless found in search params
    '/((?!_next|api|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
  ],
}