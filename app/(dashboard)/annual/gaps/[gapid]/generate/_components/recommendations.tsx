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
import { GoogleGenerativeAI } from "@google/generative-ai";

interface RecommendationsFormProps {
  initialData: GAP;
  departmentRecord: {name: string }| null; 
  district: string | null;
  city: string | null;
  courseRecord: {name: string } | null;
  ageRecord: {name: string } | null;
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

    const prompt =   `Generate the general characterization table of students Based on the student's location in the department of ${departmentRecord?.name}, district of ${district}, and city of ${city}, considering their age of ${ageRecord?.name} and enrolled course of ${courseRecord?.name}. Use and refer to the the National Curriculum of Regular Basic Education (DCN-EBR) from the Ministry of Education of Peru which outlines the following student characterization:
    - Describe the student's physical Recommendations.
    - Outline their psychological traits and Recommendations.
    - Identify the student's interests and curiosities.
    - Analyze any social challenges the student may be facing.
    - Highlight the student's cognitive academic needs.
    `;

    try{
      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();

      setisLoading(false);

      const res = await axios.patch(`/api/gaps/${gapid}/recommendations`, { text: JSON.stringify(text) });

      console.log(res)
      toast.success("Recommendations actualizado");
      toggleEdit();
      router.refresh();

    } catch(error){
      console.log(error)
    }
   
  }


  return (
    <div className="rounded-md p-4 border-red-200">
      <div className="font-medium flex items-center justify-between">
      Recommendations
        <Button onClick={aiRun} variant="ghost">
          {isLoading ? (
            <>Generating ...</>
          ) : (
            <>
              <SprayCan className="h-4 w-4 mr-2 text-blue-500" />
             AI  Generate
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
          {initialData.recommendations || "Sin Recommendations"}
        </p>
      )}
      {isLoading && <Stars className="flex m-auto animate animate-pulse" />}
    </div>
  );
};
