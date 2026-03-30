const genAI = require("../config/gemini");

const analyzeResumeWithGemini = async (resumeText) => {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
  });

  const result = await model.generateContent({
    contents: [
      {
        parts: [
          {
            text: `
Analyze resume and return:
- Score
- Strengths
- Weaknesses
- Suggestions

Resume:
${resumeText}
            `,
          },
        ],
      },
    ],
  });

  return result.response.text();
};

module.exports = analyzeResumeWithGemini;