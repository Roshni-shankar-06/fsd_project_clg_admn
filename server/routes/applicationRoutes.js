import express from 'express';
import {
  createApplication,
  getApplicationById,
  getApplicationByStudent,
  updateApplication,
  submitApplication
} from '../controllers/applicationController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', createApplication);
router.get('/student/:studentId', getApplicationByStudent);
router.get('/:id', getApplicationById);
router.put('/:id', updateApplication);
router.post('/:id/submit', submitApplication);

export default router;
