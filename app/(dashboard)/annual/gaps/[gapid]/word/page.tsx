import React from "react";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { MethodsForm } from "../generate/_components/methods";
import { MaterialsForm } from "../generate/_components/materials";
import { ResourcesForm } from "../generate/_components/resources";
import { BibliographyForm } from "../generate/_components/bibliography";
import { WordAction } from "./_components/word-actions";
import { Separator } from "@/components/ui/separator";
import {  ChevronDownCircle  } from "lucide-react";
import HeaderInPage from "../_components/header";
import Subheader from "../generate/_components/subheader";

const GapWordPage = async ({ params }: { params: { gapid: string } }) => {
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
    !gap?.educationid ||
    !gap.academyid
  ) {
    return redirect("/");
  }

  const ageRecord = await db.newages.findUnique({
    where: { id: gap.ageid },
    select: { name: true },
  });

  const educationLevel = await db.educationLevel.findUnique({
    where: { id: gap.educationid },
    select: { name: true },
  });

  const department = await db.department.findUnique({
    where: { id: gap.departmentId },
    select: { name: true },
  });

  const academyLevel = await db.academy.findUnique({
    where: { id: gap.academyid },
    select: { name: true },
  });

  const course = await db.course.findUnique({
    where: { id: gap.courseid },
    select: { name: true },
  });

  const requiredFields = [gap.methodsStrategies, gap.resources, gap.materials];

  const allFields = requiredFields.length;

  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${allFields})`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <div className="p-6 border">
     <HeaderInPage id={gap.id} first={"annual"} second={"gaps"} page={"3"} pagetwo={"null"} />
      <div className="flex space-x-5  p-2 ">
        <h1 className="text-3xl ">
          Genera los detalles finales y accede al botón para convertir todo a
          Word.
        </h1>
       
        {isComplete && (
          <>
          
            <div className="flex justify-center items-center rounded-full p-2 mt-2 ">
              <WordAction
                gapData={gap}
                disabled={false}
                gapid={gap.id}
                academyLevel={academyLevel}
                averageAge={ageRecord}
                educationLevel={educationLevel}
                department={department}
                course={course}
              />
            </div>
          </>
        )}
      </div>
      {isComplete &&  <Subheader id={gap.id} completedFields={completedFields} isComplete={false} isfirst={false} issecond={false} />}
    {(gap.learningPurposes && gap.characteristics) && <MethodsForm
      initialData={gap}
      gapid={gap.id}
      ageRecord={ageRecord}
      course={course}
      academiclevel={academyLevel}
      learningpurposes={gap.learningPurposes}
      characterization={gap.characteristics}
    />}
    {(gap.learningPurposes && gap.characteristics && gap.methodsStrategies) && <MaterialsForm
        initialData={gap}
        gapid={gap.id}
        ageRecord={ageRecord}
        course={course}
        academiclevel={academyLevel}
        characteristics={gap.characteristics}
        learningpurposes={gap.learningPurposes}
        methods={gap.methodsStrategies}
      />}

     {(gap.learningPurposes && gap.characteristics && gap.recommendations) &&  <ResourcesForm
        initialData={gap}
        gapid={gap.id}
        ageRecord={ageRecord}
        academiclevel={academyLevel}
        course={course}
        learningpurposes={gap.learningPurposes}
        characterization={gap.characteristics}
        recommendations={gap.recommendations}
      />}
      {(gap.learningPurposes && gap.characteristics && gap.methodsStrategies && gap.acdescription && gap.recommendations ) && <BibliographyForm
        initialData={gap}
        gapid={gap.id}
        ageRecord={ageRecord}
        acdescription={gap.acdescription}
        methods={gap.methodsStrategies}
        characterization={gap.characteristics}
        learningpurposes={gap.learningPurposes}
        recommendations={gap.recommendations}
        educationlevel={educationLevel}
        course={course}
      />}
      <Separator className="m-2" />
      {isComplete && (
        <>
          <div className="flex justify-center items-center">
            <ChevronDownCircle className="animate animate-bounce m-4" />
          </div>
          <div className="flex justify-center items-center rounded-md p-2 mt-2">
            <WordAction
              gapData={gap}
              disabled={false}
              gapid={gap.id}
              academyLevel={academyLevel}
              averageAge={ageRecord}
              educationLevel={educationLevel}
              department={department}
              course={course}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default GapWordPage;
