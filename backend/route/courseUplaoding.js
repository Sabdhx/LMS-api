const express = require("express");
const { courseUplaoding } = require("../controller/courseUpload");
const router = express.Router()

router.post("/course" ,courseUplaoding)

module.exports = router;