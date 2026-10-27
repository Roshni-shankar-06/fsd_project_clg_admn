import express from 'express';
import { loginAdmin } from '../controllers/authController.js';
import {
  getAllApplications,
  getApplicationDetails,
  updateApplicationStatus,
  getAdminMetrics
} from '../controllers/adminController.js';
import { protect, requireAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', loginAdmin);
router.get('/metrics', getAdminMetrics);
router.get('/applications', getAllApplications);
router.get('/applications/:id', getApplicationDetails);
router.put('/applications/:id/status', updateApplicationStatus);

export default router;
