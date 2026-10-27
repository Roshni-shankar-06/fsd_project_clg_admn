import express from 'express';
import {
  getDocumentsByApplication,
  uploadDocumentMetadata,
  verifyDocument
} from '../controllers/documentController.js';

const router = express.Router();

router.get('/application/:appId', getDocumentsByApplication);
router.post('/upload', uploadDocumentMetadata);
router.put('/:id/verify', verifyDocument);

export default router;
