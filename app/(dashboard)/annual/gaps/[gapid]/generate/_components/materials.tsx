"use client";

import * as z from "zod";
import axios from "axios";
import { SprayCan, Stars } from "lucide-react";
import { useState } from "react";
import {toast} from "sonner" ;
import { useRouter } from "next/navigation";
import { GAP } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface MaterialsFormProps {
  initialData: GAP;
  ageRecord: { name: string } | null;
  gapid: string;
}

export const MaterialsForm = ({
  initialData,
  gapid,
  ageRecord,
}: MaterialsFormProps) => {
  const [isLoading, setisLoading] = useState(false);

  const apikey = "AIzaSyDiUlIA-d2x8TpBbPZN1gNOHFCj1eYcZhw";
  const genAI = new GoogleGenerativeAI(apikey);

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const toggleEdit = () => setisLoading((current) => !current);

  const router = useRouter();

  async function aiRun() {
    setisLoading(true);

    const prompt = `Propose me 10 activities with materials that a teacher can prepare for the development of said contents. Generate everything in spanish.
    `;

    try {
      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();

      setisLoading(false);

      const res = await axios.patch(`/api/gaps/${gapid}/materials`, {
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
      Materiales (medios educativos)
        <Button onClick={aiRun} variant="ghost">
          {isLoading ? (
            <>Generando...</>
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
