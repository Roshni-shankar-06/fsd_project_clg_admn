import React, { useState, useEffect } from 'react';
import { Database, RefreshCw, Layers, Users, FileText, CheckCircle, Bell, Shield, Search, Copy, Check } from 'lucide-react';

export default function DatabaseViewerPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('summary');
  const [searchTerm, setSearchTerm] = useState('');
  const [copied, setCopied] = useState(false);

  const fetchDbData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('http://127.0.0.1:5000/api/dev/db-summary');
      const json = await res.json();
      if (json && json.success) {
        setData(json);
      } else {
        throw new Error(json.message || 'Could not fetch DB summary');
      }
    } catch (err) {
      setError(err.message || 'Failed to connect to backend MongoDB API');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDbData();
  }, []);

  const handleCopyJson = () => {
    if (!data) return;
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filterList = (items = []) => {
    if (!searchTerm.trim()) return items;
    const term = searchTerm.toLowerCase();
    return items.filter(item => JSON.stringify(item).toLowerCase().includes(term));
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1.5rem', fontFamily: 'inherit' }}>
      {/* Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        borderRadius: '16px',
        padding: '2rem',
        color: '#ffffff',
        marginBottom: '2rem',
        boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1.5rem'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <div style={{ padding: '8px', background: 'rgba(59, 130, 246, 0.2)', borderRadius: '10px' }}>
              <Database size={24} color="#60a5fa" />
            </div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 700, margin: 0 }}>
              MongoDB Live Database Explorer
            </h1>
          </div>
          <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.95rem' }}>
            Inspect all collections, schemas, and live records stored in the College Admission System MongoDB database.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            onClick={fetchDbData}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.65rem 1.25rem',
              background: '#2563eb',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}
          >
            <RefreshCw size={16} className={loading ? 'spin' : ''} />
            Refresh Data
          </button>
          <button
            onClick={handleCopyJson}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.65rem 1.25rem',
              background: 'rgba(255,255,255,0.1)',
              color: '#ffffff',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '8px',
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}
          >
            {copied ? <Check size={16} color="#4ade80" /> : <Copy size={16} />}
            {copied ? 'Copied JSON!' : 'Copy Raw JSON'}
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      {data && data.summary && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          <div
            onClick={() => setActiveTab('students')}
            style={{
              background: '#ffffff',
              border: activeTab === 'students' ? '2px solid #2563eb' : '1px solid #e2e8f0',
              borderRadius: '12px',
              padding: '1.25rem',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>Students</span>
              <Users size={18} color="#2563eb" />
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1e293b' }}>{data.summary.totalStudents}</div>
          </div>

          <div
            onClick={() => setActiveTab('applications')}
            style={{
              background: '#ffffff',
              border: activeTab === 'applications' ? '2px solid #2563eb' : '1px solid #e2e8f0',
              borderRadius: '12px',
              padding: '1.25rem',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>Applications</span>
              <FileText size={18} color="#8b5cf6" />
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1e293b' }}>{data.summary.totalApplications}</div>
          </div>

          <div
            onClick={() => setActiveTab('documents')}
            style={{
              background: '#ffffff',
              border: activeTab === 'documents' ? '2px solid #2563eb' : '1px solid #e2e8f0',
              borderRadius: '12px',
              padding: '1.25rem',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>Documents</span>
              <CheckCircle size={18} color="#10b981" />
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1e293b' }}>{data.summary.totalDocuments}</div>
          </div>

          <div
            onClick={() => setActiveTab('notifications')}
            style={{
              background: '#ffffff',
              border: activeTab === 'notifications' ? '2px solid #2563eb' : '1px solid #e2e8f0',
              borderRadius: '12px',
              padding: '1.25rem',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>Notifications</span>
              <Bell size={18} color="#f59e0b" />
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1e293b' }}>{data.summary.totalNotifications}</div>
          </div>

          <div
            onClick={() => setActiveTab('admins')}
            style={{
              background: '#ffffff',
              border: activeTab === 'admins' ? '2px solid #2563eb' : '1px solid #e2e8f0',
              borderRadius: '12px',
              padding: '1.25rem',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>Admin Staff</span>
              <Shield size={18} color="#ef4444" />
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1e293b' }}>{data.summary.totalAdmins}</div>
          </div>
        </div>
      )}

      {/* Navigation Tabs & Search */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
        marginBottom: '1.5rem',
        borderBottom: '1px solid #e2e8f0',
        paddingBottom: '0.75rem'
      }}>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {[
            { id: 'summary', label: 'Overview & Stats', icon: Layers },
            { id: 'students', label: 'Students', icon: Users },
            { id: 'applications', label: 'Applications', icon: FileText },
            { id: 'documents', label: 'Documents', icon: CheckCircle },
            { id: 'notifications', label: 'Notifications', icon: Bell },
            { id: 'admins', label: 'Admins', icon: Shield },
            { id: 'rawJson', label: 'Raw JSON', icon: Database }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  border: 'none',
                  background: isActive ? '#2563eb' : 'transparent',
                  color: isActive ? '#ffffff' : '#64748b',
                  fontWeight: 600,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {activeTab !== 'summary' && activeTab !== 'rawJson' && (
          <div style={{ position: 'relative', width: '260px' }}>
            <Search size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input
              type="text"
              placeholder="Search in records..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem 0.75rem 0.5rem 2.2rem',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '0.85rem'
              }}
            />
          </div>
        )}
      </div>

      {/* Main Content Area */}
      {loading && (
        <div style={{ textAlign: 'center', padding: '4rem 0', color: '#64748b' }}>
          <RefreshCw size={32} className="spin" style={{ margin: '0 auto 1rem', display: 'block', color: '#2563eb' }} />
          <p style={{ fontWeight: 600 }}>Connecting to MongoDB and loading collections...</p>
        </div>
      )}

      {error && (
        <div style={{ padding: '1.5rem', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '12px', color: '#dc2626' }}>
          <strong>Error connecting to database:</strong> {error}
        </div>
      )}

      {!loading && !error && data && (
        <div style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
          {/* TAB 1: SUMMARY */}
          {activeTab === 'summary' && (
            <div style={{ padding: '2rem' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '1rem', color: '#1e293b' }}>
                Database Architecture & Information
              </h3>
              <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '2rem' }}>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '0.75rem 0', fontWeight: 600, color: '#64748b', width: '220px' }}>Database Engine</td>
                    <td style={{ padding: '0.75rem 0', color: '#1e293b', fontWeight: 600 }}>MongoDB / Mongoose ODM</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '0.75rem 0', fontWeight: 600, color: '#64748b' }}>Backend Server URL</td>
                    <td style={{ padding: '0.75rem 0', color: '#2563eb', fontWeight: 600 }}>http://127.0.0.1:5000</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '0.75rem 0', fontWeight: 600, color: '#64748b' }}>Direct REST API Inspector URL</td>
                    <td style={{ padding: '0.75rem 0', color: '#2563eb' }}>
                      <a href="http://127.0.0.1:5000/api/dev/db-summary" target="_blank" rel="noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>
                        http://127.0.0.1:5000/api/dev/db-summary
                      </a>
                    </td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '0.75rem 0', fontWeight: 600, color: '#64748b' }}>Connected Collections</td>
                    <td style={{ padding: '0.75rem 0', color: '#1e293b' }}>students, applications, documents, admins, notifications</td>
                  </tr>
                </tbody>
              </table>

              <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem', color: '#1e293b' }}>
                Portal Navigation
              </h4>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <a href="/student/dashboard" style={{ padding: '0.5rem 1rem', background: '#f1f5f9', borderRadius: '6px', color: '#1e293b', textDecoration: 'none', fontWeight: 600, fontSize: '0.85rem' }}>
                  Student Portal
                </a>
                <a href="/admin/dashboard" style={{ padding: '0.5rem 1rem', background: '#f1f5f9', borderRadius: '6px', color: '#1e293b', textDecoration: 'none', fontWeight: 600, fontSize: '0.85rem' }}>
                  Admin Dashboard
                </a>
                <a href="/admin/applications" style={{ padding: '0.5rem 1rem', background: '#f1f5f9', borderRadius: '6px', color: '#1e293b', textDecoration: 'none', fontWeight: 600, fontSize: '0.85rem' }}>
                  Admin Applications List
                </a>
              </div>
            </div>
          )}

          {/* TAB 2: STUDENTS */}
          {activeTab === 'students' && (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', textAlign: 'left', color: '#64748b' }}>
                    <th style={{ padding: '0.85rem 1rem' }}>Student ID</th>
                    <th style={{ padding: '0.85rem 1rem' }}>Name</th>
                    <th style={{ padding: '0.85rem 1rem' }}>Email</th>
                    <th style={{ padding: '0.85rem 1rem' }}>Phone</th>
                    <th style={{ padding: '0.85rem 1rem' }}>Role</th>
                    <th style={{ padding: '0.85rem 1rem' }}>Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {filterList(data.collections.students).map(stu => (
                    <tr key={stu._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '0.85rem 1rem', fontWeight: 600, color: '#2563eb' }}>{stu.Student_ID}</td>
                      <td style={{ padding: '0.85rem 1rem', fontWeight: 600, color: '#1e293b' }}>{stu.Name}</td>
                      <td style={{ padding: '0.85rem 1rem', color: '#64748b' }}>{stu.Email}</td>
                      <td style={{ padding: '0.85rem 1rem', color: '#64748b' }}>{stu.Phone}</td>
                      <td style={{ padding: '0.85rem 1rem' }}>
                        <span style={{ padding: '0.2rem 0.5rem', background: '#eff6ff', color: '#2563eb', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>
                          {stu.Role || 'student'}
                        </span>
                      </td>
                      <td style={{ padding: '0.85rem 1rem', color: '#94a3b8', fontSize: '0.8rem' }}>
                        {new Date(stu.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 3: APPLICATIONS */}
          {activeTab === 'applications' && (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', textAlign: 'left', color: '#64748b' }}>
                    <th style={{ padding: '0.85rem 1rem' }}>Application ID</th>
                    <th style={{ padding: '0.85rem 1rem' }}>Student ID</th>
                    <th style={{ padding: '0.85rem 1rem' }}>Applicant Name</th>
                    <th style={{ padding: '0.85rem 1rem' }}>Program</th>
                    <th style={{ padding: '0.85rem 1rem' }}>Status</th>
                    <th style={{ padding: '0.85rem 1rem' }}>Merit Score</th>
                  </tr>
                </thead>
                <tbody>
                  {filterList(data.collections.applications).map(app => (
                    <tr key={app._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '0.85rem 1rem', fontWeight: 700, color: '#8b5cf6' }}>{app.Application_ID}</td>
                      <td style={{ padding: '0.85rem 1rem', color: '#64748b' }}>{app.Student_ID}</td>
                      <td style={{ padding: '0.85rem 1rem', fontWeight: 600, color: '#1e293b' }}>{app.FullName}</td>
                      <td style={{ padding: '0.85rem 1rem', color: '#334155' }}>{app.Program}</td>
                      <td style={{ padding: '0.85rem 1rem' }}>
                        <span style={{
                          padding: '0.25rem 0.6rem',
                          borderRadius: '999px',
                          fontSize: '0.78rem',
                          fontWeight: 600,
                          background: app.Status === 'Approved' ? '#dcfce7' : app.Status === 'Under Review' ? '#fef3c7' : '#eff6ff',
                          color: app.Status === 'Approved' ? '#16a34a' : app.Status === 'Under Review' ? '#d97706' : '#2563eb'
                        }}>
                          {app.Status}
                        </span>
                      </td>
                      <td style={{ padding: '0.85rem 1rem', fontWeight: 600, color: '#1e293b' }}>{app.MeritScore || '—'}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 4: DOCUMENTS */}
          {activeTab === 'documents' && (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', textAlign: 'left', color: '#64748b' }}>
                    <th style={{ padding: '0.85rem 1rem' }}>Document ID</th>
                    <th style={{ padding: '0.85rem 1rem' }}>Application ID</th>
                    <th style={{ padding: '0.85rem 1rem' }}>Document Type</th>
                    <th style={{ padding: '0.85rem 1rem' }}>File Name</th>
                    <th style={{ padding: '0.85rem 1rem' }}>Status</th>
                    <th style={{ padding: '0.85rem 1rem' }}>Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {filterList(data.collections.documents).map(doc => (
                    <tr key={doc._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '0.85rem 1rem', fontWeight: 600, color: '#059669' }}>{doc.Document_ID}</td>
                      <td style={{ padding: '0.85rem 1rem', color: '#64748b' }}>{doc.Application_ID}</td>
                      <td style={{ padding: '0.85rem 1rem', fontWeight: 600, color: '#1e293b' }}>{doc.Document_Type}</td>
                      <td style={{ padding: '0.85rem 1rem', color: '#64748b' }}>{doc.File_Name}</td>
                      <td style={{ padding: '0.85rem 1rem' }}>
                        <span style={{
                          padding: '0.2rem 0.55rem',
                          borderRadius: '999px',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          background: doc.Verification_Status === 'Verified' ? '#dcfce7' : doc.Verification_Status === 'Rejected' ? '#fee2e2' : '#fef3c7',
                          color: doc.Verification_Status === 'Verified' ? '#16a34a' : doc.Verification_Status === 'Rejected' ? '#dc2626' : '#d97706'
                        }}>
                          {doc.Verification_Status}
                        </span>
                      </td>
                      <td style={{ padding: '0.85rem 1rem', color: '#64748b', fontSize: '0.82rem' }}>{doc.Remarks || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 5: NOTIFICATIONS */}
          {activeTab === 'notifications' && (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', textAlign: 'left', color: '#64748b' }}>
                    <th style={{ padding: '0.85rem 1rem' }}>Recipient Student</th>
                    <th style={{ padding: '0.85rem 1rem' }}>Title</th>
                    <th style={{ padding: '0.85rem 1rem' }}>Message</th>
                    <th style={{ padding: '0.85rem 1rem' }}>Status</th>
                    <th style={{ padding: '0.85rem 1rem' }}>Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {filterList(data.collections.notifications).map(notif => (
                    <tr key={notif._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '0.85rem 1rem', fontWeight: 600, color: '#2563eb' }}>{notif.Student_ID}</td>
                      <td style={{ padding: '0.85rem 1rem', fontWeight: 600, color: '#1e293b' }}>{notif.Title}</td>
                      <td style={{ padding: '0.85rem 1rem', color: '#64748b' }}>{notif.Message}</td>
                      <td style={{ padding: '0.85rem 1rem' }}>
                        <span style={{
                          padding: '0.2rem 0.5rem',
                          borderRadius: '4px',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          background: notif.Status === 'Unread' ? '#fef3c7' : '#f1f5f9',
                          color: notif.Status === 'Unread' ? '#d97706' : '#64748b'
                        }}>
                          {notif.Status}
                        </span>
                      </td>
                      <td style={{ padding: '0.85rem 1rem', color: '#94a3b8', fontSize: '0.8rem' }}>
                        {new Date(notif.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 6: ADMINS */}
          {activeTab === 'admins' && (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', textAlign: 'left', color: '#64748b' }}>
                    <th style={{ padding: '0.85rem 1rem' }}>Admin ID</th>
                    <th style={{ padding: '0.85rem 1rem' }}>Staff Name</th>
                    <th style={{ padding: '0.85rem 1rem' }}>Email</th>
                    <th style={{ padding: '0.85rem 1rem' }}>Role</th>
                    <th style={{ padding: '0.85rem 1rem' }}>Department</th>
                  </tr>
                </thead>
                <tbody>
                  {filterList(data.collections.admins).map(adm => (
                    <tr key={adm._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '0.85rem 1rem', fontWeight: 600, color: '#ef4444' }}>{adm.Admin_ID}</td>
                      <td style={{ padding: '0.85rem 1rem', fontWeight: 600, color: '#1e293b' }}>{adm.Name}</td>
                      <td style={{ padding: '0.85rem 1rem', color: '#64748b' }}>{adm.Email}</td>
                      <td style={{ padding: '0.85rem 1rem', color: '#1e293b', fontWeight: 600 }}>{adm.Role}</td>
                      <td style={{ padding: '0.85rem 1rem', color: '#64748b' }}>{adm.Department}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 7: RAW JSON */}
          {activeTab === 'rawJson' && (
            <div style={{ padding: '1rem', background: '#0f172a', color: '#38bdf8', overflowX: 'auto' }}>
              <pre style={{ margin: 0, fontSize: '0.82rem', fontFamily: 'monospace', lineHeight: 1.5 }}>
                {JSON.stringify(data, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
