const mongoose = require("mongoose")

const CourseSchema = new mongoose.Schema({
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true },
  title: { type: String, required: true },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
  description: { type: String },
  posts:[{type:mongoose.Schema.Types.ObjectId, ref:"Post"}]
}, { timestamps: true });

const Course = mongoose.model("Course", CourseSchema);
module.exports = Course;