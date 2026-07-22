import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { SiteData } from "../lib/models/SiteData";
import { Certificate } from "../lib/models/Certificate";
import { Media } from "../lib/models/Media";
import { Journey, Education, Skill, SocialWork } from "../lib/models/ContentModels";
import * as siteData from "../lib/site-data";
import path from "path";
import { fileURLToPath } from "url";
import dns from "node:dns";
if (process.platform === "win32") {
  dns.setServers(["8.8.8.8", "8.8.4.4"]);
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

async function seed() {
  const uri = process.env.MONGODB_URI || process.env.VITE_MONGODB_URI;
  if (!uri) {
    console.error("MONGODB_URI or VITE_MONGODB_URI is not set");
    process.exit(1);
  }

  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(uri);
    console.log("Connected.");

    // Clear existing
    await SiteData.deleteMany({});
    await Certificate.deleteMany({});
    await Media.deleteMany({});
    await Journey.deleteMany({});
    await Education.deleteMany({});
    await Skill.deleteMany({});
    await SocialWork.deleteMany({});

    console.log("Cleared existing data.");

    // 1. Insert General Site Data
    const payload = {
      stats: siteData.stats,
      missionCards: siteData.missionCards,
      contact: siteData.contact,
    };
    
    await SiteData.create(payload);
    console.log("Inserted Site Data.");

    // 2. Insert Individual Collections
    if (siteData.journey && siteData.journey.length > 0) {
      await Journey.insertMany(siteData.journey);
      console.log(`Inserted ${siteData.journey.length} Journey items.`);
    }

    if (siteData.education && siteData.education.length > 0) {
      await Education.insertMany(siteData.education.map(e => ({
        degree: e.degree,
        institution: e.org,
        year: e.period
      })));
      console.log(`Inserted ${siteData.education.length} Education items.`);
    }

    if (siteData.skills && siteData.skills.length > 0) {
      await Skill.insertMany(siteData.skills.map(s => ({
        name: s.name,
        category: "General",
        proficiency: s.value
      })));
      console.log(`Inserted ${siteData.skills.length} Skill items.`);
    }

    if (siteData.socialWork && siteData.socialWork.length > 0) {
      await SocialWork.insertMany(siteData.socialWork.map(s => ({
        title: s.title,
        organization: s.impact, // impact maps nicely to organization in the schema for now
        date: s.year.toString()
      })));
      console.log(`Inserted ${siteData.socialWork.length} SocialWork items.`);
    }

    // 2. Insert Media
    if (siteData.media && siteData.media.length > 0) {
      await Media.insertMany(siteData.media);
      console.log(`Inserted ${siteData.media.length} media items.`);
    }

    // Note: Certificates were mapped manually via import.meta.glob from static assets.
    // They will need to be uploaded manually via the new Admin panel to Cloudinary,
    // OR the user can keep static assets and we just insert dummy certificates here.
    // For now, we will leave the certificates collection empty so the user can upload them natively.
    console.log("Certificates should be uploaded via the Admin Panel -> Certificates.");

    console.log("Seeding complete!");
    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
}

seed();
