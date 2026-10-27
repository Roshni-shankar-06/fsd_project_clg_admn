import Application from '../models/Application.js';
import Notification from '../models/Notification.js';

// @desc    Create new application or Save Draft
// @route   POST /api/applications
export const createApplication = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      studentId,
      program,
      department,
      secondaryChoice,
      academicDetails,
      address,
      dob,
      gender,
      category,
      bloodGroup,
      status
    } = req.body;

    const newAppId = `APP-2026-${Math.floor(100 + Math.random() * 900)}`;

    const application = await Application.create({
      Application_ID: newAppId,
      Student_ID: studentId || `STU-${Math.floor(1000 + Math.random() * 9000)}`,
      FullName: fullName,
      Email: email?.toLowerCase(),
      Phone: phone,
      DOB: dob || '2007-01-01',
      Gender: gender || 'Not Specified',
      Category: category || 'General',
      BloodGroup: bloodGroup || 'O+',
      Address: address || '',
      Program: program || 'B.Tech Computer Science & Engineering',
      Department: department || 'School of Computing & AI',
      SecondaryChoice: secondaryChoice || '',
      AcademicDetails: academicDetails || {},
      Status: status || 'Draft',
      StatusHistory: [
        {
          status: status || 'Draft',
          date: new Date().toLocaleString(),
          note: status === 'Submitted' ? 'Application submitted online.' : 'Application draft saved.'
        }
      ]
    });

    res.status(201).json({
      success: true,
      message: 'Application created successfully',
      application
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get application by Application_ID or MongoDB _id
// @route   GET /api/applications/:id
export const getApplicationById = async (req, res) => {
  try {
    const { id } = req.params;

    const application = await Application.findOne({
      $or: [
        { Application_ID: id },
        { Student_ID: id },
        { Email: id.toLowerCase() }
      ]
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: `Application record not found for ID: ${id}`
      });
    }

    res.status(200).json({
      success: true,
      application
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get application by Student ID
// @route   GET /api/applications/student/:studentId
export const getApplicationByStudent = async (req, res) => {
  try {
    const { studentId } = req.params;

    const application = await Application.findOne({
      $or: [
        { Student_ID: studentId },
        { Email: studentId.toLowerCase() }
      ]
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'No application associated with this student'
      });
    }

    res.status(200).json({
      success: true,
      application
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update Application details / Draft
// @route   PUT /api/applications/:id
export const updateApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    let application = await Application.findOne({
      $or: [
        { Application_ID: id },
        { Student_ID: id },
        { Email: id.toLowerCase() }
      ]
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found to update'
      });
    }

    // Merge updates
    if (updates.fullName) application.FullName = updates.fullName;
    if (updates.phone) application.Phone = updates.phone;
    if (updates.dob) application.DOB = updates.dob;
    if (updates.gender) application.Gender = updates.gender;
    if (updates.category) application.Category = updates.category;
    if (updates.bloodGroup) application.BloodGroup = updates.bloodGroup;
    if (updates.address) application.Address = updates.address;
    if (updates.fatherName) application.FatherName = updates.fatherName;
    if (updates.motherName) application.MotherName = updates.motherName;
    if (updates.guardianPhone) application.GuardianPhone = updates.guardianPhone;
    if (updates.program) application.Program = updates.program;
    if (updates.department) application.Department = updates.department;
    if (updates.secondaryChoice) application.SecondaryChoice = updates.secondaryChoice;
    if (updates.academicDetails) {
      application.AcademicDetails = { ...application.AcademicDetails, ...updates.academicDetails };
    }

    await application.save();

    res.status(200).json({
      success: true,
      message: 'Application updated successfully',
      application
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Submit Application (Changes Status to 'Submitted')
// @route   POST /api/applications/:id/submit
export const submitApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const bodyData = req.body || {};

    let application = await Application.findOne({
      $or: [
        { Application_ID: id },
        { Student_ID: id },
        { Email: id.toLowerCase() }
      ]
    });

    if (!application) {
      // Create fresh if not exists
      const newAppId = `APP-2026-${Math.floor(100 + Math.random() * 900)}`;
      application = new Application({
        Application_ID: newAppId,
        Student_ID: bodyData.studentId || 'STU-8891',
        FullName: bodyData.fullName || 'Applicant',
        Email: bodyData.email || 'applicant@example.com',
        Phone: bodyData.phone || '+91 98765 43210',
        Program: bodyData.program || 'B.Tech Computer Science & Engineering',
        Department: bodyData.department || 'School of Computing & AI'
      });
    }

    // Apply any final payload updates
    if (bodyData.fullName) application.FullName = bodyData.fullName;
    if (bodyData.program) application.Program = bodyData.program;
    if (bodyData.academicDetails) application.AcademicDetails = bodyData.academicDetails;

    const timestamp = new Date().toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    application.Status = 'Submitted';
    application.FeeStatus = 'Paid (Application Fee ₹1,500)';
    application.StatusHistory.push({
      status: 'Submitted',
      date: timestamp,
      note: 'Application form submitted online by candidate. Ingested into active scrutiny queue.'
    });

    await application.save();

    // Generate Notification
    await Notification.create({
      Notification_ID: `notif-${Date.now()}`,
      Student_ID: application.Student_ID,
      Title: 'Application Submitted Successfully',
      Message: `Your admission dossier for ${application.Program} (${application.Application_ID}) has been submitted successfully.`,
      Category: 'admission',
      Status: 'Unread',
      ActionUrl: '/student/documents'
    });

    res.status(200).json({
      success: true,
      message: 'Application submitted successfully! Status changed to Submitted.',
      application
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
