const express = require("express");
const { analyzeResume, getUserResumes, getAllAnalysis } = require("../controllers/analyzeController");
const { auth } = require("../middlewares/Auth");

const router = express.Router();

router.post("/analyze-resume", auth, analyzeResume);
router.get("/get-my-resume", auth, getUserResumes);
router.get("/get-all-analysis", auth, getAllAnalysis);

module.exports = router;