"use client";

import * as z from "zod";
import axios from "axios";
import { Loader2, SprayCan, Stars } from "lucide-react";
import { useState } from "react";
import {toast} from "sonner";
import { useRouter } from "next/navigation";
import { GAP } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { generateCharacteristics } from "@/app/_actions/characteristics-ai";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface AcDescriptionProps {
  initialData: GAP;
  educationLevel: { name: string } | null;
  city: string | null;
  gapid: string;
  district: string | null;
}

export const AcDescriptionForm = ({
  initialData,
  gapid,
  educationLevel,
  city,
  district,
}: AcDescriptionProps) => {
  const [isLoading, setisLoading] = useState(false);

  const genAI = new GoogleGenerativeAI(
    "AIzaSyDiUlIA-d2x8TpBbPZN1gNOHFCj1eYcZhw"
  );

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const toggleEdit = () => setisLoading((current) => !current);

  const router = useRouter();

  async function aiRun() {
    setisLoading(true);

    const prompt = `Según el Currículo Nacional de Educación Básica Regular (DCN-EBR) del Ministerio de Educación del Perú, se describe el área de la ciudad de ${city} y sus competencias para el nivel educativo de ${educationLevel?.name}.

    Genera todo en español.
    `;

    try {
      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();

      setisLoading(false);

      const res = await axios.patch(`/api/gaps/${gapid}/acdescription`, {
        text: JSON.stringify(text),
      });

      console.log(res);
      toast.success("Values updated");
      toggleEdit();
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="rounded-md p-4 border-red-200">
      <div className="font-medium flex items-center justify-between">
        Descripción del Área y Competencias
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
            "text-sm mt-2 text-ellipsis",
            !initialData.acdescription && "text-slate-500 italic"
          )}
        >
          {initialData.acdescription || "Sin descripcion"}
        </p>
      )}
      {isLoading && <Stars className="flex m-auto animate animate-pulse" />}
    </div>
  );
};
