const express = require('express');
const router = express.Router();
const { 
  getPatientDashboard, 
  getPatientAppointments, 
  getPatientPrescriptions, 
  getPatientBills 
} = require('../controllers/patientController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Secure all patient specific endpoints
router.use(protect);
router.use(authorize('Patient'));

router.get('/profile', getPatientDashboard);
router.get('/appointments', getPatientAppointments);
router.get('/prescriptions', getPatientPrescriptions);
router.get('/bills', getPatientBills);

module.exports = router;
