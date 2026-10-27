import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  Users, 
  Search, 
  Filter, 
  Eye, 
  Sliders, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  FileCheck2, 
  Award,
  Download,
  X,
  Send,
  AlertCircle
} from 'lucide-react';

export default function AdminApplicationsPage() {
  const { applications, updateApplicationStatus, showToast } = useApp();
  const [searchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [deptFilter, setDeptFilter] = useState('all');
  
  // Status Management Modal State
  const [selectedAppForStatus, setSelectedAppForStatus] = useState(null);
  const [newStatus, setNewStatus] = useState('Under Review');
  const [statusRemarks, setStatusRemarks] = useState('');

  // Handle URL query tabs if any
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'documents') {
      setStatusFilter('Submitted');
    }
  }, [searchParams]);

  // Filtered Applications
  const filteredApps = applications.filter((app) => {
    const matchesSearch = 
      app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.refNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.programName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || app.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesDept = deptFilter === 'all' || app.department.toLowerCase().includes(deptFilter.toLowerCase());

    return matchesSearch && matchesStatus && matchesDept;
  });

  const handleOpenStatusModal = (app) => {
    setSelectedAppForStatus(app);
    setNewStatus(app.status);
    setStatusRemarks(app.remarks || '');
  };

  const handleSaveStatusUpdate = (e) => {
    e.preventDefault();
    if (!selectedAppForStatus) return;

    updateApplicationStatus(
      selectedAppForStatus.id,
      newStatus,
      `Status changed to ${newStatus} via Admin Applications Console.`,
      statusRemarks
    );
    setSelectedAppForStatus(null);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4" style={{ marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-main)' }}>
            Applications Directory & Scrutiny Management
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Manage {applications.length} total applicant records across all departments.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => showToast("Exported 6 applications to CSV format!", "info")}
            className="btn btn-secondary btn-sm"
          >
            <Download size={16} />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="card" style={{ padding: '1.25rem', marginBottom: '1.5rem' }}>
        <div className="grid grid-cols-3 gap-4">
          {/* Search Box */}
          <div style={{ position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', top: '12px', left: '12px', color: 'var(--text-muted)' }} />
            <input
              type="text"
              className="form-control"
              style={{ paddingLeft: '2.4rem' }}
              placeholder="Search by Name, App ID, Ref No, or Email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Status Filter */}
          <div>
            <select
              className="form-control"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Application Statuses</option>
              <option value="Submitted">Submitted (Pending Initial Screening)</option>
              <option value="Under Review">Under Review (Committee)</option>
              <option value="Document Verified">Document Verified</option>
              <option value="Approved">Approved (Seat Allotted)</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          {/* Department Filter */}
          <div>
            <select
              className="form-control"
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
            >
              <option value="all">All Academic Departments</option>
              <option value="Computing">School of Computing & AI</option>
              <option value="Business">Apex Business School</option>
              <option value="Engineering">School of Engineering</option>
              <option value="Life">School of Life Sciences</option>
            </select>
          </div>
        </div>
      </div>

      {/* Applications Data Table */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <Users size={20} color="var(--primary-600)" />
            <span>Active Candidate Records ({filteredApps.length} Results)</span>
          </div>
          <div className="flex items-center gap-2">
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Click 'Quick Status' or 'Review' to scrutinize</span>
          </div>
        </div>

        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Candidate Details</th>
                <th>Applied Program</th>
                <th>Academic Track</th>
                <th>Docs Verified</th>
                <th>Current Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredApps.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '3rem' }}>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                      No applications matched your search or filter criteria.
                    </div>
                  </td>
                </tr>
              ) : (
                filteredApps.map((app) => (
                  <tr key={app.id}>
                    <td>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-main)' }}>
                        {app.fullName}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--primary-700)', fontWeight: 600 }}>
                        {app.refNumber} • {app.id}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {app.email} • {app.phone}
                      </div>
                    </td>

                    <td>
                      <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{app.programName}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{app.department}</div>
                    </td>

                    <td>
                      <div style={{ fontSize: '0.825rem' }}>
                        12th: <strong>{app.academicDetails?.twelfthPercentage || "90%"}</strong>
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {app.academicDetails?.entranceExam || "JEE"}: <strong>{app.academicDetails?.entranceScore || "95%"}</strong>
                      </div>
                    </td>

                    <td>
                      <div className="flex items-center gap-1" style={{ fontSize: '0.85rem', fontWeight: 600 }}>
                        <FileCheck2 size={16} color="var(--primary-600)" />
                        <span>{app.verifiedDocsCount} / {app.documentsCount}</span>
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        {app.verifiedDocsCount === app.documentsCount ? "All Cleared" : "Pending Check"}
                      </div>
                    </td>

                    <td>
                      <span className={`status-pill status-${app.status === 'Approved' ? 'approved' : app.status === 'Rejected' ? 'rejected' : app.status === 'Document Verified' ? 'verified' : app.status === 'Submitted' ? 'submitted' : 'review'}`}>
                        {app.status}
                      </span>
                    </td>

                    <td style={{ textAlign: 'right' }}>
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenStatusModal(app)}
                          className="btn btn-secondary btn-sm"
                          title="Quick Update Status"
                        >
                          <Sliders size={14} />
                          <span>Status</span>
                        </button>

                        <Link
                          to={`/admin/review/${app.id}`}
                          className="btn btn-primary btn-sm"
                        >
                          <Eye size={14} />
                          <span>Review</span>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Fast Status Update Modal */}
      {selectedAppForStatus && (
        <div className="modal-backdrop" onClick={() => setSelectedAppForStatus(null)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '540px' }}>
            <div className="modal-header">
              <div className="flex items-center gap-2">
                <Sliders size={20} color="var(--primary-600)" />
                <div style={{ fontWeight: 700 }}>
                  Update Status: {selectedAppForStatus.fullName}
                </div>
              </div>
              <button onClick={() => setSelectedAppForStatus(null)} className="btn btn-secondary btn-sm" style={{ padding: '0.3rem 0.5rem' }}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveStatusUpdate}>
              <div className="modal-body">
                <div style={{ background: 'var(--bg-subtle)', padding: '0.85rem', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem', fontSize: '0.85rem' }}>
                  <div><strong>Application Ref:</strong> {selectedAppForStatus.refNumber}</div>
                  <div><strong>Program:</strong> {selectedAppForStatus.programName}</div>
                  <div><strong>Current Status:</strong> <span className="badge badge-primary">{selectedAppForStatus.status}</span></div>
                </div>

                <div className="form-group">
                  <label className="form-label">Promote / Change Status to:</label>
                  <select
                    className="form-control"
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                  >
                    <option value="Submitted">Submitted (Initial Ingestion)</option>
                    <option value="Under Review">Under Review (Committee Scrutiny)</option>
                    <option value="Document Verified">Document Verified (Certificates Validated)</option>
                    <option value="Approved">Approved (Grant Provisional Admission & Offer Letter)</option>
                    <option value="Rejected">Rejected (Ineligible / Disqualified)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Committee Remarks / Decision Note:</label>
                  <textarea
                    rows="3"
                    className="form-control"
                    placeholder="Enter formal reason or notes that will reflect in student's audit trail..."
                    value={statusRemarks}
                    onChange={(e) => setStatusRemarks(e.target.value)}
                  ></textarea>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" onClick={() => setSelectedAppForStatus(null)} className="btn btn-secondary btn-sm">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  <CheckCircle2 size={16} />
                  <span>Commit Status Change</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
