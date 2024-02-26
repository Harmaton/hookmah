'use client'

import axios from "axios";
import { SprayCan, Stars } from "lucide-react";
import { useState } from "react";
import {toast} from "sonner";
import { useRouter } from "next/navigation";
import { Experience } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface PICFormProps {
  initialData: Experience;
  age: {name: string} | null;
  experienceid: string;
}

export const PICForm = ({
  initialData,
  experienceid,
  age
}: PICFormProps) => {
  const [isLoading, setisLoading] = useState(false);

const genAI = new GoogleGenerativeAI("AIzaSyDiUlIA-d2x8TpBbPZN1gNOHFCj1eYcZhw");

const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const toggleEdit = () => setisLoading((current) => !current);

const router = useRouter();

  async function aiRun() {
    
    setisLoading(true);

    const prompt =   ` Generate the physical, social and emotional characteristics of students according to the age that the teacher entered of this students. The age is (${age?.name}).
    Generate everything in spanish
    `;

    try{
      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();
      const res =  await axios.patch(`/api/experience/${experienceid}/pic`, { text: JSON.stringify(text) });
      setisLoading(false);
      console.log(res)
      toast.success("características actualizados");
      toggleEdit();
      router.refresh();
    } catch(error){
      console.log(error)
    }
   
  }
  return (
    <div className="rounded-md p-4 border-red-200">
      <div className="font-medium flex items-center justify-between">
      Características físicas, sociales y emocionales
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
            !initialData.piccharacteristics && "text-slate-500 italic"
          )}
        >
          {initialData.piccharacteristics || "Sin características"}
        </p>
      )}
      {isLoading && <Stars className="flex m-auto animate animate-pulse" />}
    </div>
  );
};
