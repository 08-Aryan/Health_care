import express from "express";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/db.js";
import errorHandler from "./middlewares/errorHandler.js";

// Routes
import authRoutes from "./routes/auth.routes.js";
import patientRoutes from "./routes/patient.routes.js";
import providerRoutes from "./routes/provider.routes.js";
//import goalRoutes from "./routes/goal.routes.js";
import reminderRoutes from "./routes/reminder.routes.js";
import publicRoutes from "./routes/public.routes.js";

const app = express();

// Connect MongoDB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/patient", patientRoutes);
app.use("/api/provider", providerRoutes);
app.use("/api/goals", goalRoutes);
app.use("/api/reminders", reminderRoutes);
app.use("/api/public", publicRoutes);

// Global Error Handler
app.use(errorHandler);

export default app;
