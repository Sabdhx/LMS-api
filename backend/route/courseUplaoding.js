const express = require("express");
const { courseUploadingByTeacher } = require("../controller/courseUpload.js");
const {TeacherTracking}=require("../middleware/TeacherTrack.js")
const router = express.Router()

router.get("/create-course" ,TeacherTracking,courseUploadingByTeacher);

module.exports = router;