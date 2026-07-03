const express = require('express');
const router = express.Router();
const { addMedicineStock, createLabReport, generateInvoice } = require('../controllers/ancillaryController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Secure endpoints globally to authenticated workforce personnel
router.use(protect);

// Specific module RBAC gateways
router.post('/pharmacy', authorize('Admin', 'Receptionist'), addMedicineStock);
router.post('/laboratory', authorize('Admin', 'Doctor'), createLabReport);
router.post('/billing', authorize('Admin', 'Receptionist'), generateInvoice);

module.exports = router;
