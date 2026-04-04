const express = require("express");
const { analyzeResume } = require("../controllers/analyzeController");
const { auth } = require("../middlewares/Auth");

const router = express.Router();

router.post("/analyze-resume", auth, analyzeResume);

module.exports = router;