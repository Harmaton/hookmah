import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { TRACE_OUTPUT_VERSION } from "next/dist/shared/lib/constants";
import { redirect } from "next/navigation";
import { AbilityForm } from "./_components/ability";
import { ProductForm } from "./_components/product";
import { Button } from "@/components/ui/button";
import { InstrumentForm } from "./_components/instrument";
import { ThemeForm } from "./_components/themes";
import { Actions } from "./_components/action";
import { CheckCheck } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const SessionExperienceGeneratePage = async ({
  params,
}: {
  params: { sessionid: string };
}) => {
  const { userId } = auth();
  if (!userId) {
    redirect("/");
  }
  const session = await db.session.findUnique({
    where: { id: params.sessionid, userid: userId },
  });

  if (!session?.experienceid) {
    redirect("/session");
  }

  const experience = await db.experience.findUnique({
    where: {
      id: session.experienceid,
    },
    select: {
      skills: true,
      product: true,
      eval_instrument: true,
      thematic_fields: true,
    },
  });

  const requiredfields = [
    session.him,
    session.competence,
    session.product,
    session.instrument,
  ];

  const allFields = requiredfields.length;
  const completedFields = requiredfields.filter(Boolean).length;

  const completionText = `(${completedFields}/${allFields})`;

  const isComplete = requiredfields.every(Boolean);

  return (
    <div className="p-4 space-y-4">
      <div className="p-4 ">
        <h1 className="font-bold text-center text-4xl">
          Extraiga detalles de su experiencia de aprendizaje{" "}
        </h1>
      </div>


      <span className="text-sm text-slate-700">
            Campos requeridos : {completionText}
            </span>
            {!isComplete && <Progress value={completedFields} />}

      {isComplete &&
       <div className="items-center justify-center m-auto">
       <Actions disabled={false} sessionid={session.id}  /> 
       </div>
       }

      <div className="p-4 border ">
        <h1 className="font-semibold font-2xl">Producto</h1>
        {!experience?.product && (
          <div className="flex flex-col p-4 space-y-4">
            <p className="text-red-500 text-center">
              Lo sentimos, debes haber generado productos de aprendizaje en la
              experiencia de aprendizaje que elegiste.
            </p>
          </div>
        )}
        {experience?.product && (
          <ProductForm
            initialData={session}
            sessionid={session.id}
            product={experience.product}
          />
        )}
      </div>

      <div className="p-4 border ">
        <h1 className="font-semibold font-2xl">Competencia</h1>
        {!experience?.skills && (
          <div className="flex flex-col p-4 space-y-4">
            <p className="text-red-500 text-center">
              Lo sentimos, la experiencia de aprendizaje seleccionada debe tener
              instrumentos de evaluación.
            </p>
          </div>
        )}
        {experience?.skills && (
          <AbilityForm
            initialData={session}
            sessionid={session.id}
            competencies={experience.skills}
          />
        )}
      </div>

      <div className="p-4 border ">
        <h1 className="font-semibold font-2xl">Instrumento de evaluación</h1>
        {!experience?.eval_instrument && (
          <p className="text-red-500 text-center">
            Lo sentimos, esto solo aparecerá si tu experiencia tiene una
            habilidad del paso 3.
          </p>
        )}
        {experience?.eval_instrument && (
          <InstrumentForm
            initialData={session}
            sessionid={session.id}
            instrument={experience.eval_instrument}
          />
        )}
      </div>

      <div className="p-4 border ">
        <h1 className="font-semibold font-2xl">Tema</h1>
        {!experience?.thematic_fields && (
          <p className="text-red-500 text-center">
            Lo sentimos, debes tener temas de aprendizaje en la experiencia de
            aprendizaje que elegiste en el paso anterior.
          </p>
        )}
        {experience?.thematic_fields && (
          <ThemeForm
            initialData={session}
            sessionid={session.id}
            him={experience.thematic_fields}
          />
        )}
      </div>
    </div>
  );
};

export default SessionExperienceGeneratePage;
