import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const adminSchema = new mongoose.Schema(
  {
    Admin_ID: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    Name: {
      type: String,
      required: [true, 'Admin name is required'],
      trim: true
    },
    Email: {
      type: String,
      required: [true, 'Admin email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      index: true
    },
    Password: {
      type: String,
      required: [true, 'Password is required']
    },
    Role: {
      type: String,
      enum: ['Dean', 'Verifier', 'Counselor', 'Admin', 'SuperAdmin'],
      default: 'Admin'
    },
    Department: {
      type: String,
      default: 'University Admissions Directorate'
    }
  },
  {
    timestamps: true
  }
);

// Encrypt password before saving
adminSchema.pre('save', async function (next) {
  if (!this.isModified('Password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.Password = await bcrypt.hash(this.Password, salt);
  next();
});

// Compare password method
adminSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.Password);
};

const Admin = mongoose.model('Admin', adminSchema);
export default Admin;
