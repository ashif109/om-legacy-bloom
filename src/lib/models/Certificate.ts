import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  category: {
    type: String, // e.g., 'camp', 'competition', 'conference', 'award', 'olympiad'
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ""
  }
}, { timestamps: true });

export const Certificate = mongoose.models.Certificate || mongoose.model("Certificate", certificateSchema);
