
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function DELETE(
  req: Request,
  { params }: { params: { sessionid: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.session.findUnique({
      where: {
        id: params.sessionid,
        userid: userId,
      },}
     );

    if (!course) {
      return new NextResponse("Not found", { status: 404 });
    }

    const deletedsession = await db.session.delete({
      where: {
        id: params.sessionid,
      },
    });

    return NextResponse.json(deletedsession);
  } catch (error) {
    console.log("[session_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { sessionid: string } }
) {
  try {
    const { userId } = auth();
    const { sessionid } = params;
    const values = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.session.update({
      where: {
        id: sessionid,
        userid: userId
      },
      data: {
        ...values,
      }
    });

    return NextResponse.json(course);
  } catch (error) {
    console.log("session_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}