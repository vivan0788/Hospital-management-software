const User = require('../models/User');
const Patient = require('../models/Patient');
const Appointment = require('../models/Appointment');

// @desc    Register a new walk-in Patient
// @route   POST /api/receptionist/patients
// @access  Private/Receptionist
exports.registerPatientWalkIn = async (req, res, next) => {
  try {
    const { name, email, password, phone, dateOfBirth, gender, bloodGroup, address } = req.body;

    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error('A user with this email already exists');
    }

    // Create the base user account for the patient
    const user = await User.create({
      name,
      email,
      password: password || 'Welcome@123', // Default temporary password if walk-in
      role: 'Patient',
      phone
    });

    // Create the detailed patient profile
    const patient = await Patient.create({
      user: user._id,
      dateOfBirth,
      gender,
      bloodGroup,
      address
    });

    res.status(201).json({
      success: true,
      message: 'Patient registered successfully by front desk',
      data: patient
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Book an appointment and auto-calculate Queue Number
// @route   POST /api/receptionist/appointments
// @access  Private/Receptionist
exports.bookAppointment = async (req, res, next) => {
  try {
    const { patientId, doctorId, departmentId, date, timeSlot, reasonForVisit } = req.body;

    // Calculate queue number for the specific doctor on that date
    const appointmentDate = new Date(date);
    appointmentDate.setHours(0, 0, 0, 0);
    const endOfDate = new Date(date);
    endOfDate.setHours(23, 59, 59, 999);

    const activeAppointmentsCount = await Appointment.countDocuments({
      doctor: doctorId,
      date: { $gte: appointmentDate, $lte: endOfDate }
    });

    const queueNumber = activeAppointmentsCount + 1;

    const appointment = await Appointment.create({
      patient: patientId,
      doctor: doctorId,
      department: departmentId,
      date,
      timeSlot,
      reasonForVisit,
      queueNumber,
      status: 'Confirmed'
    });

    res.status(201).json({
      success: true,
      message: 'Appointment scheduled successfully',
      data: appointment
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update appointment status (Cancel, Reschedule, or update Queue)
// @route   PUT /api/receptionist/appointments/:id
// @access  Private/Receptionist
exports.updateAppointmentStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      res.status(404);
      throw new Error('Appointment not found');
    }

    appointment.status = status;
    await appointment.save();

    res.status(200).json({
      success: true,
      message: `Appointment updated to: ${status}`,
      data: appointment
    });
  } catch (error) {
    next(error);
  }
};
