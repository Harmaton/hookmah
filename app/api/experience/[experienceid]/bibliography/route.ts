
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function PATCH(
    req: Request,
    { params }: { params: { experienceid: string } }
  ) {
    try {
      const { userId } = auth();
      const { experienceid } = params;
      const { text } = await req.json();
  
    if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
    }
  
      const experience = await db.experience.update({
        where: {
          id: experienceid,
          userid: userId
        },
        data: {
          bibliography: text
        }
      });
  
      return NextResponse.json(experience);
    } catch (error) {
      console.log("experience_ID]", error);
      return new NextResponse("Internal Error", { status: 500 });
    }
  }