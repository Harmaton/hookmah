import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import { saveAs } from "file-saver";
import { GAP } from "@prisma/client";
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

export const generateWordDocument = async (
  gapData: GAP,
  academyLevel: { name: string } | null,
  averageAge: { name: string } | null,
  educationLevel: { name: string } | null,
  department: { name: string } | null,
  course: { name: string } | null
) => {

  try {
    const templateUrl = "/templates/temp-test.docx";

    loadFile(templateUrl, async (error: any, content: any) => {
      if (error) throw error;

      const zip = new PizZip(content);
      const doc = new Docxtemplater(zip, { modules: [] });

      const formattedBibliography = gapData.bibliography
        ? formatWords(gapData.bibliography)
        : "";

      const formattedac = gapData.acdescription
        ? formatWords(gapData.acdescription)
        : "";

      const formattedmaterials = gapData.materials
        ? formatWords(gapData.materials)
        : "";

      const formatedstrategies = gapData.methodsStrategies
        ? formatWords(gapData.methodsStrategies)
        : "";

        const formattedxtics = gapData.characteristics ? formatWords(gapData.characteristics) : ""

      doc.setData({
        institutionName: gapData.institutionName,
        proffesorName: gapData.proffesorName,
        characteristics: formattedxtics,
        values: gapData.values,
        resources: gapData.resources,
        acdescription: formattedac,
        learningPurposes: gapData.learningPurposes,
        methodStrategies: formatedstrategies,
        materials: formattedmaterials,
        attitudes: gapData.attitudes,
        bibliography: formattedBibliography,
        city: gapData.city,
        academyLevel: academyLevel?.name,
        averageAge: averageAge?.name,
        educationLevel: educationLevel?.name,
        department: department?.name,
        district: gapData.district,
        course: course?.name,
        year: gapData.year,
        title: gapData.title,
        // gapimage: gapData.companyLogo
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
