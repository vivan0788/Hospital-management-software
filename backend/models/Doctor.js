const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
  specialization: { type: String, required: true },
  qualification: { type: String, required: true },
  experience: { type: Number, required: true }, // in years
  fees: { type: Number, required: true },
  availability: [{
    day: { type: String, enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] },
    slots: [{ type: String }] // e.g., ["09:00 AM", "10:00 AM"]
  }]
}, { timestamps: true });

module.exports = mongoose.model('Doctor', doctorSchema);
