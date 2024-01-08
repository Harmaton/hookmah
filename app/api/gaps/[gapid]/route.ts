
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function DELETE(
  req: Request,
  { params }: { params: { gapid: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.gAP.findUnique({
      where: {
        id: params.gapid,
        userid: userId,
      },}
     );

    if (!course) {
      return new NextResponse("Not found", { status: 404 });
    }

    const deletedGAP = await db.gAP.delete({
      where: {
        id: params.gapid,
      },
    });

    return NextResponse.json(deletedGAP);
  } catch (error) {
    console.log("[GAP_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { gapid: string } }
) {
  try {
    const { userId } = auth();
    const { gapid } = params;
    const values = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.gAP.update({
      where: {
        id: gapid,
        userid: userId
      },
      data: {
        ...values,
      }
    });

    return NextResponse.json(course);
  } catch (error) {
    console.log("GAP_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}