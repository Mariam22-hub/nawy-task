import express from "express";
import connectDB from "./db.js";
import expressLoader from "./express.js";

export default async function loaders() {
  const app = express();

  await connectDB();

  await expressLoader({ app });

  console.log("All loaders initialized.");

  return app;
}