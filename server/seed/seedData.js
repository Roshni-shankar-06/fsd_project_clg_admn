import Student from '../models/Student.js';
import Admin from '../models/Admin.js';
import Application from '../models/Application.js';
import Document from '../models/Document.js';
import Notification from '../models/Notification.js';

export const seedDatabase = async () => {
  try {
    const studentCount = await Student.countDocuments();
    if (studentCount > 0) {
      console.log('[Seed] Database already contains records. Skipping seed.');
      return;
    }

    console.log('[Seed] Seeding initial college admission data into MongoDB...');

    // 1. Seed Students
    const student1 = await Student.create({
      Student_ID: 'STU-8891',
      Name: 'Aarav Sharma',
      Email: 'aarav.sharma@example.com',
      Phone: '+91 98765 43210',
      Password: 'password123',
      Role: 'student'
    });

    const student2 = await Student.create({
      Student_ID: 'STU-8892',
      Name: 'Priya Sundaram',
      Email: 'priya.s@example.com',
      Phone: '+91 94432 10987',
      Password: 'password123',
      Role: 'student'
    });

    const student3 = await Student.create({
      Student_ID: 'STU-8893',
      Name: 'Rohan Mukherjee',
      Email: 'rohan.m@example.com',
      Phone: '+91 91234 56789',
      Password: 'password123',
      Role: 'student'
    });

    // 2. Seed Admin
    await Admin.create({
      Admin_ID: 'ADM-1001',
      Name: 'Dr. Vikram Menon',
      Email: 'admin@apex.edu',
      Password: 'adminpassword',
      Role: 'Dean',
      Department: 'University Admissions Directorate'
    });

    // 3. Seed Applications
    await Application.create([
      {
        Application_ID: 'APP-2026-001',
        Student_ID: 'STU-8891',
        FullName: 'Aarav Sharma',
        Email: 'aarav.sharma@example.com',
        Phone: '+91 98765 43210',
        DOB: '2007-04-15',
        Gender: 'Male',
        Category: 'General',
        BloodGroup: 'O+',
        Address: 'Flat 402, Royal Palms, Sector 62, Noida, UP, 201301',
        FatherName: 'Rajesh Sharma',
        MotherName: 'Sunita Sharma',
        GuardianPhone: '+91 98765 11223',
        Program: 'B.Tech Computer Science & Engineering',
        Department: 'School of Computing & AI',
        SecondaryChoice: 'B.Tech Artificial Intelligence & Data Science',
        AcademicDetails: {
          previousQualification: '12th Grade / Senior Secondary (CBSE)',
          institution: 'Delhi Public School, R.K. Puram',
          passingYear: '2026',
          percentage: '92.4%',
          tenthBoard: 'CBSE',
          tenthSchool: 'Delhi Public School, R.K. Puram',
          tenthYear: '2024',
          tenthPercentage: '94.6%',
          twelfthBoard: 'CBSE',
          twelfthSchool: 'Delhi Public School, R.K. Puram',
          twelfthYear: '2026',
          twelfthPercentage: '92.4%',
          twelfthStream: 'Science (PCM)',
          entranceExam: 'JEE Main 2026',
          entranceRollNo: '26031049281',
          entranceScore: '98.4 Percentile',
          entranceRank: '14,250'
        },
        Status: 'Under Review',
        StatusHistory: [
          { status: 'Submitted', date: '2026-09-22 11:35 AM', note: 'Application form submitted online by applicant.' },
          { status: 'Under Review', date: '2026-09-23 02:10 PM', note: 'Assigned to Senior Admission Counselor Dr. V. Menon for scrutiny.' },
          { status: 'Document Verified', date: '2026-09-24 04:30 PM', note: 'ID Proof, 12th Marksheet and certificates validated.' }
        ],
        MeritScore: 94.8,
        AssignedOfficer: 'Dr. Vikram Menon (Admission Officer)',
        CounselingDate: 'October 22, 2026 at 10:00 AM',
        Remarks: 'Eligible for Round 1 Admission Counseling with 25% Merit Scholarship.',
        FeeStatus: 'Paid (Application Fee ₹1,500)'
      },
      {
        Application_ID: 'APP-2026-002',
        Student_ID: 'STU-8892',
        FullName: 'Priya Sundaram',
        Email: 'priya.s@example.com',
        Phone: '+91 94432 10987',
        DOB: '2007-08-21',
        Gender: 'Female',
        Category: 'OBC',
        BloodGroup: 'B+',
        Address: '24 Anna Nagar West, Chennai, Tamil Nadu, 600040',
        FatherName: 'K. Sundaram',
        MotherName: 'Lakshmi Sundaram',
        GuardianPhone: '+91 94432 55443',
        Program: 'B.Tech Artificial Intelligence & Data Science',
        Department: 'School of Computing & AI',
        SecondaryChoice: 'B.Tech Computer Science & Engineering',
        AcademicDetails: {
          previousQualification: '12th Grade / ISC',
          institution: "St. Patrick's Junior College",
          passingYear: '2026',
          percentage: '95.8%',
          tenthBoard: 'ICSE',
          tenthSchool: "St. Patrick's High School",
          tenthYear: '2024',
          tenthPercentage: '96.2%',
          twelfthBoard: 'ISC',
          twelfthSchool: "St. Patrick's Junior College",
          twelfthYear: '2026',
          twelfthPercentage: '95.8%',
          twelfthStream: 'Science (PCMC)',
          entranceExam: 'Apex Scholastic Test (AST)',
          entranceRollNo: 'AST-2026-9021',
          entranceScore: '96.5 Percentile',
          entranceRank: '840'
        },
        Status: 'Approved',
        StatusHistory: [
          { status: 'Submitted', date: '2026-09-18 09:15 AM', note: 'Application submitted.' },
          { status: 'Under Review', date: '2026-09-19 11:00 AM', note: 'Reviewed by committee.' },
          { status: 'Document Verified', date: '2026-09-20 03:20 PM', note: 'Original certificates verified.' },
          { status: 'Approved', date: '2026-09-21 05:00 PM', note: 'Provisional Admission Offer Letter generated.' }
        ],
        MeritScore: 96.1,
        AssignedOfficer: 'Prof. Ananya Roy',
        CounselingDate: 'October 10, 2026 at 11:30 AM',
        Remarks: 'Top 1% merit rank. Full tuition scholarship of 25% recommended.',
        FeeStatus: 'Paid',
        AdmissionOfferDate: '2026-09-21'
      },
      {
        Application_ID: 'APP-2026-003',
        Student_ID: 'STU-8893',
        FullName: 'Rohan Mukherjee',
        Email: 'rohan.m@example.com',
        Phone: '+91 91234 56789',
        DOB: '2006-11-05',
        Gender: 'Male',
        Category: 'General',
        BloodGroup: 'A+',
        Address: '78 Salt Lake City, Block CD, Kolkata, WB, 700064',
        FatherName: 'Subhash Mukherjee',
        MotherName: 'Debolina Mukherjee',
        GuardianPhone: '+91 91234 99887',
        Program: 'Master of Business Administration (MBA)',
        Department: 'Apex Business School',
        SecondaryChoice: 'Post Graduate Diploma in Management',
        AcademicDetails: {
          previousQualification: 'Bachelor of Commerce (Honours)',
          institution: "St. Xavier's College, Kolkata",
          passingYear: '2026',
          percentage: '89.5%',
          tenthBoard: 'CBSE',
          tenthSchool: 'South Point High School',
          tenthYear: '2021',
          tenthPercentage: '88.0%',
          twelfthBoard: 'CBSE',
          twelfthSchool: 'South Point School',
          twelfthYear: '2023',
          twelfthPercentage: '89.5%',
          twelfthStream: 'Commerce with Maths',
          entranceExam: 'CAT 2025',
          entranceRollNo: 'CAT-25-8819',
          entranceScore: '94.2 Percentile',
          entranceRank: '5,120'
        },
        Status: 'Document Verified',
        StatusHistory: [
          { status: 'Submitted', date: '2026-09-20 04:00 PM', note: 'Application submitted.' },
          { status: 'Under Review', date: '2026-09-21 10:30 AM', note: 'Profile screened.' },
          { status: 'Document Verified', date: '2026-09-23 01:15 PM', note: 'Degree transcripts and CAT scorecard validated.' }
        ],
        MeritScore: 91.5,
        AssignedOfficer: 'Dr. K. S. Verma',
        CounselingDate: 'October 16, 2026',
        Remarks: 'Invited for Group Discussion & Personal Interview (GD/PI) round.',
        FeeStatus: 'Paid'
      }
    ]);

    // 4. Seed Documents for APP-2026-001
    await Document.create([
      {
        Document_ID: 'doc-id',
        Application_ID: 'APP-2026-001',
        Document_Type: 'ID Proof',
        File_Name: 'Aadhaar_Card_Verified.pdf',
        File_Size: '1.1 MB',
        Verification_Status: 'Verified',
        Remarks: 'Name and Date of Birth matches school certificate.'
      },
      {
        Document_ID: 'doc-cert',
        Application_ID: 'APP-2026-001',
        Document_Type: 'Academic Certificate',
        File_Name: 'Senior_Secondary_Passing_Certificate.pdf',
        File_Size: '1.8 MB',
        Verification_Status: 'Verified',
        Remarks: 'Original certificate scan verified with CBSE board registry.'
      },
      {
        Document_ID: 'doc-marksheet',
        Application_ID: 'APP-2026-001',
        Document_Type: 'Mark Sheet',
        File_Name: 'Aarav_12th_CBSE_Marksheet.pdf',
        File_Size: '2.1 MB',
        Verification_Status: 'Verified',
        Remarks: 'Aggregate 92.4% verified. Physics: 92%, Math: 96%, Chem: 89%.'
      },
      {
        Document_ID: 'doc-photo',
        Application_ID: 'APP-2026-001',
        Document_Type: 'Photograph',
        File_Name: 'Aarav_Passport_Photo.jpg',
        File_Size: '450 KB',
        Verification_Status: 'Verified',
        Remarks: 'Recent color photo with white background approved.'
      }
    ]);

    // 5. Seed Notifications
    await Notification.create([
      {
        Notification_ID: 'notif-1',
        Student_ID: 'STU-8891',
        Title: 'Application Submitted Successfully',
        Message: 'Your application (Ref: APP-2026-001) for B.Tech Computer Science & Engineering has been submitted.',
        Category: 'admission',
        Status: 'Unread',
        ActionUrl: '/student/status'
      },
      {
        Notification_ID: 'notif-2',
        Student_ID: 'STU-8891',
        Title: 'Application is Under Review',
        Message: 'Your dossier has been assigned to Senior Admission Counselor Dr. Vikram Menon for academic scrutiny.',
        Category: 'admission',
        Status: 'Unread',
        ActionUrl: '/student/status'
      },
      {
        Notification_ID: 'notif-3',
        Student_ID: 'STU-8891',
        Title: 'Document Verification Update',
        Message: 'Your 10th and 12th Marksheets and ID Proof have been verified by the Registrar Desk.',
        Category: 'document',
        Status: 'Read',
        ActionUrl: '/student/documents'
      }
    ]);

    console.log('[Seed] Successfully seeded initial demo students, applications, documents, and notifications!');
  } catch (error) {
    console.error(`[Seed Error] ${error.message}`);
  }
};
