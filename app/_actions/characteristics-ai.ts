import { db } from "@/lib/db";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function generateCharacteristics(
  ageid: string | null,
  courseid: string | null,
  departmentid: string | null,
  city: string | null,
  district: string | null
) {
  try {
    const apiKey =  "AIzaSyDiUlIA-d2x8TpBbPZN1gNOHFCj1eYcZhw";

    if (!apiKey) {
      console.error(
        "API key is not defined. Please set the GOOGLE_AI_APIKEY environment variable."
      );
      return new Error("API KEY ERROR");
    }

    const departmentRecord = await db.department.findUnique({
      where: { id: departmentid! },
      select: { name: true },
    });

    const ageRecord = await db.averageAge.findUnique({
      where: { id: ageid! },
      select: { name: true },
    });

    const courseRecord = await db.course.findUnique({
      where: { id: courseid! },
      select: { name: true },
    });

    const prompt = `Generate the general characterization table of students Based on the student's location in the department of ${departmentRecord}, district of ${district}, and city of ${city}, considering their age of ${ageRecord} and enrolled course of ${courseRecord}, the National Curriculum of Regular Basic Education (DCN-EBR) from the Ministry of Education of Peru outlines the following student characterization:
        - Describe the student's physical characteristics.
        - Outline their psychological traits and characteristics.
        - Identify the student's interests and curiosities.
        - Analyze any social challenges the student may be facing.
        - Highlight the student's cognitive academic needs.
        `;

    const response = await run(prompt);

    return {
      response,
    };
  } catch (error) {
    console.log("Error Generating characteristics");
    return null;
  }
}

async function run(prompt: string) {
  const apiKey =  "AIzaSyDiUlIA-d2x8TpBbPZN1gNOHFCj1eYcZhw";

  if (apiKey) {
    const genAI = new GoogleGenerativeAI(
     apiKey
    );

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
    return text;
  } else {
    console.error(
      "API key is not defined. Please set the GOOGLE_AI_APIKEY environment variable."
    );
    return new Error("API KEY ERROR");
  }
}
