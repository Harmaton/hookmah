// pages/api/user/check-or-create.js
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // Parse the request body to get the clerkId and email
    const { clerkId, email } = await req.json();

    // Search for the user by clerkId
    let user = await db.user.findUnique({
      where: { clerkId },
    });
    // If the user exists, return a JSON response
    if (user) {
      return new NextResponse(JSON.stringify({ isRegistered: true, user }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    // If the user does not exist, create a new user
    user = await db.user.create({
      data: {
        clerkId,
        email,
      },
    });

    // Return a JSON response indicating the user was created
    return new NextResponse(JSON.stringify({ isRegistered: true, user }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
  } catch (error) {
    // Log the error and return a 500 Internal Server Error response
    console.error("[CHECK-OR-CREATE-USER]", error);
    return new NextResponse(JSON.stringify({ error: "Internal Error" }), { status: 500 });
  }
}
