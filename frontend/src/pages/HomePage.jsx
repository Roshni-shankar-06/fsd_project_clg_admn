import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  GraduationCap, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Award, 
  BookOpen, 
  FileText, 
  UploadCloud, 
  ShieldCheck, 
  ChevronDown, 
  ChevronUp, 
  Calendar, 
  DollarSign, 
  Users, 
  Sparkles,
  Search
} from 'lucide-react';

export default function HomePage() {
  const { programs } = useApp();
  const [selectedDept, setSelectedDept] = useState('all');
  const [openFaq, setOpenFaq] = useState(null);

  const filteredPrograms = selectedDept === 'all' 
    ? programs 
    : programs.filter(p => p.department.toLowerCase().includes(selectedDept.toLowerCase()));

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "What is the last date to apply for Academic Year 2026-27?",
      a: "Phase 1 applications for undergraduate engineering and management programs close on October 15, 2026. Round 2 applications will depend on seat availability."
    },
    {
      q: "Can I edit my application form after submitting it?",
      a: "You can edit your personal details and upload supplementary documents until your application moves to 'Document Verified' status. After verification, any updates require approval from the Admission Desk."
    },
    {
      q: "Which documents are mandatory for verification?",
      a: "Mandatory documents include: 10th and 12th Marksheets, National/State Entrance scorecard (e.g. JEE Main/CAT/SAT), Government Photo ID (Aadhaar or Passport), and recent passport-size photograph."
    },
    {
      q: "How will I know if my application is approved?",
      a: "You can track real-time progress on your Student Dashboard. Once approved, a downloadable digital Provisional Admission Offer Letter will be generated instantly on your Application Status page."
    },
    {
      q: "Are merit scholarships available for high-scoring students?",
      a: "Yes! Students scoring above 95% in high school board examinations or top 5% in entrance tests are eligible for up to 50% tuition waiver."
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div style={{ maxWidth: '820px' }}>
            <div className="hero-badge">
              <Sparkles size={16} color="#fbbf24" />
              <span>Admissions Open for Batch 2026–2027 • Apply Online</span>
            </div>

            <h1 className="hero-title">
              Shape Your Future at <span>Apex University</span>
            </h1>

            <p className="hero-subtitle">
              Join a premier academic institution renowned for world-class faculty, state-of-the-art innovation centers, and 98% top-tier career placements. Experience seamless 100% digital admissions.
            </p>

            <div className="hero-cta-group">
              <Link to="/student/register" className="btn btn-primary btn-lg" style={{ background: '#ffffff', color: 'var(--primary-900)' }}>
                <span>Apply for Admission</span>
                <ArrowRight size={18} />
              </Link>
              <Link to="/student/login" className="btn btn-secondary btn-lg" style={{ background: 'rgba(255, 255, 255, 0.15)', color: '#ffffff', border: '1px solid rgba(255, 255, 255, 0.3)' }}>
                <span>Candidate Portal Login</span>
              </Link>
              <Link to="/admin/login" className="btn btn-secondary btn-lg" style={{ background: 'transparent', color: '#cbd5e1', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
                <ShieldCheck size={18} />
                <span>Admin Desk</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Metrics Bar */}
      <section style={{ background: '#ffffff', borderBottom: '1px solid var(--border-subtle)', padding: '2rem 0' }}>
        <div className="container">
          <div className="grid grid-cols-4 gap-4">
            <div className="flex items-center gap-3">
              <div className="stat-icon-wrapper stat-icon-primary">
                <Award size={24} />
              </div>
              <div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)' }}>NIRF Top 25</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>National Ranking 2025</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="stat-icon-wrapper stat-icon-success">
                <Users size={24} />
              </div>
              <div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)' }}>15,000+</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Global Alumni & Students</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="stat-icon-wrapper stat-icon-gold">
                <Sparkles size={24} />
              </div>
              <div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)' }}>98.4%</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Placement Rate 2025</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="stat-icon-wrapper stat-icon-info">
                <DollarSign size={24} />
              </div>
              <div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)' }}>$52,000</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Highest Package Offered</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Admission 5-Step Pipeline */}
      <section id="process" style={{ padding: '5rem 0', background: 'var(--bg-page)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 3.5rem' }}>
            <span className="badge badge-primary" style={{ marginBottom: '0.75rem' }}>EASY 5-STEP PROCESS</span>
            <h2 style={{ fontSize: '2.25rem', marginBottom: '1rem' }}>How to Apply for Admission</h2>
            <p>Our completely online admission workflow takes less than 15 minutes to complete.</p>
          </div>

          <div className="grid grid-cols-4 gap-6">
            <div className="card card-hover" style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute',
                top: '-14px',
                left: '1.5rem',
                background: 'var(--primary-600)',
                color: '#ffffff',
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '0.85rem'
              }}>1</div>
              <div style={{ marginTop: '0.5rem', marginBottom: '1rem', color: 'var(--primary-600)' }}>
                <FileText size={32} />
              </div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Register & Apply</h3>
              <p style={{ fontSize: '0.85rem' }}>Create your student account, select your preferred degree program, and fill in personal and academic details.</p>
            </div>

            <div className="card card-hover" style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute',
                top: '-14px',
                left: '1.5rem',
                background: 'var(--primary-600)',
                color: '#ffffff',
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '0.85rem'
              }}>2</div>
              <div style={{ marginTop: '0.5rem', marginBottom: '1rem', color: 'var(--primary-600)' }}>
                <UploadCloud size={32} />
              </div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Upload Documents</h3>
              <p style={{ fontSize: '0.85rem' }}>Upload digital scans of your 10th/12th marksheets, identity proof, entrance scorecard, and passport photograph.</p>
            </div>

            <div className="card card-hover" style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute',
                top: '-14px',
                left: '1.5rem',
                background: 'var(--primary-600)',
                color: '#ffffff',
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '0.85rem'
              }}>3</div>
              <div style={{ marginTop: '0.5rem', marginBottom: '1rem', color: 'var(--primary-600)' }}>
                <ShieldCheck size={32} />
              </div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Staff Verification</h3>
              <p style={{ fontSize: '0.85rem' }}>Our admissions committee scrutinizes your academic eligibility and verifies authentic certificate uploads.</p>
            </div>

            <div className="card card-hover" style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute',
                top: '-14px',
                left: '1.5rem',
                background: 'var(--success)',
                color: '#ffffff',
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '0.85rem'
              }}>4</div>
              <div style={{ marginTop: '0.5rem', marginBottom: '1rem', color: 'var(--success)' }}>
                <Award size={32} />
              </div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Offer Letter & Seat</h3>
              <p style={{ fontSize: '0.85rem' }}>Receive your official Provisional Admission Letter, book your counseling date, and secure your academic seat.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Programs Section */}
      <section id="programs" style={{ padding: '5rem 0', background: '#ffffff' }}>
        <div className="container">
          <div className="flex items-center justify-between flex-wrap gap-4" style={{ marginBottom: '2.5rem' }}>
            <div>
              <span className="badge badge-primary" style={{ marginBottom: '0.5rem' }}>ACADEMIC EXCELLENCE</span>
              <h2 style={{ fontSize: '2.25rem' }}>Explore Degree Programs</h2>
              <p>Choose from cutting-edge undergraduate and postgraduate disciplines.</p>
            </div>

            {/* Department Filter Tabs */}
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setSelectedDept('all')}
                className={`btn btn-sm ${selectedDept === 'all' ? 'btn-primary' : 'btn-secondary'}`}
              >
                All Courses
              </button>
              <button 
                onClick={() => setSelectedDept('Computing')}
                className={`btn btn-sm ${selectedDept === 'Computing' ? 'btn-primary' : 'btn-secondary'}`}
              >
                Computing & AI
              </button>
              <button 
                onClick={() => setSelectedDept('Business')}
                className={`btn btn-sm ${selectedDept === 'Business' ? 'btn-primary' : 'btn-secondary'}`}
              >
                Management & MBA
              </button>
              <button 
                onClick={() => setSelectedDept('Life')}
                className={`btn btn-sm ${selectedDept === 'Life' ? 'btn-primary' : 'btn-secondary'}`}
              >
                Life Sciences
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {filteredPrograms.map((prog) => (
              <div key={prog.id} className="card card-hover flex flex-col justify-between" style={{ borderTop: '4px solid var(--primary-600)' }}>
                <div>
                  <div className="flex items-center justify-between" style={{ marginBottom: '0.75rem' }}>
                    <span className="badge badge-primary">{prog.code}</span>
                    <span className="badge badge-gold">{prog.badge}</span>
                  </div>

                  <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--primary-dark)' }}>
                    {prog.name}
                  </h3>

                  <p style={{ fontSize: '0.85rem', marginBottom: '1.25rem', color: 'var(--text-muted)' }}>
                    {prog.description}
                  </p>

                  <div style={{ background: 'var(--bg-subtle)', padding: '0.85rem', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem', fontSize: '0.825rem' }}>
                    <div className="flex items-center justify-between" style={{ marginBottom: '0.4rem' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Duration:</span>
                      <strong>{prog.duration}</strong>
                    </div>
                    <div className="flex items-center justify-between" style={{ marginBottom: '0.4rem' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Tuition Fee:</span>
                      <strong style={{ color: 'var(--primary-700)' }}>{prog.feePerYear}</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span style={{ color: 'var(--text-muted)' }}>Deadline:</span>
                      <span style={{ color: 'var(--danger)', fontWeight: 600 }}>{prog.deadline}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <Link to="/student/register" className="btn btn-primary btn-block">
                    <span>Apply for this Course</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deadlines & Calendar Section */}
      <section id="deadlines" style={{ padding: '4.5rem 0', background: 'var(--bg-page)', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div className="grid grid-cols-2 gap-8 items-center">
            <div>
              <span className="badge badge-primary" style={{ marginBottom: '0.75rem' }}>IMPORTANT SCHEDULE</span>
              <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Admissions Calendar 2026–27</h2>
              <p style={{ marginBottom: '1.5rem' }}>
                Keep track of key entrance milestones, document submission cutoffs, and counseling rounds. Early applicants receive priority hostel allotment.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div className="card" style={{ padding: '1rem 1.25rem', borderLeft: '4px solid var(--primary-600)' }}>
                  <div className="flex items-center justify-between">
                    <div>
                      <strong>Online Applications Commence</strong>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Portal opens for all B.Tech, MBA & M.Sc programs</div>
                    </div>
                    <span className="badge badge-primary">Active Now</span>
                  </div>
                </div>

                <div className="card" style={{ padding: '1rem 1.25rem', borderLeft: '4px solid var(--warning)' }}>
                  <div className="flex items-center justify-between">
                    <div>
                      <strong>Round 1 Application Deadline</strong>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Last date for early bird scholarship consideration</div>
                    </div>
                    <span className="badge badge-gold">October 15, 2026</span>
                  </div>
                </div>

                <div className="card" style={{ padding: '1rem 1.25rem', borderLeft: '4px solid var(--info)' }}>
                  <div className="flex items-center justify-between">
                    <div>
                      <strong>Merit List & Offer Letter Release</strong>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Round 1 merit lists published on student dashboards</div>
                    </div>
                    <span className="badge" style={{ background: '#e0f2fe', color: '#0369a1' }}>October 22, 2026</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="card" style={{ background: 'linear-gradient(135deg, #091e3e 0%, #1e3a8a 100%)', color: '#ffffff', padding: '2.5rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <Calendar size={24} color="#60a5fa" />
              </div>
              <h3 style={{ fontSize: '1.5rem', color: '#ffffff', marginBottom: '0.75rem' }}>
                Need Help with Your Application?
              </h3>
              <p style={{ color: '#cbd5e1', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                Our experienced admission counselors are available to guide you through program selection, entrance eligibility, and hostel accommodation.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
                <div>📞 <strong>Toll-Free Helpline:</strong> +91 1800-425-8899</div>
                <div>✉️ <strong>Admissions Email:</strong> admissions@apex.edu</div>
                <div>📍 <strong>Counseling Center:</strong> Academic Block A, Ground Floor</div>
              </div>
              <Link to="/student/register" className="btn btn-primary btn-block" style={{ background: '#ffffff', color: 'var(--primary-900)' }}>
                Start Your Online Application
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faqs" style={{ padding: '5rem 0', background: '#ffffff' }}>
        <div className="container-narrow">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="badge badge-primary" style={{ marginBottom: '0.5rem' }}>GOT QUESTIONS?</span>
            <h2 style={{ fontSize: '2.25rem', marginBottom: '0.5rem' }}>Frequently Asked Questions</h2>
            <p>Everything you need to know about the admission process, documents, and timelines.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className="card" 
                style={{ padding: '1.25rem', cursor: 'pointer' }}
                onClick={() => toggleFaq(idx)}
              >
                <div className="flex items-center justify-between">
                  <span style={{ fontWeight: 700, fontSize: '0.975rem', color: 'var(--text-main)' }}>
                    {faq.q}
                  </span>
                  {openFaq === idx ? <ChevronUp size={20} color="var(--primary-600)" /> : <ChevronDown size={20} color="var(--text-muted)" />}
                </div>
                {openFaq === idx && (
                  <p style={{ marginTop: '0.75rem', fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section style={{ background: 'linear-gradient(135deg, var(--primary-700) 0%, var(--primary-900) 100%)', color: '#ffffff', padding: '4rem 0', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontSize: '2.25rem', color: '#ffffff', marginBottom: '1rem' }}>
            Begin Your Academic Journey Today
          </h2>
          <p style={{ color: '#bfdbfe', maxWidth: '600px', margin: '0 auto 2rem', fontSize: '1.05rem' }}>
            Applications for 2026-27 are processed on a rolling basis. Submit your application early for preferred scholarship and branch allocation.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link to="/student/register" className="btn btn-primary btn-lg" style={{ background: '#ffffff', color: 'var(--primary-900)' }}>
              <span>Submit Online Application</span>
              <ArrowRight size={18} />
            </Link>
            <Link to="/student/login" className="btn btn-secondary btn-lg" style={{ background: 'transparent', color: '#ffffff', borderColor: '#ffffff' }}>
              <span>Registered Student Login</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
