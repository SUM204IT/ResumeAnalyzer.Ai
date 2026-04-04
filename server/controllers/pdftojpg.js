const pdf = require("pdf-poppler");
const path = require("path");
const fs = require("fs");

exports.convertPdfToJpg = async (pdfPath) => {
  try {
    const outputDir = path.join(__dirname, "converted");

    // create folder if not exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }

    const options = {
      format: "jpeg",
      out_dir: outputDir,
      out_prefix: "page",
      page: null, // all pages
    };

    await pdf.convert(pdfPath, options);

    // get all generated images
    const files = fs.readdirSync(outputDir);

    const imagePaths = files.map((file) =>
      path.join(outputDir, file)
    );

    return imagePaths;

  } catch (error) {
    console.error("PDF → JPG conversion error:", error);
    throw error;
  }
};