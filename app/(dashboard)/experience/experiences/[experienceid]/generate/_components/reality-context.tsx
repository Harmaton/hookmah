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

interface reality_contextFormProps {
  initialData: Experience;
  psecharacteristics: string | null;
  piccharacteristics: string | null;
  pnpcharacteristics: string | null;
  experienceid: string;
}

export const Reality_contextForm = ({
  initialData,
 experienceid,
  psecharacteristics,
  piccharacteristics,
  pnpcharacteristics
}: reality_contextFormProps) => {
  const [isLoading, setisLoading] = useState(false);

const genAI = new GoogleGenerativeAI("AIzaSyDiUlIA-d2x8TpBbPZN1gNOHFCj1eYcZhw");

const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const toggleEdit = () => setisLoading((current) => !current);

const router = useRouter();

  async function aiRun() {
    
    setisLoading(true);

    const prompt =   `Taking into account the characterization described as physical, social, cognitive and emotional which are as follows ${psecharacteristics}, as well as interests and curiosities which are as follows ${piccharacteristics},  as well as needs and problems which are as follows ${pnpcharacteristics}. And taking into account that what we are going to build is a "Learning Experience" according to the National Curriculum of Regular Basic Education (DCN-EBR) of the Ministry of Education of Peru, it describes what is the reality of the global context and the context of the reality of Peru on these characteristics. Also tell me what are the causes or consequences of having reached this situation and a possible future vision if this continues, as well as what possible actions we should care about to improve the situation. Generate everything in Spanish.
    `;

    try{
      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();
      setisLoading(false);
       await axios.patch(`/api/experience/${experienceid}/reality-context`, { text: JSON.stringify(text) });
      setisLoading(false);
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
      Contexto de la realidad
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
            !initialData.reality_context && "text-slate-500 italic"
          )}
        >
          {initialData.reality_context || "Sin Reality Experience"}
        </p>
      )}
      {isLoading && <Stars className="flex m-auto animate animate-pulse" />}
    </div>
  );
};
