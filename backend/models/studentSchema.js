const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  assignments: [{
    title: { type: String, required: true },
    content: { type: String, required: true },
    submitted: { type: Boolean, default: false },
    submissionDate: { type: Date }
  }]
});

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;