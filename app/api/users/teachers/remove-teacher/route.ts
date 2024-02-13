import { db } from "@/lib/db"; // Adjust the import path as necessary
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const {email} = await req.json();
    try{
        await db.user.delete({where: {
            email: email
        }})
    } catch(error){
        console.log(error)
    }

  } catch (error) {
    console.error("[Remove-TEACHER]", error);
    return new NextResponse(JSON.stringify({ error: "Internal Error", details: error }), { status: 500 });
  }
}
