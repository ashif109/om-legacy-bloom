import mongoose from "mongoose";
import dns from "node:dns";
if (process.platform === "win32") {
  dns.setServers(["8.8.8.8", "8.8.4.4"]);
}
import "dotenv/config";

// Read from process.env explicitly (dotenv loads it from .env)
const dbUri = process.env.VITE_MONGODB_URI;

import { 
  stats, missionCards, journey, achievements, skills, education, 
  media, socialWork, trainings, workshops, events, 
  seminars, camps, responsibilities, projects, publications, 
  testimonials, downloads, contact 
} from "./src/lib/site-data";
import { 
  Journey, Award, Education, Skill, SocialWork, 
  Training, Workshop, Event, Seminar, Camp, Project, 
  Publication, Download, Testimonial, Gallery 
} from "./src/lib/models/ContentModels";
import { SiteData } from "./src/lib/models/SiteData";
import { Media } from "./src/lib/models/Media";

async function seed() {
  console.log("Connecting to DB...");
  await mongoose.connect(dbUri, {
    bufferCommands: false,
    serverSelectionTimeoutMS: 5000,
    family: 4, // IPv4
  });
  console.log("Connected.");

  console.log("Seeding SiteData singleton (stats, missionCards, contact)...");
  await SiteData.deleteMany({});
  await SiteData.create({
    stats,
    missionCards,
    contact
  });

  console.log("Seeding collections...");
  
  await Journey.deleteMany({});
  if (journey.length > 0) {
    await Journey.insertMany(journey);
  }

  await Award.deleteMany({});
  if (achievements.length > 0) {
    await Award.insertMany(achievements.map(a => ({ title: a.title, year: String(a.year), description: a.org })));
  }

  await Skill.deleteMany({});
  if (skills.length > 0) {
    await Skill.insertMany(skills.map(s => ({ name: s.name, category: "General", proficiency: s.value })));
  }

  await Education.deleteMany({});
  if (education.length > 0) {
    await Education.insertMany(education.map(e => ({ degree: e.degree, institution: e.org, year: e.period })));
  }

  await Media.deleteMany({});
  if (media.length > 0) {
    await Media.insertMany(media);
  }

  await SocialWork.deleteMany({});
  if (socialWork.length > 0) {
    await SocialWork.insertMany(socialWork.map(s => ({ title: s.title, organization: s.impact, date: String(s.year) })));
  }

  await Training.deleteMany({});
  await Workshop.deleteMany({});
  await Event.deleteMany({});
  await Seminar.deleteMany({});
  await Camp.deleteMany({});
  await Project.deleteMany({});
  await Publication.deleteMany({});
  await Testimonial.deleteMany({});
  await Download.deleteMany({});

  console.log("Seeding complete!");
  process.exit(0);
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
