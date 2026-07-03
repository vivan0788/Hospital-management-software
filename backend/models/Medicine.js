const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  category: { type: String, required: true }, // e.g., Antibiotic, Painkiller
  stock: { type: Number, required: true, default: 0 },
  price: { type: Number, required: true },
  expiryDate: { type: Date, required: true },
  supplier: String
}, { timestamps: true });

module.exports = mongoose.model('Medicine', medicineSchema);
