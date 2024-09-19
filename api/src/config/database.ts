import mongoose from "mongoose";

export const connectDb = async (): Promise<void> => {
  try {
    const mongoUri =
      process.env.MONGO_URI || "mongodb://localhost:27017/sensors";
    await mongoose.connect(mongoUri);
    console.log("Connected to DB successfully");
  } catch (error) {
    console.error("Error connecting to DB:", error);
    process.exit(1);
  }
};
