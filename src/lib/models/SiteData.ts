import mongoose from "mongoose";

// A general schema for simple array/object data that doesn't need its own collection
const siteDataSchema = new mongoose.Schema({
  // e.g. stats
  stats: [{
    value: String,
    label: String
  }],
  // e.g. mission cards
  missionCards: [{
    title: String,
    body: String
  }],
  // e.g. skills
  skills: [{
    name: String,
    value: Number
  }],
  // e.g. education
  education: [{
    period: String,
    degree: String,
    org: String
  }],
  // e.g. journey
  journey: [{
    year: String,
    title: String,
    body: String
  }],
  // e.g. contact info
  contact: {
    phone: String,
    email: String,
    address: String,
    socials: [{
      name: String,
      href: String
    }]
  }
}, { timestamps: true });

// Check if model already exists to avoid OverwriteModelError in Next.js / Serverless
export const SiteData = mongoose.models.SiteData || mongoose.model("SiteData", siteDataSchema);
