import { createServerFn } from "@tanstack/react-start";
import { parseCookies, setCookie } from "vinxi/http";

const JWT_SECRET = import.meta.env.VITE_JWT_SECRET || "fallback_secret_key_for_dev";
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "admin123";

const verifyAuth = async (token: string) => {
  const jwt = (await import("jsonwebtoken")).default || await import("jsonwebtoken");
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (e) {
    throw new Error("Unauthorized");
  }
};

// Authentication endpoints
export const loginAdmin = createServerFn({ method: "POST" })
  .validator((data: { email?: string, password: string }) => data)
  .handler(async ({ data }) => {
    const { connectDB } = await import("../lib/db"); await connectDB();
    const models = await import("../lib/models");
    const mongoose = (await import("mongoose")).default;
    const bcrypt = (await import("bcryptjs")).default || await import("bcryptjs");
    const jwt = (await import("jsonwebtoken")).default || await import("jsonwebtoken");
    const { AdminUser } = await import("./models/AdminUser");
    
    // Auto-seed first admin if none exists
    const adminCount = await AdminUser.countDocuments();
    if (adminCount === 0) {
      const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);
      await AdminUser.create({
        email: "admin@omlegacybloom.com", // default email
        password: hashedPassword
      });
    }

    const emailToUse = data.email || "admin@omlegacybloom.com";
    const user = await AdminUser.findOne({ email: emailToUse });
    
    if (!user) {
      throw new Error("Invalid credentials");
    }

    // Check rate limiting
    if (user.lockUntil && user.lockUntil > new Date()) {
      throw new Error("Account is temporarily locked due to too many failed attempts. Try again later.");
    }

    const isMatch = await bcrypt.compare(data.password, user.password);

    if (!isMatch) {
      user.loginAttempts += 1;
      // Lock if 5 attempts
      if (user.loginAttempts >= 5) {
        user.lockUntil = new Date(Date.now() + 15 * 60 * 1000); // 15 mins lock
      }
      await user.save();
      throw new Error("Invalid credentials");
    }

    // Reset attempts on success
    if (user.loginAttempts > 0 || user.lockUntil) {
      user.loginAttempts = 0;
      user.lockUntil = undefined;
      await user.save();
    }
    
    const token = jwt.sign({ role: "admin", id: user._id }, JWT_SECRET, { expiresIn: "1h" }); // 60 mins timeout
    
    return { success: true, token };
  });

export const verifyAdmin = createServerFn({ method: "POST" })
  .validator((data: { token: string }) => data)
  .handler(async ({ data }) => {
    const jwt = (await import("jsonwebtoken")).default || await import("jsonwebtoken");
    try {
      jwt.verify(data.token, JWT_SECRET);
      return { success: true };
    } catch {
      return { success: false };
    }
  });

// Generic Site Data
export const getSiteData = createServerFn({ method: "GET" })
  .handler(async () => {
    const { connectDB } = await import("../lib/db"); await connectDB();
    const models = await import("../lib/models");
    const mongoose = (await import("mongoose")).default;
    const siteDataDoc = await models.SiteData.findOne().lean() || {};
    
    // Fetch associated collections that were seeded
    const journey = await models.Journey.find().sort({ year: 1, createdAt: 1 }).lean();
    const achievements = await models.Award.find().sort({ year: -1, createdAt: -1 }).lean();
    const skills = await models.Skill.find().sort({ createdAt: 1 }).lean();
    const education = await models.Education.find().sort({ createdAt: 1 }).lean();
    const testimonials = await models.Testimonial.find({ isApproved: true }).sort({ createdAt: -1 }).lean();

    const data = {
      ...siteDataDoc,
      journey,
      achievements,
      skills,
      education,
      testimonials
    };

    return JSON.parse(JSON.stringify(data));
  });

export const updateSiteData = createServerFn({ method: "POST" })
  .validator((data: { token: string, payload: any }) => data)
  .handler(async ({ data }) => {
    await verifyAuth(data.token);

    const { connectDB } = await import("../lib/db"); await connectDB();
    const models = await import("../lib/models");
    const mongoose = (await import("mongoose")).default;
    const result = await models.SiteData.findOneAndUpdate({}, data.payload, { upsert: true, new: true }).lean();
    return JSON.parse(JSON.stringify(result));
  });

