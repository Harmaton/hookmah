'use client'

import * as z from "zod";
import axios from "axios";
import { Loader2, SprayCan, Stars } from "lucide-react";
import { useState } from "react";
import {toast} from "sonner";
import { useRouter } from "next/navigation";
import { GAP } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { generateCharacteristics } from "@/app/_actions/characteristics-ai";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface MethodsFormProps {
  initialData: GAP;
  ageRecord: {name: string } | null;
  gapid: string;
  course: { name: string } | null;
  academiclevel: { name: string } | null;
  learningpurposes: string
  characterization: string
}

export const MethodsForm = ({
  initialData,
  gapid,
  ageRecord,
  learningpurposes,
  academiclevel,
  characterization,
  course
}: MethodsFormProps) => {
  const [isLoading, setisLoading] = useState(false);

const genAI = new GoogleGenerativeAI("AIzaSyDiUlIA-d2x8TpBbPZN1gNOHFCj1eYcZhw");

const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const toggleEdit = () => setisLoading((current) => !current);

const router = useRouter();

  async function aiRun() {
    
    setisLoading(true);

    const prompt =  `Tomando como ejemplo el Currículo Nacional de Educación Básica Regular (DCN-EBR) del Ministerio de Educación del Perú, descríbeme el método y la estrategia que se deberían implementar para el desarrollo de todo lo construido hasta ahora, lo cual incluye la caracterización de los estudiantes: ${characterization} y los propósitos de aprendizaje que los niños deben desarrollar en esta etapa, que son: ${learningpurposes}.

    La edad de los estudiantes es ${ageRecord}, el curso que están tomando es ${course}, y el nivel académico es ${academiclevel}.
    
    Debes generar un método y una estrategia para un modelo educativo basado en competencias. También quiero otro método y estrategia para un modelo educativo basado en el aprendizaje basado en problemas, y otro método y estrategia para un modelo educativo que oriente el desarrollo espiritual, el bienestar emocional y la salud mental.
    
    Genera todo en español.
    `;

    try{
      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();

      setisLoading(false);

      const res = await axios.patch(`/api/gaps/${gapid}/methods`, { text: JSON.stringify(text) });

      console.log(res)
      toast.success("métodos y estrategias actualizados");
      toggleEdit();
      router.refresh();
    } catch(error){
      console.log(error)
    }
  }


  return (
    <div className="rounded-md p-4 border-red-200">
      <div className="font-medium flex items-center justify-between">
      Métodos y estrategias
        <Button onClick={aiRun} variant="ghost">
          {isLoading ? (
            <>generando ...</>
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
            !initialData.methodsStrategies && "text-slate-500 italic"
          )}
        >
          {initialData.methodsStrategies || "sin Métodos"}
        </p>
      )}
      {isLoading && <Stars className="flex m-auto animate animate-pulse" />}
    </div>
  );
};
