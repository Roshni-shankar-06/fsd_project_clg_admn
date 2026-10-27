import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import StatusStepper from '../components/StatusStepper';
import OfferLetterModal from '../components/OfferLetterModal';
import { 
  FileText, 
  UploadCloud, 
  Activity, 
  Bell, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ArrowRight, 
  Award, 
  Calendar, 
  Mail, 
  Phone, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  BookOpen,
  FileCheck2,
  Sliders
} from 'lucide-react';

export default function StudentDashboardPage() {
  const { 
    currentUser, 
    currentStudentApp, 
    documents, 
    notifications, 
    unreadCount,
    updateApplicationStatus,
    showToast
  } = useApp();

  const [showOfferModal, setShowOfferModal] = useState(false);

  const app = currentStudentApp || {
    id: "APP-2026-001",
    refNumber: "APX-2026-8891",
    fullName: currentUser?.name || "Aarav Sharma",
    programName: "B.Tech Computer Science & Engineering",
    department: "School of Computing & AI",
    status: "Under Review",
    submissionDate: "2026-09-22",
    meritScore: 94.8,
    assignedOfficer: "Dr. Vikram Menon",
    counselorContact: "v.menon@apex.edu",
    counselingDate: "October 22, 2026 at 10:00 AM",
    statusHistory: [
      { status: "Submitted", date: "2026-09-22 11:35 AM", note: "Application form submitted online." },
      { status: "Under Review", date: "2026-09-23 02:10 PM", note: "Assigned to desk officer for scrutiny." }
    ]
  };

  // Required core documents for display
  const coreDocs = documents.filter(d => ['doc-id', 'doc-cert', 'doc-marksheet', 'doc-photo'].includes(d.id));
  const verifiedCount = documents.filter(d => d.status === 'verified').length;
  const totalRequired = documents.filter(d => d.required).length;

  const isApproved = app.status === 'Approved';
  const isRejected = app.status === 'Rejected';
  const isDraft = app.status === 'Draft';

  // Demo status simulation helper
  const handleFastSimulateStatus = (statusName) => {
    updateApplicationStatus(app.id, statusName, `Demonstration: Fast transitioned to ${statusName}.`);
  };

  return (
    <div>
      {/* Welcome Banner */}
      <div className="card" style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)',
        color: '#ffffff',
        padding: '2rem',
        marginBottom: '2rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="flex items-center justify-between flex-wrap gap-4" style={{ position: 'relative', zIndex: 2 }}>
          <div className="flex items-center gap-4">
            <div className="user-avatar" style={{ width: '58px', height: '58px', fontSize: '1.4rem' }}>
              {currentUser?.avatar || "ST"}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 style={{ fontSize: '1.65rem', color: '#ffffff', fontWeight: 800 }}>
                  Welcome, {app.fullName || currentUser?.name}!
                </h1>
                <span className="live-pulse"></span>
              </div>
              <div style={{ color: '#93c5fd', fontSize: '0.875rem', marginTop: '0.2rem' }}>
                Application Ref: <strong>{app.refNumber}</strong> • Program: <strong>{app.programName}</strong>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isApproved ? (
              <button 
                onClick={() => setShowOfferModal(true)} 
                className="btn btn-accent btn-sm"
              >
                <Award size={16} />
                <span>View Provisional Offer Letter</span>
              </button>
            ) : isDraft ? (
              <Link to="/student/application" className="btn btn-primary btn-sm" style={{ background: '#f59e0b', borderColor: '#f59e0b', color: '#fff' }}>
                <FileText size={15} />
                <span>Complete Application Form</span>
              </Link>
            ) : (
              <Link to="/student/status" className="btn btn-primary btn-sm" style={{ background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.3)' }}>
                <span>Track Application Lifecycle</span>
                <ArrowRight size={15} />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Interactive Simulation Helper Toolbar */}
      <div style={{
        background: '#ffffff',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-md)',
        padding: '0.75rem 1.25rem',
        marginBottom: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.75rem'
      }}>
        <div className="flex items-center gap-2" style={{ fontSize: '0.825rem', fontWeight: 700, color: 'var(--text-main)' }}>
          <Sliders size={16} color="var(--primary-600)" />
          <span>Demo Stage Switcher:</span>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button 
            onClick={() => handleFastSimulateStatus('Submitted')}
            className={`btn btn-sm ${app.status === 'Submitted' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem' }}
          >
            1. Submitted
          </button>
          <button 
            onClick={() => handleFastSimulateStatus('Under Review')}
            className={`btn btn-sm ${app.status === 'Under Review' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem' }}
          >
            2. Under Review
          </button>
          <button 
            onClick={() => handleFastSimulateStatus('Document Verified')}
            className={`btn btn-sm ${app.status === 'Document Verified' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem' }}
          >
            3. Document Verified
          </button>
          <button 
            onClick={() => handleFastSimulateStatus('Approved')}
            className={`btn btn-sm ${app.status === 'Approved' ? 'btn-success' : 'btn-secondary'}`}
            style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem' }}
          >
            4. Approved
          </button>
        </div>
      </div>

      {/* Application Status & Progress Card */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <div className="card-header">
          <div className="card-title">
            <Activity size={20} color="var(--primary-600)" />
            <span>Application Status & Lifecycle Tracker</span>
          </div>
          <span className={`status-pill status-${app.status === 'Approved' ? 'approved' : app.status === 'Rejected' ? 'rejected' : app.status === 'Document Verified' ? 'verified' : app.status === 'Draft' ? 'review' : 'submitted'}`}>
            {app.status}
          </span>
        </div>

        {/* 4-Step Stepper */}
        <StatusStepper currentStatus={app.status} statusHistory={app.statusHistory} />

        <div style={{
          background: 'var(--bg-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '1rem 1.25rem',
          marginTop: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-main)' }}>
              Current Milestone: {app.status === 'Approved' ? '🎉 Congratulations! Provisional Admission Granted' : app.status === 'Draft' ? 'Application in Draft - Please Complete & Submit' : `Application Status: ${app.status}`}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              {app.remarks || "Your application is active in the University Central Admissions queue."}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isApproved ? (
              <button onClick={() => setShowOfferModal(true)} className="btn btn-success btn-sm">
                <Award size={16} />
                <span>Download Offer Letter</span>
              </button>
            ) : (
              <Link to="/student/status" className="btn btn-secondary btn-sm">
                <span>View Audit Milestones</span>
                <ChevronRight size={15} />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Required Documents Section & Recent Notifications in 2 Columns */}
      <div className="grid grid-cols-2 gap-6" style={{ marginBottom: '2rem' }}>
        {/* Required Documents Checklist */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <UploadCloud size={20} color="var(--primary-600)" />
              <span>Required Documents Status</span>
            </div>
            <Link to="/student/documents" className="btn btn-secondary btn-sm">
              Manage Uploads
            </Link>
          </div>

          <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            Verification status of your primary identification and high school transcripts:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {coreDocs.map((doc) => {
              const isVer = doc.status === 'verified';
              const isUp = doc.status === 'uploaded';

              return (
                <div key={doc.id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 0.95rem',
                  background: 'var(--bg-subtle)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.85rem'
                }}>
                  <div className="flex items-center gap-2">
                    <FileCheck2 size={16} color={isVer ? "var(--success)" : "var(--primary-600)"} />
                    <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{doc.name}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`status-pill status-${isVer ? 'approved' : isUp ? 'submitted' : 'review'}`} style={{ fontSize: '0.72rem', padding: '0.2rem 0.55rem' }}>
                      {doc.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Verified: <strong>{verifiedCount} of {totalRequired} mandatory</strong></span>
            <Link to="/student/documents" style={{ color: 'var(--primary-600)', fontWeight: 700 }}>
              Upload New Certificate →
            </Link>
          </div>
        </div>

        {/* Recent Notifications Stream */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <Bell size={20} color="var(--primary-600)" />
              <span>Recent Admission Notifications</span>
            </div>
            <Link to="/student/notifications" className="btn btn-secondary btn-sm">
              View All ({notifications.length})
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {notifications.slice(0, 3).map((notif) => (
              <div key={notif.id} style={{
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                background: !notif.read ? 'var(--primary-50)' : 'var(--bg-subtle)',
                border: !notif.read ? '1px solid var(--primary-100)' : '1px solid var(--border-subtle)'
              }}>
                <div className="flex items-center justify-between">
                  <span style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--text-main)' }}>
                    {notif.title}
                  </span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    {notif.timestamp}
                  </span>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem', lineHeight: '1.4' }}>
                  {notif.message}
                </p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '1rem', textAlign: 'center' }}>
            <Link to="/student/notifications" style={{ fontSize: '0.825rem', color: 'var(--primary-600)', fontWeight: 700 }}>
              Check All Notification Announcements →
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Navigation Cards Grid */}
      <div className="grid grid-cols-4 gap-4">
        <Link to="/student/application" className="quick-action-card">
          <div className="flex items-center justify-between">
            <div className="quick-action-icon" style={{ background: 'var(--primary-100)', color: 'var(--primary-700)' }}>
              <FileText size={22} />
            </div>
            <span className="badge badge-primary">{app.status === 'Draft' ? 'Edit Draft' : 'Completed'}</span>
          </div>
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.25rem' }}>Application Form</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Review and edit personal, academic & branch details.</p>
          </div>
          <div className="flex items-center gap-1" style={{ color: 'var(--primary-600)', fontSize: '0.825rem', fontWeight: 700, marginTop: 'auto' }}>
            <span>Open Application</span>
            <ArrowRight size={14} />
          </div>
        </Link>

        <Link to="/student/documents" className="quick-action-card">
          <div className="flex items-center justify-between">
            <div className="quick-action-icon" style={{ background: 'var(--success-bg)', color: 'var(--success-dark)' }}>
              <UploadCloud size={22} />
            </div>
            <span className="badge" style={{ background: '#dcfce7', color: '#15803d' }}>{verifiedCount}/{totalRequired} Verified</span>
          </div>
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.25rem' }}>Upload Documents</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Upload ID proof, mark sheets, and photographs.</p>
          </div>
          <div className="flex items-center gap-1" style={{ color: 'var(--success-dark)', fontSize: '0.825rem', fontWeight: 700, marginTop: 'auto' }}>
            <span>Upload Certificates</span>
            <ArrowRight size={14} />
          </div>
        </Link>

        <Link to="/student/status" className="quick-action-card">
          <div className="flex items-center justify-between">
            <div className="quick-action-icon" style={{ background: 'var(--info-bg)', color: 'var(--info-dark)' }}>
              <Activity size={22} />
            </div>
            <span className="badge" style={{ background: '#e0f2fe', color: '#0369a1' }}>Live</span>
          </div>
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.25rem' }}>Application Status</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Track chronological review timestamps and admission offer.</p>
          </div>
          <div className="flex items-center gap-1" style={{ color: 'var(--info-dark)', fontSize: '0.825rem', fontWeight: 700, marginTop: 'auto' }}>
            <span>Track Progress</span>
            <ArrowRight size={14} />
          </div>
        </Link>

        <Link to="/student/notifications" className="quick-action-card">
          <div className="flex items-center justify-between">
            <div className="quick-action-icon" style={{ background: 'var(--warning-bg)', color: 'var(--warning-dark)' }}>
              <Bell size={22} />
            </div>
            {unreadCount > 0 ? (
              <span className="badge badge-danger">{unreadCount} New</span>
            ) : (
              <span className="badge badge-primary">All Read</span>
            )}
          </div>
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.25rem' }}>Notifications</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Real-time updates regarding scrutiny and merit lists.</p>
          </div>
          <div className="flex items-center gap-1" style={{ color: 'var(--warning-dark)', fontSize: '0.825rem', fontWeight: 700, marginTop: 'auto' }}>
            <span>View Alerts</span>
            <ArrowRight size={14} />
          </div>
        </Link>
      </div>

      {/* Offer Letter Modal if Approved */}
      {showOfferModal && (
        <OfferLetterModal application={app} onClose={() => setShowOfferModal(false)} />
      )}
    </div>
  );
}
