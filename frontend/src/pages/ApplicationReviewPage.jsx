import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import DocumentPreviewModal from '../components/DocumentPreviewModal';
import OfferLetterModal from '../components/OfferLetterModal';
import { 
  ClipboardList, 
  User, 
  GraduationCap, 
  FileCheck2, 
  Sliders, 
  CheckCircle2, 
  XCircle, 
  ArrowLeft, 
  ArrowRight, 
  Eye, 
  Award, 
  ShieldCheck, 
  Clock, 
  AlertCircle,
  FileText,
  Mail,
  Phone,
  Calendar
} from 'lucide-react';

export default function ApplicationReviewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { 
    applications, 
    documents, 
    updateApplicationStatus, 
    updateDocumentStatus,
    showToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState('decision'); // 'personal', 'academic', 'documents', 'decision'
  const [selectedDocPreview, setSelectedDocPreview] = useState(null);
  const [showOfferModal, setShowOfferModal] = useState(false);

  // Find target applicant or fallback to first
  const currentAppIndex = applications.findIndex(a => a.id === id);
  const app = currentAppIndex !== -1 ? applications[currentAppIndex] : applications[0];

  // Local state for decision console
  const [decisionStatus, setDecisionStatus] = useState(app?.status || 'Under Review');
  const [committeeNotes, setCommitteeNotes] = useState(app?.remarks || '');
  const [internalScore, setInternalScore] = useState(app?.meritScore || 94.8);

  if (!app) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
        <AlertCircle size={40} color="var(--danger)" style={{ margin: '0 auto 1rem' }} />
        <h2>Applicant Record Not Found</h2>
        <Link to="/admin/applications" className="btn btn-primary" style={{ marginTop: '1rem' }}>
          Back to Directory
        </Link>
      </div>
    );
  }

  const prevApp = currentAppIndex > 0 ? applications[currentAppIndex - 1] : null;
  const nextApp = currentAppIndex < applications.length - 1 ? applications[currentAppIndex + 1] : null;

  const handleCommitDecision = (e) => {
    e.preventDefault();
    updateApplicationStatus(
      app.id,
      decisionStatus,
      `Committee evaluation completed. Decision: ${decisionStatus}.`,
      committeeNotes
    );
    showToast(`Dossier ${app.refNumber} committed with status: ${decisionStatus}!`, 'success');
  };

  return (
    <div>
      {/* Top Header with Navigation Queue */}
      <div className="flex items-center justify-between flex-wrap gap-4" style={{ marginBottom: '1.5rem' }}>
        <div className="flex items-center gap-3">
          <Link to="/admin/applications" className="btn btn-secondary btn-sm">
            <ArrowLeft size={16} />
            <span>Applications List</span>
          </Link>
          <div style={{ color: 'var(--text-muted)' }}>|</div>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Applicant <strong>{currentAppIndex + 1}</strong> of <strong>{applications.length}</strong>
          </span>
        </div>

        {/* Queue Switchers */}
        <div className="flex items-center gap-2">
          {prevApp && (
            <button
              onClick={() => navigate(`/admin/review/${prevApp.id}`)}
              className="btn btn-secondary btn-sm"
              title={`Previous: ${prevApp.fullName}`}
            >
              <ArrowLeft size={14} />
              <span>Prev: {prevApp.fullName.split(' ')[0]}</span>
            </button>
          )}

          {nextApp && (
            <button
              onClick={() => navigate(`/admin/review/${nextApp.id}`)}
              className="btn btn-primary btn-sm"
              title={`Next: ${nextApp.fullName}`}
            >
              <span>Next: {nextApp.fullName.split(' ')[0]}</span>
              <ArrowRight size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Applicant Primary Profile Dossier Card */}
      <div className="card" style={{
        background: '#ffffff',
        borderLeft: '5px solid var(--primary-600)',
        padding: '1.75rem',
        marginBottom: '2rem'
      }}>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--primary-700), #0f172a)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '1.25rem'
            }}>
              {app.fullName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  {app.fullName}
                </h1>
                <span className={`status-pill status-${app.status === 'Approved' ? 'approved' : app.status === 'Rejected' ? 'rejected' : app.status === 'Document Verified' ? 'verified' : 'review'}`}>
                  {app.status}
                </span>
              </div>

              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                Ref: <strong>{app.refNumber}</strong> • App ID: <strong>{app.id}</strong> • Applied: <strong>{app.submissionDate}</strong>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {app.status === 'Approved' && (
              <button
                onClick={() => setShowOfferModal(true)}
                className="btn btn-success btn-sm"
              >
                <Award size={16} />
                <span>View Generated Offer Letter</span>
              </button>
            )}
          </div>
        </div>

        {/* Quick Highlights Bar */}
        <div style={{
          background: 'var(--bg-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '0.85rem 1.25rem',
          marginTop: '1.25rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1rem',
          fontSize: '0.85rem'
        }}>
          <div>
            <span style={{ color: 'var(--text-muted)' }}>Primary Program:</span><br />
            <strong>{app.programName}</strong>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)' }}>12th Board Score:</span><br />
            <strong style={{ color: 'var(--primary-700)' }}>{app.academicDetails?.twelfthPercentage || "92.4%"}</strong>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)' }}>Entrance Metric:</span><br />
            <strong>{app.academicDetails?.entranceScore || "JEE: 98%tile"}</strong>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)' }}>Docs Verified:</span><br />
            <strong style={{ color: 'var(--success-dark)' }}>{app.verifiedDocsCount} of {app.documentsCount} Cleared</strong>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-2" style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
        <button
          onClick={() => setActiveTab('decision')}
          className={`btn btn-sm ${activeTab === 'decision' ? 'btn-primary' : 'btn-secondary'}`}
        >
          <Sliders size={16} />
          <span>Decision & Evaluation Console</span>
        </button>

        <button
          onClick={() => setActiveTab('documents')}
          className={`btn btn-sm ${activeTab === 'documents' ? 'btn-primary' : 'btn-secondary'}`}
        >
          <FileCheck2 size={16} />
          <span>Documents Inspector ({documents.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('academic')}
          className={`btn btn-sm ${activeTab === 'academic' ? 'btn-primary' : 'btn-secondary'}`}
        >
          <GraduationCap size={16} />
          <span>Academic Transcripts</span>
        </button>

        <button
          onClick={() => setActiveTab('personal')}
          className={`btn btn-sm ${activeTab === 'personal' ? 'btn-primary' : 'btn-secondary'}`}
        >
          <User size={16} />
          <span>Personal & Guardian Profile</span>
        </button>
      </div>

      {/* TAB 1: Decision Console */}
      {activeTab === 'decision' && (
        <div className="grid grid-cols-3 gap-6">
          <div className="card" style={{ gridColumn: 'span 2' }}>
            <div className="card-header">
              <div className="card-title">
                <ShieldCheck size={20} color="var(--primary-600)" />
                <span>Admission Decision & Seat Allotment</span>
              </div>
            </div>

            <form onSubmit={handleCommitDecision}>
              <div className="form-group">
                <label className="form-label">Update Official Status Decision:</label>
                <select
                  className="form-control"
                  value={decisionStatus}
                  onChange={(e) => setDecisionStatus(e.target.value)}
                  style={{ fontWeight: 700, fontSize: '1rem' }}
                >
                  <option value="Under Review">Under Review (Keep In Scrutiny Queue)</option>
                  <option value="Document Verified">Document Verified (All Transcripts Cleared)</option>
                  <option value="Approved">Approved (Grant Provisional Admission & Generate Offer)</option>
                  <option value="Rejected">Rejected (Ineligible or Deficient Prerequisites)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="form-label">Calculated Composite Merit Score (/100):</label>
                  <input
                    type="number"
                    step="0.1"
                    className="form-control"
                    value={internalScore}
                    onChange={(e) => setInternalScore(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Counseling Session Slot:</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={app.counselingDate || "October 22, 2026 at 10:00 AM"}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Committee Remarks & Instructions to Student:</label>
                <textarea
                  rows="4"
                  className="form-control"
                  placeholder="Enter remarks that will be recorded into student's audit timeline and offer letter..."
                  value={committeeNotes}
                  onChange={(e) => setCommitteeNotes(e.target.value)}
                ></textarea>
              </div>

              <div className="flex items-center justify-between" style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  * Submitting this form will automatically notify the applicant in real-time.
                </div>

                <button type="submit" className="btn btn-primary btn-lg">
                  <CheckCircle2 size={18} />
                  <span>Save Decision & Update Record</span>
                </button>
              </div>
            </form>
          </div>

          {/* Audit History mini widget */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">
                <Clock size={18} color="var(--primary-600)" />
                <span>Status Audit Log</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.825rem' }}>
              {app.statusHistory?.map((h, i) => (
                <div key={i} style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem' }}>
                  <div className="flex items-center justify-between">
                    <strong>{h.status}</strong>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>{h.date}</span>
                  </div>
                  <div style={{ color: 'var(--text-muted)', marginTop: '0.2rem' }}>{h.note}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Documents Inspector */}
      {activeTab === 'documents' && (
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <FileCheck2 size={20} color="var(--primary-600)" />
              <span>Candidate Uploaded Documents & Verifications</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {documents.map((doc) => (
              <div key={doc.id} className="doc-item-row flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <FileText size={24} color="var(--primary-600)" />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{doc.name}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      File: {doc.fileName || "Not uploaded"} • Size: {doc.fileSize || "-"}
                    </div>
                  </div>
                </div>

                <span className={`status-pill status-${doc.status === 'verified' ? 'approved' : doc.status === 'rejected' ? 'rejected' : 'review'}`}>
                  {doc.status.toUpperCase()}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedDocPreview(doc)}
                    className="btn btn-secondary btn-sm"
                  >
                    <Eye size={15} />
                    <span>Inspect</span>
                  </button>

                  <button
                    onClick={() => updateDocumentStatus(doc.id, 'verified', 'Verified by Admission Dean.')}
                    className="btn btn-success btn-sm"
                  >
                    <CheckCircle2 size={15} />
                    <span>Approve</span>
                  </button>

                  <button
                    onClick={() => updateDocumentStatus(doc.id, 'rejected', 'Image scan is blurred. Re-upload original.')}
                    className="btn btn-danger btn-sm"
                  >
                    <XCircle size={15} />
                    <span>Discrepancy</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Academic Transcripts */}
      {activeTab === 'academic' && (
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <GraduationCap size={20} color="var(--primary-600)" />
              <span>High School & National Entrance Scores</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div style={{ background: 'var(--bg-subtle)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--primary-dark)' }}>
                Secondary Examination (10th)
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.85rem' }}>
                <div><strong>Board:</strong> {app.academicDetails?.tenthBoard || "CBSE"}</div>
                <div><strong>Institute:</strong> {app.academicDetails?.tenthSchool || "DPS RK Puram"}</div>
                <div><strong>Passing Year:</strong> {app.academicDetails?.tenthYear || "2024"}</div>
                <div><strong>Marks / Aggregate:</strong> <span style={{ color: 'var(--primary-700)', fontWeight: 700 }}>{app.academicDetails?.tenthPercentage || "94.6%"}</span></div>
              </div>
            </div>

            <div style={{ background: 'var(--bg-subtle)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--primary-dark)' }}>
                Senior Secondary Examination (12th)
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.85rem' }}>
                <div><strong>Board:</strong> {app.academicDetails?.twelfthBoard || "CBSE"}</div>
                <div><strong>Stream:</strong> {app.academicDetails?.twelfthStream || "Science (PCM)"}</div>
                <div><strong>Passing Year:</strong> {app.academicDetails?.twelfthYear || "2026"}</div>
                <div><strong>Marks / Aggregate:</strong> <span style={{ color: 'var(--primary-700)', fontWeight: 700 }}>{app.academicDetails?.twelfthPercentage || "92.4%"}</span></div>
              </div>
            </div>
          </div>

          <div style={{ background: 'var(--primary-50)', border: '1px solid var(--primary-100)', padding: '1.25rem', borderRadius: 'var(--radius-md)', marginTop: '1.5rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--primary-900)' }}>
              Entrance Examination Scorecard
            </h3>
            <div className="grid grid-cols-3 gap-4" style={{ fontSize: '0.85rem' }}>
              <div><strong>Exam Name:</strong> {app.academicDetails?.entranceExam || "JEE Main 2026"}</div>
              <div><strong>Admit / Roll No:</strong> {app.academicDetails?.entranceRollNo || "26031049281"}</div>
              <div><strong>Score / Percentile:</strong> <span style={{ color: 'var(--primary-700)', fontWeight: 800 }}>{app.academicDetails?.entranceScore || "98.4 Percentile"}</span></div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Personal Profile */}
      {activeTab === 'personal' && (
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <User size={20} color="var(--primary-600)" />
              <span>Personal, Category & Guardian Details</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4" style={{ fontSize: '0.875rem' }}>
            <div><strong>Candidate Full Name:</strong> {app.fullName}</div>
            <div><strong>Date of Birth:</strong> {app.dob} ({app.gender})</div>
            <div><strong>Category Quota:</strong> {app.category}</div>
            <div><strong>Blood Group:</strong> {app.bloodGroup || "O+"}</div>
            <div><strong>Email Address:</strong> {app.email}</div>
            <div><strong>Phone Number:</strong> {app.phone}</div>
            <div><strong>Father's Name:</strong> {app.fatherName}</div>
            <div><strong>Mother's Name:</strong> {app.motherName}</div>
            <div><strong>Guardian Contact:</strong> {app.guardianPhone}</div>
            <div style={{ gridColumn: 'span 2' }}><strong>Permanent Address:</strong> {app.address}</div>
          </div>
        </div>
      )}

      {/* Document Inspector Modal */}
      {selectedDocPreview && (
        <DocumentPreviewModal
          doc={selectedDocPreview}
          onClose={() => setSelectedDocPreview(null)}
          onVerify={(docId) => updateDocumentStatus(docId, 'verified', 'Approved by Admission Reviewer.')}
          onReject={(docId) => updateDocumentStatus(docId, 'rejected', 'Discrepancy found. Re-upload required.')}
          isAdmin={true}
        />
      )}

      {/* Offer Letter Modal */}
      {showOfferModal && (
        <OfferLetterModal application={app} onClose={() => setShowOfferModal(false)} />
      )}
    </div>
  );
}
