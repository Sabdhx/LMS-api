const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true },
  title: { type: String, required: true },
  description: { type: String },
  dueDate: { type: Date, required: true },
  submissions: [
    {
      student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      fileUrl: { type: String },
      submittedAt: { type: Date },
      grade: { type: String }
    }
  ]
}, { timestamps: true });

const assignment = mongoose.model('Assignment', assignmentSchema);
module.exports = assignment;