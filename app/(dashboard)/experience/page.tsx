import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/column";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";

const Experiencepage = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/");
  }

  const experience = await db.experience.findMany({
    where: {
      userid: userId,
    },
  });

  const gaps = await db.gAP.findMany({
    where: {
      userid: userId,
    },
  });

  if (gaps.length === 0) {
    return (
      <>
        <div className="p-12 justify-center">
          <h1 className="text-3xl m-2 p-2 font-bold ">
            Bienvenido, primero debes crear una programación circular.
          </h1>
          <Link href="/annual">
            <Card className="border-red-500">
              <CardHeader className="text-center font-bold">
                Crea tu Primera Programación Anual para Crear una Experiencia de
                Aprendizaje
              </CardHeader>
              <CardContent>
                <Image
                  src="/empty-red.svg"
                  alt="undraw create image"
                  width={150}
                  height={150}
                  className="m-auto"
                />
              </CardContent>
            </Card>
          </Link>
        </div>
      </>
    );
  }

  return (
    <div className="p-12 justify-center">
      <h1 className="text-3xl m-2 p-2 font-bold ">
        Los documentos de tu experiencia de aprendizaje 2024
      </h1>
      <DataTable columns={columns} data={experience} />
    </div>
  );
};

export default Experiencepage;
