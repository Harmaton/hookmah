"use client";

import * as z from "zod";
import axios from "axios";
import { Loader2, SprayCan, Stars } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Experience, GAP, Session } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface assesmentFormProps {
  initialData: Session;
  sessionid: string;
  course: string | null;
  age: string | null;
}

export const EvaluationForm = ({
  initialData,
  sessionid,
  course,
  age,
}: assesmentFormProps) => {
  const [isLoading, setisLoading] = useState(false);

  const genAI = new GoogleGenerativeAI(
    "AIzaSyDiUlIA-d2x8TpBbPZN1gNOHFCj1eYcZhw"
  );

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const toggleEdit = () => setisLoading((current) => !current);

  const router = useRouter();

  async function aiRun() {
    setisLoading(true);

    const prompt = `Taking into account the following topic, ${initialData.him}  and the competence to be developed,  ${initialData.competence}, which is for the course called ${course} that is recommended for the age ${age}.
    Offer me the following alternatives:
    - A checklist containing several alternatives to choose one. This list must have the correct answer and the solution explained.
    - A true false checklist. This list must have the correct answer and the solution explained.
    - An exam with questions or exercises to solve. This exam must have the correct answers and the solution explained. Include two questions that analyze the student's critical thinking.
    - A questionnaire that interweaves information and connects with other subjects or transversal areas. This questionnaire must have the correct answers and the solution explained.
    - A collection portfolio of free work, with clear instructions on how to do it, extension and times.
    - A list of self-assessment questions, where the student can measure their growth and their applicability in everyday life.
    - Preparation of a short project that reflects the learning, with clear instructions and all the steps to follow in the preparation of the project.
    - Development of a game with clear instructions so that the student can put it into practice.
    
    . Generate everything in Spanish.
    `;

    try {
      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();
      const res = await axios.patch(`/api/session/${sessionid}/eval`, {
        text: JSON.stringify(text),
      });
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
        CONTENIDO PRÁCTICO
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
            !initialData.assesment && "text-slate-500 italic"
          )}
        >
          {initialData.assesment || "Sin assesment"}
        </p>
      )}
      {isLoading && <Stars className="flex m-auto animate animate-pulse" />}
    </div>
  );
};

