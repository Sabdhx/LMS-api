const mongoose = require("mongoose");

const FeeSubmissionSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  amountPaid: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  dueAmount: { type: Number, default: 0 },
  status: {
    type: String,
    enum: ['Paid', 'Pending', 'Partial'],
    default: 'Pending',
  },
  paymentDate: { type: Date, default: Date.now },
}, { timestamps: true });

const feeSchema = mongoose.model("fee", FeeSubmissionSchema); 
module.exports = feeSchema;