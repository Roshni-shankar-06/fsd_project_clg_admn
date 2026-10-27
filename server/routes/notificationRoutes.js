import express from 'express';
import mongoose from 'mongoose';
import Notification from '../models/Notification.js';

const router = express.Router();

// Get notifications for student
router.get('/student/:studentId', async (req, res) => {
  try {
    const { studentId } = req.params;
    const notifications = await Notification.find({
      $or: [
        { Student_ID: studentId },
        { Student_ID: 'all' }
      ]
    }).sort({ Date: -1 });

    res.status(200).json({
      success: true,
      notifications
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Mark single notification read
router.put('/:id/read', async (req, res) => {
  try {
    const { id } = req.params;
    const query = mongoose.Types.ObjectId.isValid(id)
      ? { $or: [{ _id: id }, { Notification_ID: id }] }
      : { Notification_ID: id };

    await Notification.findOneAndUpdate(query, { Status: 'Read' });
    res.status(200).json({ success: true, message: 'Notification marked read' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Mark all read
router.put('/read-all/:studentId', async (req, res) => {
  try {
    const { studentId } = req.params;
    await Notification.updateMany(
      { Student_ID: studentId },
      { Status: 'Read' }
    );
    res.status(200).json({ success: true, message: 'All notifications marked as read' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
