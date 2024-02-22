import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { hostname } from "os";
 
// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
    publicRoutes: ["/site","api/uploadthing"],
    beforeAuth(auth, req){},
    afterAuth(auth, req){
      const url = req.nextUrl
      const searchParams = url.searchParams.toString()
      let hostname =req.headers

      const pathWithSearchParams = `${url.pathname}
      ${searchParams.length>0 ? `?${searchParams}` : ""}`
      const customSubDomain = hostname.get('host')?.split(`${process.env.NEXT_PUBLIC_DOMAIN}`)
      .filter(Boolean)[0]; 

      console.log('custom sub domain', customSubDomain)

      if(customSubDomain){
        return NextResponse.rewrite(new URL(`/${customSubDomain}${pathWithSearchParams }`,req.url)) 
      }
  
      if(url.pathname==="/sign-in" || url.pathname==="/sign-up"){
         // Redirect users trying to access the /sign-in or /sign-up pages to the root of the site
        return NextResponse.redirect(new URL("/agency",req.url))
      }

      if(url.pathname==="/" || 
      (url.pathname==="/site" && url.host === process.env.NEXT_PUBLIC_DOMAIN)){
        return NextResponse.rewrite(new URL("/site",req.url))
      }   

      if(url.pathname.startsWith("/agency") 
      || url.pathname.startsWith("/subaccount")){
        return NextResponse.rewrite(new URL(`${pathWithSearchParams} `,req.url))
      }

    },

});
 
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};