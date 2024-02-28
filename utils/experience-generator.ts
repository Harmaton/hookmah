import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import { saveAs } from "file-saver";
import { Experience } from "@prisma/client";
import formatWords from "./formatWords";

let PizZipUtils: any = null;
if (typeof window !== "undefined") {
  import("pizzip/utils/index.js").then(function (r) {
    PizZipUtils = r;
  });
}

export const loadFile = (
  url: string,
  callback: (error: any, content: any) => void
) => {
  PizZipUtils.getBinaryContent(url, callback);
};

export const generateExperienceWordDocument = async (
  expData: Experience,
  academyLevel: { name: string } | null,
  averageAge: { name: string } | null,
  educationLevel: { name: string } | null,
  courseName: { name: string } | null
) => {
  try {
    const templateUrl = "/templates/template-2.docx";

    const formattedpicxtics = expData.piccharacteristics
      ? formatWords(expData.piccharacteristics)
      : "";

    const formattedpnpxtics = expData.pnpcharacteristics
      ? formatWords(expData.pnpcharacteristics)
      : "";

    const formattedpsextics = expData.psecharacteristics
      ? formatWords(expData.psecharacteristics)
      : "";

    const formattedcontext = expData.reality_context
      ? formatWords(expData.reality_context)
      : "";

    const formattedquiz = expData.question_ai
      ? formatWords(expData.question_ai)
      : "";

    const formattedskills = expData.skills ? formatWords(expData.skills) : "";

    const eval_crit = expData.evaluation_criteria
      ? formatWords(expData.evaluation_criteria)
      : "";

    const formatedThemetaic = expData.thematic_fields
      ? formatWords(expData.thematic_fields)
      : "";

    const formatedSequence = expData.sequence_activities
      ? formatWords(expData.sequence_activities)
      : "";

    const formatedmaterials = expData.materials
      ? formatWords(expData.materials)
      : "";

    const formatedResos = expData.resources
      ? formatWords(expData.resources)
      : "";

    const formatedbibl = expData.bibliography
      ? formatWords(expData.bibliography)
      : "";

    loadFile(templateUrl, async (error: any, content: any) => {
      if (error) throw error;

      const zip = new PizZip(content);
      const doc = new Docxtemplater(zip, { modules: [] });

      doc.setData({
        title: expData.title,
        prof_Name: expData.prof_name,
        psecharacteristics: formattedpsextics,
        pnpcharacteristics: formattedpnpxtics,
        piccharacteristics: formattedpicxtics,
        resources: formatedResos,
        methodStrategies: expData.methods_strategies,
        materials: formatedmaterials,
        bibliography: formatedbibl,
        academyLevel: academyLevel?.name,
        averageAge: averageAge?.name,
        educationLevel: educationLevel?.name,
        thematicFields: formatedThemetaic,
        product: expData.product,
        assesmentTool: expData.eval_instrument,
        skills: formattedskills,
        evaluationCriteria: eval_crit,
        sequenceoflearningactivities: formatedSequence,
        context: formattedcontext,
        question: formattedquiz,
        courseName: courseName?.name,
        bimester: expData.trimester,
        instName: expData.inst_Name,
      });

      // Perform the templating process
      doc.render();

      // Get the generated document content
      const generatedDoc = doc.getZip().generate({
        type: "blob",
        mimeType:
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });

      // Save the generated document as a file
      saveAs(generatedDoc, "experiencia de aprendizaje-hokmahv1-document.docx");
    });
  } catch (error: any) {
    console.error("Error generating Word document:", error);
    throw error;
  }
};