// Awards
export const getAwards = createServerFn({ method: "GET" })
  .handler(async () => {
    const { connectDB } = await import("../lib/db"); await connectDB();
    const models = await import("../lib/models");
    const mongoose = (await import("mongoose")).default;
    const awards = await models.Award.find().sort({ year: -1, createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(awards));
  });

export const addAward = createServerFn({ method: "POST" })
  .validator((data: { token: string, award: any }) => data)
  .handler(async ({ data }) => {
    await verifyAuth(data.token);
    const { connectDB } = await import("../lib/db"); await connectDB();
    const models = await import("../lib/models");
    const mongoose = (await import("mongoose")).default;
    const award = await models.Award.create(data.award);
    return JSON.parse(JSON.stringify(award));
  });

export const updateAward = createServerFn({ method: "POST" })
  .validator((data: { token: string, id: string, award: any }) => data)
  .handler(async ({ data }) => {
    await verifyAuth(data.token);
    const { connectDB } = await import("../lib/db"); await connectDB();
    const models = await import("../lib/models");
    const mongoose = (await import("mongoose")).default;
    const award = await models.Award.findByIdAndUpdate(data.id, data.award, { new: true });
    return JSON.parse(JSON.stringify(award));
  });

export const deleteAward = createServerFn({ method: "POST" })
  .validator((data: { token: string, id: string }) => data)
  .handler(async ({ data }) => {
    await verifyAuth(data.token);
    const { connectDB } = await import("../lib/db"); await connectDB();
    const models = await import("../lib/models");
    const mongoose = (await import("mongoose")).default;
    await models.Award.findByIdAndDelete(data.id);
    return { success: true };
  });

// Certificates
export const getCertificates = createServerFn({ method: "GET" })
  .handler(async () => {
    const { connectDB } = await import("../lib/db"); await connectDB();
    const models = await import("../lib/models");
    const mongoose = (await import("mongoose")).default;
    const certificates = await models.Certificate.find().sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(certificates));
  });

export const addCertificate = createServerFn({ method: "POST" })
  .validator((data: { token: string, certificate: any }) => data)
  .handler(async ({ data }) => {
    await verifyAuth(data.token);
    const { connectDB } = await import("../lib/db"); await connectDB();
    const models = await import("../lib/models");
    const mongoose = (await import("mongoose")).default;
    const cert = await models.Certificate.create(data.certificate);
    return JSON.parse(JSON.stringify(cert));
  });

export const updateCertificate = createServerFn({ method: "POST" })
  .validator((data: { token: string, id: string, certificate: any }) => data)
  .handler(async ({ data }) => {
    await verifyAuth(data.token);
    const { connectDB } = await import("../lib/db"); await connectDB();
    const models = await import("../lib/models");
    const mongoose = (await import("mongoose")).default;
    const cert = await models.Certificate.findByIdAndUpdate(data.id, data.certificate, { new: true });
    return JSON.parse(JSON.stringify(cert));
  });

export const deleteCertificate = createServerFn({ method: "POST" })
  .validator((data: { token: string, id: string }) => data)
  .handler(async ({ data }) => {
    await verifyAuth(data.token);
    const { connectDB } = await import("../lib/db"); await connectDB();
    const models = await import("../lib/models");
    const mongoose = (await import("mongoose")).default;
    await models.Certificate.findByIdAndDelete(data.id);
    return { success: true };
  });

