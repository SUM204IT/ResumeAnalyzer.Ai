const Tesseract = require("tesseract.js");
const pdfParse = require("pdf-parse");

const extractTextFromPDF = async (fileBuffer) => {
  try {
    const data = await pdfParse(fileBuffer);
    return data.text;
  } catch (err) {
    console.error("PDF parse error:", err);
    throw new Error("Failed to parse PDF");
  }
};

const extractTextFromImage = async (fileBuffer) => {
  try {
    const result = await Tesseract.recognize(fileBuffer, "eng");
    return result.data.text;
  } catch (err) {
    console.error("OCR Error:", err);
    throw new Error("Failed to extract text from image");
  }
};

module.exports = {
  extractTextFromPDF,
  extractTextFromImage,
};