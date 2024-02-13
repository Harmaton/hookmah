import { db } from "@/lib/db"; // Adjust the import path as necessary
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { emailList } = await req.json(); // Ensure this matches the body structure sent by the client
    const updatedUsers = [];

    for (const email of emailList) {
      // Ensure that `email` is not undefined or empty
      if (email) {
        const user = await db.user.findUnique({ where: { email } });
        if (user && !user.isTeacher) {
          const updatedUser = await db.user.update({
            where: { email },
            data: { isTeacher: true },
          });
          updatedUsers.push(updatedUser);
        }
      }
    }

    if (updatedUsers.length > 0) {
      return new NextResponse(JSON.stringify(updatedUsers), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } else {
      return new NextResponse(JSON.stringify({ message: "No users updated" }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  } catch (error) {
    console.error("[ADD-TEACHERS]", error);
    return new NextResponse(JSON.stringify({ error: "Internal Error", details: error }), { status: 500 });
  }
}
