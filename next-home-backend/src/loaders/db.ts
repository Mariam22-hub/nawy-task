import mongoose from "mongoose";
import config from "../config/index.js";

export default async function connectDB() {
    try {
        await mongoose.connect(config.mongoUri);
        console.log("MongoDB connection success");
    } 
    catch (error) {
        console.log("MongoDB connection error:", error);
        process.exit(1);
    }
}