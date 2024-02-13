
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function DELETE(
  req: Request,
  { params }: { params: { experienceid: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const experience = await db.experience.findUnique({
      where: {
        id: params.experienceid,
        userid: userId,
      },}
     );

    if (!experience) {
      return new NextResponse("Not found", { status: 404 });
    }

    const deletedexperience = await db.experience.delete({
      where: {
        id: params.experienceid,
      },
    });

    return NextResponse.json(deletedexperience);
  } catch (error) {
    console.log("[experience_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { experienceid: string } }
) {
  try {
    const { userId } = auth();
    const { experienceid } = params;
    const values = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const experience = await db.experience.update({
      where: {
        id: experienceid,
        userid: userId
      },
      data: {
        ...values,
      }
    });

    return NextResponse.json(experience);
  } catch (error) {
    console.log("experience_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }

}