import { createServerFn } from "@tanstack/react-start";
import { connectDB } from "../lib/db";
import { SiteData } from "../lib/models/SiteData";
import { Certificate } from "../lib/models/Certificate";
import { Media } from "../lib/models/Media";
import jwt from "jsonwebtoken";
import cloudinary from "./cloudinary";
import { parseCookies, setCookie } from "vinxi/http"; // Optional if we need vinxi/http for server cookies

// Utility to verify admin token
// We use a simple environment variable check for the password
// and return a boolean. This is just for simplicity in this example.
const JWT_SECRET = import.meta.env.VITE_JWT_SECRET || "fallback_secret_key_for_dev";
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "admin123";

// Authentication endpoints
export const loginAdmin = createServerFn({ method: "POST" })
  .validator((data: { password: string }) => data)
  .handler(async ({ data }) => {
    if (data.password !== ADMIN_PASSWORD) {
      throw new Error("Invalid password");
    }
    
    const token = jwt.sign({ role: "admin" }, JWT_SECRET, { expiresIn: "1d" });
    
    return { success: true, token };
  });

export const verifyAdmin = createServerFn({ method: "POST" })
  .validator((data: { token: string }) => data)
  .handler(async ({ data }) => {
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
    await connectDB();
    const data = await SiteData.findOne().lean();
    return data ? JSON.parse(JSON.stringify(data)) : {};
  });

export const updateSiteData = createServerFn({ method: "POST" })
  .validator((data: { token: string, payload: any }) => data)
  .handler(async ({ data }) => {
    try {
      jwt.verify(data.token, JWT_SECRET);
    } catch {
      throw new Error("Unauthorized");
    }

    await connectDB();
    const result = await SiteData.findOneAndUpdate({}, data.payload, { upsert: true, new: true }).lean();
    return JSON.parse(JSON.stringify(result));
  });

// Certificates
export const getCertificates = createServerFn({ method: "GET" })
  .handler(async () => {
    await connectDB();
    const certificates = await Certificate.find().sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(certificates));
  });

export const addCertificate = createServerFn({ method: "POST" })
  .validator((data: { token: string, certificate: any }) => data)
  .handler(async ({ data }) => {
    try {
      jwt.verify(data.token, JWT_SECRET);
    } catch {
      throw new Error("Unauthorized");
    }
    await connectDB();
    const cert = await Certificate.create(data.certificate);
    return JSON.parse(JSON.stringify(cert));
  });

export const deleteCertificate = createServerFn({ method: "POST" })
  .validator((data: { token: string, id: string }) => data)
  .handler(async ({ data }) => {
    try {
      jwt.verify(data.token, JWT_SECRET);
    } catch {
      throw new Error("Unauthorized");
    }
    await connectDB();
    await Certificate.findByIdAndDelete(data.id);
    return { success: true };
  });

// Media
export const getMedia = createServerFn({ method: "GET" })
  .handler(async () => {
    await connectDB();
    const media = await Media.find().sort({ year: -1, createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(media));
  });

export const addMedia = createServerFn({ method: "POST" })
  .validator((data: { token: string, mediaItem: any }) => data)
  .handler(async ({ data }) => {
    try {
      jwt.verify(data.token, JWT_SECRET);
    } catch {
      throw new Error("Unauthorized");
    }
    await connectDB();
    const media = await Media.create(data.mediaItem);
    return JSON.parse(JSON.stringify(media));
  });

export const deleteMedia = createServerFn({ method: "POST" })
  .validator((data: { token: string, id: string }) => data)
  .handler(async ({ data }) => {
    try {
      jwt.verify(data.token, JWT_SECRET);
    } catch {
      throw new Error("Unauthorized");
    }
    await connectDB();
    await Media.findByIdAndDelete(data.id);
    return { success: true };
  });

// Image Upload
export const uploadImage = createServerFn({ method: "POST" })
  .validator((data: { token: string, base64Image: string, folder?: string }) => data)
  .handler(async ({ data }) => {
    try {
      jwt.verify(data.token, JWT_SECRET);
    } catch (e) {
      throw new Error("Unauthorized: Please log out and log in again.");
    }

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