// models.Media
export const getMedia = createServerFn({ method: "GET" })
  .handler(async () => {
    const { connectDB } = await import("../lib/db"); await connectDB();
    const models = await import("../lib/models");
    const mongoose = (await import("mongoose")).default;
    const media = await models.Media.find().sort({ year: -1, createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(media));
  });

export const addMedia = createServerFn({ method: "POST" })
  .validator((data: { token: string, mediaItem: any }) => data)
  .handler(async ({ data }) => {
    await verifyAuth(data.token);
    const { connectDB } = await import("../lib/db"); await connectDB();
    const models = await import("../lib/models");
    const mongoose = (await import("mongoose")).default;
    const media = await models.Media.create(data.mediaItem);
    return JSON.parse(JSON.stringify(media));
  });

export const deleteMedia = createServerFn({ method: "POST" })
  .validator((data: { token: string, id: string }) => data)
  .handler(async ({ data }) => {
    await verifyAuth(data.token);
    const { connectDB } = await import("../lib/db"); await connectDB();
    const models = await import("../lib/models");
    const mongoose = (await import("mongoose")).default;
    await models.Media.findByIdAndDelete(data.id);
    return { success: true };
  });

// Image Upload
export const uploadImage = createServerFn({ method: "POST" })
  .validator((data: { token: string, base64Image: string, folder?: string }) => data)
  .handler(async ({ data }) => {
    await verifyAuth(data.token);

    try {
      const result = await cloudinary.uploader.upload(data.base64Image, {
        folder: data.folder || "portfolio",
      });
      return { success: true, url: result.secure_url };
    } catch (error: any) {
      console.error("Cloudinary upload error", error);
      throw new Error("Cloudinary Error: " + (error.message || "Failed to upload image. Ensure Cloudinary keys are correct."));
    }
  });

// Education
export const getEducations = createServerFn({ method: "GET" }).handler(async () => {
  const { connectDB } = await import("../lib/db"); await connectDB();
    const models = await import("../lib/models");
    const mongoose = (await import("mongoose")).default;
  const items = await models.Education.find().sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(items));
});

export const addEducation = createServerFn({ method: "POST" })
  .validator((data: { token: string, item: any }) => data)
  .handler(async ({ data }) => {
    await verifyAuth(data.token);
    const { connectDB } = await import("../lib/db"); await connectDB();
    const models = await import("../lib/models");
    const mongoose = (await import("mongoose")).default;
    const item = await models.Education.create(data.item);
    return JSON.parse(JSON.stringify(item));
  });

export const updateEducation = createServerFn({ method: "POST" })
  .validator((data: { token: string, id: string, item: any }) => data)
  .handler(async ({ data }) => {
    await verifyAuth(data.token);
    const { connectDB } = await import("../lib/db"); await connectDB();
    const models = await import("../lib/models");
    const mongoose = (await import("mongoose")).default;
    const item = await models.Education.findByIdAndUpdate(data.id, data.item, { new: true });
    return JSON.parse(JSON.stringify(item));
  });

export const deleteEducation = createServerFn({ method: "POST" })
  .validator((data: { token: string, id: string }) => data)
  .handler(async ({ data }) => {
    await verifyAuth(data.token);
    const { connectDB } = await import("../lib/db"); await connectDB();
    const models = await import("../lib/models");
    const mongoose = (await import("mongoose")).default;
    await models.Education.findByIdAndDelete(data.id);
    return { success: true };
  });

// Skill
export const getSkills = createServerFn({ method: "GET" }).handler(async () => {
  const { connectDB } = await import("../lib/db"); await connectDB();
    const models = await import("../lib/models");
    const mongoose = (await import("mongoose")).default;
  const items = await models.Skill.find().sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(items));
});

export const addSkill = createServerFn({ method: "POST" })
  .validator((data: { token: string, item: any }) => data)
  .handler(async ({ data }) => {
    await verifyAuth(data.token);
    const { connectDB } = await import("../lib/db"); await connectDB();
    const models = await import("../lib/models");
    const mongoose = (await import("mongoose")).default;
    const item = await models.Skill.create(data.item);
    return JSON.parse(JSON.stringify(item));
  });

export const updateSkill = createServerFn({ method: "POST" })
  .validator((data: { token: string, id: string, item: any }) => data)
  .handler(async ({ data }) => {
    await verifyAuth(data.token);
    const { connectDB } = await import("../lib/db"); await connectDB();
    const models = await import("../lib/models");
    const mongoose = (await import("mongoose")).default;
    const item = await models.Skill.findByIdAndUpdate(data.id, data.item, { new: true });
    return JSON.parse(JSON.stringify(item));
  });

