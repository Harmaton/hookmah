'use client'

import * as z from "zod";
import axios from "axios";
import { Loader2, SprayCan, Stars } from "lucide-react";
import { useState } from "react";
import {toast} from "sonner";
import { useRouter } from "next/navigation";
import { GAP } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface ResourcesFormProps {
  initialData: GAP;
  ageRecord: {name: string } | null;
  gapid: string;
  academiclevel: { name: string } | null;
  course: {name: string } | null;
  learningpurposes: string
  characterization: string
  recommendations: string
}

export const ResourcesForm = ({
  initialData,
  gapid,
  ageRecord,
  characterization,
  learningpurposes,
  academiclevel,
  recommendations,
  course
}: ResourcesFormProps) => {
  const [isLoading, setisLoading] = useState(false);

const genAI = new GoogleGenerativeAI("AIzaSyDiUlIA-d2x8TpBbPZN1gNOHFCj1eYcZhw");

const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const toggleEdit = () => setisLoading((current) => !current);

const router = useRouter();

  async function aiRun() {
    
    setisLoading(true);

    const prompt =   ` Propose me 10 resources that already exist and that I can use, be they platforms, virtual games, materials already prepared by other teachers throughout the network.  Be relevant strictly to the following content you generated before.
    which includes,characterization of students ${characterization}.
    You also built the following recoomendations for recommend favorable environmental and educational situations for the development of all these learning situations built which are ${recommendations}
    learning purposes child must develop at this stage as follows ${learningpurposes}
    The age of students is ${ageRecord}, the course they are taking is ${course} and the academic level is ${academiclevel}
    Generate everything in spanish.
    `;

    try{
      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();

      setisLoading(false);

      const res = await axios.patch(`/api/gaps/${gapid}/resources`, { text: JSON.stringify(text) });

      console.log(res)
      toast.success("Values updated");
      toggleEdit();
      router.refresh();

    } catch(error){
      console.log(error)
    }
   
  }


  return (
    <div className="rounded-md p-4 border-red-200">
      <div className="font-medium flex items-center justify-between">
      Recursos (medios educativos)
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
            !initialData.resources && "text-slate-500 italic"
          )}
        >
          {initialData.resources || "Sin Recursos"}
        </p>
      )}
      {isLoading && <Stars className="flex m-auto animate animate-pulse" />}
    </div>
  );
};
