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

interface BibliographyFormProps {
  initialData: GAP;
  ageRecord: {name: string } | null;
  gapid: string;
  acdescription: string;
  methods: string;
  characterization: string;
  learningpurposes: string;
  recommendations: string
  educationlevel: {name: string } | null;
  course: {name: string } | null;
}

export const BibliographyForm = ({
  initialData,
  gapid,
  ageRecord,
  educationlevel,
  recommendations,
  characterization,
  acdescription,
  learningpurposes,
  course,
  methods
}: BibliographyFormProps) => {
  const [isLoading, setisLoading] = useState(false);

const genAI = new GoogleGenerativeAI("AIzaSyDiUlIA-d2x8TpBbPZN1gNOHFCj1eYcZhw");

const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const toggleEdit = () => setisLoading((current) => !current);

const router = useRouter();

  async function aiRun() {
    
    setisLoading(true);

    const prompt =   `Design me a complete bibliography of all the places you have gone to to obtain the constructed information. Stay relevant and only refer the following information which you have generated.
    The said information included the following : 
    ,characterization of students ${characterization}.
    then you also produced the following ${acdescription}
    methods and strategies which are ${methods}
    You also built the following recoomendations for recommend favorable environmental and educational situations for the development of all these learning situations built which are ${recommendations}
    learning purposes child must develop at this stage as follows ${learningpurposes}.
    The course you developed this for (for the purpose of relevancy) is ${course}, which is for the following education level ${educationlevel} of the age ${ageRecord}
    Generate the bibliography in Spanish and it should look like a bibliography designed for the content reffered to above only.
    `;

    try{
      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();

      setisLoading(false);

      const res = await axios.patch(`/api/gaps/${gapid}/bibliography`, { text: JSON.stringify(text) });

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
      Bibliografía
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
            !initialData.bibliography && "text-slate-500 italic"
          )}
        >
          {initialData.bibliography || "Sin Bibliografía"}
        </p>
      )}
      {isLoading && <Stars className="flex m-auto animate animate-pulse" />}
    </div>
  );
};
