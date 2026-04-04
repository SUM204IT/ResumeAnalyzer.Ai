const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    filePath: {
      type: String,
      required: true,
    },

    score: {
      type: Number,
      default: 0,
    },

    atsScore: {
      type: Number,
      default: 0,
    },

    grammarIssues: [
      {
        type: String,
      },
    ],

    improvedSummary: {
      type: String,
    },

    jobMatch: {
      type: Number,
      default: 0,
    },

    missingKeywords: [
      {
        type: String,
      },
    ],

    // ✅ FIXED
    sectionFeedback: {
      type: mongoose.Schema.Types.Mixed, // 🔥 flexible object
    },

    strengths: [
      {
        type: String,
      },
    ],

    suggestions: [
      {
        type: String,
      },
    ],

    weaknesses: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true, // ✅ adds createdAt & updatedAt automatically
  }
);

module.exports = mongoose.model("Resume", resumeSchema);