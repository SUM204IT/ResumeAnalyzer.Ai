const fs = require("fs");
const { analyzeResumeWithAI } = require("../services/aiServices");
const { extractTextFromImage, extractTextFromPDF } = require("../services/ocrService");
const Resume = require("../models/Resume");

const analyzeResume = async (req, res) => {
  try {
    const { filePath } = req.body;

    if (!filePath) {
      return res.status(400).json({
        success: false,
        message: "File path is required",
      });
    }

    // ✅ read file
    const fileBuffer = fs.readFileSync(filePath);

    let resumeText = "";

    // ✅ PDF handling
    if (filePath.endsWith(".pdf")) {
      try {
        console.log("Trying PDF parse...");
        resumeText = await extractTextFromPDF(fileBuffer);

        if (!resumeText || resumeText.trim().length < 50) {
          return res.status(400).json({
            success: false,
            message: "Scanned PDF not supported yet",
          });
        }

      } catch (err) {
        console.log("PDF parse failed");
        return res.status(400).json({
          success: false,
          message: "Failed to parse PDF",
        });
      }
    }

    // ✅ IMAGE handling
    else if (
      filePath.endsWith(".png") ||
      filePath.endsWith(".jpg") ||
      filePath.endsWith(".jpeg")
    ) {
      resumeText = await extractTextFromImage(fileBuffer);
    }

    else {
      return res.status(400).json({
        success: false,
        message: "Unsupported file type",
      });
    }


    // ✅ AI analysis
    let aiResponse = await analyzeResumeWithAI(resumeText);

    aiResponse = aiResponse.replace(/```json|```/g, "").trim();

    // ✅ safe JSON parse
    const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      return res.status(500).json({
        success: false,
        message: "Invalid AI response format",
      });
    }

    let parsed;
    try {
      parsed = JSON.parse(jsonMatch[0]);
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Error parsing AI response",
      });
    }

    // ✅ get user
    const userId = req.user.id;

    // ✅ SAVE FULL DATA
    await Resume.create({
      user: userId,
      filePath: filePath,
      score: parsed.score,
      atsScore: parsed.atsScore,
      grammarIssues: parsed.grammarIssues,
      improvedSummary: parsed.improvedSummary,
      jobMatch: parsed.jobMatch,
      missingKeywords: parsed.missingKeywords,
      sectionFeedback: parsed.sectionFeedback,
      strengths: parsed.strengths,
      suggestions: parsed.suggestions,
      weaknesses: parsed.weaknesses,
    });

    return res.status(200).json({
      success: true,
      data: parsed,
    });

  } catch (err) {
    console.error("Analyze Error:", err);

    return res.status(500).json({
      success: false,
      message: "Analysis failed",
    });
  }
};

module.exports = { analyzeResume };