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

interface RecommendationsFormProps {
  initialData: GAP;
  departmentRecord: {name: string }| null; 
  district: string | null;
  city: string | null;
  courseRecord: {name: string } | null;
  ageRecord: {name: number } | null;
  gapid: string;
}

export const RecommendationsForm = ({
  initialData,
  gapid,
  departmentRecord,
  district,
  city,
  courseRecord,
  ageRecord
}: RecommendationsFormProps) => {
  const [isLoading, setisLoading] = useState(false);

const genAI = new GoogleGenerativeAI("AIzaSyDiUlIA-d2x8TpBbPZN1gNOHFCj1eYcZhw");

const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const toggleEdit = () => setisLoading((current) => !current);

const router = useRouter();

  async function aiRun() {
    
    setisLoading(true);

    const prompt =   `recommend favorable environmental and educational situations for the development of all these learning situations which are 
    ${ageRecord?.name}, ${courseRecord?.name}, ${departmentRecord?.name} while in the city of ${city} and the district ${district}. Generate everything in Spanish.
    `;

    try{
      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();

      setisLoading(false);

      const res = await axios.patch(`/api/gaps/${gapid}/recommendations`, { text: JSON.stringify(text) });

      console.log(res)
      toast.success("Recomendaciones actualizadas");
      toggleEdit();
      router.refresh();

    } catch(error){
      console.log(error)
    }
   
  }


  return (
    <div className="rounded-md p-4 border-red-200">
      <div className="font-medium flex items-center justify-between">
      Recomendaciones
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
            !initialData.recommendations && "text-slate-500 italic"
          )}
        >
          {initialData.recommendations || "Sin Recomendaciones"}
        </p>
      )}
      {isLoading && <Stars className="flex m-auto animate animate-pulse" />}
    </div>
  );
};
