const courseModel = require("../models/courseModel.js");
const jwt = require("jsonwebtoken")
const studentSchema= require("../models/studentSchema.js")


const courseUploadingByTeacher = async (req, res) => {
  const { title, description, students, posts } = req.body;

  const token = req.cookies.token;
  try {
    if (token) {
      const verifiedToken = jwt.verify(token, "secret");
      const newCourse = await courseModel.create({
        // Use verifiedToken.id or other properties as needed
        // Assuming you're using the user ID as the teacher reference
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

// const postInCourse = async (req, res) => {
//   try {
//     const { title, course, type, url } = req.body;

//     // Create a new post
//     const response = await posts.create({
//       title,
//       course,
//       type,
//       url
//     });
//   await courseModel.findByIdAndUpdate(course , {$push : {response}})
//   res.status(200).json(response)
//     // Return the created post
//     res.status(201).json(response);
//   } catch (error) {
//     console.error('Error creating post:', error);

//     // Handle specific errors (e.g., duplicate keys)
//     if (error.code === 11000) {
//       return res.status(409).json({ message: 'Post with this title already exists.' });
//     }

//     // General error response
//     res.status(500).json({ message: 'An error occurred while creating the post.', error: error.message });
//   }
// };

const deleteCourse = async (req, res) => {
  try {
    const id = req.params.id;
    
    // Find and delete the course by ID
    const response = await courseModel.findByIdAndDelete(id);

    // Check if the course was found and deleted
    if (!response) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Respond with success message
    res.status(200).json({ message: "The course has been deleted successfully" });
  } catch (error) {
    console.error('Error deleting course:', error);
    
    // General error response
    res.status(500).json({ message: "An error occurred while deleting the course", error: error.message });
  }
};


const AllCourses=async(req,res)=>{
  const course=await courseModel.find();
  res.status(200).json(course)
} 

const feeSubmission = async (req, res) => {
  try {
    const { student } = req.body;

    // Check if student ID is provided
    if (!student) {
      return res.status(400).json({ message: 'Student ID is required.' });
    }

    // Update the feeSubmission status to "submitted"
    const updatedStudent = await studentSchema.findByIdAndUpdate(
      student,
      { feeSubmission: "submitted" },
      { new: true } // Return the updated document
    );

    // Check if the student was found and updated
    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found.' });
    }

    // Successfully updated
    res.status(200).json({
      message: 'Fee submitted successfully.',
      student: updatedStudent
    });
  } catch (error) {
    console.error('Error updating fee submission:', error);
    
    // Handle specific error cases
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid student ID format.' });
    }

    // General error response
    res.status(500).json({ message: 'An error occurred while submitting the fee.', error: error.message });
  }
};



const allSubmissions=async(req,res)=>{
  const response = await feeSchema.find();
  res.status(200).json(response)
}

module.exports = { courseUploadingByTeacher, feeSubmission,AllCourses,allSubmissions,deleteCourse };
