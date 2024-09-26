const mongoose = require("mongoose");

const TeacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  attendanceRecords: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Attendance' }],
  feeManagement: {
    totalFees: Number,
    collectedFees: Number,
    dueFees: Number,
  },
  role: { type: String, default: 'teacher' },
}, { timestamps: true });

const teacher = mongoose.model("Teacher", TeacherSchema);
module.exports = teacher;