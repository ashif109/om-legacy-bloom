import mongoose from "mongoose";

const adminUserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  loginAttempts: {
    type: Number,
    required: true,
    default: 0,
  },
  lockUntil: {
    type: Date,
  },
}, { timestamps: true });

// Check if model already exists to avoid OverwriteModelError
export const AdminUser = mongoose.models.AdminUser || mongoose.model("AdminUser", adminUserSchema);
