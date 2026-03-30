const express = require("express");
const router = express.Router();

const {analyzeResume} = require("../controllers/analyzeController");

router.post("/analyze-resume", analyzeResume);


module.exports = router;