export const deleteSkill = createServerFn({ method: "POST" })
  .validator((data: { token: string, id: string }) => data)
  .handler(async ({ data }) => {
    await verifyAuth(data.token);
    const { connectDB } = await import("../lib/db"); await connectDB();
    const models = await import("../lib/models");
    const mongoose = (await import("mongoose")).default;
    await models.Skill.findByIdAndDelete(data.id);
    return { success: true };
  });

// SocialWork
export const getSocialWorks = createServerFn({ method: "GET" }).handler(async () => {
  const { connectDB } = await import("../lib/db"); await connectDB();
    const models = await import("../lib/models");
    const mongoose = (await import("mongoose")).default;
  const items = await models.SocialWork.find().sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(items));
});

export const addSocialWork = createServerFn({ method: "POST" })
  .validator((data: { token: string, item: any }) => data)
  .handler(async ({ data }) => {
    await verifyAuth(data.token);
    const { connectDB } = await import("../lib/db"); await connectDB();
    const models = await import("../lib/models");
    const mongoose = (await import("mongoose")).default;
    const item = await models.SocialWork.create(data.item);
    return JSON.parse(JSON.stringify(item));
  });

export const updateSocialWork = createServerFn({ method: "POST" })
  .validator((data: { token: string, id: string, item: any }) => data)
  .handler(async ({ data }) => {
    await verifyAuth(data.token);
    const { connectDB } = await import("../lib/db"); await connectDB();
    const models = await import("../lib/models");
    const mongoose = (await import("mongoose")).default;
    const item = await models.SocialWork.findByIdAndUpdate(data.id, data.item, { new: true });
    return JSON.parse(JSON.stringify(item));
  });

export const deleteSocialWork = createServerFn({ method: "POST" })
  .validator((data: { token: string, id: string }) => data)
  .handler(async ({ data }) => {
    await verifyAuth(data.token);
    const { connectDB } = await import("../lib/db"); await connectDB();
    const models = await import("../lib/models");
    const mongoose = (await import("mongoose")).default;
    await models.SocialWork.findByIdAndDelete(data.id);
    return { success: true };
  });

// Training
export const getTrainings = createServerFn({ method: "GET" }).handler(async () => {
  const { connectDB } = await import("../lib/db"); await connectDB();
    const models = await import("../lib/models");
    const mongoose = (await import("mongoose")).default;
  const items = await models.Training.find().sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(items));
});

export const addTraining = createServerFn({ method: "POST" })
  .validator((data: { token: string, item: any }) => data)
  .handler(async ({ data }) => {
    await verifyAuth(data.token);
    const { connectDB } = await import("../lib/db"); await connectDB();
    const models = await import("../lib/models");
    const mongoose = (await import("mongoose")).default;
    const item = await models.Training.create(data.item);
    return JSON.parse(JSON.stringify(item));
  });

export const updateTraining = createServerFn({ method: "POST" })
  .validator((data: { token: string, id: string, item: any }) => data)
  .handler(async ({ data }) => {
    await verifyAuth(data.token);
    const { connectDB } = await import("../lib/db"); await connectDB();
    const models = await import("../lib/models");
    const mongoose = (await import("mongoose")).default;
    const item = await models.Training.findByIdAndUpdate(data.id, data.item, { new: true });
    return JSON.parse(JSON.stringify(item));
  });

export const deleteTraining = createServerFn({ method: "POST" })
  .validator((data: { token: string, id: string }) => data)
  .handler(async ({ data }) => {
    await verifyAuth(data.token);
    const { connectDB } = await import("../lib/db"); await connectDB();
    const models = await import("../lib/models");
    const mongoose = (await import("mongoose")).default;
    await models.Training.findByIdAndDelete(data.id);
    return { success: true };
  });

// Workshop
export const getWorkshops = createServerFn({ method: "GET" }).handler(async () => {
  const { connectDB } = await import("../lib/db"); await connectDB();
    const models = await import("../lib/models");
    const mongoose = (await import("mongoose")).default;
  const items = await models.Workshop.find().sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(items));
});

