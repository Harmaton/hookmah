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

interface LearningfORMProps {
  initialData: GAP;
  ageRecord: {name: number } | null;
  gapid: string;
}

export const LearningfORM = ({
  initialData,
  gapid,
  ageRecord
}: LearningfORMProps) => {
  const [isLoading, setisLoading] = useState(false);

const genAI = new GoogleGenerativeAI("AIzaSyDiUlIA-d2x8TpBbPZN1gNOHFCj1eYcZhw");

const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const toggleEdit = () => setisLoading((current) => !current);

const router = useRouter();

  async function aiRun() {
    
    setisLoading(true);

    const prompt =   `Considerando la edad registrada (${ageRecord?.name}) del niño, construye una tabla de valores con una definición detallada de los valores que el niño debe desarrollar en esta etapa. Crea una tabla que contenga ideas y actividades que deben ser fomentadas durante el año, así como un sistema de medición para evaluar si los valores han sido inculcados en la persona. Genera todo en español.
    `;

    try{
      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();

      setisLoading(false);

      const res = await axios.patch(`/api/gaps/${gapid}/learning`, { text: JSON.stringify(text) });

      console.log(res)
      toast.success("propósitos de aprendizaje actualizados");
      router.refresh();
      toggleEdit();

    } catch(error){
      console.log(error)
    }
   
  }


  return (
    <div className="rounded-md p-4 border-red-200">
      <div className="font-medium flex items-center justify-between">
      Propósitos de aprendizaje
        <Button onClick={aiRun} variant="ghost">
        {isLoading ? (
            <>Generando..</>
          ) : (
            <>
              <SprayCan className="h-4 w-4 mr-2 text-blue-500" />
              IA Generar
            </>
          )}
        </Button>
      </div>
      {!isLoading && (
        <p
          className={cn(
            "text-sm mt-2 text-ellipsis",
            !initialData.learningPurposes && "text-slate-500 italic"
          )}
        >
          {initialData.learningPurposes || "Sin propósitos de aprendizaje"}
        </p>
      )}
      {isLoading && <Stars className="flex m-auto animate animate-pulse" />}
    </div>
  );
};
