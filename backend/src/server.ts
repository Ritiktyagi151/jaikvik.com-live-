// server.ts - Updated Implementation for Jaikvik Technology Backend
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import rateLimit from "express-rate-limit";
import path from "path";
import fs from "fs";

import { connectDB } from "./config/database";
import { errorHandler } from "./middleware/errorHandler";
import { notFound } from "./middleware/notFound";
import logger from "./utils/logger";

// --- Import All Routes ---
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import blogRoutes from "./routes/blog.routes";
import careerRoutes from "./routes/career.routes"; // ✅ Updated
import contactRoutes from "./routes/contact.routes";
import serviceRoutes from "./routes/service.routes";
import videoRoutes from "./routes/video.routes";
import clientRoutes from "./routes/client.routes";
import teamVideoRoutes from "./routes/teamVideo.routes";
import postRoutes from "./routes/post.routes";
import websiteRoutes from "./routes/website.routes";
import bannerRoutes from "./routes/banner.routes";
import heroRoutes from "./routes/heroSection.routes";
import enquiryRoutes from "./routes/enquiry.routes";
import corporateVideoRoutes from "./routes/corporateVideo.routes";
import technologyRoutes from "./routes/technology.routes";
import reviewRoutes from "./routes/review.routes";
import galleryRoutes from "./routes/gallery.routes";
import dashboardRoutes from "./routes/dashboard.routes";
import reelRoutes from "./routes/reel.routes";
import mobileAppRoutes from "./routes/mobileApp.routes";
import teamRoutes from "./routes/team.routes";
import testimonialVideoRoutes from "./routes/testimonialVideo.routes";
import footerRoutes from "./routes/footer.routes";
import navbarRoutes from "./routes/navbar.routes";
import aboutRoutes from "./routes/about.routes";

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Database Connection
connectDB();

// ✅ Setup Uploads Directory
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// ✅ Security & CORS
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(cors({ origin: true, credentials: true }));

// ✅ Body Parsing
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(compression());
app.use(morgan("combined", { stream: { write: (msg) => logger.info(msg.trim()) } }));

// ✅ Static Folder (Resumes aur Images ke liye)
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// ✅ API Routes Registration
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/websites", websiteRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/footer", footerRoutes);

// ✅ Career Section (Changed to /api/careers to fix 404)
app.use("/api/careers", careerRoutes); 

app.use("/api/contact", contactRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/team-videos", teamVideoRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/banners", bannerRoutes);
app.use("/api/hero", heroRoutes);
app.use("/api/enquiries", enquiryRoutes);
app.use("/api/corporate-videos", corporateVideoRoutes);
app.use("/api/technologies", technologyRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/reels", reelRoutes);
app.use("/api/mobile-apps", mobileAppRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/testimonial-videos", testimonialVideoRoutes);
app.use("/api/navbar", navbarRoutes);

app.get("/health", (req, res) => res.status(200).json({ status: "OK" }));

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`🚀 Jaikvik Backend live at http://localhost:${PORT}`);
});

export default app;