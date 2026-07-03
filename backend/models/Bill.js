const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  appointment: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' },
  items: [{
    description: { type: String, required: true },
    amount: { type: Number, required: true }
  }],
  subTotal: { type: Number, required: true },
  gstAmount: { type: Number, required: true }, // calculated tax
  totalAmount: { type: Number, required: true },
  paymentStatus: { type: String, enum: ['Unpaid', 'Paid', 'Partially Paid'], default: 'Unpaid' },
  paymentMethod: { type: String, enum: ['Cash', 'Card', 'UPI', 'Insurance'] }
}, { timestamps: true });

module.exports = mongoose.model('Bill', billSchema);
