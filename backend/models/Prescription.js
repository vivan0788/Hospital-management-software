const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
  appointment: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment', required: true },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  diagnosis: { type: String, required: true },
  medicines: [{
    name: { type: String, required: true },
    dosage: { type: String, required: true }, // e.g., "1-0-1"
    duration: { type: String, required: true }, // e.g., "5 days"
    instructions: String // e.g., "After meals"
  }],
  symptoms: String,
  notes: String
}, { timestamps: true });

module.exports = mongoose.model('Prescription', prescriptionSchema);
