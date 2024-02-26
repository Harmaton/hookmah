"use client";

import axios from "axios";
import { SprayCan, Stars } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { GAP } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface MaterialsFormProps {
  initialData: GAP;
  ageRecord: { name: string } | null;
  course: { name: string } | null;
  academiclevel: { name: string } | null;
  gapid: string;
  characteristics: string;
  learningpurposes: string;
  methods: string;
}

export const MaterialsForm = ({
  initialData,
  gapid,
  ageRecord,
  characteristics,
  course,
  academiclevel,
  methods,
  learningpurposes,
}: MaterialsFormProps) => {
  const [isLoading, setisLoading] = useState(false);

  const apikey = "AIzaSyDiUlIA-d2x8TpBbPZN1gNOHFCj1eYcZhw";
  const genAI = new GoogleGenerativeAI(apikey);

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const toggleEdit = () => setisLoading((current) => !current);

  const router = useRouter();

  async function aiRun() {
    setisLoading(true);

    const prompt = `Proporcióneme 10 actividades con sus respectivos materiales que un profesor pueda preparar para el desarrollo de los contenidos mencionados. Toda la información necesaria ya ha sido proporcionada. Utilice los siguientes detalles para asegurarse de que las actividades sean precisas y extremadamente relevantes:

    Caracterización general de los estudiantes: ${characteristics}
    Método y estrategia para un modelo educativo basado en competencias.
    Método y estrategia para un modelo educativo basado en el aprendizaje basado en problemas.
    Método y estrategia para un modelo educativo que oriente el desarrollo espiritual, el bienestar emocional y la salud mental.
    Propósitos de aprendizaje que los niños deben desarrollar en esta etapa: ${learningpurposes}
    Asegúrese de que las actividades propuestas estén alineadas con la edad de los estudiantes (${ageRecord}), el curso que están tomando (${course}), y el nivel académico (${academiclevel}).
    `;

    try {
      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();

      setisLoading(false);

      const res = await axios.patch(`/api/gaps/${gapid}/materials`, {
        text: JSON.stringify(text),
      });

      console.log(res);
      toast.success("Materiales actualizados");
      toggleEdit();
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="rounded-md p-4 border-red-200">
      <div className="font-medium flex items-center justify-between">
        Materiales (medios educativos)
        <Button onClick={aiRun} variant="ghost">
          {isLoading ? (
            <>Generando...</>
          ) : (
            <>
              <SprayCan className="h-4 w-4 mr-2 text-blue-500" />
              IA generada
            </>
          )}
        </Button>
      </div>
      {!isLoading && (
        <p
          className={cn(
            "text-sm mt-2 text-ellipsis",
            !initialData.materials && "text-slate-500 italic"
          )}
        >
          {initialData.materials || "Sin Materiales"}
        </p>
      )}
      {isLoading && <Stars className="flex m-auto animate animate-pulse" />}
    </div>
  );
};
