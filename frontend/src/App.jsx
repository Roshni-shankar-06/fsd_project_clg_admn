import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import StudentLayout from './layouts/StudentLayout';
import AdminLayout from './layouts/AdminLayout';

// Pages
import HomePage from './pages/HomePage';
import StudentLoginPage from './pages/StudentLoginPage';
import StudentRegisterPage from './pages/StudentRegisterPage';
import AdminLoginPage from './pages/AdminLoginPage';

// Student Pages
import StudentDashboardPage from './pages/StudentDashboardPage';
import ApplicationFormPage from './pages/ApplicationFormPage';
import DocumentUploadPage from './pages/DocumentUploadPage';
import ApplicationStatusPage from './pages/ApplicationStatusPage';
import NotificationsPage from './pages/NotificationsPage';

// Admin Pages
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminApplicationsPage from './pages/AdminApplicationsPage';
import ApplicationReviewPage from './pages/ApplicationReviewPage';

import './index.css';
import './App.css';

import DatabaseViewerPage from './pages/DatabaseViewerPage';

export default function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          {/* Public Pages & Database Explorer */}
          <Route path="/db-viewer" element={<DatabaseViewerPage />} />
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/student/login" element={<StudentLoginPage />} />
            <Route path="/student/register" element={<StudentRegisterPage />} />
            <Route path="/admin/login" element={<AdminLoginPage />} />
          </Route>

          {/* Student Portal Protected Layout */}
          <Route path="/student" element={<StudentLayout />}>
            <Route index element={<Navigate to="/student/dashboard" replace />} />
            <Route path="dashboard" element={<StudentDashboardPage />} />
            <Route path="application" element={<ApplicationFormPage />} />
            <Route path="documents" element={<DocumentUploadPage />} />
            <Route path="status" element={<ApplicationStatusPage />} />
            <Route path="notifications" element={<NotificationsPage />} />
          </Route>

          {/* Admin Portal Layout */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboardPage />} />
            <Route path="applications" element={<AdminApplicationsPage />} />
            <Route path="review/:id" element={<ApplicationReviewPage />} />
          </Route>

          {/* Catch-all fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}
