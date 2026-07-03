const mongoose = require('mongoose');

const labReportSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' }, // Ordering doctor
  testName: { type: String, required: true },
  resultDetails: String,
  status: { type: String, enum: ['Pending', 'Completed'], default: 'Pending' },
  reportFileUrl: String, // Path or cloud storage URL
  testDate: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('LabReport', labReportSchema);
