import { auth } from "@clerk/nextjs";
import { redirect, useRouter } from "next/navigation";
import {
  CheckCheck,
  CheckCircle,
  SprayCan,
} from "lucide-react";

import { db } from "@/lib/db";

import { Progress } from "@/components/ui/progress";
import { Actions } from "./_components/actions";
import { Reality_contextForm } from "./_components/reality-context";
import { SkillsForm } from "./_components/skills";
import { Question_aiForm } from "./_components/question_ai";
import { EvalCriteriaForm } from "./_components/evaluation_criteria";
import { ThematicForm } from "./_components/thematic-fields";
import { ProductForm } from "./_components/product";
import { SEQForm } from "./_components/sequence_activities";
import { EvalInstrument } from "./_components/eval-instrument";
import { MethodsForm } from "./_components/methods_strategies";
import { PICForm } from "./_components/pic";
import { PSEForm } from "./_components/pse";
import { PNPForm } from "./_components/pnp";
import { BackActions } from "./_components/back-actions";

const ExperirnceGeneratePage = async ({
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

  const requiredFields = [
    experience.eval_instrument,
    experience.evaluation_criteria,
    experience.reality_context,
    experience.product,
    experience.skills,
    experience.question_ai,
    experience.thematic_fields,
    experience.sequence_activities,
    experience.methods_strategies,
    experience.piccharacteristics,
    experience.psecharacteristics,
    experience.pnpcharacteristics
  ];

  const allFields = requiredFields.length;

  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${allFields})`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      <div className="p-6 border">
        <div className="flex space-x-5 items-center p-2 border rounded-md mb-2">
          <div>
          <CheckCircle className="h-4 w-4 text-red-500" />
          <h1 className="text-2xl text-red-500"> Paso 2/3</h1>
          </div>
          <BackActions disabled={false} experienceid={experience.id} />
        </div>
        <div className="flex items-center justify-between flex-col md:flex-row">
          <div className="flex flex-col experience-y-2">
            <h1 className="text-2xl font-medium flex">
              Aquí, anima los detalles en los cuadros y ajústalos a tu estilo
              más tarde.
              <SprayCan className="h-4 w-4 flex ml-2 text-blue-500 " />
            </h1>
            <span className="text-sm text-slate-700">
              Campos requeridos: {completionText}
            </span>
            {!isComplete && <Progress value={completedFields} />}
            {isComplete && (
              <div className="h-10 w-10 flex rounded-full bg-green-500">
                <CheckCheck className="mx-auto my-auto" />
              </div>
            )}
            {!isComplete && (
              <span className="text-sm text-red-300">
                Complete todos los campos para acceder a su documento de Word
              </span>
            )}
            {isComplete && (
              <>
                <Actions disabled={false} experienceid={experience.id} />
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 experience-6 mt-10">
          <div className="border rounded-md">
            <PICForm initialData={experience} age={age} experienceid={experience.id} />
            <PSEForm initialData={experience} age={age} experienceid={experience.id} />
           <PNPForm initialData={experience} age={age} experienceid={experience.id} />
            <Reality_contextForm
              initialData={experience}
              psecharacteristics={experience.psecharacteristics}
              piccharacteristics={experience.piccharacteristics}
              pnpcharacteristics={experience.pnpcharacteristics}
              experienceid={experience.id}
            />
            <SkillsForm
              initialData={experience}
              psecharacteristics={experience.psecharacteristics}
              piccharacteristics={experience.piccharacteristics}
              pnpcharacteristics={experience.pnpcharacteristics}
              experienceid={experience.id}
            />
             {experience.thematic_fields && (
                <ProductForm
                  initialData={experience}
                  experienceid={experience.id}
                  evaluationcriteria={experience.evaluation_criteria}
                  thematicfields={experience.thematic_fields}
                />
              )}

              {experience.thematic_fields && (
                <EvalInstrument
                  initialData={experience}
                  experienceid={experience.id}
                  evaluationcriteria={experience.evaluation_criteria}
                  thematicfields={experience.thematic_fields}
                />
              )}
          </div>

          <div className="space-y-6">
            <div className="border rounded-md">
              <Question_aiForm
                initialData={experience}
                psecharacteristics={experience.psecharacteristics}
                piccharacteristics={experience.piccharacteristics}
                pnpcharacteristics={experience.pnpcharacteristics}
                experienceid={experience.id}
              />

              {experience.skills && (
                <EvalCriteriaForm
                  initialData={experience}
                  experienceid={experience.id}
                  skills={experience.skills}
                />
              )}

              {experience.evaluation_criteria && (
                <ThematicForm
                  initialData={experience}
                  experienceid={experience.id}
                  evaluationcriteria={experience.evaluation_criteria}
                />
              )}
             
              {experience.product && (
                <SEQForm
                  initialData={experience}
                  experienceid={experience.id}
                  evaluationcriteria={experience.evaluation_criteria}
                  thematicfields={experience.thematic_fields}
                  age={age}
                  skills={experience.skills}
                  grade={grade}
                  product={experience.product}
                />
              )}

              {experience.sequence_activities && (
                <MethodsForm
                  initialData={experience}
                  experienceid={experience.id}
                  evaluationcriteria={experience.evaluation_criteria}
                  thematicfields={experience.thematic_fields}
                  product={experience.product}
                  skills={experience.skills}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExperirnceGeneratePage;
