import dotenv from "dotenv";

dotenv.config();

export default {
  port: process.env.PORT || 8000,
  mongoUri: process.env.MONGO_URI as string,
  api: {
    prefix: '/api/v1'
  }
};
