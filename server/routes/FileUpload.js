const express = require("express");
const router = express.Router();

const {imageUpload, videoUpload,imageReducerUpload, localFileUpload} = require("../controllers/fileUpload");
const { auth } = require("../middlewares/Auth");

// router.post("/imageUpload", imageUpload);
router.post("/localFileUpload", auth, localFileUpload);

module.exports = router;