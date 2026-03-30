const { analyzeResumeWithAI } = require("../services/aiServices");
const { extractTextFromImage } = require("../services/ocrService");
const {extractTextFromPDF} = require("../services/ocrService"); // ✅ correct import

const analyzeResume = async (req, res) => {
  try {
    const { fileUrl } = req.body;

    if (!fileUrl) {
      return res.status(400).json({ error: "Resume file is required" });
    }

    let resumeText = "";

    // ✅ IMAGE FILE
    if (fileUrl.match(/\.(jpg|jpeg|png)$/i)) {
      resumeText = await extractTextFromImage(fileUrl);
    }

    // ✅ PDF FILE
    else if (fileUrl.match(/\.pdf$/i)) {
      resumeText = await extractTextFromPDF(fileUrl);
    }

    // ❌ Unsupported
    else {
      return res.status(400).json({
        error: "Unsupported file type (only PDF, JPG, PNG allowed)",
      });
    }

    // ✅ Send to AI
    let data = await analyzeResumeWithAI(resumeText);

    // ✅ Clean AI response
    data = data.replace(/```json|```/g, "").trim();

    const jsonMatch = data.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      throw new Error("No JSON found");
    }

    const parsed = JSON.parse(jsonMatch[0]);

    res.json(parsed);

  } catch (err) {
    console.error("Analyze Error:", err);

    res.status(500).json({
      error: "Invalid AI response",
      message: err.message,
    });
  }
};

module.exports = { analyzeResume };