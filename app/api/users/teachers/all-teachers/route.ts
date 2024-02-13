import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Retrieve all users where isTeacher is true
    const teachers = await db.user.findMany({
      where: { isTeacher: true },
      // Select only the fields you want to expose
      select: {
        email: true,
      },
    });

    // If teachers are found, return them in the response
    if (teachers.length > 0) {
      return new NextResponse(JSON.stringify(teachers), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } else {
      // If no teachers are found, return a message stating that
      return new NextResponse(JSON.stringify({ message: "No teachers found" }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  } catch (error) {
    // Log the error and return a 500 Internal Server Error response
    console.error("[FETCH-TEACHERS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