export const addWorkshop = createServerFn({ method: "POST" })
  .validator((data: { token: string, item: any }) => data)
  .handler(async ({ data }) => {
    await verifyAuth(data.token);
    const { connectDB } = await import("../lib/db"); await connectDB();
    const models = await import("../lib/models");
    const mongoose = (await import("mongoose")).default;
    const item = await models.Workshop.create(data.item);
    return JSON.parse(JSON.stringify(item));
  });

export const updateWorkshop = createServerFn({ method: "POST" })
  .validator((data: { token: string, id: string, item: any }) => data)
  .handler(async ({ data }) => {
    await verifyAuth(data.token);
    const { connectDB } = await import("../lib/db"); await connectDB();
    const models = await import("../lib/models");
    const mongoose = (await import("mongoose")).default;
    const item = await models.Workshop.findByIdAndUpdate(data.id, data.item, { new: true });
    return JSON.parse(JSON.stringify(item));
  });

export const deleteWorkshop = createServerFn({ method: "POST" })
  .validator((data: { token: string, id: string }) => data)
  .handler(async ({ data }) => {
    await verifyAuth(data.token);
    const { connectDB } = await import("../lib/db"); await connectDB();
    const models = await import("../lib/models");
    const mongoose = (await import("mongoose")).default;
    await models.Workshop.findByIdAndDelete(data.id);
    return { success: true };
  });

// Event
export const getEvents = createServerFn({ method: "GET" }).handler(async () => {
  const { connectDB } = await import("../lib/db"); await connectDB();
    const models = await import("../lib/models");
    const mongoose = (await import("mongoose")).default;
  const items = await models.Event.find().sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(items));
});

export const addEvent = createServerFn({ method: "POST" })
  .validator((data: { token: string, item: any }) => data)
  .handler(async ({ data }) => {
    await verifyAuth(data.token);
    const { connectDB } = await import("../lib/db"); await connectDB();
    const models = await import("../lib/models");
    const mongoose = (await import("mongoose")).default;
    const item = await models.Event.create(data.item);
    return JSON.parse(JSON.stringify(item));
  });

export const updateEvent = createServerFn({ method: "POST" })
  .validator((data: { token: string, id: string, item: any }) => data)
  .handler(async ({ data }) => {
    await verifyAuth(data.token);
    const { connectDB } = await import("../lib/db"); await connectDB();
    const models = await import("../lib/models");
    const mongoose = (await import("mongoose")).default;
    const item = await models.Event.findByIdAndUpdate(data.id, data.item, { new: true });
    return JSON.parse(JSON.stringify(item));
  });

export const deleteEvent = createServerFn({ method: "POST" })
  .validator((data: { token: string, id: string }) => data)
  .handler(async ({ data }) => {
    await verifyAuth(data.token);
    const { connectDB } = await import("../lib/db"); await connectDB();
    const models = await import("../lib/models");
    const mongoose = (await import("mongoose")).default;
    await models.Event.findByIdAndDelete(data.id);
    return { success: true };
  });

// Seminar
export const getSeminars = createServerFn({ method: "GET" }).handler(async () => {
  const { connectDB } = await import("../lib/db"); await connectDB();
    const models = await import("../lib/models");
    const mongoose = (await import("mongoose")).default;
  const items = await models.Seminar.find().sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(items));
});

export const addSeminar = createServerFn({ method: "POST" })
  .validator((data: { token: string, item: any }) => data)
  .handler(async ({ data }) => {
    await verifyAuth(data.token);
    const { connectDB } = await import("../lib/db"); await connectDB();
    const models = await import("../lib/models");
    const mongoose = (await import("mongoose")).default;
    const item = await models.Seminar.create(data.item);
    return JSON.parse(JSON.stringify(item));
  });

