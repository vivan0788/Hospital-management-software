const Medicine = require('../models/Medicine');
const LabReport = require('../models/LabReport');
const Bill = require('../models/Bill');

// ==========================================
// PHARMACY INVENTORY MANAGEMENT
// ==========================================

// @desc    Add new medicine to inventory stock
// @route   POST /api/ancillary/pharmacy
// @access  Private/Admin/Receptionist
exports.addMedicineStock = async (req, res, next) => {
  try {
    const { name, category, stock, price, expiryDate, supplier } = req.body;

    const medicineExists = await Medicine.findOne({ name });
    if (medicineExists) {
      // If it exists, update the stock level
      medicineExists.stock += Number(stock);
      await medicineExists.save();
      return res.status(200).json({ success: true, message: 'Stock updated', data: medicineExists });
    }

    const medicine = await Medicine.create({ name, category, stock, price, expiryDate, supplier });
    res.status(201).json({ success: true, data: medicine });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// LABORATORY TEST MANAGEMENT
// ==========================================

// @desc    Request or update a laboratory test report
// @route   POST /api/ancillary/laboratory
// @access  Private/Admin/Doctor
exports.createLabReport = async (req, res, next) => {
  try {
    const { patientId, testName, resultDetails, status, reportFileUrl } = req.body;

    const report = await LabReport.create({
      patient: patientId,
      doctor: req.user.role === 'Doctor' ? req.user._id : undefined,
      testName,
      resultDetails,
      status,
      reportFileUrl
    });

    res.status(201).json({ success: true, data: report });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// AUTOMATED BILLING SYSTEM
// ==========================================

// @desc    Generate a complete financial Invoice statement with GST
// @route   POST /api/ancillary/billing
// @access  Private/Admin/Receptionist
exports.generateInvoice = async (req, res, next) => {
  try {
    const { patientId, appointmentId, items, paymentMethod } = req.body;

    // Calculate subTotal dynamically from items list
    const subTotal = items.reduce((acc, item) => acc + Number(item.amount), 0);
    
    // Apply standard 18% standard healthcare service / admin GST matrix
    const gstRate = 0.18; 
    const gstAmount = Math.round(subTotal * gstRate * 100) / 100;
    const totalAmount = subTotal + gstAmount;

    const bill = await Bill.create({
      patient: patientId,
      appointment: appointmentId,
      items,
      subTotal,
      gstAmount,
      totalAmount,
      paymentMethod,
      paymentStatus: 'Unpaid'
    });

    res.status(201).json({
      success: true,
      message: 'Invoice prepared successfully',
      data: bill
    });
  } catch (error) {
    next(error);
  }
};
