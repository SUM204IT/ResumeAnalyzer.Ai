const Tesseract = require("tesseract.js");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const {pdfParse} = require("pdf-parse");

const extractTextFromPDF = async (fileUrl) => {
  const response = await axios.get(fileUrl, {
    responseType: "arraybuffer",
    headers: {
      "User-Agent": "Mozilla/5.0", // avoids 403
    },
  });

  const data = await pdfParse(response.data);
  return data.text;
};

const extractTextFromImage = async (imageUrl) => {
  const filePath = path.join(__dirname, "temp.jpg");

  // ✅ Download image
  const response = await axios({
    url: imageUrl,
    method: "GET",
    responseType: "stream",
  });

  const writer = fs.createWriteStream(filePath);
  response.data.pipe(writer);

  await new Promise((resolve, reject) => {
    writer.on("finish", resolve);
    writer.on("error", reject);
  });

  // ✅ Run OCR on local file
  const result = await Tesseract.recognize(filePath, "eng");

  // ✅ Delete temp file (optional)
  fs.unlinkSync(filePath);

  return result.data.text;
};

module.exports = {
  extractTextFromPDF,
  extractTextFromImage,
};