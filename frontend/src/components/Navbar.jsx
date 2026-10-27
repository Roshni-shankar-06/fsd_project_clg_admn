import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  GraduationCap, 
  Menu, 
  X, 
  User, 
  ShieldCheck, 
  Bell, 
  LogOut, 
  ChevronRight,
  BookOpen,
  CheckCircle2
} from 'lucide-react';

export default function Navbar() {
  const { currentUser, logout, unreadCount } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isPublicPage = ['/', '/student/login', '/student/register', '/admin/login'].includes(location.pathname);

  return (
    <>
      {/* Top University Announcement Bar */}
      <div className="ticker-banner">
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="live-pulse"></span>
            <span style={{ fontWeight: 600, fontSize: '0.8rem', color: '#93c5fd' }}>ADMISSIONS 2026-27:</span>
            <span style={{ fontSize: '0.8rem', color: '#e2e8f0' }}>Phase 1 Application Deadline: October 15, 2026. Early Merit Scholarships Open.</span>
          </div>
          <div className="flex items-center gap-4" style={{ fontSize: '0.78rem' }}>
            <Link to="/db-viewer" style={{ color: '#60a5fa', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <span>🔍 Live Database</span>
            </Link>
            <span style={{ color: '#64748b' }}>|</span>
            <Link to="/admin/login" style={{ color: '#93c5fd', fontWeight: 600 }}>Staff Portal</Link>
          </div>
        </div>
      </div>

      <header className="public-navbar">
        <div className="container nav-container">
          {/* Logo */}
          <Link to="/" className="brand-logo" onClick={() => setMobileMenuOpen(false)}>
            <div className="logo-icon-box">
              <GraduationCap size={26} />
            </div>
            <div className="logo-text-wrapper">
              <span className="logo-title">APEX UNIVERSITY</span>
              <span className="logo-subtitle">Office of Admissions</span>
            </div>
          </Link>

          {/* Nav Links */}
          <nav className="nav-links">
            <Link to="/" className={`nav-link-item ${location.pathname === '/' ? 'active' : ''}`}>
              Home
            </Link>
            <a href="/#programs" className="nav-link-item">
              Programs
            </a>
            <a href="/#process" className="nav-link-item">
              Admission Steps
            </a>
            <a href="/#deadlines" className="nav-link-item">
              Key Dates
            </a>
            <a href="/#faqs" className="nav-link-item">
              FAQs
            </a>
          </nav>

          {/* Action Buttons / Auth State */}
          <div className="nav-actions">
            {currentUser ? (
              <div className="flex items-center gap-3">
                {currentUser.role === 'student' ? (
                  <Link to="/student/dashboard" className="btn btn-primary btn-sm">
                    <User size={16} />
                    <span>Student Dashboard</span>
                  </Link>
                ) : (
                  <Link to="/admin/dashboard" className="btn btn-accent btn-sm">
                    <ShieldCheck size={16} />
                    <span>Admin Console</span>
                  </Link>
                )}

                <Link to={currentUser.role === 'student' ? "/student/notifications" : "/admin/dashboard"} className="btn btn-secondary btn-sm" title="Notifications" style={{ padding: '0.4rem 0.6rem', position: 'relative' }}>
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

                <button
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                  className="btn btn-secondary btn-sm"
                  title="Logout"
                >
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/student/login" className="btn btn-secondary btn-sm">
                  Student Login
                </Link>
                <Link to="/student/register" className="btn btn-primary btn-sm">
                  Apply Now
                </Link>
              </div>
            )}

            {/* Mobile Hamburger Toggle */}
            <button 
              className="mobile-nav-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="mobile-menu-drawer">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="nav-link-item">Home</Link>
            <a href="/#programs" onClick={() => setMobileMenuOpen(false)} className="nav-link-item">Academic Programs</a>
            <a href="/#process" onClick={() => setMobileMenuOpen(false)} className="nav-link-item">Admission Process</a>
            <a href="/#deadlines" onClick={() => setMobileMenuOpen(false)} className="nav-link-item">Important Dates</a>
            
            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {currentUser ? (
                <>
                  <Link 
                    to={currentUser.role === 'student' ? "/student/dashboard" : "/admin/dashboard"} 
                    onClick={() => setMobileMenuOpen(false)}
                    className="btn btn-primary btn-block"
                  >
                    Go to {currentUser.role === 'student' ? 'Student' : 'Admin'} Dashboard
                  </Link>
                  <button 
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                      navigate('/');
                    }}
                    className="btn btn-secondary btn-block"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/student/login" onClick={() => setMobileMenuOpen(false)} className="btn btn-secondary btn-block">
                    Student Login
                  </Link>
                  <Link to="/student/register" onClick={() => setMobileMenuOpen(false)} className="btn btn-primary btn-block">
                    New Student Registration
                  </Link>
                  <Link to="/admin/login" onClick={() => setMobileMenuOpen(false)} className="btn btn-secondary btn-block" style={{ marginTop: '0.5rem' }}>
                    <ShieldCheck size={16} /> Admission Staff Login
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
