const mongoose = require('mongoose');

const feeSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['submitted', 'unsubmitted'], required: true },
  dueDate: { type: Date },
}, { timestamps: true });

const Fee = mongoose.model('fee', feeSchema);

module.exports=Fee;