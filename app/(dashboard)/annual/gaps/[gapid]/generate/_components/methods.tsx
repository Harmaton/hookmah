'use client'

import * as z from "zod";
import axios from "axios";
import { Loader2, SprayCan, Stars } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
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
}

export const MethodsForm = ({
  initialData,
  gapid,
  ageRecord
}: MethodsFormProps) => {
  const [isLoading, setisLoading] = useState(false);

const genAI = new GoogleGenerativeAI("AIzaSyDiUlIA-d2x8TpBbPZN1gNOHFCj1eYcZhw");

const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const toggleEdit = () => setisLoading((current) => !current);

const router = useRouter();

  async function aiRun() {
    
    setisLoading(true);

    const prompt =  `Taking as an example the National Curriculum for Regular Basic Education (DCN-EBR) of the Ministry of Education of Peru, describe to me the method and strategy that should be implemented for the development of everything built so far which includes,characterization of students{}. I want a method and a strategy for an educational model based on competencies, I want another method and strategy for an educational model based on problem-based learning, another method and strategy for an educational learning model that guides spiritual development, emotional well-being and Mental health. Generate everything is spanish.
    `;

    try{
      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();

      setisLoading(false);

      const res = await axios.patch(`/api/gaps/${gapid}/methods`, { text: JSON.stringify(text) });

      console.log(res)
      toast.success("Values updated");
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
