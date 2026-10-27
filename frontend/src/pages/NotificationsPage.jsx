import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  Bell, 
  CheckCheck, 
  FileCheck2, 
  Award, 
  AlertCircle, 
  Info, 
  ArrowRight,
  Filter
} from 'lucide-react';

export default function NotificationsPage() {
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead } = useApp();
  const [filterCategory, setFilterCategory] = useState('all');

  const filteredNotifs = filterCategory === 'all'
    ? notifications
    : notifications.filter(n => n.category === filterCategory);

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'admission':
      case 'success':
        return <Award size={20} color="var(--primary-600)" />;
      case 'document':
        return <FileCheck2 size={20} color="var(--success-dark)" />;
      case 'alert':
        return <AlertCircle size={20} color="var(--warning-dark)" />;
      default:
        return <Info size={20} color="var(--info-dark)" />;
    }
  };

  return (
    <div>
      {/* Page Header */}
      <div className="flex items-center justify-between flex-wrap gap-4" style={{ marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--primary-dark)' }}>
            Admission Notifications & Alerts
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Real-time updates regarding scrutiny status, document approvals, and merit lists.
          </p>
        </div>

        <button 
          onClick={markAllNotificationsAsRead} 
          className="btn btn-secondary btn-sm"
        >
          <CheckCheck size={16} />
          <span>Mark All as Read</span>
        </button>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 flex-wrap" style={{ marginBottom: '1.5rem' }}>
        <button
          onClick={() => setFilterCategory('all')}
          className={`btn btn-sm ${filterCategory === 'all' ? 'btn-primary' : 'btn-secondary'}`}
        >
          All Notifications ({notifications.length})
        </button>
        <button
          onClick={() => setFilterCategory('admission')}
          className={`btn btn-sm ${filterCategory === 'admission' ? 'btn-primary' : 'btn-secondary'}`}
        >
          Admission Updates
        </button>
        <button
          onClick={() => setFilterCategory('document')}
          className={`btn btn-sm ${filterCategory === 'document' ? 'btn-primary' : 'btn-secondary'}`}
        >
          Document Alerts
        </button>
        <button
          onClick={() => setFilterCategory('alert')}
          className={`btn btn-sm ${filterCategory === 'alert' ? 'btn-primary' : 'btn-secondary'}`}
        >
          Merit & Schedule Notices
        </button>
      </div>

      {/* Notification Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        {filteredNotifs.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
            <Bell size={40} color="var(--text-light)" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ fontSize: '1.1rem', color: 'var(--text-main)', marginBottom: '0.25rem' }}>No notifications found</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>You're completely up to date with admission announcements.</p>
          </div>
        ) : (
          filteredNotifs.map((notif) => (
            <div
              key={notif.id}
              className={`notification-card ${!notif.read ? 'unread' : ''}`}
              onClick={() => markNotificationAsRead(notif.id)}
            >
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: 'var(--radius-md)',
                background: !notif.read ? 'var(--primary-100)' : 'var(--bg-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                {getCategoryIcon(notif.category)}
              </div>

              <div style={{ flex: 1 }}>
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span style={{ fontWeight: 800, fontSize: '0.975rem', color: 'var(--text-main)' }}>
                      {notif.title}
                    </span>
                    {!notif.read && (
                      <span className="badge badge-danger" style={{ fontSize: '0.65rem' }}>New</span>
                    )}
                  </div>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    {notif.timestamp || notif.date}
                  </span>
                </div>

                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', margin: '0.4rem 0 0.75rem', lineHeight: '1.5' }}>
                  {notif.message}
                </p>

                {notif.actionUrl && (
                  <Link
                    to={notif.actionUrl}
                    className="btn btn-secondary btn-sm"
                    style={{ display: 'inline-flex', fontSize: '0.8rem', padding: '0.3rem 0.65rem' }}
                  >
                    <span>View Related Section</span>
                    <ArrowRight size={14} />
                  </Link>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
