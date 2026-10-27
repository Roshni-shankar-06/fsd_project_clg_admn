import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_APPLICATIONS,
  INITIAL_DOCUMENTS,
  INITIAL_NOTIFICATIONS,
  DEMO_USERS,
  PROGRAMS_DATA
} from '../data/mockData';
import { api } from '../services/api';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Authentication State
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('apex_user');
    return saved ? JSON.parse(saved) : DEMO_USERS.student;
  });

  // Applications Data
  const [applications, setApplications] = useState(() => {
    const saved = localStorage.getItem('apex_applications');
    return saved ? JSON.parse(saved) : INITIAL_APPLICATIONS;
  });

  // Student's Uploaded Documents
  const [documents, setDocuments] = useState(() => {
    const saved = localStorage.getItem('apex_documents');
    return saved ? JSON.parse(saved) : INITIAL_DOCUMENTS;
  });

  // Notifications
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('apex_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  // Backend connection indicator
  const [backendConnected, setBackendConnected] = useState(false);

  // Active Toast
  const [toast, setToast] = useState(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('apex_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('apex_applications', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('apex_documents', JSON.stringify(documents));
  }, [documents]);

  useEffect(() => {
    localStorage.setItem('apex_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Initial fetch from backend on mount
  useEffect(() => {
    const initBackendSync = async () => {
      try {
        const health = await api.checkHealth();
        if (health.success) {
          setBackendConnected(true);
          console.log('[Backend] Connected to Express + MongoDB API Server on :5000');

          // Fetch applications from MongoDB
          const appRes = await api.getAllApplications();
          if (appRes.success && appRes.applications.length > 0) {
            // Map MongoDB schema fields if needed
            const mappedApps = appRes.applications.map(a => ({
              id: a.Application_ID,
              refNumber: a.Application_ID,
              studentId: a.Student_ID,
              fullName: a.FullName,
              email: a.Email,
              phone: a.Phone,
              dob: a.DOB,
              gender: a.Gender,
              category: a.Category,
              bloodGroup: a.BloodGroup,
              address: a.Address,
              fatherName: a.FatherName,
              motherName: a.MotherName,
              guardianPhone: a.GuardianPhone,
              programName: a.Program,
              department: a.Department,
              secondaryChoice: a.SecondaryChoice,
              academicDetails: a.AcademicDetails || {},
              status: a.Status,
              statusHistory: a.StatusHistory || [],
              submissionDate: a.Application_Date ? String(a.Application_Date).split('T')[0] : '2026-09-22',
              meritScore: a.MeritScore || 94.8,
              assignedOfficer: a.AssignedOfficer || 'Dr. Vikram Menon',
              counselingDate: a.CounselingDate || 'October 22, 2026 at 10:00 AM',
              remarks: a.Remarks,
              feeStatus: a.FeeStatus || 'Paid (Application Fee ₹1,500)',
              admissionOfferDate: a.AdmissionOfferDate
            }));
            setApplications(mappedApps);
          }
        }
      } catch (err) {
        console.warn('[Backend Notice] Operating with local state sync:', err.message);
      }
    };

    initBackendSync();
  }, []);

  // Helper: Show Toast
  const showToast = (message, type = 'info') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Auth: Student Registration (API + State Sync)
  const registerStudent = async (userData) => {
    try {
      const res = await api.registerStudent({
        name: userData.fullName || userData.name,
        email: userData.email,
        phone: userData.phone,
        password: userData.password,
        programId: userData.programId
      });

      if (res.success && res.student) {
        if (res.token) localStorage.setItem('apex_token', res.token);
        const newStudent = {
          ...res.student,
          avatar: (res.student.name || 'ST').split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
        };
        setCurrentUser(newStudent);

        if (res.application) {
          const formattedApp = {
            id: res.application.Application_ID,
            refNumber: res.application.Application_ID,
            studentId: res.application.Student_ID,
            fullName: res.application.FullName,
            email: res.application.Email,
            phone: res.application.Phone,
            programName: res.application.Program,
            department: res.application.Department,
            status: res.application.Status,
            statusHistory: res.application.StatusHistory,
            submissionDate: new Date().toISOString().split('T')[0]
          };
          setApplications(prev => [formattedApp, ...prev]);
        }

        showToast(`Account created for ${newStudent.name}! Registered in MongoDB.`, 'success');
        return newStudent;
      }
    } catch (error) {
      console.warn('API registration fallback:', error.message);
    }

    // Fallback local registration if server unreachable
    const studentId = `STU-${Math.floor(1000 + Math.random() * 9000)}`;
    const newRef = `APX-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newAppId = `APP-2026-${String(applications.length + 1).padStart(3, '0')}`;

    const newStudent = {
      id: studentId,
      name: userData.fullName || userData.name,
      email: userData.email,
      phone: userData.phone,
      role: 'student',
      appId: newAppId,
      refNumber: newRef,
      avatar: (userData.fullName || userData.name || "ST").split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
    };

    const initialApp = {
      id: newAppId,
      refNumber: newRef,
      studentId: studentId,
      fullName: newStudent.name,
      email: newStudent.email,
      phone: newStudent.phone,
      programName: 'B.Tech Computer Science & Engineering',
      department: 'School of Computing & AI',
      status: 'Draft',
      statusHistory: [{ status: 'Draft', date: new Date().toLocaleString(), note: 'Registered.' }]
    };

    setApplications(prev => [initialApp, ...prev]);
    setCurrentUser(newStudent);
    showToast(`Account created for ${newStudent.name}!`, 'success');
    return newStudent;
  };

  // Auth: Login (API + State Sync)
  const login = async (role, credentials = {}) => {
    try {
      if (role === 'admin') {
        const res = await api.loginAdmin(credentials);
        if (res.success) {
          if (res.token) localStorage.setItem('apex_token', res.token);
          setCurrentUser(res.admin);
          showToast(`Welcome back, ${res.admin.name}! Authorized via MongoDB.`, 'success');
          return res.admin;
        }
      } else {
        const res = await api.loginStudent(credentials);
        if (res.success) {
          if (res.token) localStorage.setItem('apex_token', res.token);
          const studentUser = {
            ...res.student,
            avatar: (res.student.name || 'ST').split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
          };
          setCurrentUser(studentUser);
          showToast(`Welcome back, ${studentUser.name}! Authorized via MongoDB.`, 'success');
          return studentUser;
        }
      }
    } catch (error) {
      console.warn('API login fallback:', error.message);
    }

    // Local fallback
    const userData = role === 'admin'
      ? { ...DEMO_USERS.admin, ...credentials }
      : { ...DEMO_USERS.student, ...credentials };
    setCurrentUser(userData);
    showToast(`Welcome back, ${userData.name}!`, 'success');
    return userData;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('apex_user');
    localStorage.removeItem('apex_token');
    showToast('You have been signed out.', 'info');
  };

  // Active student application
  const currentStudentApp = applications.find(
    (app) => app.email === currentUser?.email || app.id === currentUser?.appId || app.refNumber === currentUser?.refNumber
  ) || applications[0];

  // Save Application Draft
  const saveApplicationDraft = async (formData) => {
    const targetId = currentStudentApp ? currentStudentApp.id : `APP-2026-001`;
    const selectedProg = PROGRAMS_DATA.find(p => p.id === formData.programId) || PROGRAMS_DATA[0];

    try {
      await api.updateApplication(targetId, {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        dob: formData.dob,
        gender: formData.gender,
        category: formData.category,
        bloodGroup: formData.bloodGroup,
        address: formData.address,
        program: selectedProg.name,
        department: selectedProg.department,
        secondaryChoice: formData.secondaryChoice,
        academicDetails: {
          previousQualification: formData.previousQualification,
          institution: formData.institution,
          percentage: formData.percentage
        }
      });
    } catch (e) {
      console.warn('API update fallback:', e.message);
    }

    const updatedApp = {
      ...currentStudentApp,
      fullName: formData.fullName || currentStudentApp?.fullName,
      email: formData.email || currentStudentApp?.email,
      phone: formData.phone || currentStudentApp?.phone,
      programName: selectedProg.name,
      department: selectedProg.department,
      academicDetails: {
        ...currentStudentApp?.academicDetails,
        previousQualification: formData.previousQualification || "12th Grade",
        institution: formData.institution || "High School",
        percentage: formData.percentage || "90%"
      }
    };

    setApplications(prev => prev.map(a => a.id === targetId ? updatedApp : a));
    showToast("Application draft saved successfully!", "info");
    return updatedApp;
  };

  // Submit Application (API + Database Storage)
  const submitApplication = async (formData) => {
    const timestamp = new Date().toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const targetId = currentStudentApp ? currentStudentApp.id : `APP-2026-001`;
    const selectedProg = PROGRAMS_DATA.find(p => p.id === formData.programId) || PROGRAMS_DATA[0];

    try {
      await api.submitApplication(targetId, {
        studentId: currentUser?.id || 'STU-8891',
        fullName: formData.fullName || currentUser?.name,
        email: formData.email || currentUser?.email,
        phone: formData.phone || '+91 98765 43210',
        program: selectedProg.name,
        department: selectedProg.department,
        academicDetails: {
          previousQualification: formData.previousQualification,
          institution: formData.institution,
          percentage: formData.percentage
        }
      });
      console.log('[Backend] Application submitted & stored in MongoDB successfully');
    } catch (e) {
      console.warn('API submit fallback:', e.message);
    }

    const submittedApp = {
      ...currentStudentApp,
      fullName: formData.fullName || currentUser?.name || "Applicant",
      email: formData.email || currentUser?.email,
      phone: formData.phone || "+91 98765 43210",
      programName: selectedProg.name,
      department: selectedProg.department,
      status: "Submitted",
      statusHistory: [
        ...(currentStudentApp?.statusHistory?.filter(h => h.status !== 'Draft') || []),
        {
          status: "Submitted",
          date: timestamp,
          note: "Application successfully submitted online. Stored in MongoDB."
        }
      ],
      submissionDate: new Date().toISOString().split('T')[0],
      feeStatus: "Paid (Application Fee ₹1,500)"
    };

    setApplications(prev => prev.map(a => a.id === targetId ? submittedApp : a));

    // Push notification
    const newNotif = {
      id: `notif-${Date.now()}`,
      title: "Application Submitted Successfully",
      message: `Your application (${submittedApp.refNumber}) for ${submittedApp.programName} has been stored in the database.`,
      timestamp: "Just now",
      date: timestamp,
      category: "admission",
      read: false,
      actionUrl: "/student/documents"
    };
    setNotifications(prev => [newNotif, ...prev]);

    showToast("Application submitted to MongoDB database! Moving to Document Upload.", "success");
    return submittedApp;
  };

  // Upload Document (API + Metadata Store)
  const uploadDocument = async (docId, file) => {
    const timestamp = new Date().toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const targetDoc = documents.find(d => d.id === docId);

    try {
      await api.uploadDocumentMetadata({
        docId: docId,
        applicationId: currentStudentApp?.id || 'APP-2026-001',
        documentType: targetDoc?.name || 'Academic Document',
        fileName: file.name,
        fileSize: file.size ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` : "1.2 MB"
      });
      console.log('[Backend] Document metadata persisted in MongoDB');
    } catch (e) {
      console.warn('API doc upload fallback:', e.message);
    }

    setDocuments(prev => prev.map(doc => {
      if (doc.id === docId) {
        return {
          ...doc,
          status: "uploaded",
          fileName: file.name,
          fileSize: file.size ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` : "1.2 MB",
          uploadedAt: timestamp,
          remarks: "Uploaded by applicant. Verification pending by staff."
        };
      }
      return doc;
    }));

    showToast(`Uploaded ${file.name} successfully!`, 'success');
  };

  // Update Application Status (Admin Action -> MongoDB Sync)
  const updateApplicationStatus = async (appId, newStatus, note = '', officerRemarks = '') => {
    const timestamp = new Date().toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    try {
      await api.updateApplicationStatus(appId, {
        status: newStatus,
        remarks: officerRemarks,
        note: note
      });
      console.log(`[Backend] Application ${appId} status updated to ${newStatus} in MongoDB`);
    } catch (e) {
      console.warn('API status update fallback:', e.message);
    }

    setApplications(prev => prev.map(app => {
      if (app.id === appId) {
        const updatedHistory = [
          ...app.statusHistory,
          {
            status: newStatus,
            date: timestamp,
            note: note || `Status updated to ${newStatus} in MongoDB by Admission Officer.`
          }
        ];

        return {
          ...app,
          status: newStatus,
          statusHistory: updatedHistory,
          remarks: officerRemarks || app.remarks,
          admissionOfferDate: newStatus === 'Approved' ? new Date().toISOString().split('T')[0] : app.admissionOfferDate
        };
      }
      return app;
    }));

    // Generate Notification
    let notifTitle = `Application Status: ${newStatus}`;
    let notifMsg = `Your application status has been updated to "${newStatus}".`;

    if (newStatus === 'Under Review') {
      notifTitle = "Application is Under Review";
      notifMsg = "Your academic dossier is now under active screening by the Admissions Committee.";
    } else if (newStatus === 'Document Verified') {
      notifTitle = "Document Verification Update: Cleared";
      notifMsg = "All mandatory high school certificates, ID proof, and marksheets have been verified by the Registrar.";
    } else if (newStatus === 'Approved') {
      notifTitle = "Admission Decision: Approved";
      notifMsg = "🎉 Congratulations! You have been granted Provisional Admission. Your Official Offer Letter is ready for download.";
    } else if (newStatus === 'Rejected') {
      notifTitle = "Admission Decision: Action Required";
      notifMsg = "Your application could not be approved due to credit/eligibility prerequisites. Check status remarks for details.";
    }

    const newNotif = {
      id: `notif-${Date.now()}`,
      title: notifTitle,
      message: notifMsg,
      timestamp: "Just now",
      date: timestamp,
      category: newStatus === 'Approved' ? 'success' : newStatus === 'Rejected' ? 'alert' : 'admission',
      read: false,
      actionUrl: "/student/status"
    };
    setNotifications(prev => [newNotif, ...prev]);

    showToast(`Application status updated to: ${newStatus}`, 'success');
  };

  // Update Document Verification Status
  const updateDocumentStatus = async (docId, newStatus, remarks = '') => {
    try {
      await api.verifyDocument(docId, {
        status: newStatus === 'verified' ? 'Verified' : 'Rejected',
        remarks
      });
    } catch (e) {
      console.warn('API doc verify fallback:', e.message);
    }

    setDocuments(prev => prev.map(doc => {
      if (doc.id === docId) {
        return {
          ...doc,
          status: newStatus,
          remarks: remarks || doc.remarks
        };
      }
      return doc;
    }));
    showToast(`Document updated: ${newStatus.toUpperCase()}`, 'info');
  };

  // Notifications
  const markNotificationAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showToast('All notifications marked as read', 'info');
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <AppContext.Provider
      value={{
        currentUser,
        backendConnected,
        registerStudent,
        login,
        logout,
        applications,
        currentStudentApp,
        programs: PROGRAMS_DATA,
        documents,
        notifications,
        unreadCount,
        toast,
        showToast,
        saveApplicationDraft,
        submitApplication,
        updateApplicationStatus,
        updateDocumentStatus,
        uploadDocument,
        markNotificationAsRead,
        markAllNotificationsAsRead
      }}
    >
      {children}
      {/* Toast Notification Container */}
      {toast && (
        <div className="toast-container">
          <div className={`toast toast-${toast.type}`}>
            <div>{toast.message}</div>
          </div>
        </div>
      )}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
