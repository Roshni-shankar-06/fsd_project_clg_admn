import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  FileText, 
  User, 
  GraduationCap, 
  BookOpen, 
  CheckCircle2, 
  Save, 
  ArrowRight, 
  ArrowLeft, 
  AlertCircle,
  Sparkles,
  Info,
  Send,
  Edit3
} from 'lucide-react';

export default function ApplicationFormPage() {
  const { 
    currentStudentApp, 
    currentUser, 
    programs, 
    saveApplicationDraft, 
    submitApplication, 
    showToast 
  } = useApp();

  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(1); // 1: Personal, 2: Academic, 3: Admission & Program, 4: Review & Submit

  // Form State initialized from student's active application or defaults
  const [formData, setFormData] = useState({
    // 1. Personal Details
    fullName: currentStudentApp?.fullName || currentUser?.name || 'Aarav Sharma',
    email: currentStudentApp?.email || currentUser?.email || 'aarav.sharma@example.com',
    phone: currentStudentApp?.phone || currentUser?.phone || '+91 98765 43210',
    dob: currentStudentApp?.dob || '2007-04-15',
    gender: currentStudentApp?.gender || 'Male',
    category: currentStudentApp?.category || 'General',
    bloodGroup: currentStudentApp?.bloodGroup || 'O+',
    address: currentStudentApp?.address || 'Flat 402, Royal Palms, Sector 62, Noida, UP, 201301',
    fatherName: currentStudentApp?.fatherName || 'Rajesh Sharma',
    motherName: currentStudentApp?.motherName || 'Sunita Sharma',
    guardianPhone: currentStudentApp?.guardianPhone || '+91 98765 11223',

    // 2. Academic Details
    previousQualification: currentStudentApp?.academicDetails?.previousQualification || '12th Grade / Senior Secondary (CBSE)',
    institution: currentStudentApp?.academicDetails?.institution || 'Delhi Public School, R.K. Puram',
    passingYear: currentStudentApp?.academicDetails?.passingYear || '2026',
    percentage: currentStudentApp?.academicDetails?.percentage || currentStudentApp?.academicDetails?.twelfthPercentage || '92.4%',
    tenthBoard: currentStudentApp?.academicDetails?.tenthBoard || 'CBSE',
    tenthSchool: currentStudentApp?.academicDetails?.tenthSchool || 'Delhi Public School, R.K. Puram',
    tenthPercentage: currentStudentApp?.academicDetails?.tenthPercentage || '94.6%',
    twelfthStream: currentStudentApp?.academicDetails?.twelfthStream || 'Science (PCM)',
    entranceExam: currentStudentApp?.academicDetails?.entranceExam || 'JEE Main 2026',
    entranceRollNo: currentStudentApp?.academicDetails?.entranceRollNo || '26031049281',
    entranceScore: currentStudentApp?.academicDetails?.entranceScore || '98.4 Percentile',
    entranceRank: currentStudentApp?.academicDetails?.entranceRank || '14250',

    // 3. Admission & Program Details
    programId: currentStudentApp?.programId || 'prog-1',
    secondaryChoice: currentStudentApp?.secondaryChoice || 'B.Tech Artificial Intelligence & Data Science',
    hostelRequired: 'Yes',

    // 4. Declaration
    termsAgreed: true
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync if currentStudentApp updates
  useEffect(() => {
    if (currentStudentApp) {
      setFormData(prev => ({
        ...prev,
        fullName: currentStudentApp.fullName || prev.fullName,
        email: currentStudentApp.email || prev.email,
        phone: currentStudentApp.phone || prev.phone,
        programId: currentStudentApp.programId || prev.programId,
        previousQualification: currentStudentApp.academicDetails?.previousQualification || prev.previousQualification,
        institution: currentStudentApp.academicDetails?.institution || prev.institution,
        percentage: currentStudentApp.academicDetails?.percentage || currentStudentApp.academicDetails?.twelfthPercentage || prev.percentage
      }));
    }
  }, [currentStudentApp]);

  // Section validations
  const validateSection = (section) => {
    const errs = {};

    if (section === 1) {
      if (!formData.fullName.trim()) errs.fullName = "Full Name is required";
      if (!formData.email.trim()) errs.email = "Email Address is required";
      if (!formData.phone.trim()) errs.phone = "Phone Number is required";
      if (!formData.address.trim()) errs.address = "Permanent address is required";
    } else if (section === 2) {
      if (!formData.previousQualification.trim()) errs.previousQualification = "Previous qualification is required";
      if (!formData.institution.trim()) errs.institution = "Institution name is required";
      if (!formData.percentage.trim()) errs.percentage = "Percentage / CGPA is required";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateSection(activeSection)) {
      setActiveSection(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    setActiveSection(prev => prev - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Save Application Draft
  const handleSaveDraft = () => {
    saveApplicationDraft(formData);
  };

  // Submit Application
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.termsAgreed) {
      setErrors({ termsAgreed: "You must accept the admission declaration to submit." });
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      submitApplication(formData);
      setIsSubmitting(false);
      navigate('/student/documents');
    }, 700);
  };

  const selectedProgramObj = programs.find(p => p.id === formData.programId) || programs[0];

  return (
    <div style={{ maxWidth: '980px', margin: '0 auto' }}>
      {/* Page Header */}
      <div className="flex items-center justify-between flex-wrap gap-4" style={{ marginBottom: '1.75rem' }}>
        <div>
          <div className="flex items-center gap-2">
            <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--primary-dark)' }}>
              Online Admission Application Form
            </h1>
            <span className={`status-pill status-${currentStudentApp?.status === 'Approved' ? 'approved' : currentStudentApp?.status === 'Submitted' ? 'submitted' : currentStudentApp?.status === 'Draft' ? 'review' : 'review'}`}>
              Status: {currentStudentApp?.status || 'Draft'}
            </span>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.2rem' }}>
            Application ID: <strong>{currentStudentApp?.id || 'APP-2026-001'}</strong> • Ref No: <strong>{currentStudentApp?.refNumber || 'APX-2026-8891'}</strong>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button 
            type="button" 
            onClick={handleSaveDraft}
            className="btn btn-secondary btn-sm"
          >
            <Save size={15} />
            <span>Save Draft</span>
          </button>
        </div>
      </div>

      {/* Multi-Section Progress Bar */}
      <div className="card" style={{ padding: '1rem', marginBottom: '2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem', textAlign: 'center' }}>
          {[
            { id: 1, title: "1. Personal Details", icon: User },
            { id: 2, title: "2. Academic Details", icon: GraduationCap },
            { id: 3, title: "3. Admission Details", icon: BookOpen },
            { id: 4, title: "4. Review & Submit", icon: CheckCircle2 }
          ].map((sec) => {
            const Icon = sec.icon;
            const isCompleted = activeSection > sec.id;
            const isCurrent = activeSection === sec.id;

            return (
              <div
                key={sec.id}
                onClick={() => (isCompleted || currentStudentApp?.status !== 'Draft') && setActiveSection(sec.id)}
                style={{
                  padding: '0.75rem 0.5rem',
                  borderRadius: 'var(--radius-md)',
                  background: isCurrent ? 'var(--primary-50)' : isCompleted ? '#f0fdf4' : 'var(--bg-subtle)',
                  border: isCurrent ? '2px solid var(--primary-600)' : isCompleted ? '1px solid #86efac' : '1px solid var(--border-subtle)',
                  cursor: (isCompleted || currentStudentApp?.status !== 'Draft') ? 'pointer' : 'default',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '50%',
                  background: isCurrent ? 'var(--primary-600)' : isCompleted ? 'var(--success)' : 'var(--border-strong)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '0.78rem',
                  margin: '0 auto 0.35rem'
                }}>
                  {isCompleted ? '✓' : sec.id}
                </div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: isCurrent ? 'var(--primary-700)' : 'var(--text-main)' }}>
                  {sec.title}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section Form Card */}
      <div className="card" style={{ padding: '2.5rem', boxShadow: 'var(--shadow-md)' }}>
        {/* SECTION 1: Personal Details */}
        {activeSection === 1 && (
          <div>
            <div className="flex items-center justify-between" style={{ marginBottom: '1.5rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-subtle)' }}>
              <div>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <User size={22} color="var(--primary-600)" />
                  <span>Section 1: Personal Details</span>
                </h2>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Enter your legal personal contact and identification information.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="form-group" style={{ gridColumn: 'span 2' }}>
                <label className="form-label" htmlFor="fullName">
                  Applicant Full Name <span className="required">*</span>
                </label>
                <input
                  id="fullName"
                  type="text"
                  className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Aarav Sharma"
                />
                {errors.fullName && <div className="form-error"><AlertCircle size={14} />{errors.fullName}</div>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="gender">Gender</label>
                <select
                  id="gender"
                  className="form-control"
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="form-group">
                <label className="form-label" htmlFor="email">
                  Email Address <span className="required">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                {errors.email && <div className="form-error"><AlertCircle size={14} />{errors.email}</div>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="phone">
                  Phone Number <span className="required">*</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
                {errors.phone && <div className="form-error"><AlertCircle size={14} />{errors.phone}</div>}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="form-group">
                <label className="form-label" htmlFor="dob">Date of Birth</label>
                <input
                  id="dob"
                  type="date"
                  className="form-control"
                  value={formData.dob}
                  onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="category">Category / Quota</label>
                <select
                  id="category"
                  className="form-control"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="General">General / Open Merit</option>
                  <option value="OBC">OBC (Non-Creamy Layer)</option>
                  <option value="SC">Scheduled Caste (SC)</option>
                  <option value="ST">Scheduled Tribe (ST)</option>
                  <option value="EWS">Economically Weaker Section (EWS)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="bloodGroup">Blood Group</label>
                <select
                  id="bloodGroup"
                  className="form-control"
                  value={formData.bloodGroup}
                  onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                >
                  <option value="O+">O+</option>
                  <option value="A+">A+</option>
                  <option value="B+">B+</option>
                  <option value="AB+">AB+</option>
                  <option value="O-">O-</option>
                  <option value="A-">A-</option>
                  <option value="B-">B-</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="address">
                Permanent Address <span className="required">*</span>
              </label>
              <textarea
                id="address"
                rows="2"
                className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="House/Flat No, Street, City, State, PIN"
              ></textarea>
              {errors.address && <div className="form-error"><AlertCircle size={14} />{errors.address}</div>}
            </div>
          </div>
        )}

        {/* SECTION 2: Academic Details */}
        {activeSection === 2 && (
          <div>
            <div className="flex items-center justify-between" style={{ marginBottom: '1.5rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-subtle)' }}>
              <div>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <GraduationCap size={22} color="var(--primary-600)" />
                  <span>Section 2: Academic Details</span>
                </h2>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Enter your previous qualification, school/college institution, and percentage scores.
                </p>
              </div>
            </div>

            {/* Core Required Academic Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="form-group">
                <label className="form-label" htmlFor="previousQualification">
                  Previous Qualification <span className="required">*</span>
                </label>
                <input
                  id="previousQualification"
                  type="text"
                  className={`form-control ${errors.previousQualification ? 'is-invalid' : ''}`}
                  placeholder="e.g. 12th Grade / Senior Secondary (CBSE/ISC/State)"
                  value={formData.previousQualification}
                  onChange={(e) => setFormData({ ...formData, previousQualification: e.target.value })}
                />
                {errors.previousQualification && <div className="form-error"><AlertCircle size={14} />{errors.previousQualification}</div>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="institution">
                  School / College Institution Name <span className="required">*</span>
                </label>
                <input
                  id="institution"
                  type="text"
                  className={`form-control ${errors.institution ? 'is-invalid' : ''}`}
                  placeholder="e.g. Delhi Public School, R.K. Puram"
                  value={formData.institution}
                  onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                />
                {errors.institution && <div className="form-error"><AlertCircle size={14} />{errors.institution}</div>}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="form-group">
                <label className="form-label" htmlFor="percentage">
                  Percentage / CGPA <span className="required">*</span>
                </label>
                <input
                  id="percentage"
                  type="text"
                  className={`form-control ${errors.percentage ? 'is-invalid' : ''}`}
                  placeholder="e.g. 92.4% or 9.4 CGPA"
                  value={formData.percentage}
                  onChange={(e) => setFormData({ ...formData, percentage: e.target.value })}
                />
                {errors.percentage && <div className="form-error"><AlertCircle size={14} />{errors.percentage}</div>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="passingYear">Year of Passing</label>
                <input
                  id="passingYear"
                  type="text"
                  className="form-control"
                  placeholder="2026"
                  value={formData.passingYear}
                  onChange={(e) => setFormData({ ...formData, passingYear: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="stream">Academic Stream</label>
                <input
                  id="stream"
                  type="text"
                  className="form-control"
                  placeholder="Science / Commerce / Arts"
                  value={formData.twelfthStream}
                  onChange={(e) => setFormData({ ...formData, twelfthStream: e.target.value })}
                />
              </div>
            </div>

            {/* Entrance Details */}
            <div style={{ background: 'var(--primary-50)', border: '1px solid var(--primary-100)', borderRadius: 'var(--radius-md)', padding: '1.25rem', marginTop: '1rem' }}>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--primary-900)', marginBottom: '0.75rem' }}>
                National / State Entrance Examination (Optional / Applicable)
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="form-group">
                  <label className="form-label">Exam Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="JEE Main / CAT / SAT / State CET"
                    value={formData.entranceExam}
                    onChange={(e) => setFormData({ ...formData, entranceExam: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Entrance Score / Percentile</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. 98.4 Percentile"
                    value={formData.entranceScore}
                    onChange={(e) => setFormData({ ...formData, entranceScore: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Roll / Registration No</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Roll Number"
                    value={formData.entranceRollNo}
                    onChange={(e) => setFormData({ ...formData, entranceRollNo: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 3: Admission & Program Details */}
        {activeSection === 3 && (
          <div>
            <div className="flex items-center justify-between" style={{ marginBottom: '1.5rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-subtle)' }}>
              <div>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <BookOpen size={22} color="var(--primary-600)" />
                  <span>Section 3: Admission & Program Selection</span>
                </h2>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Select your primary program preference and campus accommodation.
                </p>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="primaryProgram">
                Primary Degree Program Choice <span className="required">*</span>
              </label>
              <select
                id="primaryProgram"
                className="form-control"
                value={formData.programId}
                onChange={(e) => setFormData({ ...formData, programId: e.target.value })}
                style={{ fontSize: '0.95rem', padding: '0.8rem 1rem' }}
              >
                {programs.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} — {p.department} ({p.feePerYear})
                  </option>
                ))}
              </select>
            </div>

            {/* Program Info Card */}
            <div style={{ background: 'var(--bg-subtle)', padding: '1.25rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem' }}>
              <div className="flex items-center justify-between" style={{ marginBottom: '0.5rem' }}>
                <strong style={{ fontSize: '1rem', color: 'var(--primary-dark)' }}>{selectedProgramObj.name}</strong>
                <span className="badge badge-primary">{selectedProgramObj.badge}</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                {selectedProgramObj.description}
              </p>
              <div className="grid grid-cols-3 gap-2" style={{ fontSize: '0.8rem' }}>
                <div><strong>Duration:</strong> {selectedProgramObj.duration}</div>
                <div><strong>Tuition:</strong> {selectedProgramObj.feePerYear}</div>
                <div><strong>Eligibility:</strong> {selectedProgramObj.eligibility}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="form-group">
                <label className="form-label">Secondary / Backup Branch Preference</label>
                <select
                  className="form-control"
                  value={formData.secondaryChoice}
                  onChange={(e) => setFormData({ ...formData, secondaryChoice: e.target.value })}
                >
                  {programs.map((p) => (
                    <option key={p.id} value={p.name}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Campus Hostel Accommodation Needed?</label>
                <select
                  className="form-control"
                  value={formData.hostelRequired}
                  onChange={(e) => setFormData({ ...formData, hostelRequired: e.target.value })}
                >
                  <option value="Yes">Yes (On-Campus Student Hostel)</option>
                  <option value="No">No (Day Scholar)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 4: Review & Submit */}
        {activeSection === 4 && (
          <div>
            <div className="flex items-center justify-between" style={{ marginBottom: '1.5rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-subtle)' }}>
              <div>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={22} color="var(--success)" />
                  <span>Section 4: Review Dossier & Final Submission</span>
                </h2>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Confirm all entered details. Upon submission, status changes to <strong>Submitted</strong>.
                </p>
              </div>
            </div>

            {/* Review Breakdown Box */}
            <div style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', marginBottom: '1.75rem' }}>
              <div className="grid grid-cols-2 gap-4" style={{ fontSize: '0.875rem' }}>
                <div><strong>Full Name:</strong> {formData.fullName}</div>
                <div><strong>Email:</strong> {formData.email}</div>
                <div><strong>Phone:</strong> {formData.phone}</div>
                <div><strong>Selected Program:</strong> <span style={{ color: 'var(--primary-700)', fontWeight: 700 }}>{selectedProgramObj.name}</span></div>
                <div><strong>Previous Qualification:</strong> {formData.previousQualification}</div>
                <div><strong>Institution:</strong> {formData.institution}</div>
                <div><strong>Percentage / CGPA:</strong> <strong>{formData.percentage}</strong></div>
                <div><strong>Entrance Exam:</strong> {formData.entranceExam} ({formData.entranceScore || 'N/A'})</div>
                <div style={{ gridColumn: 'span 2' }}><strong>Address:</strong> {formData.address}</div>
              </div>
            </div>

            {/* Legal Declaration */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer', fontSize: '0.85rem' }}>
                <input
                  type="checkbox"
                  style={{ marginTop: '3px' }}
                  checked={formData.termsAgreed}
                  onChange={(e) => setFormData({ ...formData, termsAgreed: e.target.checked })}
                />
                <span style={{ color: 'var(--text-main)' }}>
                  I solemnly declare that all personal and academic statements provided in this application are authentic. I agree to proceed to document upload for committee scrutiny.
                </span>
              </label>
              {errors.termsAgreed && (
                <div className="form-error" style={{ marginTop: '0.35rem' }}>
                  <AlertCircle size={14} />
                  <span>{errors.termsAgreed}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Wizard Footer Navigation Buttons */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: '1.5rem',
          marginTop: '2rem'
        }}>
          {activeSection > 1 ? (
            <button type="button" onClick={handlePrev} className="btn btn-secondary">
              <ArrowLeft size={16} />
              <span>Previous Section</span>
            </button>
          ) : (
            <button type="button" onClick={handleSaveDraft} className="btn btn-secondary">
              <Save size={16} />
              <span>Save Progress</span>
            </button>
          )}

          {activeSection < 4 ? (
            <button type="button" onClick={handleNext} className="btn btn-primary">
              <span>Next: Section {activeSection + 1}</span>
              <ArrowRight size={16} />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="btn btn-success btn-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting Application..." : "Submit Application Form"}
              {!isSubmitting && <Send size={18} />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
