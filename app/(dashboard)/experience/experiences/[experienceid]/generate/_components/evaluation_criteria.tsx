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

interface EvalCriteriaFormProps {
  initialData: Experience;
  skills: string | null;
  experienceid: string;
}

export const EvalCriteriaForm = ({
  initialData,
  experienceid,
  skills
}: EvalCriteriaFormProps) => {
  const [isLoading, setisLoading] = useState(false);

const genAI = new GoogleGenerativeAI("AIzaSyDiUlIA-d2x8TpBbPZN1gNOHFCj1eYcZhw");

const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const toggleEdit = () => setisLoading((current) => !current);

const router = useRouter();

  async function aiRun() {
    
    setisLoading(true);

    const prompt =   `Taking into account each of the competencies described in here ${skills} , develop an Evaluation Criteria on the Performance Needed to build this "Learning Experience" according to the National Curriculum of Regular Basic Education (DCN-EBR) of the Ministry of Education of the Peru. Design a Criterion for each Competition. Generate everything in Spanish.
    `;

    try{
      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();
      const res = await axios.patch(`/api/experience/${experienceid}/eval-criteria`, { text: JSON.stringify(text) });
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
      Criterios de evaluación
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
            !initialData.evaluation_criteria && "text-slate-500 italic"
          )}
        >
          {initialData.evaluation_criteria || "No se encontraron criterios"}
        </p>
      )}
      {isLoading && <Stars className="flex m-auto animate animate-pulse" />}
    </div>
  );
};
