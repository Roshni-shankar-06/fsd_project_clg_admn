import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  GraduationCap, 
  Mail, 
  Lock, 
  ArrowRight, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2,
  Sparkles,
  UserCheck
} from 'lucide-react';

export default function StudentLoginPage() {
  const { login, showToast } = useApp();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: true
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Quick Demo Auto-fill
  const handleQuickFill = () => {
    setFormData({
      email: 'aarav.sharma@example.com',
      password: 'password123',
      rememberMe: true
    });
    setErrors({});
    showToast("Filled demo student credentials (Aarav Sharma)!", "info");
  };

  const validate = () => {
    const errs = {};
    if (!formData.email) {
      errs.email = "Email or Application ID is required";
    } else if (!formData.email.includes('@') && !formData.email.startsWith('APX')) {
      errs.email = "Please enter a valid email or Application ID (e.g., APX-2026-8891)";
    }

    if (!formData.password) {
      errs.password = "Password is required";
    } else if (formData.password.length < 4) {
      errs.password = "Password must be at least 4 characters";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      login('student', {
        email: formData.email,
        name: formData.email.includes('aarav') ? "Aarav Sharma" : "Registered Student"
      });
      setIsSubmitting(false);
      navigate('/student/dashboard');
    }, 600);
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 180px)', background: 'var(--bg-page)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem 1rem' }}>
      <div style={{ maxWidth: '460px', width: '100%' }}>
        {/* Card Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div className="logo-icon-box" style={{ width: '56px', height: '56px', margin: '0 auto 1rem' }}>
            <GraduationCap size={32} />
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary-dark)', marginBottom: '0.35rem' }}>
            Candidate Portal Login
          </h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Access your admission application, document uploads, and real-time status.
          </p>
        </div>

        {/* Quick Demo Credentials Box */}
        <div style={{
          background: 'var(--primary-50)',
          border: '1px solid var(--primary-100)',
          borderRadius: 'var(--radius-md)',
          padding: '0.85rem 1rem',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.5rem'
        }}>
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary-900)' }}>
              🎯 Demo Testing Account:
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--primary-700)' }}>
              aarav.sharma@example.com (B.Tech CS Applicant)
            </div>
          </div>
          <button 
            type="button" 
            onClick={handleQuickFill}
            className="btn btn-primary btn-sm"
            style={{ fontSize: '0.75rem', padding: '0.3rem 0.65rem' }}
          >
            <Sparkles size={13} />
            <span>1-Click Fill</span>
          </button>
        </div>

        {/* Login Card */}
        <div className="card" style={{ padding: '2rem', boxShadow: 'var(--shadow-lg)' }}>
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label className="form-label" htmlFor="email">
                Email Address / Application ID <span className="required">*</span>
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  id="email"
                  type="text"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  placeholder="student@example.com or APX-2026-8891"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              {errors.email && (
                <div className="form-error">
                  <AlertCircle size={14} />
                  <span>{errors.email}</span>
                </div>
              )}
            </div>

            <div className="form-group">
              <div className="flex items-center justify-between">
                <label className="form-label" htmlFor="password">
                  Password <span className="required">*</span>
                </label>
                <a href="#forgot" onClick={(e) => { e.preventDefault(); alert("Password reset link has been simulated to your email."); }} style={{ fontSize: '0.78rem' }}>
                  Forgot Password?
                </a>
              </div>
              <input
                id="password"
                type="password"
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              {errors.password && (
                <div className="form-error">
                  <AlertCircle size={14} />
                  <span>{errors.password}</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between" style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                />
                <span>Remember my credentials</span>
              </label>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary btn-block btn-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing In..." : "Sign In to Dashboard"}
              {!isSubmitting && <ArrowRight size={18} />}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-subtle)', fontSize: '0.875rem' }}>
            <span>New applicant? </span>
            <Link to="/student/register" style={{ fontWeight: 700 }}>
              Create an Account & Apply
            </Link>
          </div>
        </div>

        {/* Staff switch */}
        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.825rem' }}>
          <Link to="/admin/login" style={{ color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
            <ShieldCheck size={16} />
            <span>Are you an Admission Staff Officer? Click here for Admin Login</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
