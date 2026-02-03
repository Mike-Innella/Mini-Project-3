import mongoose from "mongoose";

export async function connectDB(uri) {
  mongoose.set("strictQuery", true);
  mongoose.set("bufferCommands", false);
  try {
    await mongoose.connect(uri);
    console.log("✅ MongoDB connected");
    return true;
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message || err);
    return false;
  }
}
