import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";
import logger from "../utils/logger";
import nodemailer from "nodemailer";

// JWT Token generate karne ka helper
const generateToken = (id: string): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

// --- LOGIN ---
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    
    // User dhundna aur password select karna
    const user = await User.findOne({ email }).select("+password");
    
    if (!user || user.role !== "admin") {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    if (!user.isActive) {
      res.status(401).json({ message: "Account is deactivated" });
      return;
    }

    // Password match check karna
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    // Last login update karna
    user.lastLogin = new Date();
    await user.save();

    res.json({
      success: true,
      data: { 
        _id: user._id, 
        name: user.name, 
        email: user.email, 
        token: generateToken(user._id) 
      },
    });
  } catch (error) {
    logger.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// --- FORGOT PASSWORD (OTP via Email only) ---
export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { contact } = req.body; // Yahan admin apni email enter karega
    
    const user = await User.findOne({ email: contact });

    if (!user) {
      res.status(404).json({ message: "Admin not found with this email" });
      return;
    }

    // 6 digit OTP generate karna
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetOTP = otp;
    user.resetOTPExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiry
    await user.save();

    // Nodemailer configuration (Gmail App Password use karein)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { 
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS 
      },
    });

    await transporter.sendMail({
      to: user.email,
      subject: "Admin Password Reset OTP",
      text: `Your OTP for password reset is: ${otp}. It is valid for 10 minutes.`,
    });

    res.json({ success: true, message: "OTP sent successfully to your email!" });
  } catch (error) {
    logger.error("Forgot password error:", error);
    res.status(500).json({ message: "Failed to send OTP email. Check your EMAIL_PASS." });
  }
};

// --- RESET PASSWORD (OTP Verify) ---
export const resetPasswordOTP = async (req: Request, res: Response): Promise<void> => {
  try {
    const { contact, otp, newPassword } = req.body;

    const user = await User.findOne({
      email: contact,
      resetOTP: otp,
      resetOTPExpires: { $gt: new Date() }, // Check expiry
    });

    if (!user) {
      res.status(400).json({ message: "Invalid or expired OTP" });
      return;
    }

    // Password update karna
    user.password = newPassword;
    user.resetOTP = undefined; // OTP clear karna
    user.resetOTPExpires = undefined;
    await user.save();

    res.json({ success: true, message: "Password reset successful! Please login." });
  } catch (error) {
    logger.error("Reset password error:", error);
    res.status(500).json({ message: "Reset failed" });
  }
};

// --- OTHER METHODS ---
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;
    const adminExists = await User.findOne({ role: "admin" });
    if (adminExists) {
      res.status(400).json({ message: "Admin account already exists" });
      return;
    }
    const user = await User.create({ name, email, password, role: "admin" });
    res.status(201).json({ success: true, data: { name: user.name, email: user.email, token: generateToken(user._id) } });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getMe = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById((req as any).user.id);
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  res.json({ success: true, message: "Logged out successfully" });
};