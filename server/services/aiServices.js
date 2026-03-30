const { client } = require("../config/groq");

const analyzeResumeWithAI = async (resumeText) => {
  const response = await client.chat.completions.create({
    model: "llama-3.3-70b-versatile",

    temperature: 0, // ✅ makes output consistent

    messages: [
      {
        role: "user",
        content: `
You are an expert HR.

Return ONLY valid JSON.
Do NOT include:
- markdown
- explanation
- extra text

Strict format:
{
  "score": 78,
  "atsScore": 65,
  "jobMatch": 72,
  "strengths": [],
  "weaknesses": [],
  "suggestions": [],
  "missingKeywords": [],
  "sectionFeedback": {},
  "improvedSummary": "",
  "grammarIssues": []
}

Resume:
${resumeText}
        `,
      },
    ],
  });

  let content = response.choices[0].message.content;

  // ✅ Remove markdown if AI still adds it
  content = content.replace(/```json|```/g, "").trim();

  return content;
};

module.exports = { analyzeResumeWithAI };