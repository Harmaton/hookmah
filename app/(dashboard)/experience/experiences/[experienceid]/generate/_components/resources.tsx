'use client'

import * as z from "zod";
import axios from "axios";
import { SprayCan, Stars } from "lucide-react";
import { useState } from "react";
import {toast} from "sonner";
import { useRouter } from "next/navigation";
import { Experience } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface resourcesFormProps {
  initialData: Experience;
  evaluationcriteria: string | null;
  thematicfields: string | null;
  product: string | null;
  age: {name: string } | null;
  skills: string | null;
  grade:{name: string } | null;
  experienceid: string;
}

export const ResourcesForm = ({
  initialData,
  experienceid,
  evaluationcriteria,
  thematicfields,
  skills, product
}: resourcesFormProps) => {
const [isLoading, setisLoading] = useState(false);

const genAI = new GoogleGenerativeAI("AIzaSyDiUlIA-d2x8TpBbPZN1gNOHFCj1eYcZhw");

const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const toggleEdit = () => setisLoading((current) => !current);

const router = useRouter();

  async function aiRun() {
    
    setisLoading(true);

    const prompt =   `Propose me 10 resources that already exist and that I can take, be they platforms, virtual games, materials already prepared by other teachers throughout the network, and taking into account everything built in this "Learning Experience" according to the National Curriculum of Basic Education Regular (DCN-EBR) of the Ministry of Education of Peru. Everything includes the evaluation criteria ${evaluationcriteria}, the thematic fields ${thematicfields}, the product ${product}, the skills ${skills}
    Generate everything in Spanish.
    `;

    try{
      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();
      const res = await axios.patch(`/api/experience/${experienceid}/resources`, { text: JSON.stringify(text) });
      setisLoading(false);
      console.log(res)
      toast.success("valores actualizados");
      toggleEdit();
      router.refresh();

    } catch(error){
      console.log(error)
    }
   
  }
  return (
    <div className="rounded-md p-4 border-red-200">
      <div className="font-medium flex items-center justify-between">
      Recursos
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
