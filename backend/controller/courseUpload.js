const course = require("../models/courseModel.js")
const teacher = require("../models/teacherModel.js")
const user = require("../models/authModel.js")

const courseUplaoding = async(req,res)=>{
  const {title,description,teacherName,course,type}= req.body;
   console.log(user)
  //   const courseData = new course.create(
  //     req.body
  //   )
  //  res.status(200).json(courseData)
    
}

module.exports  = {courseUplaoding}

