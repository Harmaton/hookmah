'use client'

import * as z from "zod";
import axios from "axios";
import { Loader2, SprayCan } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { GAP } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { generateCharacteristics } from "@/app/_actions/characteristics-ai";
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
  const [aiResponse, setResponse] = useState('');

const genAI = new GoogleGenerativeAI("AIzaSyDiUlIA-d2x8TpBbPZN1gNOHFCj1eYcZhw");
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  async function aiRun() {
    setisLoading(true);

    const prompt =   `Generate the general characterization table of students Based on the student's location in the department of ${departmentRecord}, district of ${district}, and city of ${city}, considering their age of ${ageRecord} and enrolled course of ${courseRecord}, the National Curriculum of Regular Basic Education (DCN-EBR) from the Ministry of Education of Peru outlines the following student characterization:
    - Describe the student's physical characteristics.
    - Outline their psychological traits and characteristics.
    - Identify the student's interests and curiosities.
    - Analyze any social challenges the student may be facing.
    - Highlight the student's cognitive academic needs.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    setisLoading(false);
    setResponse(text);
    console.log(text)
  }

  const toggleEdit = () => setisLoading((current) => !current);

  const router = useRouter();

  async function getCx() {
    try {
      setisLoading(true);

      const response = await generateCharacteristics(
        initialData.ageid,
        initialData.courseid,
        initialData.departmentId,
        initialData.city,
        initialData.district
      );

    //  Assuming your server action returns an object with a 'response' property
      const values = {
        characteristics: response,
      };

      console.log('Response Content:', values);

      await axios.patch(`/api/gaps/${gapid}`, values );

     
        setisLoading(false);
    
      toast.success("Ano actualizado");


      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Algo salió mal");
    } 
  }

  return (
    <div className="rounded-md p-4 border-red-200">
      <div className="font-medium flex items-center justify-between">
        characteristics
        <Button onClick={aiRun} variant="ghost">
          {isLoading ? (
            <>Continue in BackGround</>
          ) : (
            <>
              <SprayCan className="h-4 w-4 mr-2 text-blue-500" />
              Generate Characteristics
            </>
          )}
        </Button>
      </div>
      {!isLoading && (
        <p
          className={cn(
            "text-sm mt-2",
            !initialData.characteristics && "text-slate-500 italic"
          )}
        >
          {initialData.characteristics || "Sin characteristics"}
        </p>
      )}
      {isLoading && <Loader2 className="flex m-auto animate animate-spin" />}
    </div>
  );
};
