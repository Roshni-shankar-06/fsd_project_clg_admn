import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  GraduationCap, 
  LayoutDashboard, 
  FileText, 
  UploadCloud, 
  Activity, 
  Bell, 
  LogOut, 
  User, 
  HelpCircle,
  Sparkles,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

export default function StudentSidebar({ isOpen, onClose }) {
  const { currentUser, currentStudentApp, unreadCount, logout } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/student/login');
  };

  const navItems = [
    {
      to: "/student/dashboard",
      icon: LayoutDashboard,
      label: "Dashboard",
      badge: null
    },
    {
      to: "/student/application",
      icon: FileText,
      label: "Application Form",
      badge: currentStudentApp?.status ? "Complete" : "Pending"
    },
    {
      to: "/student/documents",
      icon: UploadCloud,
      label: "Document Upload",
      badge: `${currentStudentApp?.verifiedDocsCount || 5}/6`
    },
    {
      to: "/student/status",
      icon: Activity,
      label: "Application Status",
      badge: currentStudentApp?.status || "Live"
    },
    {
      to: "/student/notifications",
      icon: Bell,
      label: "Notifications",
      badge: unreadCount > 0 ? `${unreadCount} New` : null,
      badgeType: "danger"
    }
  ];

  return (
    <aside className={`portal-sidebar ${isOpen ? 'open' : ''}`}>
      {/* Sidebar Header */}
      <div className="sidebar-header">
        <div className="flex items-center gap-2">
          <div className="logo-icon-box" style={{ width: '36px', height: '36px' }}>
            <GraduationCap size={20} />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0f172a' }}>APEX PORTAL</div>
            <div style={{ fontSize: '0.68rem', color: '#64748b', fontWeight: 600 }}>CANDIDATE SUITE</div>
          </div>
        </div>
        <span className="sidebar-badge student">Student</span>
      </div>

      {/* Navigation links */}
      <nav className="sidebar-nav">
        <div className="sidebar-nav-heading">Main Navigation</div>

        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
            >
              <div className="sidebar-nav-left">
                <Icon size={18} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className={`badge ${item.badgeType === 'danger' ? 'badge-danger' : 'badge-primary'}`} style={{ fontSize: '0.68rem' }}>
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}

        <div className="sidebar-nav-heading" style={{ marginTop: '1rem' }}>Support & Quick Switch</div>
        
        <NavLink to="/admin/dashboard" className="sidebar-nav-item" style={{ background: '#fef3c7', color: '#92400e' }}>
          <div className="sidebar-nav-left">
            <ShieldCheck size={18} />
            <span>Switch to Admin</span>
          </div>
        </NavLink>

        <NavLink to="/db-viewer" className="sidebar-nav-item" style={{ background: '#eff6ff', color: '#1e40af' }}>
          <div className="sidebar-nav-left">
            <LayoutDashboard size={18} />
            <span>Live Database Explorer</span>
          </div>
        </NavLink>

        <a 
          href="#helpdesk" 
          onClick={(e) => { e.preventDefault(); alert("Admissions Helpline: +91 080 4567-8900\nEmail: admissions@apex.edu\nOffice Hours: Mon-Sat 9AM-5PM"); }}
          className="sidebar-nav-item"
        >
          <div className="sidebar-nav-left">
            <HelpCircle size={18} />
            <span>Admissions Helpdesk</span>
          </div>
        </a>
      </nav>

      {/* User info card & Logout */}
      <div className="sidebar-footer">
        <div className="user-profile-widget" style={{ marginBottom: '0.75rem' }}>
          <div className="user-avatar">
            {currentUser?.avatar || "ST"}
          </div>
          <div className="user-info-text">
            <div className="user-name">{currentUser?.name || "Aarav Sharma"}</div>
            <div className="user-role">ID: {currentStudentApp?.refNumber || "APX-2026-8891"}</div>
          </div>
        </div>

        <button 
          onClick={handleLogout} 
          className="btn btn-secondary btn-block btn-sm"
          style={{ justifyContent: 'center' }}
        >
          <LogOut size={15} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
