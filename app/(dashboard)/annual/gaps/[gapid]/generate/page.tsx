import { auth } from "@clerk/nextjs";
import { redirect, useRouter } from "next/navigation";
import {
  ArrowLeftCircleIcon,
  BookAIcon,
  CheckCheck,
  CheckCircle,
  SprayCan,
} from "lucide-react";

import { db } from "@/lib/db";

import { Progress } from "@/components/ui/progress";
import { Actions } from "./_components/actions";
import { CharacteristicsForm } from "./_components/characteristics";
import { RecommendationsForm } from "./_components/recommendations";
import { AttitudesForm } from "./_components/attitudes";
import { ValuesForm } from "./_components/values";
import { LearningfORM } from "./_components/learning-purposes";
import { MaterialsForm } from "./_components/materials";
import { MethodsForm } from "./_components/methods";
import { ResourcesForm } from "./_components/resources";
import { BibliographyForm } from "./_components/bibliography";
import { AcDescriptionForm } from "./_components/acdescription";
import { Button } from "@/components/ui/button";
import { BackActions } from "../_components/generate-back-action";
import HeaderInPage from "../_components/header";
import Subheader from "./_components/subheader";

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

  if (
    !gap ||
    !gap?.departmentId ||
    !gap?.ageid ||
    !gap?.courseid ||
    !gap?.educationid
  ) {
    return redirect("/");
  }

  const departmentRecord = await db.department.findUnique({
    where: { id: gap.departmentId },
    select: { name: true },
  });

  const ageRecord = await db.newages.findUnique({
    where: { id: gap.ageid },
    select: { name: true },
  });

  const courseRecord = await db.course.findUnique({
    where: { id: gap.courseid },
    select: { name: true },
  });

  const educationLevel = await db.educationLevel.findUnique({
    where: { id: gap.educationid },
    select: { name: true },
  });

  const requiredFields = [
    gap.acdescription,
    gap.characteristics,
    gap.learningPurposes,
    gap.methodsStrategies,
    gap.recommendations,
  ];

  const allFields = requiredFields.length;

  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${allFields})`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      <div className="p-6 border">
        <HeaderInPage id={gap.id} first={"annual"} second={"gaps"} page={"2"} pagetwo={null} />

        <div className="flex items-center justify-between flex-col md:flex-row">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium flex">
              Aquí, anima los detalles en los cuadros y ajústalos a tu estilo
              más tarde.
              <SprayCan className="h-4 w-4 flex ml-2 text-blue-500 " />
            </h1>
            <span className="text-sm text-slate-700">
              Campos requeridos: {completionText}
            </span>
            {!isComplete && <Progress value={completedFields} />}

            {!isComplete && (
              <span className="text-sm text-red-300">
                Complete todos los campos para acceder a su documento de Word
              </span>
            )}
            
          </div>
          
        </div>
        {completedFields && (
              <Subheader id={gap.id} completedFields={completedFields} isComplete={true} isfirst={false} issecond={true} />
            )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <div className="border rounded-md">
            <CharacteristicsForm
              initialData={gap}
              gapid={gap.id}
              departmentRecord={departmentRecord}
              district={gap.district}
              city={gap.city}
              courseRecord={courseRecord}
              ageRecord={ageRecord}
            />
            <RecommendationsForm
              initialData={gap}
              gapid={gap.id}
              departmentRecord={departmentRecord}
              district={gap.district}
              city={gap.city}
              courseRecord={courseRecord}
              ageRecord={ageRecord}
            />

            {gap.learningPurposes && gap.characteristics && (
              <MethodsForm
                initialData={gap}
                gapid={gap.id}
                ageRecord={ageRecord}
                course={courseRecord}
                academiclevel={educationLevel}
                learningpurposes={gap.learningPurposes}
                characterization={gap.characteristics}
              />
            )}
          </div>

          <div className="space-y-6">
            <div className="border rounded-md">
              <LearningfORM
                initialData={gap}
                gapid={gap.id}
                ageRecord={ageRecord}
              />

              <AcDescriptionForm
                initialData={gap}
                gapid={gap.id}
                educationLevel={educationLevel}
                city={gap.city}
                district={gap.district}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GapGeneratePage;
