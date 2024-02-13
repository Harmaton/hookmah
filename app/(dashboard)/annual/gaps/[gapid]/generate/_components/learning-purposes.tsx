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

interface LearningfORMProps {
  initialData: GAP;
  ageRecord: {name: string } | null;
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

    const prompt =   `Depending on the ${ageRecord} age Record of the child, buiild a table of values with one-by-one defination that the child must develop at this stage. Build a table with ideas and activities that must be developed during the year and also build a measurement system to evaluate whether the values have been emphasized in the person. Generate everything in Spanish.
    `;

    try{
      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();

      setisLoading(false);

      const res = await axios.patch(`/api/gaps/${gapid}/learning`, { text: JSON.stringify(text) });

      console.log(res)
      toast.success("Values updated");
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
          {initialData.learningPurposes || "Sin Propósitos"}
        </p>
      )}
      {isLoading && <Stars className="flex m-auto animate animate-pulse" />}
    </div>
  );
};
