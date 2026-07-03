const Appointment = require('../models/Appointment');
const Prescription = require('../models/Prescription');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');

// @desc    Get Today's Appointments for Logged-in Doctor
// @route   GET /api/doctor/appointments/today
// @access  Private/Doctor
exports.getTodayAppointments = async (req, res, next) => {
  try {
    // Find the doctor profile corresponding to the logged-in user
    const doctorProfile = await Doctor.findOne({ user: req.user._id });
    if (!doctorProfile) {
      res.status(404);
      throw new Error('Doctor profile record not found.');
    }

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    const appointments = await Appointment.find({
      doctor: doctorProfile._id,
      date: { $gte: startOfToday, $lte: endOfToday }
    })
    .populate({ path: 'patient', populate: { path: 'user', select: 'name phone' } })
    .sort({ queueNumber: 1 });

    res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a Prescription & update Appointment Status to Completed
// @route   POST /api/doctor/prescriptions
// @access  Private/Doctor
exports.createPrescription = async (req, res, next) => {
  try {
    const { appointmentId, diagnosis, medicines, symptoms, notes } = req.body;

    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      res.status(404);
      throw new Error('Appointment not found');
    }

    // Generate prescription document
    const prescription = await Prescription.create({
      appointment: appointmentId,
      patient: appointment.patient,
      doctor: appointment.doctor,
      diagnosis,
      medicines,
      symptoms,
      notes
    });

    // Mark appointment as Completed
    appointment.status = 'Completed';
    await appointment.save();

    res.status(201).json({
      success: true,
      message: 'Prescription filed and appointment closed successfully',
      data: prescription
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get full EMR / Medical History of a specific Patient
// @route   GET /api/doctor/patients/:id/history
// @access  Private/Doctor
exports.getPatientHistory = async (req, res, next) => {
  try {
    const patientId = req.params.id;

    const patient = await Patient.findById(patientId).populate('user', 'name email phone');
    if (!patient) {
      res.status(404);
      throw new Error('Patient not found');
    }

    const prescriptions = await Prescription.find({ patient: patientId })
      .populate({ path: 'doctor', populate: { path: 'user', select: 'name' } })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      patient,
      history: {
        prescriptions,
        pastConditions: patient.medicalHistory,
        allergies: patient.allergies
      }
    });
  } catch (error) {
    next(error);
  }
};
