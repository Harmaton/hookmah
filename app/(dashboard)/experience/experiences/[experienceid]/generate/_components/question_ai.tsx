'use client'

import * as z from "zod";
import axios from "axios";
import { Loader2, SprayCan, Stars } from "lucide-react";
import { useState } from "react";
import {toast} from "sonner";
import { useRouter } from "next/navigation";
import { Experience, GAP } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface Question_aiFormProps {
  initialData: Experience;
  psecharacteristics: string | null;
  piccharacteristics: string | null;
  pnpcharacteristics: string | null;
  experienceid: string;
}

export const Question_aiForm = ({
  initialData,
 experienceid,
  psecharacteristics,
  piccharacteristics,
  pnpcharacteristics
}: Question_aiFormProps) => {
  const [isLoading, setisLoading] = useState(false);

const genAI = new GoogleGenerativeAI("AIzaSyDiUlIA-d2x8TpBbPZN1gNOHFCj1eYcZhw");

const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const toggleEdit = () => setisLoading((current) => !current);

const router = useRouter();

  async function aiRun() {
    
    setisLoading(true);

    const prompt =   `Teniendo en cuenta la descripción realizada anteriormente sobre el contexto global y peruano de las caracterizaciones descritas como físicas, sociales, cognitivas y emocionales las cuales son las siguientes ${psecharacteristics}, así como los intereses y curiosidades que son las siguientesm ${piccharacteristics}, así así como necesidades y problemas que son los siguientes ${pnpcharacteristics}. Y teniendo en cuenta que lo que vamos a construir es una “Experiencia de Aprendizaje” según el Currículo Nacional de Educación Básica Regular (DCN-EBR) del Ministerio de Educación del Perú, preparar 3 preguntas que motiven a los estudiantes a una posible solución o abordando el tema. Genera todo en español.
    `;

    try{
      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();
      setisLoading(false);
      const res = await axios.patch(`/api/experience/${experienceid}/question-ai`, { text: JSON.stringify(text) });
      setisLoading(false);
      console.log(res)
      toast.success("valores actualizados");
      toggleEdit();
      router.refresh();

    } catch(error){
      console.log(error)
    }
   
  }


  return (
    <div className="rounded-md p-4 border-red-200">
      <div className="font-medium flex items-center justify-between">
      Preguntas relevantes de la clase
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
            !initialData.question_ai && "text-slate-500 italic"
          )}
        >
          {initialData.question_ai || "Sin quiz"}
        </p>
      )}
      {isLoading && <Stars className="flex m-auto animate animate-pulse" />}
    </div>
  );
};
