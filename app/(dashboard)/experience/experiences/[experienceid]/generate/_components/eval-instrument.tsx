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

interface EvalInstrumentFormProps {
  initialData: Experience;
  evaluationcriteria: string | null;
  thematicfields: string | null;
  experienceid: string;
}

export const EvalInstrument = ({
  initialData,
  experienceid,
  evaluationcriteria,
  thematicfields
}: EvalInstrumentFormProps) => {
  const [isLoading, setisLoading] = useState(false);

const genAI = new GoogleGenerativeAI("AIzaSyDiUlIA-d2x8TpBbPZN1gNOHFCj1eYcZhw");

const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const toggleEdit = () => setisLoading((current) => !current);

const router = useRouter();

  async function aiRun() {
    
    setisLoading(true);

    const prompt =   `Taking into account the Evaluation Criteria on the Specified Performance of each of the Competencies which are as follows ${evaluationcriteria} and Thematic Fields built in this "Learning Experience" according to the National Curriculum of Regular Basic Education (DCN-EBR) of the Ministry of Education of Peru which are ${thematicfields},mentions which would be the most appropriate Evaluation Instrument to measure a student's learning. Generate everything in Spanish.
    `;

    try{
      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();
      const res = await axios.patch(`/api/experience/${experienceid}/eval-instrument`, { text: JSON.stringify(text) });
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
      Instrumento de evaluación
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
            !initialData.eval_instrument && "text-slate-500 italic"
          )}
        >
          {initialData.eval_instrument || "Sin Instrumento de evaluación"}
        </p>
      )}
      {isLoading && <Stars className="flex m-auto animate animate-pulse" />}
    </div>
  );
};
