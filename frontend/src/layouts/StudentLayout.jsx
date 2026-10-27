import React, { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import StudentSidebar from '../components/StudentSidebar';
import { 
  Menu, 
  Bell, 
  LogOut, 
  User, 
  ExternalLink, 
  ShieldCheck, 
  HelpCircle,
  Home
} from 'lucide-react';

export default function StudentLayout() {
  const { currentUser, unreadCount, logout } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="portal-layout">
      {/* Student Sidebar */}
      <StudentSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Area */}
      <div className="portal-main">
        {/* Portal Topbar */}
        <header className="portal-topbar">
          <div className="flex items-center gap-3">
            <button 
              className="btn btn-secondary btn-sm mobile-nav-toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle sidebar"
              style={{ display: 'inline-flex' }}
            >
              <Menu size={18} />
            </button>
            <Link to="/" className="flex items-center gap-2" style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              <Home size={16} />
              <span>Apex Portal</span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            {/* Notifications Button */}
            <Link 
              to="/student/notifications" 
              className="btn btn-secondary btn-sm"
              title="Notifications"
              style={{ position: 'relative', padding: '0.45rem 0.65rem' }}
            >
              <Bell size={16} />
              {unreadCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  background: 'var(--danger)',
                  color: '#fff',
                  fontSize: '0.65rem',
                  borderRadius: '50%',
                  width: '18px',
                  height: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700
                }}>
                  {unreadCount}
                </span>
              )}
            </Link>

            {/* Quick Switch to Admin Button */}
            <Link to="/admin/dashboard" className="btn btn-secondary btn-sm" style={{ background: '#fef3c7', color: '#92400e', border: '1px solid #fde68a' }}>
              <ShieldCheck size={15} />
              <span className="hide-mobile">Admin View</span>
            </Link>

            {/* User Dropdown / Sign out */}
            <button 
              onClick={() => {
                logout();
                navigate('/');
              }} 
              className="btn btn-secondary btn-sm"
              title="Sign Out"
            >
              <LogOut size={16} />
            </button>
          </div>
        </header>

        {/* Content Body */}
        <main className="portal-content-body">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
