import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import { saveAs } from "file-saver";
import { Experience, Session } from "@prisma/client";
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

export const generateSessionWordDocument = async (
  expData: Session,
  academyLevel: { name: string } | null,
  averageAge: { name: string } | null,
  educationLevel: { name: string } | null,
  time: { name: string } | null,
  course: { name: string } | null
) => {
  try {
    const templateUrl = "/templates/temp-3.docx";

    const formattedcompetence = expData.competence
      ? formatWords(expData.competence)
      : "";

    const formattedPerfomance = expData.perfomance
      ? formatWords(expData.perfomance)
      : "";

    const formattedProduct = expData.product
      ? formatWords(expData.product)
      : "";

    const formattedinstrument = expData.instrument
      ? formatWords(expData.instrument)
      : "";

    const formattedmotivation = expData.motivation
      ? formatWords(expData.motivation)
      : "";

    const formattedkia = expData.knowinadvance
      ? formatWords(expData.knowinadvance)
      : "";

    const formattedcogn = expData.cognitiveconflict
      ? formatWords(expData.cognitiveconflict)
      : "";

    const formattedlp = expData.learningpurpose
      ? formatWords(expData.learningpurpose)
      : "";

    const formattedtheorcont = expData.theoreticalcontent
      ? formatWords(expData.theoreticalcontent)
      : "";

    const formattedPractical = expData.practicalcontent
      ? formatWords(expData.practicalcontent)
      : "";

    const formattedAssesment = expData.assesment
      ? formatWords(expData.assesment)
      : "";

    const formatedcompl = expData.complimentaryactivities
      ? formatWords(expData.complimentaryactivities)
      : "";

    loadFile(templateUrl, async (error: any, content: any) => {
      if (error) throw error;

      const zip = new PizZip(content);
      const doc = new Docxtemplater(zip, { modules: [] });

      doc.setData({
        title: expData.title,
        institutionName: expData.institution_name,
        profName: expData.prof_name,
        educationLevel: educationLevel?.name,
        academyLevel: academyLevel?.name,
        time: time?.name,
        competence: formattedcompetence,
        performance: formattedPerfomance,
        product: formattedProduct,
        instrument: formattedinstrument,
        motivation: formattedmotivation,
        knowinadvance: formattedkia,
        cognitiveconflict: formattedcogn,
        learningpurpose: formattedlp,
        theoreticalcontent: formattedtheorcont,
        practicalcontent: formattedPractical,
        complimentaryactivities: formatedcompl,
        assesment: formattedAssesment,
        course: course?.name,
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
