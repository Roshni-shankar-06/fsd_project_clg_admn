export const PROGRAMS_DATA = [
  {
    id: "prog-1",
    name: "B.Tech Computer Science & Engineering",
    code: "CSE-2026",
    department: "School of Computing & AI",
    duration: "4 Years (8 Semesters)",
    seats: 180,
    filledSeats: 142,
    feePerYear: "$8,500 / ₹3,20,000",
    eligibility: "Minimum 75% in 12th Grade with Physics, Chemistry & Math + Valid Entrance Score",
    deadline: "October 15, 2026",
    badge: "Most Popular",
    description: "Specializations in Artificial Intelligence, Cloud Computing, and Cybersecurity."
  },
  {
    id: "prog-2",
    name: "B.Tech Artificial Intelligence & Data Science",
    code: "AIDS-2026",
    department: "School of Computing & AI",
    duration: "4 Years (8 Semesters)",
    seats: 120,
    filledSeats: 98,
    feePerYear: "$9,000 / ₹3,40,000",
    eligibility: "Minimum 75% in 12th PCM with Mathematics proficiency",
    deadline: "October 20, 2026",
    badge: "Trending",
    description: "Industry-aligned curriculum with deep learning, neural networks, and big data infrastructure."
  },
  {
    id: "prog-3",
    name: "Master of Business Administration (MBA)",
    code: "MBA-2026",
    department: "Apex Business School",
    duration: "2 Years (4 Semesters)",
    seats: 120,
    filledSeats: 85,
    feePerYear: "$11,000 / ₹4,50,000",
    eligibility: "Bachelor's Degree with min 60% aggregate + CAT/GMAT/MAT score",
    deadline: "November 05, 2026",
    badge: "Top Placement",
    description: "Dual specializations in FinTech, Strategic Marketing, and Global Operations Management."
  },
  {
    id: "prog-4",
    name: "B.Tech Electronics & Communication Engineering",
    code: "ECE-2026",
    department: "School of Engineering",
    duration: "4 Years (8 Semesters)",
    seats: 120,
    filledSeats: 76,
    feePerYear: "$7,800 / ₹2,80,000",
    eligibility: "Minimum 70% in 12th Grade with Physics, Chemistry & Math",
    deadline: "October 25, 2026",
    badge: "Accredited",
    description: "Focus on VLSI Design, IoT embedded systems, and Next-Gen telecommunications."
  },
  {
    id: "prog-5",
    name: "Bachelor of Business Administration (BBA)",
    code: "BBA-2026",
    department: "Apex Business School",
    duration: "3 Years (6 Semesters)",
    seats: 150,
    filledSeats: 110,
    feePerYear: "$6,500 / ₹2,40,000",
    eligibility: "Minimum 65% in 12th Grade (Any Stream)",
    deadline: "October 30, 2026",
    badge: "High Demand",
    description: "Foundation in modern enterprise leadership, digital business models, and analytics."
  },
  {
    id: "prog-6",
    name: "M.Sc. Biotechnology & Genomics",
    code: "BIOTECH-2026",
    department: "School of Life Sciences",
    duration: "2 Years (4 Semesters)",
    seats: 60,
    filledSeats: 45,
    feePerYear: "$7,200 / ₹2,60,000",
    eligibility: "B.Sc. in Biology/Biotechnology/Life Sciences with min 60%",
    deadline: "November 10, 2026",
    badge: "Research Focus",
    description: "Hands-on molecular diagnostics, genetic engineering, and bio-informatics labs."
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: "notif-1",
    title: "Application Submitted Successfully",
    message: "Your application (Ref: APX-2026-8891) for B.Tech Computer Science & Engineering has been submitted and registered into the admissions queue.",
    timestamp: "10 mins ago",
    date: "2026-09-25 12:15 PM",
    category: "admission",
    read: false,
    actionUrl: "/student/status"
  },
  {
    id: "notif-2",
    title: "Application is Under Review",
    message: "Your dossier has been assigned to Senior Admission Counselor Dr. Vikram Menon for academic eligibility and merit screening.",
    timestamp: "2 hours ago",
    date: "2026-09-25 10:30 AM",
    category: "admission",
    read: false,
    actionUrl: "/student/status"
  },
  {
    id: "notif-3",
    title: "Document Verification Update",
    message: "Your 10th and 12th Marksheets and National Entrance credentials have been verified successfully by the Registrar Desk.",
    timestamp: "Yesterday",
    date: "2026-09-24 04:30 PM",
    category: "document",
    read: false,
    actionUrl: "/student/documents"
  },
  {
    id: "notif-4",
    title: "Admission Decision: Merit Allotment",
    message: "Congratulations! You have been provisionally recommended for Round 1 Seat Allocation. Please verify your final offer letter.",
    timestamp: "2 days ago",
    date: "2026-09-23 09:00 AM",
    category: "alert",
    read: true,
    actionUrl: "/student/status"
  }
];

