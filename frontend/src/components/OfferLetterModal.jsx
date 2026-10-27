import React from 'react';
import { X, Printer, Download, GraduationCap, Award, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function OfferLetterModal({ application, onClose }) {
  if (!application) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-dialog" 
        onClick={(e) => e.stopPropagation()} 
        style={{ maxWidth: '820px', background: '#ffffff' }}
      >
        <div className="modal-header" style={{ background: '#f8fafc' }}>
          <div className="flex items-center gap-2">
            <Award size={20} color="var(--primary-600)" />
            <div style={{ fontWeight: 700 }}>Provisional Admission Offer Letter</div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={handlePrint} className="btn btn-secondary btn-sm">
              <Printer size={16} />
              <span>Print Letter</span>
            </button>
            <button onClick={onClose} className="btn btn-secondary btn-sm" style={{ padding: '0.3rem 0.5rem' }}>
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="modal-body" style={{ padding: '2rem' }}>
          {/* Official Letterhead */}
          <div className="letter-document">
            <div className="letter-watermark">APPROVED</div>

            {/* University Crest & Header */}
            <div className="letter-header">
              <div className="flex items-center gap-3">
                <div className="logo-icon-box" style={{ width: '48px', height: '48px' }}>
                  <GraduationCap size={28} />
                </div>
                <div>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
                    APEX UNIVERSITY
                  </h2>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    Office of Admissions & Academic Registrar
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                    Accredited NAAC 'A++' Grade | NIRF Ranked #22
                  </div>
                </div>
              </div>

              <div style={{ textAlign: 'right', fontSize: '0.8rem', color: '#475569' }}>
                <div><strong>Ref No:</strong> {application.refNumber}/ADM-2026</div>
                <div><strong>Date:</strong> {application.admissionOfferDate || "September 25, 2026"}</div>
                <div><strong>Application ID:</strong> {application.id}</div>
              </div>
            </div>

            {/* Letter Body */}
            <div style={{ marginBottom: '1.5rem', lineHeight: '1.7', fontSize: '0.92rem', color: '#1e293b' }}>
              <div style={{ marginBottom: '1rem' }}>
                To,<br />
                <strong>Mr./Ms. {application.fullName}</strong><br />
                {application.address}<br />
                Contact: {application.phone} | {application.email}
              </div>

              <div style={{ 
                background: 'var(--primary-50)', 
                borderLeft: '4px solid var(--primary-600)', 
                padding: '0.75rem 1rem', 
                fontWeight: 700, 
                color: 'var(--primary-900)',
                marginBottom: '1.25rem' 
              }}>
                SUBJECT: PROVISIONAL ADMISSION OFFER FOR ACADEMIC YEAR 2026–2027
              </div>

              <p style={{ marginBottom: '1rem' }}>
                Dear <strong>{application.fullName}</strong>,
              </p>

              <p style={{ marginBottom: '1rem' }}>
                We are pleased to inform you that based on your academic credentials, entrance performance, and document verification, the Central Admissions Committee has provisionally approved your admission into the following undergraduate/postgraduate program:
              </p>

              {/* Offer Details Box */}
              <div style={{
                background: '#f8fafc',
                border: '1px solid #cbd5e1',
                borderRadius: '8px',
                padding: '1.25rem',
                marginBottom: '1.5rem',
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '0.75rem',
                fontSize: '0.875rem'
              }}>
                <div><strong>Allotted Program:</strong> {application.programName}</div>
                <div><strong>Department:</strong> {application.department}</div>
                <div><strong>Candidate Category:</strong> {application.category}</div>
                <div><strong>Entrance Score:</strong> {application.academicDetails?.entranceScore || '98.4 Percentile'}</div>
                <div><strong>Counseling Slot:</strong> {application.counselingDate || 'October 22, 2026 at 10:00 AM'}</div>
                <div><strong>Tuition Status:</strong> Eligible for 25% Merit Scholarship</div>
              </div>

              <p style={{ marginBottom: '1rem' }}>
                Please report to the University Admissions Directorate along with your original documents and fee deposit receipt on or before the designated counseling date to complete enrollment.
              </p>

              <p style={{ marginBottom: '2rem' }}>
                We congratulate you on your outstanding achievement and look forward to welcoming you to our campus community.
              </p>

              {/* Signatures */}
              <div className="flex items-center justify-between" style={{ marginTop: '2.5rem', paddingTop: '1rem', borderTop: '1px solid #e2e8f0' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0f172a' }}>Dr. Vikram Menon</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Chief Admissions Dean & Registrar</div>
                  <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Apex University</div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    color: 'var(--success-dark)',
                    background: 'var(--success-bg)',
                    padding: '0.4rem 0.8rem',
                    borderRadius: '999px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    border: '1px solid var(--success-border)'
                  }}>
                    <CheckCircle2 size={14} />
                    Digitally Verified Admission Offer
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button onClick={onClose} className="btn btn-secondary btn-sm">
            Close
          </button>
          <button onClick={handlePrint} className="btn btn-primary btn-sm">
            <Download size={16} />
            <span>Download PDF Slip</span>
          </button>
        </div>
      </div>
    </div>
  );
}
