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

interface practicalcontentFormProps {
  initialData: Session;
  sessionid: string;
  course: string | null;
  age: string | null;
}

export const PracticalForm = ({
  initialData,
  sessionid,
  course,
  age,
}: practicalcontentFormProps) => {
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
    offer 3 levels of information, for basic learning, for intermediate learning and for advanced, offer me the following alternatives:
    - 10 basic level practical exercises. These exercises must be solved and with the resolution methodology explained.
    - 10 Intermediate level practical exercises. These exercises must be solved and with the resolution methodology explained.
    - 10 advanced level practical exercises. These exercises must be solved and with the resolution methodology explained.
    
    . Generate everything in Spanish.
    `;

    try {
      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();
      const res = await axios.patch(`/api/session/${sessionid}/practical`, {
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
            !initialData.practicalcontent && "text-slate-500 italic"
          )}
        >
          {initialData.practicalcontent || "Sin CONTENIDO PRÁCTICO"}
        </p>
      )}
      {isLoading && <Stars className="flex m-auto animate animate-pulse" />}
    </div>
  );
};
