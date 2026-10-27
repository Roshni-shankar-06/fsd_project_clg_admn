import Application from '../models/Application.js';
import Notification from '../models/Notification.js';
import Document from '../models/Document.js';

// @desc    Get all applications (with search, status, department filters)
// @route   GET /api/admin/applications
export const getAllApplications = async (req, res) => {
  try {
    const { search, status, department } = req.query;
    const filter = {};

    if (status && status !== 'all') {
      filter.Status = status;
    }

    if (department && department !== 'all') {
      filter.Department = { $regex: department, $options: 'i' };
    }

    if (search) {
      filter.$or = [
        { FullName: { $regex: search, $options: 'i' } },
        { Email: { $regex: search, $options: 'i' } },
        { Application_ID: { $regex: search, $options: 'i' } },
        { Program: { $regex: search, $options: 'i' } }
      ];
    }

    const applications = await Application.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: applications.length,
      applications
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single application details by ID
// @route   GET /api/admin/applications/:id
export const getApplicationDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const application = await Application.findOne({
      $or: [
        { Application_ID: id },
        { Student_ID: id }
      ]
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application record not found'
      });
    }

    // Also fetch associated documents
    const documents = await Document.find({ Application_ID: application.Application_ID });

    res.status(200).json({
      success: true,
      application,
      documents
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update Application Status (Admin Action)
// @route   PUT /api/admin/applications/:id/status
export const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, remarks, note } = req.body;

    const validStatuses = ['Draft', 'Submitted', 'Under Review', 'Document Verified', 'Approved', 'Rejected'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Allowed values: ${validStatuses.join(', ')}`
      });
    }

    let application = await Application.findOne({
      $or: [
        { Application_ID: id },
        { Student_ID: id }
      ]
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found to update status'
      });
    }

    const timestamp = new Date().toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    application.Status = status;
    if (remarks) application.Remarks = remarks;
    if (status === 'Approved') {
      application.AdmissionOfferDate = new Date().toISOString().split('T')[0];
    }

    application.StatusHistory.push({
      status,
      date: timestamp,
      note: note || `Status transitioned to ${status} by Admissions Directorate.`
    });

    await application.save();

    // Notification for student
    let notifTitle = `Application Status: ${status}`;
    let notifMsg = `Your application status has been updated to "${status}".`;

    if (status === 'Under Review') {
      notifTitle = 'Application is Under Review';
      notifMsg = 'Your application is now under screening by the admissions committee.';
    } else if (status === 'Document Verified') {
      notifTitle = 'Document Verification Update: Cleared';
      notifMsg = 'All mandatory certificates and identity credentials have been verified by the Registrar.';
    } else if (status === 'Approved') {
      notifTitle = 'Admission Decision: Approved';
      notifMsg = '🎉 Congratulations! You have been granted Provisional Admission. View your official Offer Letter on the status page.';
    } else if (status === 'Rejected') {
      notifTitle = 'Admission Decision: Disqualified';
      notifMsg = 'Your application could not be approved due to credit prerequisites. Check status remarks for details.';
    }

    await Notification.create({
      Notification_ID: `notif-${Date.now()}`,
      Student_ID: application.Student_ID,
      Title: notifTitle,
      Message: notifMsg,
      Category: status === 'Approved' ? 'admission' : status === 'Rejected' ? 'alert' : 'document',
      Status: 'Unread',
      ActionUrl: '/student/status'
    });

    res.status(200).json({
      success: true,
      message: `Application status updated to ${status} successfully`,
      application
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get dashboard metrics & counts
// @route   GET /api/admin/metrics
export const getAdminMetrics = async (req, res) => {
  try {
    const total = await Application.countDocuments();
    const pending = await Application.countDocuments({ Status: 'Submitted' });
    const underReview = await Application.countDocuments({ Status: { $in: ['Under Review', 'Document Verified'] } });
    const approved = await Application.countDocuments({ Status: 'Approved' });
    const rejected = await Application.countDocuments({ Status: 'Rejected' });

    res.status(200).json({
      success: true,
      metrics: {
        total,
        pending,
        underReview,
        approved,
        rejected
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
