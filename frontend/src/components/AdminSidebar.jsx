import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, 
  LayoutDashboard, 
  Users, 
  FileCheck2, 
  ClipboardList, 
  Sliders, 
  LogOut, 
  User, 
  GraduationCap,
  ArrowRightLeft,
  Bell
} from 'lucide-react';

export default function AdminSidebar({ isOpen, onClose }) {
  const { currentUser, applications, logout } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const totalApps = applications.length;
  const pendingApps = applications.filter(a => a.status === 'Submitted' || a.status === 'Under Review').length;

  const navItems = [
    {
      to: "/admin/dashboard",
      icon: LayoutDashboard,
      label: "Dashboard",
      badge: null
    },
    {
      to: "/admin/applications",
      icon: Users,
      label: "Applications",
      badge: `${totalApps}`
    },
    {
      to: "/admin/applications?tab=documents",
      icon: FileCheck2,
      label: "Document Verification",
      badge: `${pendingApps} Pending`,
      badgeType: "gold"
    },
    {
      to: `/admin/review/${applications[0]?.id || 'APP-2026-001'}`,
      icon: ClipboardList,
      label: "Application Review",
      badge: "Queue"
    },
    {
      to: "/admin/applications?tab=status",
      icon: Sliders,
      label: "Status Management",
      badge: null
    },
    {
      to: "/db-viewer",
      icon: LayoutDashboard,
      label: "Live Database Explorer",
      badge: "MongoDB",
      badgeType: "gold"
    }
  ];

  return (
    <aside className={`portal-sidebar ${isOpen ? 'open' : ''}`}>
      {/* Sidebar Header */}
      <div className="sidebar-header">
        <div className="flex items-center gap-2">
          <div className="logo-icon-box" style={{ width: '36px', height: '36px', background: 'linear-gradient(135deg, #0f172a, #1e293b)' }}>
            <ShieldCheck size={20} color="#f59e0b" />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0f172a' }}>APEX ADMISSIONS</div>
            <div style={{ fontSize: '0.68rem', color: '#64748b', fontWeight: 600 }}>ADMINISTRATION DESK</div>
          </div>
        </div>
        <span className="sidebar-badge admin">Staff</span>
      </div>

      {/* Navigation links */}
      <nav className="sidebar-nav">
        <div className="sidebar-nav-heading">Administrative Tools</div>

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
                <span className={`badge ${item.badgeType === 'gold' ? 'badge-gold' : 'badge-primary'}`} style={{ fontSize: '0.68rem' }}>
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}

        <div className="sidebar-nav-heading" style={{ marginTop: '1rem' }}>Mode Switch</div>

        <NavLink to="/student/dashboard" className="sidebar-nav-item" style={{ background: 'var(--primary-50)', color: 'var(--primary-700)' }}>
          <div className="sidebar-nav-left">
            <GraduationCap size={18} />
            <span>Switch to Student View</span>
          </div>
        </NavLink>
      </nav>

      {/* Admin Profile & Logout */}
      <div className="sidebar-footer">
        <div className="user-profile-widget" style={{ marginBottom: '0.75rem' }}>
          <div className="user-avatar" style={{ background: 'linear-gradient(135deg, #0f172a, #d97706)' }}>
            {currentUser?.avatar || "AD"}
          </div>
          <div className="user-info-text">
            <div className="user-name">{currentUser?.name || "Dr. Vikram Menon"}</div>
            <div className="user-role">{currentUser?.designation || "Admissions Dean"}</div>
          </div>
        </div>

        <button 
          onClick={handleLogout} 
          className="btn btn-secondary btn-block btn-sm"
          style={{ justifyContent: 'center' }}
        >
          <LogOut size={15} />
          <span>Exit Admin Portal</span>
        </button>
      </div>
    </aside>
  );
}