export const updateSeminar = createServerFn({ method: "POST" })
  .validator((data: { token: string, id: string, item: any }) => data)
  .handler(async ({ data }) => {
    await verifyAuth(data.token);
    const { connectDB } = await import("../lib/db"); await connectDB();
    const models = await import("../lib/models");
    const mongoose = (await import("mongoose")).default;
    const item = await models.Seminar.findByIdAndUpdate(data.id, data.item, { new: true });
    return JSON.parse(JSON.stringify(item));
  });

export const deleteSeminar = createServerFn({ method: "POST" })
  .validator((data: { token: string, id: string }) => data)
  .handler(async ({ data }) => {
    await verifyAuth(data.token);
    const { connectDB } = await import("../lib/db"); await connectDB();
    const models = await import("../lib/models");
    const mongoose = (await import("mongoose")).default;
    await models.Seminar.findByIdAndDelete(data.id);
    return { success: true };
  });

// Camp
export const getCamps = createServerFn({ method: "GET" }).handler(async () => {
  const { connectDB } = await import("../lib/db"); await connectDB();
    const models = await import("../lib/models");
    const mongoose = (await import("mongoose")).default;
  const items = await models.Camp.find().sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(items));
});

export const addCamp = createServerFn({ method: "POST" })
  .validator((data: { token: string, item: any }) => data)
  .handler(async ({ data }) => {
    await verifyAuth(data.token);
    const { connectDB } = await import("../lib/db"); await connectDB();
    const models = await import("../lib/models");
    const mongoose = (await import("mongoose")).default;
    const item = await models.Camp.create(data.item);
    return JSON.parse(JSON.stringify(item));
  });

export const updateCamp = createServerFn({ method: "POST" })
  .validator((data: { token: string, id: string, item: any }) => data)
  .handler(async ({ data }) => {
    await verifyAuth(data.token);
    const { connectDB } = await import("../lib/db"); await connectDB();
    const models = await import("../lib/models");
    const mongoose = (await import("mongoose")).default;
    const item = await models.Camp.findByIdAndUpdate(data.id, data.item, { new: true });
    return JSON.parse(JSON.stringify(item));
  });

export const deleteCamp = createServerFn({ method: "POST" })
  .validator((data: { token: string, id: string }) => data)
  .handler(async ({ data }) => {
    await verifyAuth(data.token);
    const { connectDB } = await import("../lib/db"); await connectDB();
    const models = await import("../lib/models");
    const mongoose = (await import("mongoose")).default;
    await models.Camp.findByIdAndDelete(data.id);
    return { success: true };
  });

// Project
export const getProjects = createServerFn({ method: "GET" }).handler(async () => {
  const { connectDB } = await import("../lib/db"); await connectDB();
    const models = await import("../lib/models");
    const mongoose = (await import("mongoose")).default;
  const items = await models.Project.find().sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(items));
});

export const addProject = createServerFn({ method: "POST" })
  .validator((data: { token: string, item: any }) => data)
  .handler(async ({ data }) => {
    await verifyAuth(data.token);
    const { connectDB } = await import("../lib/db"); await connectDB();
    const models = await import("../lib/models");
    const mongoose = (await import("mongoose")).default;
    const item = await models.Project.create(data.item);
    return JSON.parse(JSON.stringify(item));
  });

export const updateProject = createServerFn({ method: "POST" })
  .validator((data: { token: string, id: string, item: any }) => data)
  .handler(async ({ data }) => {
    await verifyAuth(data.token);
    const { connectDB } = await import("../lib/db"); await connectDB();
    const models = await import("../lib/models");
    const mongoose = (await import("mongoose")).default;
    const item = await models.Project.findByIdAndUpdate(data.id, data.item, { new: true });
    return JSON.parse(JSON.stringify(item));
  });

export const deleteProject = createServerFn({ method: "POST" })
  .validator((data: { token: string, id: string }) => data)
  .handler(async ({ data }) => {
    await verifyAuth(data.token);
    const { connectDB } = await import("../lib/db"); await connectDB();
    const models = await import("../lib/models");
    const mongoose = (await import("mongoose")).default;
    await models.Project.findByIdAndDelete(data.id);
    return { success: true };
  });

