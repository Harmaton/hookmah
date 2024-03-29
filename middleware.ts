import { NextResponse } from "next/server";

import { clerkClient } from "@clerk/nextjs";
import { authMiddleware } from "@clerk/nextjs/server";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
  publicRoutes: [
    "/",
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/api(.*)",
    "/api/webhook/clerk",
    "/contact",
  ],

  // async afterAuth(auth, req) {
  //     if (auth.isPublicRoute) {
  //       //  For public routes, we don't need to do anything
  //       return NextResponse.next()
  //     }

  //     const url = new URL(req.nextUrl.origin)

  //     if (!auth.userId) {
  //       //  If user tries to access a private route without being authenticated,
  //       //  redirect them to the sign in page
  //       url.pathname = "/sign-in"
  //       return NextResponse.redirect(url)
  //     }

  //     // Set the user's role to user if it doesn't exist
  //     const user = await clerkClient.users.getUser(auth.userId)

  //     if (!user) {
  //       throw new Error("User not found.")
  //     }

  // // If the user doesn't have a role, set it to student
  // if (!user.privateMetadata.role) {
  //   await clerkClient.users.updateUserMetadata(auth.userId, {
  //     privateMetadata: {
  //       role: "teacher" satisfies UserRole,
  //     },
  //   })
  // }
  //}

});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
