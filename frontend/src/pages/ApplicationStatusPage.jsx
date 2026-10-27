import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import StatusStepper from '../components/StatusStepper';
import OfferLetterModal from '../components/OfferLetterModal';
import { 
  Activity, 
  CheckCircle2, 
  Clock, 
  Award, 
  AlertCircle, 
  Printer, 
  Calendar, 
  CreditCard, 
  FileText, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Download,
  Sliders,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function ApplicationStatusPage() {
  const { currentStudentApp, currentUser, updateApplicationStatus } = useApp();
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
      { status: "Submitted", date: "2026-09-22 11:35 AM", note: "Application form submitted online by applicant." },
      { status: "Under Review", date: "2026-09-23 02:10 PM", note: "Application assigned to Senior Admission Counselor Dr. V. Menon." },
      { status: "Document Verified", date: "2026-09-24 04:30 PM", note: "All academic marksheets and entrance credentials verified." }
    ]
  };

  const isApproved = app.status === 'Approved';
  const isRejected = app.status === 'Rejected';

  const handleSimulateStatus = (statusName) => {
    updateApplicationStatus(app.id, statusName, `Simulated transition to ${statusName} status.`);
  };

  return (
    <div>
      {/* Page Header */}
      <div className="flex items-center justify-between flex-wrap gap-4" style={{ marginBottom: '1.5rem' }}>
        <div>
          <div className="flex items-center gap-2">
            <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--primary-dark)' }}>
              Application Lifecycle & Status Tracker
            </h1>
            <span className={`status-pill status-${isApproved ? 'approved' : isRejected ? 'rejected' : app.status === 'Document Verified' ? 'verified' : app.status === 'Draft' ? 'review' : 'submitted'}`}>
              {app.status}
            </span>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.2rem' }}>
            Live status for Application ID: <strong>{app.id}</strong> (Reference: <strong>{app.refNumber}</strong>)
          </p>
        </div>

        <div className="flex items-center gap-3">
          {isApproved && (
            <button 
              onClick={() => setShowOfferModal(true)} 
              className="btn btn-success"
            >
              <Award size={18} />
              <span>Download Provisional Offer Letter</span>
            </button>
          )}
        </div>
      </div>

      {/* Demo State Progression Switcher */}
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
          <span>Interactive Status Simulator:</span>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button 
            onClick={() => handleSimulateStatus('Submitted')}
            className={`btn btn-sm ${app.status === 'Submitted' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem' }}
          >
            1. Submitted
          </button>
          <button 
            onClick={() => handleSimulateStatus('Under Review')}
            className={`btn btn-sm ${app.status === 'Under Review' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem' }}
          >
            2. Under Review
          </button>
          <button 
            onClick={() => handleSimulateStatus('Document Verified')}
            className={`btn btn-sm ${app.status === 'Document Verified' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem' }}
          >
            3. Document Verified
          </button>
          <button 
            onClick={() => handleSimulateStatus('Approved')}
            className={`btn btn-sm ${app.status === 'Approved' ? 'btn-success' : 'btn-secondary'}`}
            style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem' }}
          >
            4. Approved
          </button>
          <button 
            onClick={() => handleSimulateStatus('Rejected')}
            className={`btn btn-sm ${app.status === 'Rejected' ? 'btn-danger' : 'btn-secondary'}`}
            style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem' }}
          >
            Reject
          </button>
        </div>
      </div>

      {/* Visual Timeline Stepper Card */}
      <div className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
        <div className="flex items-center justify-between flex-wrap gap-2" style={{ marginBottom: '1.5rem' }}>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
              Official Committee Status
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary-dark)', marginTop: '0.15rem' }}>
              {app.status === 'Approved' 
                ? '🎉 Admission Approved — Provisional Seat Allotted' 
                : app.status === 'Rejected' 
                ? 'Application Disqualified / Prerequisites Deficient' 
                : `${app.status} — Under Active Scrutiny`}
            </div>
          </div>

          <span className={`status-pill status-${isApproved ? 'approved' : isRejected ? 'rejected' : app.status === 'Document Verified' ? 'verified' : 'review'}`} style={{ fontSize: '0.9rem', padding: '0.45rem 1rem' }}>
            {app.status}
          </span>
        </div>

        {/* Visual 4-Step Stepper */}
        <StatusStepper currentStatus={app.status} statusHistory={app.statusHistory} />
      </div>

      {/* Two Column Layout: Detailed Chronological Timeline & Summary */}
      <div className="grid grid-cols-3 gap-6">
        {/* Left Column (2 Cols): Chronological Verification Log */}
        <div className="card" style={{ gridColumn: 'span 2' }}>
          <div className="card-header">
            <div className="card-title">
              <Clock size={18} color="var(--primary-600)" />
              <span>Milestone Audit & Scrutiny Timeline</span>
            </div>
            <span className="badge badge-primary">Real-Time Sync</span>
          </div>

          <div style={{ position: 'relative', paddingLeft: '1.5rem', borderLeft: '2px solid var(--border-strong)', margin: '1rem 0 1rem 0.5rem', display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            {app.statusHistory && app.statusHistory.map((item, idx) => (
              <div key={idx} style={{ position: 'relative' }}>
                <div style={{
                  position: 'absolute',
                  left: '-31px',
                  top: '0',
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  background: idx === app.statusHistory.length - 1 ? 'var(--primary-600)' : 'var(--success)',
                  border: '3px solid #ffffff',
                  boxShadow: '0 0 0 2px var(--border-strong)'
                }}></div>

                <div className="flex items-center justify-between">
                  <div style={{ fontWeight: 800, fontSize: '0.975rem', color: 'var(--text-main)' }}>
                    {item.status}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    {item.date}
                  </div>
                </div>

                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.35rem', lineHeight: '1.5' }}>
                  {item.note}
                </p>
              </div>
            ))}
          </div>

          {isApproved && (
            <div style={{
              background: 'var(--success-bg)',
              border: '1px solid var(--success-border)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem',
              marginTop: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <div>
                <div style={{ fontWeight: 800, color: 'var(--success-dark)', fontSize: '0.95rem' }}>
                  🎓 Provisional Admission Offer Letter Generated!
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--success-dark)', marginTop: '0.2rem' }}>
                  Your digitally stamped letter has been authorized by the Academic Registrar.
                </div>
              </div>

              <button 
                onClick={() => setShowOfferModal(true)} 
                className="btn btn-success btn-sm"
              >
                <Printer size={15} />
                <span>View & Print Offer Letter</span>
              </button>
            </div>
          )}
        </div>

        {/* Right Column (1 Col): Application Summary & Counseling */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Summary Card */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">
                <FileText size={18} color="var(--primary-600)" />
                <span>Application Dossier Overview</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem' }}>
              <div className="flex items-center justify-between" style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Reference Number:</span>
                <strong>{app.refNumber}</strong>
              </div>

              <div className="flex items-center justify-between" style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Program:</span>
                <strong style={{ textAlign: 'right' }}>{app.programName}</strong>
              </div>

              <div className="flex items-center justify-between" style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Department:</span>
                <strong>{app.department}</strong>
              </div>

              <div className="flex items-center justify-between" style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Submission Date:</span>
                <strong>{app.submissionDate}</strong>
              </div>

              <div className="flex items-center justify-between" style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Merit Score:</span>
                <strong style={{ color: 'var(--primary-700)' }}>{app.meritScore || "94.8"} / 100</strong>
              </div>

              <div className="flex items-center justify-between">
                <span style={{ color: 'var(--text-muted)' }}>Application Fee:</span>
                <span className="badge" style={{ background: '#dcfce7', color: '#15803d' }}>Paid (₹1,500)</span>
              </div>
            </div>
          </div>

          {/* Counseling Date Card */}
          <div className="card" style={{ background: 'linear-gradient(135deg, var(--primary-50) 0%, #ffffff 100%)', border: '1px solid var(--primary-100)' }}>
            <div className="flex items-center gap-2" style={{ marginBottom: '0.75rem', color: 'var(--primary-900)', fontWeight: 700 }}>
              <Calendar size={18} />
              <span>Counseling Schedule</span>
            </div>
            <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Designated date for physical verification & identity enrollment:
            </p>
            <div style={{ background: '#ffffff', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', fontWeight: 700, fontSize: '0.9rem', color: 'var(--primary-dark)', textAlign: 'center', marginBottom: '1rem' }}>
              📅 {app.counselingDate || "October 22, 2026 at 10:00 AM"}
            </div>
            <Link to="/student/notifications" className="btn btn-secondary btn-block btn-sm">
              View Latest Notifications
            </Link>
          </div>
        </div>
      </div>

      {/* Offer Letter Modal */}
      {showOfferModal && (
        <OfferLetterModal application={app} onClose={() => setShowOfferModal(false)} />
      )}
    </div>
  );
}
