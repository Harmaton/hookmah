
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function PATCH(
    req: Request,
    { params }: { params: { gapid: string } }
  ) {
    try {
      const { userId } = auth();
      const { gapid } = params;
      const { text } = await req.json();
  
    if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
    }
  
      const gap = await db.gAP.update({
        where: {
          id: gapid,
          userid: userId
        },
        data: {
          recommendations: text
        }
      });
  
      return NextResponse.json(gap);
    } catch (error) {
      console.log("GAP_ID]", error);
      return new NextResponse("Internal Error", { status: 500 });
    }
  }