// Publication
export const getPublications = createServerFn({ method: "GET" }).handler(async () => {
  const { connectDB } = await import("../lib/db"); await connectDB();
    const models = await import("../lib/models");
    const mongoose = (await import("mongoose")).default;
  const items = await models.Publication.find().sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(items));
});

export const addPublication = createServerFn({ method: "POST" })
  .validator((data: { token: string, item: any }) => data)
  .handler(async ({ data }) => {
    await verifyAuth(data.token);
    const { connectDB } = await import("../lib/db"); await connectDB();
    const models = await import("../lib/models");
    const mongoose = (await import("mongoose")).default;
    const item = await models.Publication.create(data.item);
    return JSON.parse(JSON.stringify(item));
  });

export const updatePublication = createServerFn({ method: "POST" })
  .validator((data: { token: string, id: string, item: any }) => data)
  .handler(async ({ data }) => {
    await verifyAuth(data.token);
    const { connectDB } = await import("../lib/db"); await connectDB();
    const models = await import("../lib/models");
    const mongoose = (await import("mongoose")).default;
    const item = await models.Publication.findByIdAndUpdate(data.id, data.item, { new: true });
    return JSON.parse(JSON.stringify(item));
  });

export const deletePublication = createServerFn({ method: "POST" })
  .validator((data: { token: string, id: string }) => data)
  .handler(async ({ data }) => {
    await verifyAuth(data.token);
    const { connectDB } = await import("../lib/db"); await connectDB();
    const models = await import("../lib/models");
    const mongoose = (await import("mongoose")).default;
    await models.Publication.findByIdAndDelete(data.id);
    return { success: true };
  });

// Download
export const getDownloads = createServerFn({ method: "GET" }).handler(async () => {
  const { connectDB } = await import("../lib/db"); await connectDB();
    const models = await import("../lib/models");
    const mongoose = (await import("mongoose")).default;
  const items = await models.Download.find().sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(items));
});

export const addDownload = createServerFn({ method: "POST" })
  .validator((data: { token: string, item: any }) => data)
  .handler(async ({ data }) => {
    await verifyAuth(data.token);
    const { connectDB } = await import("../lib/db"); await connectDB();
    const models = await import("../lib/models");
    const mongoose = (await import("mongoose")).default;
    const item = await models.Download.create(data.item);
    return JSON.parse(JSON.stringify(item));
  });

export const updateDownload = createServerFn({ method: "POST" })
  .validator((data: { token: string, id: string, item: any }) => data)
  .handler(async ({ data }) => {
    await verifyAuth(data.token);
    const { connectDB } = await import("../lib/db"); await connectDB();
    const models = await import("../lib/models");
    const mongoose = (await import("mongoose")).default;
    const item = await models.Download.findByIdAndUpdate(data.id, data.item, { new: true });
    return JSON.parse(JSON.stringify(item));
  });

export const deleteDownload = createServerFn({ method: "POST" })
  .validator((data: { token: string, id: string }) => data)
  .handler(async ({ data }) => {
    await verifyAuth(data.token);
    const { connectDB } = await import("../lib/db"); await connectDB();
    const models = await import("../lib/models");
    const mongoose = (await import("mongoose")).default;
    await models.Download.findByIdAndDelete(data.id);
    return { success: true };
  });

// Testimonial
export const getTestimonials = createServerFn({ method: "GET" }).handler(async () => {
  const { connectDB } = await import("../lib/db"); await connectDB();
    const models = await import("../lib/models");
    const mongoose = (await import("mongoose")).default;
  const items = await models.Testimonial.find().sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(items));
});

export const addTestimonial = createServerFn({ method: "POST" })
  .validator((data: { token: string, item: any }) => data)
  .handler(async ({ data }) => {
    await verifyAuth(data.token);
    const { connectDB } = await import("../lib/db"); await connectDB();
    const models = await import("../lib/models");
    const mongoose = (await import("mongoose")).default;
    const item = await models.Testimonial.create(data.item);
    return JSON.parse(JSON.stringify(item));
  });

