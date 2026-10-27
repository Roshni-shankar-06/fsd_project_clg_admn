import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema(
  {
    Application_ID: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    Student_ID: {
      type: String,
      required: true,
      index: true
    },
    FullName: {
      type: String,
      required: true,
      trim: true
    },
    Email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    Phone: {
      type: String,
      required: true
    },
    DOB: {
      type: String,
      default: '2007-01-01'
    },
    Gender: {
      type: String,
      default: 'Not Specified'
    },
    Category: {
      type: String,
      default: 'General'
    },
    BloodGroup: {
      type: String,
      default: 'O+'
    },
    Address: {
      type: String,
      default: ''
    },
    FatherName: {
      type: String,
      default: ''
    },
    MotherName: {
      type: String,
      default: ''
    },
    GuardianPhone: {
      type: String,
      default: ''
    },
    Program: {
      type: String,
      required: [true, 'Program selection is required']
    },
    Department: {
      type: String,
      default: 'School of Computing & AI'
    },
    SecondaryChoice: {
      type: String,
      default: ''
    },
    AcademicDetails: {
      previousQualification: { type: String, default: '12th Grade / Senior Secondary' },
      institution: { type: String, default: '' },
      passingYear: { type: String, default: '2026' },
      percentage: { type: String, default: '' },
      tenthBoard: { type: String, default: 'CBSE' },
      tenthSchool: { type: String, default: '' },
      tenthYear: { type: String, default: '2024' },
      tenthPercentage: { type: String, default: '' },
      twelfthBoard: { type: String, default: 'CBSE' },
      twelfthSchool: { type: String, default: '' },
      twelfthYear: { type: String, default: '2026' },
      twelfthPercentage: { type: String, default: '' },
      twelfthStream: { type: String, default: 'Science (PCM)' },
      entranceExam: { type: String, default: '' },
      entranceRollNo: { type: String, default: '' },
      entranceScore: { type: String, default: '' },
      entranceRank: { type: String, default: '' }
    },
    Application_Date: {
      type: Date,
      default: Date.now
    },
    Status: {
      type: String,
      enum: ['Draft', 'Submitted', 'Under Review', 'Document Verified', 'Approved', 'Rejected'],
      default: 'Submitted',
      index: true
    },
    StatusHistory: [
      {
        status: { type: String, required: true },
        date: { type: String, required: true },
        note: { type: String, default: '' }
      }
    ],
    MeritScore: {
      type: Number,
      default: 0
    },
    AssignedOfficer: {
      type: String,
      default: 'Dr. Vikram Menon (Admissions Dean)'
    },
    CounselingDate: {
      type: String,
      default: 'To be scheduled'
    },
    Remarks: {
      type: String,
      default: 'Application under committee review.'
    },
    FeeStatus: {
      type: String,
      default: 'Paid (Application Fee ₹1,500)'
    },
    AdmissionOfferDate: {
      type: String,
      default: null
    }
  },
  {
    timestamps: true
  }
);

const Application = mongoose.model('Application', applicationSchema);
export default Application;