export const INITIAL_DOCUMENTS = [
  {
    id: "doc-id",
    name: "Government ID Proof",
    code: "DOC-ID",
    type: "PDF / JPG",
    required: true,
    status: "verified", // pending, uploaded, verified, rejected
    fileName: "Aadhaar_Card_Verified.pdf",
    fileSize: "1.1 MB",
    uploadedAt: "2026-09-22 11:30 AM",
    remarks: "Name and Date of Birth matches school certificate.",
    documentCategory: "ID Proof"
  },
  {
    id: "doc-cert",
    name: "Academic Passing Certificate",
    code: "DOC-CERT",
    type: "PDF / JPG",
    required: true,
    status: "verified",
    fileName: "Senior_Secondary_Passing_Certificate.pdf",
    fileSize: "1.8 MB",
    uploadedAt: "2026-09-22 11:22 AM",
    remarks: "Original certificate scan verified with CBSE board registry.",
    documentCategory: "Academic Certificate"
  },
  {
    id: "doc-marksheet",
    name: "12th Grade / Senior Mark Sheet",
    code: "DOC-MARKSHEET",
    type: "PDF / JPG",
    required: true,
    status: "verified",
    fileName: "Aarav_12th_CBSE_Marksheet.pdf",
    fileSize: "2.1 MB",
    uploadedAt: "2026-09-22 11:20 AM",
    remarks: "Aggregate 92.4% verified. Physics: 92%, Math: 96%, Chem: 89%.",
    documentCategory: "Mark Sheet"
  },
  {
    id: "doc-photo",
    name: "Passport Size Photograph",
    code: "DOC-PHOTO",
    type: "JPG / PNG",
    required: true,
    status: "verified",
    fileName: "Aarav_Passport_Photo.jpg",
    fileSize: "450 KB",
    uploadedAt: "2026-09-22 11:32 AM",
    remarks: "Recent color photo with white background approved.",
    documentCategory: "Photograph"
  },
  {
    id: "doc-entrance",
    name: "Entrance Exam Score Card",
    code: "DOC-ENTRANCE",
    type: "PDF / JPG",
    required: false,
    status: "uploaded",
    fileName: "JEE_Main_Scorecard_2026.pdf",
    fileSize: "840 KB",
    uploadedAt: "2026-09-22 11:25 AM",
    remarks: "98.4 Percentile verified from NTA portal.",
    documentCategory: "Entrance Score"
  },
  {
    id: "doc-tc",
    name: "Transfer / Migration Certificate",
    code: "DOC-TC",
    type: "PDF / JPG",
    required: false,
    status: "uploaded",
    fileName: "School_Transfer_Certificate.pdf",
    fileSize: "920 KB",
    uploadedAt: "2026-09-24 02:15 PM",
    remarks: "Uploaded. Verification pending by committee.",
    documentCategory: "Transfer Certificate"
  }
];

