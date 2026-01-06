import { Request, Response } from "express";
import { User } from "../models/user.model";
import { Blog } from "../models/blog.model";
import { Contact } from "../models/contact.model";
import { Service } from "../models/service.model";
import { Video } from "../models/video.model";
import { Testimonial } from "../models/review.model";
import { Client } from "../models/client.model";
import { Career } from "../models/career.model";
import logger from "../utils/logger";

// @desc    Get dashboard statistics
// @route   GET /api/dashboard/stats
// @access  Private
export const getDashboardStats = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Get counts
    const userCount = await User.countDocuments();
    const blogCount = await Blog.countDocuments();
    const contactCount = await Contact.countDocuments();
    const serviceCount = await Service.countDocuments();
    const videoCount = await Video.countDocuments();
    const testimonialCount = await Testimonial.countDocuments();
    const clientCount = await Client.countDocuments();
    const careerCount = await Career.countDocuments();

    // Get recent activities
    const recentUsers = await User.find()
      .select("name email role createdAt")
      .sort({ createdAt: -1 })
      .limit(5);

    const recentContacts = await Contact.find()
      .select("name email subject status createdAt")
      .sort({ createdAt: -1 })
      .limit(5);

    const recentBlogs = await Blog.find()
      .select("title author status views createdAt")
      .sort({ createdAt: -1 })
      .limit(5);

    // Get status breakdowns
    const contactStatusBreakdown = await Contact.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const blogStatusBreakdown = await Blog.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    // Get monthly stats for the last 6 months
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const monthlyContacts = await Contact.aggregate([
      {
        $match: {
          createdAt: { $gte: sixMonthsAgo },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 },
      },
    ]);

    const monthlyBlogs = await Blog.aggregate([
      {
        $match: {
          createdAt: { $gte: sixMonthsAgo },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 },
      },
    ]);

    res.json({
      success: true,
      data: {
        counts: {
          users: userCount,
          blogs: blogCount,
          contacts: contactCount,
          services: serviceCount,
          videos: videoCount,
          testimonials: testimonialCount,
          clients: clientCount,
          careers: careerCount,
        },
        recentActivities: {
          users: recentUsers,
          contacts: recentContacts,
          blogs: recentBlogs,
        },
        statusBreakdowns: {
          contacts: contactStatusBreakdown,
          blogs: blogStatusBreakdown,
        },
        monthlyStats: {
          contacts: monthlyContacts,
          blogs: monthlyBlogs,
        },
      },
    });
  } catch (error) {
    logger.error("Get dashboard stats error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get analytics data
// @route   GET /api/dashboard/analytics
// @access  Private
export const getAnalytics = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { period = "30" } = req.query;
    const days = parseInt(period as string);
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Get daily stats
    const dailyContacts = await Contact.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
            day: { $dayOfMonth: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 },
      },
    ]);

    const dailyBlogViews = await Blog.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
            day: { $dayOfMonth: "$createdAt" },
          },
          totalViews: { $sum: "$views" },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 },
      },
    ]);

    // Get top performing content
    const topBlogs = await Blog.find()
      .select("title views likes createdAt")
      .sort({ views: -1 })
      .limit(10);

    const topVideos = await Video.find()
      .select("title views likes createdAt")
      .sort({ views: -1 })
      .limit(10);

    // Get category breakdowns
    const blogCategories = await Blog.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
          totalViews: { $sum: "$views" },
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);

    const serviceCategories = await Service.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);

    res.json({
      success: true,
      data: {
        dailyStats: {
          contacts: dailyContacts,
          blogViews: dailyBlogViews,
        },
        topContent: {
          blogs: topBlogs,
          videos: topVideos,
        },
        categories: {
          blogs: blogCategories,
          services: serviceCategories,
        },
      },
    });
  } catch (error) {
    logger.error("Get analytics error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get system health
// @route   GET /api/dashboard/health
// @access  Private
export const getSystemHealth = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    // Get recent activity
    const recentContacts = await Contact.countDocuments({
      createdAt: { $gte: oneHourAgo },
    });

    const recentBlogs = await Blog.countDocuments({
      createdAt: { $gte: oneDayAgo },
    });

    // Get system status
    const systemStatus = {
      database: "connected",
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      timestamp: now,
    };

    res.json({
      success: true,
      data: {
        recentActivity: {
          contactsLastHour: recentContacts,
          blogsLastDay: recentBlogs,
        },
        systemStatus,
      },
    });
  } catch (error) {
    logger.error("Get system health error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
