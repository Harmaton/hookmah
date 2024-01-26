import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import { saveAs } from "file-saver";
import { GAP } from "@prisma/client";

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

export const generateWordDocument = async (
  gapData: GAP,
  academyLevel: { name: string } | null,
  averageAge: { name: string } | null,
  educationLevel: { name: string } | null,
  department: { name: string } | null
) => {
  try {
    const templateUrl = "/templates/template-1.docx";

    loadFile(templateUrl, async (error: any, content: any) => {
      if (error) throw error;

      const zip = new PizZip(content);
      const doc = new Docxtemplater(zip, { modules: [] });

      // Bind your GAP model data to the template
      doc.setData({
        institutionName: gapData.institutionName,
        proffesorName: gapData.proffesorName,
        characteristics: gapData.characteristics,
        values: gapData.values,
        resources: gapData.resources,
        acdescription: gapData.acdescription,
        learningPurposes: gapData.learningPurposes,
        methodStrategies: gapData.methodsStrategies,
        materials: gapData.materials,
        attitudes: gapData.attitudes,
        bibliography: gapData.bibliography,
        city: gapData.city,
        academyLevel: academyLevel,
        averageAge: averageAge,
        educationLevel: educationLevel,
        department: department,
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
      saveAs(generatedDoc, "generated-document.docx");
    });
  } catch (error: any) {
    console.error("Error generating Word document:", error);
    throw error;
  }
};
