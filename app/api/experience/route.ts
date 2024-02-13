import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const { title } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const experience = await db.experience.create({
      data: {
       userid: userId,
        title: title
      },
    });

    return NextResponse.json(experience);
  } catch (error) {
    console.log("[experienceS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