export const INITIAL_APPLICATIONS = [
  {
    id: "APP-2026-001",
    refNumber: "APX-2026-8891",
    studentId: "STU-8891",
    fullName: "Aarav Sharma",
    email: "aarav.sharma@example.com",
    phone: "+91 98765 43210",
    dob: "2007-04-15",
    gender: "Male",
    category: "General",
    bloodGroup: "O+",
    fatherName: "Rajesh Sharma",
    motherName: "Sunita Sharma",
    guardianPhone: "+91 98765 11223",
    address: "Flat 402, Royal Palms, Sector 62, Noida, UP, 201301",
    programId: "prog-1",
    programName: "B.Tech Computer Science & Engineering",
    department: "School of Computing & AI",
    secondaryChoice: "B.Tech Artificial Intelligence & Data Science",
    academicDetails: {
      previousQualification: "12th Grade / Senior Secondary (CBSE)",
      institution: "Delhi Public School, R.K. Puram",
      passingYear: "2026",
      percentage: "92.4%",
      tenthBoard: "CBSE",
      tenthSchool: "Delhi Public School, R.K. Puram",
      tenthYear: "2024",
      tenthPercentage: "94.6%",
      twelfthBoard: "CBSE",
      twelfthSchool: "Delhi Public School, R.K. Puram",
      twelfthYear: "2026",
      twelfthPercentage: "92.4%",
      twelfthStream: "Science (PCM)",
      entranceExam: "JEE Main 2026",
      entranceRollNo: "26031049281",
      entranceScore: "98.4 Percentile",
      entranceRank: "14,250"
    },
    status: "Under Review", // "Draft", "Submitted", "Under Review", "Document Verified", "Approved", "Rejected"
    statusHistory: [
      { status: "Submitted", date: "2026-09-22 11:35 AM", note: "Application form submitted online by applicant." },
      { status: "Under Review", date: "2026-09-23 02:10 PM", note: "Assigned to Senior Admission Counselor Dr. V. Menon for scrutiny." },
      { status: "Document Verified", date: "2026-09-24 04:30 PM", note: "ID Proof, 12th Marksheet and certificates validated." }
    ],
    submissionDate: "2026-09-22",
    documentsCount: 6,
    verifiedDocsCount: 4,
    assignedOfficer: "Dr. Vikram Menon (Admission Officer)",
    counselorContact: "v.menon@apex.edu | Ext: 402",
    counselingDate: "October 22, 2026 at 10:00 AM",
    meritScore: 94.8,
    remarks: "Eligible for Round 1 Admission Counseling with 25% Merit Scholarship.",
    feeStatus: "Paid (Application Fee ₹1,500)",
    admissionOfferDate: null
  },
  {
    id: "APP-2026-002",
    refNumber: "APX-2026-8892",
    studentId: "STU-8892",
    fullName: "Priya Sundaram",
    email: "priya.s@example.com",
    phone: "+91 94432 10987",
    dob: "2007-08-21",
    gender: "Female",
    category: "OBC",
    bloodGroup: "B+",
    fatherName: "K. Sundaram",
    motherName: "Lakshmi Sundaram",
    guardianPhone: "+91 94432 55443",
    address: "24 Anna Nagar West, Chennai, Tamil Nadu, 600040",
    programId: "prog-2",
    programName: "B.Tech Artificial Intelligence & Data Science",
    department: "School of Computing & AI",
    secondaryChoice: "B.Tech Computer Science & Engineering",
    academicDetails: {
      previousQualification: "12th Grade / ISC",
      institution: "St. Patrick's Junior College",
      passingYear: "2026",
      percentage: "95.8%",
      tenthBoard: "ICSE",
      tenthSchool: "St. Patrick's High School",
      tenthYear: "2024",
      tenthPercentage: "96.2%",
      twelfthBoard: "ISC",
      twelfthSchool: "St. Patrick's Junior College",
      twelfthYear: "2026",
      twelfthPercentage: "95.8%",
      twelfthStream: "Science (PCMC)",
      entranceExam: "Apex Scholastic Test (AST)",
      entranceRollNo: "AST-2026-9021",
      entranceScore: "96.5 Percentile",
      entranceRank: "840"
    },
    status: "Approved",
    statusHistory: [
      { status: "Submitted", date: "2026-09-18 09:15 AM", note: "Application submitted." },
      { status: "Under Review", date: "2026-09-19 11:00 AM", note: "Reviewed by committee." },
      { status: "Document Verified", date: "2026-09-20 03:20 PM", note: "Original certificates verified." },
      { status: "Approved", date: "2026-09-21 05:00 PM", note: "Provisional Admission Offer Letter generated." }
    ],
    submissionDate: "2026-09-18",
    documentsCount: 6,
    verifiedDocsCount: 6,
    assignedOfficer: "Prof. Ananya Roy",
    counselorContact: "a.roy@apex.edu",
    counselingDate: "October 10, 2026 at 11:30 AM",
    meritScore: 96.1,
    remarks: "Top 1% merit rank. Full tuition scholarship of 25% recommended.",
    feeStatus: "Paid",
    admissionOfferDate: "2026-09-21"
  }
];

export const DEMO_USERS = {
  student: {
    id: "STU-8891",
    name: "Aarav Sharma",
    email: "aarav.sharma@example.com",
    role: "student",
    appId: "APP-2026-001",
    refNumber: "APX-2026-8891",
    avatar: "AS",
    phone: "+91 98765 43210"
  },
  admin: {
    id: "ADM-1001",
    name: "Dr. Vikram Menon",
    email: "admin@apex.edu",
    role: "admin",
    designation: "Chief Admissions Dean & Registrar",
    avatar: "VM",
    department: "University Admissions Directorate"
  }
};
