const course = require("../models/courseModel.js");
const courseModel = require("../models/courseModel.js");
const user = require("../models/authModel.js");
const Attendance = require("../models/AtendenceSchema.js");
const FeeSubmission = require("../models/feeSubmittionSchema.js"); 
const userModel = require("../models/authModel.js")
const jwt = require("jsonwebtoken")

const courseUploadingByTeacher = async (req, res) => {
  const { title, description, teacher, students, posts } = req.body;

  const token = req.cookies.token;
  try {
    if (token) {
      const verifiedToken = jwt.verify(token, "secret");
      const newCourse = await courseModel.create({
        // Use verifiedToken.id or other properties as needed
        teacher: verifiedToken.id, // Assuming you're using the user ID as the teacher reference
        title,
        description,
        students,
        posts
      });
      res.status(201).json({ message: "Course uploaded successfully" });
    } else {
      res.status(500).json({ message: "Please sign in first" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error occurred" }); // Optionally, send an error response
  }

}

 
const feeSubmittion = async (req, res) => {
  const {
    student,
    teacher,
    course,
    amountPaid,
    totalAmount,
    dueAmount,
    status,
  } = req.body;




  const token = req.cookies.token;
  try {
    if (token) {
      const verifiedToken = jwt.verify(token, "secret");


    // Find the fee submission record by student ID




    const feeSubmission = await FeeSubmission.findOneAndUpdate(
      { student: student }, // Find the record by student ID
      {
        $set: {
          teacher: verifiedToken.id,
          course: course,
          amountPaid: amountPaid,
          totalAmount: totalAmount,
          dueAmount: dueAmount,
          status: status,
        },
      },
      { new: true } // Return the updated document
    );
    // If no record found, send a 404 error
    if (!feeSubmission) {
      return res
        .status(404)
        .json({ message: "Fee submission record not found" });
    }
    // Send back the updated fee submission as a response
    res
      .status(200)
      .json({ message: "Fee submitted successfully", feeSubmission });
    } else {
      res.status(500).json({ message: "Please sign in first" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error occurred" }); // Optionally, send an error response
  }

}

module.exports = { courseUploadingByTeacher, feeSubmittion };
