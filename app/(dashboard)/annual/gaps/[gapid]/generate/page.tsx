import { auth } from "@clerk/nextjs";
import { redirect, useRouter } from "next/navigation";
import { BookAIcon, CheckCheck, SprayCan } from "lucide-react";

import { db } from "@/lib/db";

import { Progress } from "@/components/ui/progress";
import { Actions } from "./_components/actions";
import { CharacteristicsForm } from "./_components/characteristics";

const GapGeneratePage = async ({ params }: { params: { gapid: string } }) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const gap = await db.gAP.findUnique({
    where: {
      id: params.gapid,
      userid: userId,
    },
  });

  const departments = await db.department.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const levels = await db.educationLevel.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const academies = await db.academy.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const courses = await db.course.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const averageages = await db.averageAge.findMany({
    orderBy: {
      name: "asc",
    },
  });

  if (!gap || !gap?.departmentId || !gap?.ageid || !gap?.courseid) {
    return redirect("/");
  }

  const departmentRecord = await db.department.findUnique({
    where: { id: gap.departmentId },
    select: { name: true },
  });

  const ageRecord = await db.averageAge.findUnique({
    where: { id: gap.ageid },
    select: { name: true },
  });

  const courseRecord = await db.course.findUnique({
    where: { id: gap.courseid },
    select: { name: true },
  });

  const requiredFields = [
    gap.acdescription,
    gap.characteristics,
    gap.learningPurposes,
    gap.materials,
    gap.methodsStrategies,
    gap.attitudes,
    gap.values,
    gap.recommendations,
    gap.resources,
  ];

  const allFields = requiredFields.length;

  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${allFields})`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      <div className="p-6 border">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium flex">
              Use <span className="text-red-500 mr-2 ml-2">Hokmah AI </span>to
              Generate More Details
              <SprayCan className="h-4 w-4 flex ml-3" />
            </h1>
            <span className="text-sm text-slate-700">
              Reuired Fields : {completionText}
            </span>
            {!isComplete && <Progress value={completedFields} />}
            {isComplete && (
              <div className="h-10 w-10 rounded-full bg-green-200 flex">
                <CheckCheck className="text-green-500 mx-auto my-auto" />
              </div>
            )}
            {!isComplete && (
              <span className="text-sm text-red-300">
                Fill in all the fields to access your Word Document
              </span>
            )}
          </div>
          {isComplete && (
            <>
              <Actions disabled={false} gapid={gap.id} />
            </>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <div className="border rounded-md ">
            <CharacteristicsForm
              initialData={gap}
              gapid={gap.id}
              departmentRecord={departmentRecord}
              district={gap.district}
              city={gap.city}
              courseRecord={courseRecord}
              ageRecord={ageRecord}
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="border rounded-md"></div>
        </div>
      </div>
    </>
  );
};

export default GapGeneratePage;
