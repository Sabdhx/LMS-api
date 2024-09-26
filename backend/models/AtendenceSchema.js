const mongoose= require("mongoose")

const AttendanceSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  status: { type: String, enum: ['Present', 'Absent', 'Leave'], required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
}, { timestamps: true });

const Attendance = mongoose.model("attendence" , AttendanceSchema);
module.exports = Attendance ;