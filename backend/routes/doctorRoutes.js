const express = require('express');
const router = express.Router();
const { getTodayAppointments, createPrescription, getPatientHistory } = require('../controllers/doctorController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Secure all clinical endpoints to authenticated Doctors
router.use(protect);
router.use(authorize('Doctor'));

router.get('/appointments/today', getTodayAppointments);
router.post('/prescriptions', createPrescription);
router.get('/patients/:id/history', getPatientHistory);

module.exports = router;
