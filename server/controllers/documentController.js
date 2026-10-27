import mongoose from 'mongoose';
import Document from '../models/Document.js';
import Notification from '../models/Notification.js';
import Application from '../models/Application.js';

// @desc    Get all documents for an application
// @route   GET /api/documents/application/:appId
export const getDocumentsByApplication = async (req, res) => {
  try {
    const { appId } = req.params;
    let documents = await Document.find({ Application_ID: appId });

    if (documents.length === 0) {
      // Return default core document checklist
      documents = [
        { Document_ID: 'doc-id', Application_ID: appId, Document_Type: 'ID Proof', Verification_Status: 'Pending' },
        { Document_ID: 'doc-cert', Application_ID: appId, Document_Type: 'Academic Certificate', Verification_Status: 'Pending' },
        { Document_ID: 'doc-marksheet', Application_ID: appId, Document_Type: 'Mark Sheet', Verification_Status: 'Pending' },
        { Document_ID: 'doc-photo', Application_ID: appId, Document_Type: 'Photograph', Verification_Status: 'Pending' }
      ];
    }

    res.status(200).json({
      success: true,
      documents
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Upload / Update document metadata
// @route   POST /api/documents/upload
export const uploadDocumentMetadata = async (req, res) => {
  try {
    const { docId, applicationId, documentType, fileName, fileSize } = req.body;

    let document = await Document.findOne({
      Document_ID: docId,
      Application_ID: applicationId
    });

    if (!document) {
      document = new Document({
        Document_ID: docId || `DOC-${Date.now()}`,
        Application_ID: applicationId,
        Document_Type: documentType || 'Academic Certificate'
      });
    }

    document.File_Name = fileName || 'Uploaded_Document.pdf';
    document.File_Size = fileSize || '1.5 MB';
    document.Verification_Status = 'Uploaded';
    document.Uploaded_At = new Date();
    document.Remarks = 'Uploaded by applicant. Verification pending by admissions staff.';

    await document.save();

    res.status(200).json({
      success: true,
      message: `${document.Document_Type} uploaded successfully`,
      document
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Verify or Reject a document (Admin Action)
// @route   PUT /api/documents/:id/verify
export const verifyDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, remarks } = req.body;

    const query = mongoose.Types.ObjectId.isValid(id)
      ? { $or: [{ _id: id }, { Document_ID: id }] }
      : { Document_ID: id };

    let document = await Document.findOne(query);

    if (!document) {
      return res.status(404).json({
        success: false,
        message: `Document record not found for ID: ${id}`
      });
    }

    document.Verification_Status = status || 'Verified';
    if (remarks) document.Remarks = remarks;
    await document.save();

    // Look up associated application and notify student
    const application = await Application.findOne({ Application_ID: document.Application_ID });
    if (application) {
      const isApproved = status === 'Verified' || status === 'verified';
      await Notification.create({
        Notification_ID: `notif-${Date.now()}`,
        Student_ID: application.Student_ID,
        Title: isApproved ? 'Document Verification Update' : 'Document Discrepancy Alert',
        Message: isApproved 
          ? `Your ${document.Document_Type} has been verified and cleared by the Admissions Desk.` 
          : `Discrepancy noted in your ${document.Document_Type}: ${remarks || 'Please re-upload a clearer copy.'}`,
        Category: 'document',
        Status: 'Unread',
        ActionUrl: '/student/documents'
      });
    }

    res.status(200).json({
      success: true,
      message: `Document status updated to ${document.Verification_Status}`,
      document
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
