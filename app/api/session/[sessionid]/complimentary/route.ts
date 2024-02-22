
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function PATCH(
    req: Request,
    { params }: { params: { sessionid: string } }
  ) {
    try {
      const { userId } = auth();
      const { sessionid } = params;
      const { text } = await req.json();
  
    if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
    }
  
      const sesseion = await db.session.update({
        where: {
          id: sessionid,
          userid: userId
        },
        data: {
          complimentaryactivities: text
        }
      });
  
      return NextResponse.json(sesseion);
    } catch (error) {
      console.log("sesseion_ID]", error);
      return new NextResponse("Internal Error", { status: 500 });
    }
  }