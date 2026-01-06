import { Request, Response } from "express";
import Service from "../models/service.model";

// Title ko URL friendly slug mein badalne ke liye function
const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Special characters hatane ke liye
    .replace(/[\s_-]+/g, "-") // Spaces ko hyphen (-) mein badalne ke liye
    .replace(/^-+|-+$/g, ""); // Aage peeche ke hyphens hatane ke liye
};

// @desc    Get all services
// @route   GET /api/services
export const getServices = async (req: Request, res: Response) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: services });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create a service
// @route   POST /api/services
export const createService = async (req: Request, res: Response) => {
  try {
    const { title, description, badge, link, mainImg, galleryImgs } = req.body;

    // 1. Image handling (URL or File)
    let finalMainImg = mainImg;
    if (req.file) {
      finalMainImg = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    }

    // 2. Gallery images parsing (FormData sends strings)
    let parsedGallery = [];
    if (galleryImgs) {
      parsedGallery = typeof galleryImgs === 'string' ? JSON.parse(galleryImgs) : galleryImgs;
    }

    // 3. Slug generation (Duplicate error se bachne ke liye)
    const slug = generateSlug(title);

    const newService = await Service.create({
      title,
      slug, // Model mein slug field hona chahiye
      description,
      badge,
      link,
      mainImg: finalMainImg,
      galleryImgs: parsedGallery,
    });

    res.status(201).json({ success: true, data: newService });
  } catch (error: any) {
    console.error("Create Error:", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update a service
// @route   PUT /api/services/:id
export const updateService = async (req: Request, res: Response) => {
  try {
    const { title, description, badge, link, mainImg, galleryImgs } = req.body;

    const existingService = await Service.findById(req.params.id);
    if (!existingService) {
      return res.status(404).json({ success: false, message: "Service not found" });
    }

    let updateData: any = { 
        title, 
        description, 
        badge, 
        link,
        slug: generateSlug(title) // Update par slug bhi refresh hoga
    };

    // Image update logic
    if (req.file) {
      updateData.mainImg = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    } else if (mainImg) {
      updateData.mainImg = mainImg;
    }

    // Gallery update logic
    if (galleryImgs) {
      updateData.galleryImgs = typeof galleryImgs === 'string' ? JSON.parse(galleryImgs) : galleryImgs;
    }

    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    res.status(200).json({ success: true, data: updatedService });
  } catch (error: any) {
    console.error("Update Error:", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete a service
// @route   DELETE /api/services/:id
export const deleteService = async (req: Request, res: Response) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ success: false, message: "Service not found" });
    }

    await Service.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Service deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};