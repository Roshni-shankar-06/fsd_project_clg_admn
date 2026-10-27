import React from 'react';
import { X, FileText, CheckCircle2, AlertCircle, Download, ExternalLink } from 'lucide-react';

export default function DocumentPreviewModal({ doc, onClose, onVerify, onReject, isAdmin = false }) {
  if (!doc) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '650px' }}>
        <div className="modal-header">
          <div className="flex items-center gap-2">
            <FileText size={20} color="var(--primary-600)" />
            <div>
              <div style={{ fontWeight: 700, fontSize: '1.05rem' }}>{doc.name}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>File: {doc.fileName || "Sample_Document.pdf"}</div>
            </div>
          </div>
          <button onClick={onClose} className="btn btn-secondary btn-sm" style={{ padding: '0.3rem 0.5rem' }}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          {/* Document Simulated Viewer Box */}
          <div style={{
            background: 'var(--bg-subtle)',
            border: '2px dashed var(--border-strong)',
            borderRadius: 'var(--radius-lg)',
            padding: '2.5rem 1.5rem',
            textAlign: 'center',
            marginBottom: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'var(--shadow-md)',
              color: 'var(--primary-600)'
            }}>
              <FileText size={32} />
            </div>

            <div>
              <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-main)' }}>
                {doc.fileName || `${doc.name}.pdf`}
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                Uploaded: {doc.uploadedAt || "2026-09-22 11:20 AM"} • Size: {doc.fileSize || "1.5 MB"}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className={`status-pill status-${doc.status === 'verified' ? 'approved' : doc.status === 'uploaded' ? 'submitted' : doc.status === 'rejected' ? 'rejected' : 'review'}`}>
                Status: {doc.status.toUpperCase()}
              </span>
            </div>

            <button 
              onClick={() => alert(`Simulated Download of ${doc.fileName || doc.name}`)}
              className="btn btn-secondary btn-sm"
              style={{ marginTop: '0.5rem' }}
            >
              <Download size={15} />
              <span>Download File Preview</span>
            </button>
          </div>

          {/* Verification Remarks Box */}
          <div style={{ background: '#ffffff', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '1rem' }}>
            <div style={{ fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.35rem', color: 'var(--text-main)' }}>
              Verification Remarks / Notes:
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              {doc.remarks || "No specific remarks added by the verification officer yet."}
            </p>
          </div>
        </div>

        <div className="modal-footer">
          {isAdmin ? (
            <>
              <button 
                onClick={() => {
                  onReject && onReject(doc.id);
                  onClose();
                }} 
                className="btn btn-danger btn-sm"
              >
                <AlertCircle size={16} />
                <span>Mark as Discrepancy / Reject</span>
              </button>
              <button 
                onClick={() => {
                  onVerify && onVerify(doc.id);
                  onClose();
                }} 
                className="btn btn-success btn-sm"
              >
                <CheckCircle2 size={16} />
                <span>Verify & Approve Document</span>
              </button>
            </>
          ) : (
            <button onClick={onClose} className="btn btn-secondary btn-sm">
              Close Preview
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
