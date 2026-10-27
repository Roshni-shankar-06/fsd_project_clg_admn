import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema(
  {
    Document_ID: {
      type: String,
      required: true,
      index: true
    },
    Application_ID: {
      type: String,
      required: true,
      index: true
    },
    Document_Type: {
      type: String,
      required: [true, 'Document type is required']
    },
    Document_URL: {
      type: String,
      default: ''
    },
    File_Name: {
      type: String,
      default: ''
    },
    File_Size: {
      type: String,
      default: ''
    },
    Verification_Status: {
      type: String,
      enum: ['Pending', 'Uploaded', 'Verified', 'Rejected', 'not_applicable'],
      default: 'Pending'
    },
    Remarks: {
      type: String,
      default: ''
    },
    Uploaded_At: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

const Document = mongoose.model('Document', documentSchema);
export default Document;
