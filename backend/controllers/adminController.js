const User = require('../models/User');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');
const Appointment = require('../models/Appointment');
const Bill = require('../models/Bill');
const Department = require('../models/Department');

// @desc    Get Admin Dashboard Analytics
// @route   GET /api/admin/dashboard
// @access  Private/Admin
exports.getAdminDashboard = async (req, res, next) => {
  try {
    const totalPatients = await Patient.countDocuments();
    const totalDoctors = await Doctor.countDocuments();
    
    // Get today's start and end timestamps
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    const todaysAppointments = await Appointment.countDocuments({
      date: { $gte: startOfToday, $lte: endOfToday }
    });

    // Calculate total revenue from paid invoices
    const revenueData = await Bill.aggregate([
      { $match: { paymentStatus: 'Paid' } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);
    const totalRevenue = revenueData.length > 0 ? revenueData[0].total : 0;

    res.status(200).json({
      success: true,
      analytics: {
        totalPatients,
        totalDoctors,
        todaysAppointments,
        totalRevenue
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new Doctor profile (Creates User entry + Doctor document)
// @route   POST /api/admin/doctors
// @access  Private/Admin
exports.addDoctor = async (req, res, next) => {
  try {
    const { name, email, password, phone, department, specialization, qualification, experience, fees, availability } = req.body;

    // Check if user account already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error('User with this email already exists');
    }

    // Create Base User account
    const user = await User.create({
      name,
      email,
      password,
      role: 'Doctor',
      phone
    });

    // Create Professional Doctor profile
    const doctor = await Doctor.create({
      user: user._id,
      department,
      specialization,
      qualification,
      experience,
      fees,
      availability
    });

    res.status(201).json({
      success: true,
      message: 'Doctor profile created successfully',
      data: doctor
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a Department
// @route   POST /api/admin/departments
// @access  Private/Admin
exports.createDepartment = async (req, res, next) => {
  try {
    const { name, description } = req.body;

    const departmentExists = await Department.findOne({ name });
    if (departmentExists) {
      res.status(400);
      throw new Error('Department already exists');
    }

    const department = await Department.create({ name, description });

    res.status(201).json({
      success: true,
      data: department
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all Departments
// @route   GET /api/admin/departments
// @access  Private (Accessible by authenticated staff)
exports.getDepartments = async (req, res, next) => {
  try {
    const departments = await Department.find().populate('headOfDepartment');
    res.status(200).json({
      success: true,
      data: departments
    });
  } catch (error) {
    next(error);
  }
};
