"use client";

import * as z from "zod";
import axios from "axios";
import { Loader2, SprayCan, Stars } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Experience, GAP } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface MethodsFormProps {
  initialData: Experience;
  evaluationcriteria: string | null;
  thematicfields: string | null;
  product: string | null;
  skills: string | null;
  experienceid: string;
}

export const MethodsForm = ({
  initialData,
  experienceid,
  evaluationcriteria,
  thematicfields,
  skills,
  product,
}: MethodsFormProps) => {
  const [isLoading, setisLoading] = useState(false);

  const genAI = new GoogleGenerativeAI(
    "AIzaSyDiUlIA-d2x8TpBbPZN1gNOHFCj1eYcZhw"
  );

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const toggleEdit = () => setisLoading((current) => !current);

  const router = useRouter();

  async function aiRun() {
    setisLoading(true);

    const prompt = ` Taking into account everything built in this "Learning Experience" according to the National Curriculum of Regular Basic Education (DCN-EBR) of the Ministry of Education of Peru, describe the method and strategy that should be implemented for the development of everything built so far which includes the product which is ${product}, the thematic fields ${thematicfields}, the evaluation criteria, ${evaluationcriteria}, the skills and competencies ${skills} . I want a method and a strategy for an educational model based on competencies, I want another method and strategy for an educational model based on problem-based learning, another method and strategy for an educational learning model that guides spiritual development, emotional well-being and Mental health.
    Generate everything in Spanish.
    `;

    try {
      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();
      const res = await axios.patch(
        `/api/experience/${experienceid}/methods-strategies`,
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
        MÉTODOS Y ESTRATEGIAS
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
            !initialData.methods_strategies && "text-slate-500 italic"
          )}
        >
          {initialData.methods_strategies || "Sin MÉTODOS Y ESTRATEGIAS"}
        </p>
      )}
      {isLoading && <Stars className="flex m-auto animate animate-pulse" />}
    </div>
  );
};
