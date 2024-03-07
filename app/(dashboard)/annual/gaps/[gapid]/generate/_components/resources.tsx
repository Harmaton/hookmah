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
import { GoogleGenerativeAI } from "@google/generative-ai";

interface ResourcesFormProps {
  initialData: GAP;
  ageRecord: {name: number } | null;
  gapid: string;
  academiclevel: { name: string } | null;
  course: {name: string } | null;
  learningpurposes: string
  characterization: string
  recommendations: string
}

export const ResourcesForm = ({
  initialData,
  gapid,
  ageRecord,
  characterization,
  learningpurposes,
  academiclevel,
  recommendations,
  course
}: ResourcesFormProps) => {
  const [isLoading, setisLoading] = useState(false);

const genAI = new GoogleGenerativeAI("AIzaSyDiUlIA-d2x8TpBbPZN1gNOHFCj1eYcZhw");

const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const toggleEdit = () => setisLoading((current) => !current);

const router = useRouter();

  async function aiRun() {
    
    setisLoading(true);

    const prompt =   ` Proporcióneme 10 recursos que ya existen y que puedo utilizar, ya sean plataformas, juegos virtuales, materiales preparados por otros profesores en toda la red. Deben ser estrictamente relevantes para el siguiente contenido que generaste anteriormente:

    Caracterización de los estudiantes: ${characterization}.
    Recomendaciones para situaciones ambientales y educativas favorables para el desarrollo de todos estos aprendizajes construidos, que son: ${recommendations}.
    Propósitos de aprendizaje que los niños deben desarrollar en esta etapa, que son: ${learningpurposes}.
    La edad de los estudiantes es ${ageRecord?.name}, el curso que están tomando es ${course?.name}, y el nivel académico es ${academiclevel?.name}.
    
    Genera todo en español.
    
    
    `;

    try{
      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();

      setisLoading(false);

      const res = await axios.patch(`/api/gaps/${gapid}/resources`, { text: JSON.stringify(text) });

      console.log(res)
      toast.success("Recursos actualizados");
      toggleEdit();
      router.refresh();

    } catch(error){
      console.log(error)
    }
   
  }


  return (
    <div className="rounded-md p-4 border-red-200">
      <div className="font-medium flex items-center justify-between">
      Recursos (medios educativos)
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
            !initialData.resources && "text-slate-500 italic"
          )}
        >
          {initialData.resources || "Sin Recursos"}
        </p>
      )}
      {isLoading && <Stars className="flex m-auto animate animate-pulse" />}
    </div>
  );
};
