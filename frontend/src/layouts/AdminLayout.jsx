import React, { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import AdminSidebar from '../components/AdminSidebar';
import { 
  Menu, 
  Bell, 
  LogOut, 
  GraduationCap, 
  ShieldCheck, 
  Search,
  Home
} from 'lucide-react';

export default function AdminLayout() {
  const { currentUser, applications, logout } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const pendingCount = applications.filter(a => a.status === 'Submitted' || a.status === 'Under Review').length;

  return (
    <div className="portal-layout">
      {/* Admin Sidebar */}
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Area */}
      <div className="portal-main">
        {/* Topbar */}
        <header className="portal-topbar" style={{ background: '#0f172a', color: '#ffffff', borderBottom: '1px solid #1e293b' }}>
          <div className="flex items-center gap-3">
            <button 
              className="btn btn-sm mobile-nav-toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle admin sidebar"
              style={{ color: '#ffffff' }}
            >
              <Menu size={18} />
            </button>
            <div className="flex items-center gap-2">
              <span className="live-pulse"></span>
              <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#ffffff' }}>ADMISSION COMMITTEE CONSOLE</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Pending Badge */}
            <Link to="/admin/applications" className="badge badge-gold" style={{ padding: '0.35rem 0.75rem' }}>
              {pendingCount} Pending Reviews
            </Link>

            {/* Switch to Student Portal */}
            <Link to="/student/dashboard" className="btn btn-sm btn-secondary" style={{ background: '#1e293b', color: '#93c5fd', borderColor: '#334155' }}>
              <GraduationCap size={15} />
              <span>Student View</span>
            </Link>

            {/* Sign Out */}
            <button 
              onClick={() => {
                logout();
                navigate('/admin/login');
              }} 
              className="btn btn-sm btn-secondary"
              title="Sign Out of Admin Console"
              style={{ background: '#1e293b', color: '#ffffff', borderColor: '#334155' }}
            >
              <LogOut size={16} />
            </button>
          </div>
        </header>

        {/* Admin Content */}
        <main className="portal-content-body">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
