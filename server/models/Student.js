import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const studentSchema = new mongoose.Schema(
  {
    Student_ID: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    Name: {
      type: String,
      required: [true, 'Student name is required'],
      trim: true
    },
    Email: {
      type: String,
      required: [true, 'Student email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      index: true
    },
    Phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true
    },
    Password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6
    },
    Role: {
      type: String,
      default: 'student'
    }
  },
  {
    timestamps: true
  }
);

// Encrypt password before saving
studentSchema.pre('save', async function (next) {
  if (!this.isModified('Password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.Password = await bcrypt.hash(this.Password, salt);
  next();
});

// Compare password method
studentSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.Password);
};

const Student = mongoose.model('Student', studentSchema);
export default Student;
