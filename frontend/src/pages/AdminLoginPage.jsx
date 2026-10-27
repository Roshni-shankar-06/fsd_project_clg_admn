import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  ArrowRight, 
  AlertCircle, 
  KeyRound, 
  GraduationCap, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export default function AdminLoginPage() {
  const { login, showToast } = useApp();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: 'admin@apex.edu',
    password: 'adminpassword',
    role: 'dean'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleQuickFill = () => {
    setFormData({
      email: 'admin@apex.edu',
      password: 'adminpassword',
      role: 'dean'
    });
    setErrors({});
    showToast("Filled Admissions Dean staff credentials!", "info");
  };

  const validate = () => {
    const errs = {};
    if (!formData.email) errs.email = "Staff email or Employee ID is required";
    if (!formData.password) errs.password = "Staff Security PIN or Password is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      login('admin', {
        email: formData.email,
        name: "Dr. Vikram Menon",
        designation: "Chief Admissions Dean & Registrar"
      });
      setIsSubmitting(false);
      navigate('/admin/dashboard');
    }, 600);
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 180px)', background: '#0b1329', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3.5rem 1rem' }}>
      <div style={{ maxWidth: '460px', width: '100%' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, #1e3a8a, #2563eb)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.25rem',
            boxShadow: '0 10px 25px rgba(37, 99, 235, 0.4)',
            color: '#ffffff'
          }}>
            <ShieldCheck size={34} />
          </div>

          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.35rem' }}>
            Admissions Directorate Desk
          </h1>
          <p style={{ fontSize: '0.875rem', color: '#94a3b8' }}>
            Restricted staff access for application scrutiny, document verification & seat allotment.
          </p>
        </div>

        {/* Demo Fast Fill */}
        <div style={{
          background: 'rgba(30, 58, 138, 0.4)',
          border: '1px solid rgba(59, 130, 246, 0.3)',
          borderRadius: 'var(--radius-md)',
          padding: '0.85rem 1rem',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          color: '#e2e8f0'
        }}>
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#93c5fd' }}>
              🔑 Staff Demo Credentials:
            </div>
            <div style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>
              admin@apex.edu (Chief Admissions Dean)
            </div>
          </div>
          <button 
            type="button" 
            onClick={handleQuickFill}
            className="btn btn-sm"
            style={{ background: '#2563eb', color: '#fff', fontSize: '0.75rem', padding: '0.3rem 0.65rem' }}
          >
            <Sparkles size={13} />
            <span>Autofill</span>
          </button>
        </div>

        {/* Card */}
        <div className="card" style={{ background: '#ffffff', padding: '2rem', boxShadow: '0 20px 30px rgba(0,0,0,0.3)' }}>
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label className="form-label" htmlFor="email">
                Staff Email / Employee ID <span className="required">*</span>
              </label>
              <input
                id="email"
                type="text"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                placeholder="officer@apex.edu or EMP-1042"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              {errors.email && (
                <div className="form-error">
                  <AlertCircle size={14} />
                  <span>{errors.email}</span>
                </div>
              )}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="password">
                Security PIN / Password <span className="required">*</span>
              </label>
              <input
                id="password"
                type="password"
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                placeholder="••••••••••••"
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

            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <label className="form-label" htmlFor="role">
                Assigned Desk Role
              </label>
              <select
                id="role"
                className="form-control"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              >
                <option value="dean">Chief Admissions Dean & Registrar</option>
                <option value="verifier">Document Verification Officer</option>
                <option value="counselor">Academic Counselor</option>
                <option value="superuser">Super Administrator</option>
              </select>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary btn-block btn-lg"
              style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)' }}
              disabled={isSubmitting}
            >
              <ShieldCheck size={18} />
              <span>{isSubmitting ? "Authenticating..." : "Authorize & Enter Console"}</span>
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-subtle)', fontSize: '0.85rem' }}>
            <Link to="/student/login" style={{ color: 'var(--primary-600)', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <GraduationCap size={16} />
              <span>Looking for Student Portal? Click here</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
