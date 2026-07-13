import mongoose from "mongoose";
import dns from "node:dns";

if (process.platform === "win32") {
  dns.setServers(["8.8.8.8", "8.8.4.4"]);
}

// In serverless environments, we need to cache the DB connection
// so we don't create a new connection pool for every function invocation.
let isConnected = false;

export const connectDB = async () => {
  if (isConnected) {
    console.log("=> using existing database connection");
    return;
  }

  // Use a fallback URL if the env var is not set, or fail gracefully
  const dbUri = import.meta.env.VITE_MONGODB_URI || "mongodb://localhost:27017/om_portfolio";
  if (!dbUri) {
    console.warn("MONGODB_URI is not defined in environment variables. Database features will not work.");
    return;
  }

  try {
    const db = await mongoose.connect(dbUri, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
      family: 4, // Force IPv4 to prevent IPv6 DNS resolution issues which cause querySrv ECONNREFUSED
    });
    isConnected = db.connections[0].readyState === 1;
    console.log("=> database connected successfully");
  } catch (error) {
    console.error("=> database connection failed", error);
    throw error;
  }
};
