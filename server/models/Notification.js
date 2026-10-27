import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
  {
    Notification_ID: {
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
    Title: {
      type: String,
      required: true
    },
    Message: {
      type: String,
      required: true
    },
    Category: {
      type: String,
      default: 'admission'
    },
    Date: {
      type: Date,
      default: Date.now
    },
    Status: {
      type: String,
      enum: ['Unread', 'Read'],
      default: 'Unread'
    },
    ActionUrl: {
      type: String,
      default: '/student/status'
    }
  },
  {
    timestamps: true
  }
);

const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;
