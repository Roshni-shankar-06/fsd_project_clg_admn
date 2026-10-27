import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.js';
import { seedDatabase } from './seed/seedData.js';
import studentRoutes from './routes/studentRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import documentRoutes from './routes/documentRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend Vite client
app.use(
  cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true
  })
);

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check API
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Apex University College Admission System Backend API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API Routes
app.use('/api/students', studentRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/notifications', notificationRoutes);

// Developer / Examiner Database Inspector Endpoint
app.get('/api/dev/db-summary', async (req, res) => {
  try {
    const { default: Student } = await import('./models/Student.js');
    const { default: Application } = await import('./models/Application.js');
    const { default: Document } = await import('./models/Document.js');
    const { default: Admin } = await import('./models/Admin.js');
    const { default: Notification } = await import('./models/Notification.js');

    const [students, applications, documents, admins, notifications] = await Promise.all([
      Student.find().select('-Password'),
      Application.find().sort({ createdAt: -1 }),
      Document.find().sort({ createdAt: -1 }),
      Admin.find().select('-Password'),
      Notification.find().sort({ createdAt: -1 })
    ]);

    res.status(200).json({
      success: true,
      database: 'MongoDB (College Admission System)',
      summary: {
        totalStudents: students.length,
        totalApplications: applications.length,
        totalDocuments: documents.length,
        totalAdmins: admins.length,
        totalNotifications: notifications.length
      },
      collections: {
        students,
        applications,
        documents,
        admins,
        notifications
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

// Connect DB & Start Server
const startServer = async () => {
  try {
    await connectDB();
    await seedDatabase();

    app.listen(PORT, () => {
      console.log(`\n======================================================`);
      console.log(`🎓 College Admission System Backend Server Active`);
      console.log(`🌐 Server running at: http://127.0.0.1:${PORT}`);
      console.log(`📡 Health Check URL: http://127.0.0.1:${PORT}/api/health`);
      console.log(`======================================================\n`);
    });
  } catch (error) {
    console.error(`Failed to start server: ${error.message}`);
    process.exit(1);
  }
};

startServer();
