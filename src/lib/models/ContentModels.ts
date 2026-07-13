import mongoose from "mongoose";

// --- Journey ---
const journeySchema = new mongoose.Schema({
  year: { type: String, required: true },
  title: { type: String, required: true },
  body: { type: String, required: true },
  order: { type: Number, default: 0 }
}, { timestamps: true });
export const Journey = mongoose.models.Journey || mongoose.model("Journey", journeySchema);

// --- Service ---
const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: String,
  order: { type: Number, default: 0 }
}, { timestamps: true });
export const Service = mongoose.models.Service || mongoose.model("Service", serviceSchema);

// --- Award ---
const awardSchema = new mongoose.Schema({
  year: String,
  title: { type: String, required: true },
  description: String,
  image: String,
  order: { type: Number, default: 0 }
}, { timestamps: true });
export const Award = mongoose.models.Award || mongoose.model("Award", awardSchema);

// --- Education ---
const educationSchema = new mongoose.Schema({
  degree: { type: String, required: true },
  institution: { type: String, required: true },
  year: String,
  grade: String,
  order: { type: Number, default: 0 }
}, { timestamps: true });
export const Education = mongoose.models.Education || mongoose.model("Education", educationSchema);

// --- Skill ---
const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true }, // e.g. Vedic, Technical, Spiritual
  proficiency: { type: Number, min: 0, max: 100 },
  icon: String,
  order: { type: Number, default: 0 }
}, { timestamps: true });
export const Skill = mongoose.models.Skill || mongoose.model("Skill", skillSchema);

// --- SocialWork ---
const socialWorkSchema = new mongoose.Schema({
  title: { type: String, required: true },
  organization: String,
  date: String,
  images: [String],
  order: { type: Number, default: 0 }
}, { timestamps: true });
export const SocialWork = mongoose.models.SocialWork || mongoose.model("SocialWork", socialWorkSchema);

// --- Training ---
const trainingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  organizer: String,
  duration: String,
  status: String, // e.g. Completed, In Progress
  order: { type: Number, default: 0 }
}, { timestamps: true });
export const Training = mongoose.models.Training || mongoose.model("Training", trainingSchema);

// --- Workshop ---
const workshopSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: String,
  venue: String,
  speaker: String,
  registrationLink: String,
  order: { type: Number, default: 0 }
}, { timestamps: true });
export const Workshop = mongoose.models.Workshop || mongoose.model("Workshop", workshopSchema);

// --- Event ---
const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: String,
  venue: String,
  description: String,
  banner: String,
  isFeatured: { type: Boolean, default: false },
  status: { type: String, enum: ["Upcoming", "Past"], default: "Upcoming" },
  registrationLink: String,
  order: { type: Number, default: 0 }
}, { timestamps: true });
export const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);

// --- Seminar ---
const seminarSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: String,
  venue: String,
  recordingLink: String,
  order: { type: Number, default: 0 }
}, { timestamps: true });
export const Seminar = mongoose.models.Seminar || mongoose.model("Seminar", seminarSchema);

// --- Camp ---
const campSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dates: String,
  location: String,
  organizer: String,
  gallery: [String],
  order: { type: Number, default: 0 }
}, { timestamps: true });
export const Camp = mongoose.models.Camp || mongoose.model("Camp", campSchema);

// --- Project ---
const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  techStack: [String], // tags
  teamMembers: [String],
  status: { type: String, default: "Completed" },
  githubLink: String,
  liveLink: String,
  order: { type: Number, default: 0 }
}, { timestamps: true });
export const Project = mongoose.models.Project || mongoose.model("Project", projectSchema);

// --- Publication ---
const publicationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  type: { type: String, default: "Article" },
  abstract: String,
  cover: String,
  link: String,
  order: { type: Number, default: 0 }
}, { timestamps: true });
export const Publication = mongoose.models.Publication || mongoose.model("Publication", publicationSchema);

// --- Download ---
const downloadSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  fileUrl: { type: String, required: true },
  category: String,
  downloadCount: { type: Number, default: 0 },
  fileSize: String,
  order: { type: Number, default: 0 }
}, { timestamps: true });
export const Download = mongoose.models.Download || mongoose.model("Download", downloadSchema);

// --- Testimonial ---
const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: String,
  content: { type: String, required: true },
  avatar: String,
  rating: { type: Number, min: 1, max: 5, default: 5 },
  isApproved: { type: Boolean, default: true },
  order: { type: Number, default: 0 }
}, { timestamps: true });
export const Testimonial = mongoose.models.Testimonial || mongoose.model("Testimonial", testimonialSchema);

// --- Gallery ---
const gallerySchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  altText: String,
  category: String,
  order: { type: Number, default: 0 }
}, { timestamps: true });
export const Gallery = mongoose.models.Gallery || mongoose.model("Gallery", gallerySchema);

// --- Settings ---
const settingsSchema = new mongoose.Schema({
  siteTitle: { type: String, default: "Om Legacy Bloom" },
  footerText: String,
  socialLinks: {
    youtube: String,
    instagram: String,
    facebook: String,
    twitter: String
  },
  seo: {
    title: String,
    description: String,
    keywords: [String]
  }
}, { timestamps: true });
export const Settings = mongoose.models.Settings || mongoose.model("Settings", settingsSchema);
