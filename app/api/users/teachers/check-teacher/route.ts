import { db } from "@/lib/db"; // Adjust the import path as necessary
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // Parse the request body to get the email
    const { email } = await req.json();
    // Search for the user by email
    const user = await db.user.findUnique({
      where: { email },
    });

    // If the user exists and isTeacher is true, return a JSON response
    if (user && user.isTeacher) {
      return new NextResponse(JSON.stringify({ isTeacher: true }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
    } else {
      // If the user is not a teacher or does not exist, return a JSON response indicating such
      return new NextResponse(JSON.stringify({ isTeacher: false }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  } catch (error) {
    // Log the error and return a 500 Internal Server Error response
    console.log("[CHECK-TEACHER]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
