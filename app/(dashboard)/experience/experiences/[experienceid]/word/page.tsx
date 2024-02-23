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



const ExperienceWordPage = async ({ params }: { params: { experienceid: string } }) => {
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

  if (!experience || !experience?.ageid || !experience?.educationid) {
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

  const requiredFields = [experience.resources, experience.materials];

  const allFields = requiredFields.length;

  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${allFields})`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <div className="p-6 border">
       <div className='flex space-x-5 items-center p-2 border mb-2'>
      <CheckCircle className="h-4 w-4 text-red-500" />
      <h1 className="text-2xl text-red-500"> Paso 3/3</h1>
      {/* <Actions disabled={false} experienceid={experience.id} /> */}
      </div>
      <div className="flex space-x-5 flex-col p-2 ">
        <h1 className="text-3xl ">
        Genera los detalles finales y accede al botón para convertir todo a Word.
        </h1>
        <MaterialsForm initialData={experience} evaluationcriteria={experience.evaluation_criteria} thematicfields={experience.thematic_fields} product={experience.product} age={experience.ageid} skills={experience.skills} grade={experience.educationid} experienceid={experience.id} />

        <ResourcesForm initialData={experience} experienceid={experience.id} evaluationcriteria={experience.evaluation_criteria} thematicfields={experience.thematic_fields} product={experience.product} age={age} skills={experience.skills} grade={grade}  />
      </div>
      
      <Separator className="m-2" />
      {isComplete && (
      <>
      <div className="flex justify-center items-center">
        <ChevronDownCircle className="animate animate-bounce m-4" />
      </div>
      <div className="flex justify-center items-center rounded-full p-2 mt-2 bg-red-500">
       <EXPWordAction disabled={false} experienceid={""} expData={experience} academyLevel={grade} averageAge={age} educationLevel={grade} />
      </div>
    </>
      )}
    </div>
  );
};

export default ExperienceWordPage;
