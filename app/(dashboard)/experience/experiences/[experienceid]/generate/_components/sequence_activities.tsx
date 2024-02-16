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

interface SeqFormProps {
  initialData: Experience;
  evaluationcriteria: string | null;
  thematicfields: string | null;
  product: string | null;
  age: {name: string } | null;
  skills: string | null;
  grade:{name: string } | null;
  experienceid: string;
}

export const SEQForm = ({
  initialData,
  experienceid,
  evaluationcriteria,
  thematicfields,
  age, skills, grade, product
}:  SeqFormProps) => {
  const [isLoading, setisLoading] = useState(false);

const genAI = new GoogleGenerativeAI("AIzaSyDiUlIA-d2x8TpBbPZN1gNOHFCj1eYcZhw");

const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const toggleEdit = () => setisLoading((current) => !current);

const router = useRouter();

  async function aiRun() {
    
    setisLoading(true);

    const prompt =   `Give me 10 Learning Activity sequence options, one for each week, taking into account everything previously built which includes the product which is ${product}, the thematic fields ${thematicfields}, the evaluation criteria, ${evaluationcriteria}, the skills and competencies ${skills} . These contents must be described, with well-defined objectives and oriented to the age which is ${age} and grade of the course which is ${grade}.Generate everything in Spanish.
    `;

    try{
      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();
      const res = await axios.patch(`/api/experience/${experienceid}/sequence-activities`, { text: JSON.stringify(text) });
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
      Secuencia de actividades
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
            !initialData.sequence_activities && "text-slate-500 italic"
          )}
        >
          {initialData.sequence_activities || "Sin Secuencia de actividades"}
        </p>
      )}
      {isLoading && <Stars className="flex m-auto animate animate-pulse" />}
    </div>
  );
};
