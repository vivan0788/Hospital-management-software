const Appointment = require('../models/Appointment');
const Prescription = require('../models/Prescription');
const LabReport = require('../models/LabReport');
const Bill = require('../models/Bill');
const Patient = require('../models/Patient');

// Helper: Find patient profile from user context
const findPatientProfile = async (userId) => {
  const patient = await Patient.findOne({ user: userId });
  if (!patient) {
    const error = new Error('Patient profile record not found.');
    error.statusCode = 404;
    throw error;
  }
  return patient;
};

// @desc    Get current patient's profile and medical metrics
// @route   GET /api/patient/profile
// @access  Private/Patient
exports.getPatientDashboard = async (req, res, next) => {
  try {
    const patient = await findPatientProfile(req.user._id);
    res.status(200).json({
      success: true,
      data: patient
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get appointment history for the logged-in patient
// @route   GET /api/patient/appointments
// @access  Private/Patient
exports.getPatientAppointments = async (req, res, next) => {
  try {
    const patient = await findPatientProfile(req.user._id);

    const appointments = await Appointment.find({ patient: patient._id })
      .populate({ path: 'doctor', populate: { path: 'user', select: 'name' } })
      .populate('department', 'name')
      .sort({ date: -1 });

    res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get prescriptions issued to the logged-in patient
// @route   GET /api/patient/prescriptions
// @access  Private/Patient
exports.getPatientPrescriptions = async (req, res, next) => {
  try {
    const patient = await findPatientProfile(req.user._id);

    const prescriptions = await Prescription.find({ patient: patient._id })
      .populate({ path: 'doctor', populate: { path: 'user', select: 'name' } })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: prescriptions
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all medical billing statements for the logged-in patient
// @route   GET /api/patient/bills
// @access  Private/Patient
exports.getPatientBills = async (req, res, next) => {
  try {
    const patient = await findPatientProfile(req.user._id);

    const bills = await Bill.find({ patient: patient._id }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: bills
    });
  } catch (error) {
    next(error);
  }
};
