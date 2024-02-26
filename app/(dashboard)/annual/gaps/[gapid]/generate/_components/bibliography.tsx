"use client";

import * as z from "zod";
import axios from "axios";
import { Loader2, SprayCan, Stars } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { GAP } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface BibliographyFormProps {
  initialData: GAP;
  ageRecord: { name: string } | null;
  gapid: string;
  acdescription: string;
  methods: string;
  characterization: string;
  learningpurposes: string;
  recommendations: string;
  educationlevel: { name: string } | null;
  course: { name: string } | null;
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
  methods,
}: BibliographyFormProps) => {
  const [isLoading, setisLoading] = useState(false);

  const genAI = new GoogleGenerativeAI(
    "AIzaSyDiUlIA-d2x8TpBbPZN1gNOHFCj1eYcZhw"
  );

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const toggleEdit = () => setisLoading((current) => !current);

  const router = useRouter();

  async function aiRun() {
    setisLoading(true);

    const prompt = `Design me a comprehensive bibliography encompassing all the sources utilized to compile the constructed information. Ensure the bibliography is never empty and contains a minimum of four entries. Maintain relevance by exclusively referencing the following data that you have generated:

    Characterization of students: ${characterization}
    Description of educational activities: ${acdescription}
    Methods and strategies employed: ${methods}
    Recommendations for favorable learning environments: ${recommendations}
    Learning purposes for children at this stage: ${learningpurposes}
     The Course in for relevancy of the bibliography is: ${course}
    the Education level: ${educationlevel}
    Age group: ${ageRecord}
    The bibliography should be formatted in Spanish and structured to resemble a bibliography tailored for the aforementioned content exclusively. Include relevant details such as author names, titles, publication years, etc., ensuring the bibliography closely aligns with the provided information and must be present, never empty.
    `;

    try {
      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();

      setisLoading(false);

      const res = await axios.patch(`/api/gaps/${gapid}/bibliography`, {
        text: JSON.stringify(text),
      });

      console.log(res);
      toast.success("Bibliografía creada");
      toggleEdit();
      router.refresh();
    } catch (error) {
      console.log(error);
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
