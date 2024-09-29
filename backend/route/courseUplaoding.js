const express = require("express");
const { courseUploadingByTeacher, feeSubmission, AllCourses, allSubmissions ,deleteCourse} = require("../controller/AdminWorks.js");
const {TeacherTracking}=require("../middleware/TeacherTrack.js")
const router = express.Router()

router.post("/create-course" ,TeacherTracking,courseUploadingByTeacher);
router.post("/submitFee",feeSubmission)
router.get("/courses",AllCourses)
router.get("/allsubmissions" , allSubmissions)
// router.post("/posting",postInCourse)
router.delete("/deleteCoures/:id",deleteCourse)

module.exports = router;