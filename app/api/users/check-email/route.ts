import { db } from "@/lib/db";
import { NextResponse } from "next/server";

// Handler for POST requests to check if an email is registered
export async function POST(req: Request) {
    try {
      // Parse the request body to get the email
      const { email } = await req.json();
      // Search for the user by email
      const user = await db.user.findUnique({
        where: { email },
      });
  
      // If the user exists, return a JSON response with a custom status
      if (user) {
        return new NextResponse(JSON.stringify({ isRegistered: true }), {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } else {
        // If the user does not exist, return a JSON response indicating such
        return new NextResponse(JSON.stringify({ isRegistered: false }), {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }
    } catch (error) {
      // Log the error and return a 500 Internal Server Error response
      console.log("[CHECK-EMAIL]", error);
      return new NextResponse("Internal Error", { status: 500 });
    }
  }
 
  
  