const express = require('express');
const router = express.Router();
const { getAdminDashboard, addDoctor, createDepartment, getDepartments } = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Secure all admin routes below this point
router.use(protect);

// Department fetching can be broad staff utility, creation is restricted
router.get('/departments', getDepartments);

// Direct Admin actions
router.get('/dashboard', authorize('Admin'), getAdminDashboard);
router.post('/doctors', authorize('Admin'), addDoctor);
router.post('/departments', authorize('Admin'), createDepartment);

module.exports = router;
