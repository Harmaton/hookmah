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

    const baseLegal = `
    `
    const graduateProfile= `
    `
    const crosscuttingApproach = ``

    const gap = await db.gAP.create({
      data: {
       userid: userId,
        title: title,
        // regulatoryBasis: baseLegal,
        // graduateProfile: graduateProfile,
        // crosscuttingApproach: crosscuttingApproach
      },
    });

    return NextResponse.json(gap);
  } catch (error) {
    console.log("[GAPS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
