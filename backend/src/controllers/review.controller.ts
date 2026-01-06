import { Request, Response } from "express";
import { Review } from "../models/review.model";
import logger from "../utils/logger";

// GET all reviews
export const getReviews = async (req: Request, res: Response) => {
  try {
    const reviews = await Review.find({ status: "active" }).sort({
      createdAt: -1,
    });
    res.json({ success: true, count: reviews.length, data: reviews });
  } catch (error) {
    logger.error("Get reviews error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET single review
export const getReview = async (req: Request, res: Response) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });
    res.json({ success: true, data: review });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// CREATE new review
export const createReview = async (req: Request, res: Response) => {
  try {
    const { author, text, stars } = req.body;

    if (!author || !text || !stars) {
      return res
        .status(400)
        .json({ message: "Author, text, and stars are required" });
    }

    const review = await Review.create({ author, text, stars });
    res.status(201).json({ success: true, data: review });
  } catch (error) {
    logger.error("Create review error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE review (admin only)
export const deleteReview = async (req: Request, res: Response) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });

    await review.deleteOne();
    res.json({ success: true, message: "Review deleted successfully" });
  } catch (error) {
    logger.error("Delete review error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