export const updateTestimonial = createServerFn({ method: "POST" })
  .validator((data: { token: string, id: string, item: any }) => data)
  .handler(async ({ data }) => {
    await verifyAuth(data.token);
    const { connectDB } = await import("../lib/db"); await connectDB();
    const models = await import("../lib/models");
    const mongoose = (await import("mongoose")).default;
    const item = await models.Testimonial.findByIdAndUpdate(data.id, data.item, { new: true });
    return JSON.parse(JSON.stringify(item));
  });

export const deleteTestimonial = createServerFn({ method: "POST" })
  .validator((data: { token: string, id: string }) => data)
  .handler(async ({ data }) => {
    await verifyAuth(data.token);
    const { connectDB } = await import("../lib/db"); await connectDB();
    const models = await import("../lib/models");
    const mongoose = (await import("mongoose")).default;
    await models.Testimonial.findByIdAndDelete(data.id);
    return { success: true };
  });

// Gallery
export const getGallerys = createServerFn({ method: "GET" }).handler(async () => {
  const { connectDB } = await import("../lib/db"); await connectDB();
    const models = await import("../lib/models");
    const mongoose = (await import("mongoose")).default;
  const items = await models.Gallery.find().sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(items));
});

export const addGallery = createServerFn({ method: "POST" })
  .validator((data: { token: string, item: any }) => data)
  .handler(async ({ data }) => {
    await verifyAuth(data.token);
    const { connectDB } = await import("../lib/db"); await connectDB();
    const models = await import("../lib/models");
    const mongoose = (await import("mongoose")).default;
    const item = await models.Gallery.create(data.item);
    return JSON.parse(JSON.stringify(item));
  });

export const updateGallery = createServerFn({ method: "POST" })
  .validator((data: { token: string, id: string, item: any }) => data)
  .handler(async ({ data }) => {
    await verifyAuth(data.token);
    const { connectDB } = await import("../lib/db"); await connectDB();
    const models = await import("../lib/models");
    const mongoose = (await import("mongoose")).default;
    const item = await models.Gallery.findByIdAndUpdate(data.id, data.item, { new: true });
    return JSON.parse(JSON.stringify(item));
  });

export const deleteGallery = createServerFn({ method: "POST" })
  .validator((data: { token: string, id: string }) => data)
  .handler(async ({ data }) => {
    await verifyAuth(data.token);
    const { connectDB } = await import("../lib/db"); await connectDB();
    const models = await import("../lib/models");
    const mongoose = (await import("mongoose")).default;
    await models.Gallery.findByIdAndDelete(data.id);
    return { success: true };
  });

// Settings
export const getSettingss = createServerFn({ method: "GET" }).handler(async () => {
  const { connectDB } = await import("../lib/db"); await connectDB();
    const models = await import("../lib/models");
    const mongoose = (await import("mongoose")).default;
  const items = await models.Settings.find().sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(items));
});

export const addSettings = createServerFn({ method: "POST" })
  .validator((data: { token: string, item: any }) => data)
  .handler(async ({ data }) => {
    await verifyAuth(data.token);
    const { connectDB } = await import("../lib/db"); await connectDB();
    const models = await import("../lib/models");
    const mongoose = (await import("mongoose")).default;
    const item = await models.Settings.create(data.item);
    return JSON.parse(JSON.stringify(item));
  });

export const updateSettings = createServerFn({ method: "POST" })
  .validator((data: { token: string, id: string, item: any }) => data)
  .handler(async ({ data }) => {
    await verifyAuth(data.token);
    const { connectDB } = await import("../lib/db"); await connectDB();
    const models = await import("../lib/models");
    const mongoose = (await import("mongoose")).default;
    const item = await models.Settings.findByIdAndUpdate(data.id, data.item, { new: true });
    return JSON.parse(JSON.stringify(item));
  });

export const deleteSettings = createServerFn({ method: "POST" })
  .validator((data: { token: string, id: string }) => data)
  .handler(async ({ data }) => {
    await verifyAuth(data.token);
    const { connectDB } = await import("../lib/db"); await connectDB();
    const models = await import("../lib/models");
    const mongoose = (await import("mongoose")).default;
    await models.Settings.findByIdAndDelete(data.id);
    return { success: true };
  });
