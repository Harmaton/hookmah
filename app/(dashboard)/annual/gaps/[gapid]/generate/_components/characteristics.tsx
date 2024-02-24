'use client'

import axios from "axios";
import { SprayCan, Stars } from "lucide-react";
import { useState } from "react";
import {toast} from "sonner";
import { useRouter } from "next/navigation";
import { GAP } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface CharacteristicsFormProps {
  initialData: GAP;
  departmentRecord: {name: string }| null; 
  district: string | null;
  city: string | null;
  courseRecord: {name: string } | null;
  ageRecord: {name: string } | null;
  gapid: string;
}

export const CharacteristicsForm = ({
  initialData,
  gapid,
  departmentRecord,
  district,
  city,
  courseRecord,
  ageRecord
}: CharacteristicsFormProps) => {

const [isLoading, setisLoading] = useState(false);

const genAI = new GoogleGenerativeAI("AIzaSyDiUlIA-d2x8TpBbPZN1gNOHFCj1eYcZhw");

const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const toggleEdit = () => setisLoading((current) => !current);

const router = useRouter();

  async function aiRun() {  
    setisLoading(true);

    const prompt =   `Generate the general characterization table of students in Spanish Based on the student's location in the department of ${departmentRecord?.name}, district of ${district}, and city of ${city}, considering their age of ${ageRecord?.name} and enrolled course of ${courseRecord?.name}. Use and refer to the the National Curriculum of Regular Basic Education (DCN-EBR) from the Ministry of Education of Peru which outlines the following student characterization:
    Offer the following -> 
    - Describe the student's physical characteristics.
    - Outline their psychological traits and characteristics.
    - Identify the student's interests and curiosities.
    - Analyze any social challenges the student may be facing.
    - Highlight the student's cognitive academic needs.
     Generate evrything in Spanish.
    `;

    try{
      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();

      setisLoading(false);

      const res = await axios.patch(`/api/gaps/${gapid}/characteristics`, { text: JSON.stringify(text) });

      console.log(res)
      toast.success("características actualizadas");
      toggleEdit();
      router.refresh();

    } catch(error){
      console.log(error)
    }
   
  }
  return (
    <div className="rounded-md p-4 border-red-200">
      <div className="font-medium flex items-center justify-between">
      Caracterización de los estudiantes
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
            "text-sm mt-2 text-ellipsis ",
            !initialData.characteristics && "text-slate-500 italic"
          )}
        >
          {initialData.characteristics || "Sin Caracterización"}
        </p>
      )}
     
      {isLoading && <Stars className="flex m-auto animate animate-pulse" />}
    </div>
  );
};
