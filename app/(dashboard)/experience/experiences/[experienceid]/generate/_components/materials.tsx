"use client";

import * as z from "zod";
import axios from "axios";
import { SprayCan, Stars } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Experience } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface MaterialsFormProps {
  initialData: Experience;
  evaluationcriteria: string | null;
  thematicfields: string | null;
  product: string | null;
  age: string | null;
  skills: string | null;
  grade: string | null;
  experienceid: string;
  methodStrategies: string | null;
  sequenceActivities: string | null;
}

export const MaterialsForm = ({
  initialData,
  experienceid,
  evaluationcriteria,
  thematicfields,
  age,
  skills,
  grade,
  product,
  methodStrategies,
  sequenceActivities
}: MaterialsFormProps) => {
  const [isLoading, setisLoading] = useState(false);

  const genAI = new GoogleGenerativeAI(
    "AIzaSyDiUlIA-d2x8TpBbPZN1gNOHFCj1eYcZhw"
  );

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const toggleEdit = () => setisLoading((current) => !current);

  const router = useRouter();

  async function aiRun() {
    setisLoading(true);

    const prompt = ` Provide me with 10 activities with their respective materials that a teacher can prepare for the development of the mentioned contents. All necessary information has already been provided. The details below are the contents being reffered to as each of them explained :
    mentions from 1 to 3 Thematic Fields or possible Contents to be developed in classes as follows ${thematicfields}
    The skills and competencies to be developed which are: ${skills}
    The evaluation criteria you developed which is ${evaluationcriteria}
    The Mentioned Products that we can develop in the classroom ${product}
    The Methods and strategies developed in the content as follows ${methodStrategies}
    Also in the contents is the SECUENCIA DE ACTIVIDADES ${sequenceActivities}

    
    `;

    try {
      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();
      const res = await axios.patch(
        `/api/experience/${experienceid}/materials`,
        { text: JSON.stringify(text) }
      );
      setisLoading(false);
      console.log(res);
      toast.success("valores actualizados");
      toggleEdit();
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="rounded-md p-4 border-red-200">
      <div className="font-medium flex items-center justify-between">
        Materiales
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
            !initialData.materials && "text-slate-500 italic"
          )}
        >
          {initialData.materials || "Sin Materiales"}
        </p>
      )}
      {isLoading && <Stars className="flex m-auto animate animate-pulse" />}
    </div>
  );
};
