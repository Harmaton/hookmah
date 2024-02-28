import React from "react";
import * as fs from "fs";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, ChevronDownCircle } from "lucide-react";
import { MaterialsForm } from "../generate/_components/materials";
import { ResourcesForm } from "../generate/_components/resources";
import { EXPWordAction } from "./_components/exp-word-actions";
import { BackActions } from "./_components/back-actions";
import HeaderInPage from "../_components/header";
import SubheaderEXP from "../_components/subheader";

const ExperienceWordPage = async ({
  params,
}: {
  params: { experienceid: string };
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const experience = await db.experience.findUnique({
    where: {
      id: params.experienceid,
      userid: userId,
    },
  });

  if (!experience || !experience?.ageid || !experience?.educationid || !experience.courseid ) {
    return redirect("/");
  }

  const age = await db.averageAge_experience.findUnique({
    where: {
      id: experience.ageid,
    },
    select: { name: true },
  });

  const grade = await db.educationLevel__experience.findUnique({
    where: { id: experience.educationid },
    select: { name: true },
  });

  const course = await db.course_experience.findUnique({
    where: { id: experience.courseid },
    select: { name: true },
  });

  const requiredFields = [experience.resources, experience.materials];

  const allFields = requiredFields.length;

  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${allFields})`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <div className="p-6 border">
      <HeaderInPage
        id={experience.id}
        first={"experience"}
        second={"experiences"}
        page={"3"}
        pagetwo={"null"}
      />

      <div className="flex space-x-5 flex-col p-2 ">
        <h1 className="text-3xl ">
          Genera los detalles finales y accede al botón para convertir todo a
          Word.
        </h1>
        <EXPWordAction
              disabled={false}
              experienceid={""}
              expData={experience}
              academyLevel={grade}
              averageAge={age}
              educationLevel={grade}
              course={course}
            />

        {completionText}

        {isComplete && (
          <SubheaderEXP
            id={experience.id}
            completedFields={completedFields}
            isComplete={isComplete}
            isfirst={false}
            issecond={true}
          />
        )}

        <MaterialsForm
          initialData={experience}
          evaluationcriteria={experience.evaluation_criteria}
          thematicfields={experience.thematic_fields}
          product={experience.product}
          age={experience.ageid}
          skills={experience.skills}
          grade={experience.educationid}
          experienceid={experience.id}
          methodStrategies={experience.methods_strategies}
          sequenceActivities={experience.sequence_activities}
        />

        <ResourcesForm
          initialData={experience}
          experienceid={experience.id}
          evaluationcriteria={experience.evaluation_criteria}
          thematicfields={experience.thematic_fields}
          product={experience.product}
          age={age}
          skills={experience.skills}
          grade={grade}
          methodStrategies={experience.methods_strategies}
          sequenceActivities={experience.sequence_activities}
        />
      </div>

      <Separator className="m-2" />
      {isComplete && (
        <>
          <div className="flex justify-center items-center">
            <ChevronDownCircle className="animate animate-bounce m-4" />
          </div>
          <div className="flex justify-center items-center rounded-full p-2 mt-2 ">
            <EXPWordAction
              disabled={false}
              experienceid={""}
              expData={experience}
              academyLevel={grade}
              averageAge={age}
              educationLevel={grade}
              course={course}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ExperienceWordPage;
