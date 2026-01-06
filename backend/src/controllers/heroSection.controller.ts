import { Request, Response } from "express";
import HeroSection from "../models/heroSection.model";
import { asyncHandler } from "../utils/asyncHandler";

// @desc Create Hero Section
export const createHeroSection = asyncHandler(
  async (req: Request, res: Response) => {
    const { videoLink, circleImage, centerImage } = req.body;

    if (!videoLink || !circleImage || !centerImage) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const hero = await HeroSection.create({
      videoLink,
      circleImage,
      centerImage,
    });
    res.status(201).json({ success: true, data: hero });
  }
);

// @desc Get All Hero Sections
export const getHeroSections = asyncHandler(
  async (req: Request, res: Response) => {
    const heroes = await HeroSection.find();
    res.status(200).json({ success: true, data: heroes });
  }
);

// @desc Get Single Hero Section
export const getHeroSectionById = asyncHandler(
  async (req: Request, res: Response) => {
    const hero = await HeroSection.findById(req.params.id);
    if (!hero) {
      return res
        .status(404)
        .json({ success: false, message: "Hero Section not found" });
    }
    res.status(200).json({ success: true, data: hero });
  }
);

// @desc Update Hero Section
export const updateHeroSection = asyncHandler(
  async (req: Request, res: Response) => {
    const { videoLink, circleImage, centerImage } = req.body;
    const hero = await HeroSection.findByIdAndUpdate(
      req.params.id,
      { videoLink, circleImage, centerImage },
      { new: true }
    );

    if (!hero) {
      return res
        .status(404)
        .json({ success: false, message: "Hero Section not found" });
    }

    res.status(200).json({ success: true, data: hero });
  }
);

// @desc Delete Hero Section
export const deleteHeroSection = asyncHandler(
  async (req: Request, res: Response) => {
    const hero = await HeroSection.findByIdAndDelete(req.params.id);

    if (!hero) {
      return res
        .status(404)
        .json({ success: false, message: "Hero Section not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Hero Section deleted successfully" });
  }
);
