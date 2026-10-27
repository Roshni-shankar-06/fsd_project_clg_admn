import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  GraduationCap, 
  User, 
  Mail, 
  Phone, 
  Lock, 
  ArrowRight, 
  AlertCircle, 
  Sparkles,
  BookOpen,
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';

export default function StudentRegisterPage() {
  const { programs, registerStudent, showToast } = useApp();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    programId: programs[0]?.id || 'prog-1',
    password: '',
    confirmPassword: '',
    termsAgreed: true
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fast Demo Autofill
  const handleQuickFill = () => {
    setFormData({
      name: 'Vikrant Deshmukh',
      email: 'vikrant.d@example.com',
      phone: '+91 98765 12345',
      programId: 'prog-1',
      password: 'password123',
      confirmPassword: 'password123',
      termsAgreed: true
    });
    setErrors({});
    showToast("Filled demo registration form!", "info");
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = "Full Name is required";
    }

    if (!formData.email.trim()) {
      errs.email = "Email Address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = "Please enter a valid email address (e.g. name@example.com)";
    }

    if (!formData.phone.trim()) {
      errs.phone = "Mobile phone number is required";
    } else if (formData.phone.replace(/\D/g, '').length < 10) {
      errs.phone = "Please enter a valid 10-digit mobile number";
    }

    if (!formData.password) {
      errs.password = "Password is required";
    } else if (formData.password.length < 6) {
      errs.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      errs.confirmPassword = "Passwords do not match";
    }

    if (!formData.termsAgreed) {
      errs.termsAgreed = "You must agree to the university admission regulations";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      registerStudent({
        name: formData.name,
        fullName: formData.name,
        email: formData.email,
        phone: formData.phone,
        programId: formData.programId,
        password: formData.password
      });
      setIsSubmitting(false);
      navigate('/student/dashboard');
    }, 600);
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 180px)', background: 'var(--bg-page)', padding: '3.5rem 1rem' }}>
      <div style={{ maxWidth: '620px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div className="logo-icon-box" style={{ width: '56px', height: '56px', margin: '0 auto 1rem' }}>
            <GraduationCap size={32} />
          </div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--primary-dark)', marginBottom: '0.35rem' }}>
            Student Registration
          </h1>
          <p style={{ fontSize: '0.925rem', color: 'var(--text-muted)' }}>
            Create your applicant account to begin your college admission journey.
          </p>
        </div>

        {/* Demo Fast Fill Banner */}
        <div style={{
          background: 'var(--primary-50)',
          border: '1px solid var(--primary-100)',
          borderRadius: 'var(--radius-md)',
          padding: '0.85rem 1.25rem',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem'
        }}>
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary-900)' }}>
              ⚡ Fast 1-Click Demo Fill:
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--primary-700)' }}>
              Auto-populates valid registration info for immediate testing.
            </div>
          </div>
          <button
            type="button"
            onClick={handleQuickFill}
            className="btn btn-primary btn-sm"
          >
            <Sparkles size={14} />
            <span>Autofill Form</span>
          </button>
        </div>

        {/* Registration Card */}
        <div className="card" style={{ padding: '2.5rem', boxShadow: 'var(--shadow-lg)' }}>
          <form onSubmit={handleSubmit} noValidate>
            {/* Full Name */}
            <div className="form-group">
              <label className="form-label" htmlFor="name">
                Full Name <span className="required">*</span>
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  id="name"
                  type="text"
                  className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  placeholder="e.g. Vikrant Deshmukh"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              {errors.name && (
                <div className="form-error">
                  <AlertCircle size={14} />
                  <span>{errors.name}</span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Email */}
              <div className="form-group">
                <label className="form-label" htmlFor="email">
                  Email Address <span className="required">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  placeholder="name@example.com"
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

              {/* Phone */}
              <div className="form-group">
                <label className="form-label" htmlFor="phone">
                  Phone Number <span className="required">*</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                  placeholder="+91 98765 12345"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
                {errors.phone && (
                  <div className="form-error">
                    <AlertCircle size={14} />
                    <span>{errors.phone}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Selected Program */}
            <div className="form-group">
              <label className="form-label" htmlFor="program">
                Program of Interest
              </label>
              <select
                id="program"
                className="form-control"
                value={formData.programId}
                onChange={(e) => setFormData({ ...formData, programId: e.target.value })}
              >
                {programs.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.department})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Password */}
              <div className="form-group">
                <label className="form-label" htmlFor="password">
                  Password <span className="required">*</span>
                </label>
                <input
                  id="password"
                  type="password"
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  placeholder="Min. 6 characters"
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

              {/* Confirm Password */}
              <div className="form-group">
                <label className="form-label" htmlFor="confirmPassword">
                  Confirm Password <span className="required">*</span>
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                  placeholder="Re-enter password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                />
                {errors.confirmPassword && (
                  <div className="form-error">
                    <AlertCircle size={14} />
                    <span>{errors.confirmPassword}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Terms checkbox */}
            <div style={{ marginBottom: '1.75rem', marginTop: '0.25rem' }}>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontSize: '0.85rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  style={{ marginTop: '3px' }}
                  checked={formData.termsAgreed}
                  onChange={(e) => setFormData({ ...formData, termsAgreed: e.target.checked })}
                />
                <span style={{ color: 'var(--text-muted)' }}>
                  I agree to the Apex University Admission Regulations and certify that all details submitted are accurate.
                </span>
              </label>
              {errors.termsAgreed && (
                <div className="form-error" style={{ marginTop: '0.35rem' }}>
                  <AlertCircle size={14} />
                  <span>{errors.termsAgreed}</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-block btn-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating Account..." : "Register & Go to Dashboard"}
              {!isSubmitting && <ArrowRight size={18} />}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-subtle)', fontSize: '0.875rem' }}>
            <span>Already registered? </span>
            <Link to="/student/login" style={{ fontWeight: 700 }}>
              Sign In to Your Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
