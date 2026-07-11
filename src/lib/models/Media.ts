import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema({
  type: {
    type: String, // e.g. "YouTube", "Image"
    required: true
  },
  title: {
    type: String,
    required: true
  },
  source: {
    type: String, // e.g. YouTube URL or Omjiworld string
    required: true
  },
  year: {
    type: Number
  }
}, { timestamps: true });

export const Media = mongoose.models.Media || mongoose.model("Media", mediaSchema);
