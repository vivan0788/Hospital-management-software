const express = require('express');
const router = express.Router();
const { registerPatientWalkIn, bookAppointment, updateAppointmentStatus } = require('../controllers/receptionistController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Secure all front-desk routes to authenticated Receptionists and Admins
router.use(protect);
router.use(authorize('Receptionist', 'Admin'));

router.post('/patients', registerPatientWalkIn);
router.post('/appointments', bookAppointment);
router.put('/appointments/:id', updateAppointmentStatus);

module.exports = router;
