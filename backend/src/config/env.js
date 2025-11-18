import dotenv from "dotenv";
dotenv.config();

const requiredVars = ["PORT", "MONGO_URI", "JWT_SECRET"];

requiredVars.forEach((v) => {
  if (!process.env[v]) {
    console.error(`❌ Missing required env variable: ${v}`);
    process.exit(1);
  }
});

export const env = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "7d",
  NODE_ENV: process.env.NODE_ENV || "development",
};
