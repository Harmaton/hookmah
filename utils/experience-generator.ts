import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import { saveAs } from "file-saver";
import { Experience } from "@prisma/client";


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
) => {

  try {
    const templateUrl = "/templates/template-2.docx";

    loadFile(templateUrl, async (error: any, content: any) => {
      if (error) throw error;

      const zip = new PizZip(content);
      const doc = new Docxtemplater(zip, { modules: [] });

      doc.setData({
        title: expData.title,
        prof_Name: expData.prof_name,
        psecharacteristics: expData.psecharacteristics,
        pnpcharacteristics: expData.pnpcharacteristics,
        piccharacteristics: expData.piccharacteristics,
        resources: expData.resources,
        methodStrategies: expData.methods_strategies,
        materials: expData.materials ,
        bibliography: expData.bibliography,
        academyLevel: academyLevel?.name,
        averageAge: averageAge?.name,
        educationLevel: educationLevel?.name,
        thematicFields: expData.thematic_fields,
        product: expData.product,
        assesmentTool: expData.eval_instrument,
        skills: expData.skills,
        evaluationCriteria: expData.evaluation_criteria,
        sequenceoflearningactivities: expData.sequence_activities,
        context: expData.reality_context,
        question: expData.question_ai
        
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
      saveAs(generatedDoc, "learning experience-hokmahv1-document.docx");
    });
  } catch (error: any) {
    console.error("Error generating Word document:", error);
    throw error;
  }
};
