"use client";

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
  course: { name: string } | null;
  academiclevel: { name: string } | null;
  gapid: string;
  characteristics: string
  learningpurposes: string
  methods: string
}

export const MaterialsForm = ({
  initialData,
  gapid,
  ageRecord,
  characteristics,
  course,
  academiclevel,
  methods, 
  learningpurposes
}: MaterialsFormProps) => {
  const [isLoading, setisLoading] = useState(false);

  const apikey = "AIzaSyDiUlIA-d2x8TpBbPZN1gNOHFCj1eYcZhw";
  const genAI = new GoogleGenerativeAI(apikey);

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const toggleEdit = () => setisLoading((current) => !current);

  const router = useRouter();

  async function aiRun() {
    setisLoading(true);

    const prompt = `Propose me 10 activities with materials that a teacher can prepare for the development of said contents. You created the following content and I want you to create a list of the materials you got all the information from. Be accurate and extremely relevant . Use the following information. 
    You created the following general characterization table of students as follows ${characteristics}
    You then created the following  method and a strategy for an educational model based on competencies, I want another method and strategy for an educational model based on problem-based learning, another method and strategy for an educational learning model that guides spiritual development, emotional well-being and Mental health as follows ${methods}
    learning purposes child must develop at this stage as follows ${learningpurposes}
    using the infomation above, Propose me 10 activities with materials that a teacher can prepare for the development of said contents. The age of students is ${ageRecord}, the course they are taking is ${course} and the academic level is ${academiclevel}
    Generate everything in spanish.
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
