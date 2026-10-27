import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import DocumentPreviewModal from '../components/DocumentPreviewModal';
import { 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Eye, 
  Trash2, 
  Info, 
  HelpCircle,
  FileCheck,
  ShieldCheck,
  RefreshCw,
  Image,
  FileBadge,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DocumentUploadPage() {
  const { documents, uploadDocument, showToast } = useApp();
  const [selectedDocForPreview, setSelectedDocForPreview] = useState(null);
  const [activeUploadDocId, setActiveUploadDocId] = useState(null);
  const [dragOverDocId, setDragOverDocId] = useState(null);

  // Hidden file input ref
  const fileInputRef = useRef(null);
  const [targetDocId, setTargetDocId] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0 && targetDocId) {
      const file = e.target.files[0];
      uploadDocument(targetDocId, file);
      e.target.value = ''; // Reset input
    }
  };

  const handleTriggerUpload = (docId) => {
    setTargetDocId(docId);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSimulatedFastUpload = (docId) => {
    const doc = documents.find(d => d.id === docId);
    const mockFile = {
      name: `${doc.name.replace(/[^a-zA-Z0-9]/g, '_')}_Official_Scan.pdf`,
      size: 1024 * 1024 * 1.8 // 1.8 MB
    };
    uploadDocument(docId, mockFile);
  };

  const handleDrop = (e, docId) => {
    e.preventDefault();
    setDragOverDocId(null);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      uploadDocument(docId, file);
    } else {
      handleSimulatedFastUpload(docId);
    }
  };

  const verifiedCount = documents.filter(d => d.status === 'verified').length;
  const uploadedCount = documents.filter(d => d.fileName).length;

  return (
    <div>
      {/* Hidden Global File Input */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        accept=".pdf,.jpg,.jpeg,.png"
        onChange={handleFileChange}
      />

      {/* Page Header */}
      <div className="card" style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)',
        color: '#ffffff',
        padding: '2rem',
        marginBottom: '2rem'
      }}>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-2" style={{ marginBottom: '0.35rem' }}>
              <UploadCloud size={26} color="#60a5fa" />
              <h1 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#ffffff' }}>
                Required Verification Documents Upload
              </h1>
            </div>
            <p style={{ color: '#cbd5e1', fontSize: '0.875rem' }}>
              Upload authentic copies of your <strong>ID Proof</strong>, <strong>Academic Certificate</strong>, <strong>Mark Sheet</strong>, and <strong>Photograph</strong>.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div style={{
              background: 'rgba(255, 255, 255, 0.15)',
              padding: '0.65rem 1.25rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#86efac' }}>
                {verifiedCount} / {documents.length}
              </div>
              <div style={{ fontSize: '0.72rem', color: '#e2e8f0', textTransform: 'uppercase' }}>
                Documents Cleared
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Guidelines Alert */}
      <div style={{
        background: 'var(--primary-50)',
        border: '1px solid var(--primary-100)',
        borderRadius: 'var(--radius-md)',
        padding: '1rem 1.25rem',
        marginBottom: '1.75rem',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '0.85rem'
      }}>
        <Info size={20} color="var(--primary-600)" style={{ flexShrink: 0, marginTop: '2px' }} />
        <div style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>
          <strong>Upload Instructions:</strong> Accepted file types: <strong>PDF, JPG, PNG</strong> (Maximum file size: 5MB per document). Ensure candidate name and scores are clearly visible. Verified documents are locked by the Registrar office.
        </div>
      </div>

      {/* Document Upload Table / Cards */}
      <div className="card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
        <div className="card-header">
          <div className="card-title">
            <FileCheck size={20} color="var(--primary-600)" />
            <span>Document Checklist & Upload Status</span>
          </div>
          <span className="badge badge-primary">{uploadedCount} of {documents.length} Uploaded</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {documents.map((doc) => {
            const isVerified = doc.status === 'verified';
            const isUploaded = doc.status === 'uploaded';
            const isRejected = doc.status === 'rejected';
            const isNotUploaded = !doc.fileName;

            return (
              <div
                key={doc.id}
                className="doc-item-row flex-wrap gap-3"
                onDragOver={(e) => { e.preventDefault(); setDragOverDocId(doc.id); }}
                onDragLeave={() => setDragOverDocId(null)}
                onDrop={(e) => handleDrop(e, doc.id)}
                style={{
                  border: dragOverDocId === doc.id ? '2px dashed var(--primary-600)' : undefined,
                  background: dragOverDocId === doc.id ? 'var(--primary-50)' : undefined
                }}
              >
                {/* Left Document Information */}
                <div className="flex items-start gap-3" style={{ flex: '1 1 320px' }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: 'var(--radius-md)',
                    background: isVerified ? 'var(--success-bg)' : isRejected ? 'var(--danger-bg)' : 'var(--primary-50)',
                    color: isVerified ? 'var(--success-dark)' : isRejected ? 'var(--danger)' : 'var(--primary-700)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    {doc.id === 'doc-photo' ? <Image size={22} /> : <FileText size={22} />}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-main)' }}>
                        {doc.name}
                      </span>
                      {doc.required && (
                        <span className="badge badge-danger" style={{ fontSize: '0.65rem' }}>Mandatory</span>
                      )}
                    </div>

                    {/* Uploaded Filename Display */}
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                      {doc.fileName ? (
                        <span>Uploaded File: <strong style={{ color: 'var(--primary-dark)' }}>{doc.fileName}</strong> ({doc.fileSize})</span>
                      ) : (
                        <span style={{ color: 'var(--warning-dark)' }}>File not yet uploaded (Accepted: {doc.type})</span>
                      )}
                    </div>

                    {/* Verification remarks */}
                    {doc.remarks && (
                      <div style={{ fontSize: '0.78rem', color: isVerified ? 'var(--success-dark)' : isRejected ? 'var(--danger)' : 'var(--text-muted)', marginTop: '0.25rem' }}>
                        Remarks: {doc.remarks}
                      </div>
                    )}
                  </div>
                </div>

                {/* Upload Status & Verification Status Badges */}
                <div className="flex items-center gap-3">
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                      Upload Status:
                    </div>
                    <span className="badge" style={{ background: isNotUploaded ? '#fef2f2' : '#f0fdf4', color: isNotUploaded ? '#991b1b' : '#166534', marginTop: '2px' }}>
                      {isNotUploaded ? 'Not Uploaded' : 'Uploaded'}
                    </span>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                      Verification:
                    </div>
                    <span className={`status-pill status-${isVerified ? 'approved' : isRejected ? 'rejected' : isUploaded ? 'submitted' : 'review'}`} style={{ marginTop: '2px', fontSize: '0.75rem' }}>
                      {doc.status.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  {doc.fileName && (
                    <button
                      onClick={() => setSelectedDocForPreview(doc)}
                      className="btn btn-secondary btn-sm"
                      title="Preview Document"
                    >
                      <Eye size={15} />
                      <span>Preview</span>
                    </button>
                  )}

                  {!isVerified && (
                    <button
                      onClick={() => handleTriggerUpload(doc.id)}
                      className="btn btn-primary btn-sm"
                    >
                      <UploadCloud size={15} />
                      <span>{doc.fileName ? "Re-upload" : "Choose File"}</span>
                    </button>
                  )}

                  {isVerified && (
                    <div className="flex items-center gap-1" style={{ color: 'var(--success-dark)', fontSize: '0.8rem', fontWeight: 700, padding: '0.4rem 0.6rem' }}>
                      <CheckCircle2 size={16} />
                      <span>Verified</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Next Step Link */}
      <div className="card" style={{ background: 'var(--bg-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem 1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-main)' }}>
            Finished Uploading Required Verification Documents?
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Track the verification progress and committee admission decisions in real-time.
          </div>
        </div>

        <Link to="/student/status" className="btn btn-primary btn-sm">
          <span>Proceed to Application Status Tracker</span>
          <ArrowRight size={15} />
        </Link>
      </div>

      {/* Document Preview Modal */}
      {selectedDocForPreview && (
        <DocumentPreviewModal
          doc={selectedDocForPreview}
          onClose={() => setSelectedDocForPreview(null)}
          isAdmin={false}
        />
      )}
    </div>
  );
}
