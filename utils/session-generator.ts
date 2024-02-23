import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import { saveAs } from "file-saver";
import { Experience, Session } from "@prisma/client";

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

export const generateSessionWordDocument = async (
  expData: Session,
  academyLevel: { name: string } | null,
  averageAge: { name: string } | null,
  educationLevel: { name: string } | null,
  time: { name: string } | null
) => {
  try {
    const templateUrl = "/templates/temp-3.docx";

    loadFile(templateUrl, async (error: any, content: any) => {
      if (error) throw error;

      const zip = new PizZip(content);
      const doc = new Docxtemplater(zip, { modules: [] });

      doc.setData({
        title: expData.title,
        institutionName: expData.institution_name,
        profName: expData.prof_name,
        educationLevel: educationLevel,
        academyLevel: academyLevel,
        time: time,
        competence: expData.competence,
        performance: expData.perfomance,
        product: expData.product,
        instrument: expData.instrument,
        motivation: expData.motivation,
        knowinadvance: expData.knowinadvance,
        cognitiveconflict: expData.cognitiveconflict,
        learningpurpose: expData.learningpurpose,
        theoreticalcontent: expData.theoreticalcontent,
        practicalcontent: expData.practicalcontent,
        complimentaryactivities: expData.complimentaryactivities,
        assesment: expData.assesment
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
      saveAs(generatedDoc, "sesión -hokmahv1-document.docx");
    });
  } catch (error: any) {
    console.error("Error generating Word document:", error);
    throw error;
  }
};
