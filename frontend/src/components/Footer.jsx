import React from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ShieldCheck, 
  Award, 
  CheckCircle,
  ExternalLink
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Col 1: About */}
          <div>
            <div className="flex items-center gap-2" style={{ marginBottom: '1rem' }}>
              <div className="logo-icon-box" style={{ width: '38px', height: '38px' }}>
                <GraduationCap size={22} />
              </div>
              <div>
                <div style={{ color: '#ffffff', fontWeight: 800, fontSize: '1.1rem' }}>APEX UNIVERSITY</div>
                <div style={{ color: '#94a3b8', fontSize: '0.7rem', letterSpacing: '0.05em' }}>EXCELLENCE IN HIGHER EDUCATION</div>
              </div>
            </div>
            <p style={{ color: '#94a3b8', fontSize: '0.875rem', lineHeight: '1.6', marginBottom: '1.25rem' }}>
              Empowering global leaders through cutting-edge engineering, business, and life sciences curricula. Accredited NAAC A++ & NIRF Ranked Top 25.
            </p>
            <div className="flex items-center gap-2" style={{ color: '#cbd5e1', fontSize: '0.8rem' }}>
              <Award size={16} color="#f59e0b" />
              <span>QS World University Rated 5-Stars</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <div className="footer-col-title">Admissions 2026</div>
            <div className="footer-links">
              <Link to="/student/register">Online Application Form</Link>
              <Link to="/student/login">Candidate Login Portal</Link>
              <a href="/#programs">Undergraduate Programs</a>
              <a href="/#programs">Postgraduate Programs</a>
              <a href="/#deadlines">Fee Structure & Scholarships</a>
              <Link to="/admin/login">Staff & Faculty Portal</Link>
            </div>
          </div>

          {/* Col 3: Student Resources */}
          <div>
            <div className="footer-col-title">Student Support</div>
            <div className="footer-links">
              <Link to="/student/documents">Document Checklist</Link>
              <Link to="/student/status">Track Application Status</Link>
              <a href="/#faqs">Admission FAQs</a>
              <a href="#rules">Eligibility Criteria</a>
              <a href="#counseling">Counseling Schedule</a>
              <a href="#anti-ragging">Campus Anti-Ragging Policy</a>
            </div>
          </div>

          {/* Col 4: Admissions Office */}
          <div>
            <div className="footer-col-title">Admissions Office</div>
            <div className="footer-links" style={{ gap: '0.75rem' }}>
              <div className="flex items-start gap-2" style={{ fontSize: '0.85rem' }}>
                <MapPin size={18} style={{ flexShrink: 0, marginTop: '2px', color: '#60a5fa' }} />
                <span>Central Admissions Block, Apex University Campus, Knowledge Boulevard, Tech Zone IV, 560100</span>
              </div>
              <div className="flex items-center gap-2" style={{ fontSize: '0.85rem' }}>
                <Phone size={16} style={{ color: '#60a5fa' }} />
                <span>+91 (080) 4567-8900 / 8901</span>
              </div>
              <div className="flex items-center gap-2" style={{ fontSize: '0.85rem' }}>
                <Mail size={16} style={{ color: '#60a5fa' }} />
                <span>admissions@apex.edu</span>
              </div>
              <div className="flex items-center gap-2" style={{ fontSize: '0.85rem' }}>
                <Clock size={16} style={{ color: '#60a5fa' }} />
                <span>Mon - Sat: 9:00 AM - 5:30 PM</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            © {new Date().getFullYear()} Apex University Central Admissions Directorate. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span style={{ color: '#64748b' }}>Designed for FSD College Admission Project</span>
            <span style={{ color: '#64748b' }}>•</span>
            <Link to="/admin/login" style={{ color: '#93c5fd' }}>Admin Access</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
