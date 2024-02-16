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

interface SkillsFormProps {
  initialData: Experience;
  psecharacteristics: string | null;
  piccharacteristics: string | null;
  pnpcharacteristics: string | null;
  experienceid: string;
}

export const SkillsForm = ({
  initialData,
  experienceid,
  psecharacteristics,
  piccharacteristics,
  pnpcharacteristics
}: SkillsFormProps) => {
  const [isLoading, setisLoading] = useState(false);

const genAI = new GoogleGenerativeAI("AIzaSyDiUlIA-d2x8TpBbPZN1gNOHFCj1eYcZhw");

const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const toggleEdit = () => setisLoading((current) => !current);

const router = useRouter();

  async function aiRun() {
    
    setisLoading(true);

    const prompt =   `Taking into account the description made previously about the global and Peruvian context of the characterization described as physical, social, cognitive and emotional which are as follows ${psecharacteristics}, as well as interests and curiosities which are as followsm${piccharacteristics}, as well as needs and problems which are as follows ${pnpcharacteristics}. And taking into account that what we are building a "Learning Experience" according to the National Curriculum of Regular Basic Education (DCN-EBR) of the Ministry of Education of Peru, literally places here the Competencies of the area that will be required for such Learning Experience built so far. Generate everything in Spanish.
    `;

    try{
      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();
      const res = await axios.patch(`/api/experience/${experienceid}/skills`, { text: JSON.stringify(text) });
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
      Destrezas y competencias
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
            !initialData.skills && "text-slate-500 italic"
          )}
        >
          {initialData.skills || "SiDestrezas y competenciasn Bibliografía"}
        </p>
      )}
      {isLoading && <Stars className="flex m-auto animate animate-pulse" />}
    </div>
  );
};
