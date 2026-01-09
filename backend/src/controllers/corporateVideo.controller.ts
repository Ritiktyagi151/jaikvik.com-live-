import { Request, Response } from "express";
import CorporateVideo from "../models/corporateVideo.model";

export const getVideos = async (req: Request, res: Response) => {
  try {
    const videos = await CorporateVideo.find().sort({ createdAt: -1 });
    res.status(200).json(videos);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createVideo = async (req: Request, res: Response) => {
  try {
    const video = new CorporateVideo(req.body);
    const savedVideo = await video.save();
    res.status(201).json(savedVideo);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const updateVideo = async (req: Request, res: Response) => {
  try {
    const updatedVideo = await CorporateVideo.findByIdAndUpdate(
      req.params.id,
      { $set: req.body }, // Explicitly set body
      { new: true, runValidators: true }
    );
    if (!updatedVideo) return res.status(404).json({ message: "Video not found" });
    res.status(200).json(updatedVideo);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteVideo = async (req: Request, res: Response) => {
  try {
    await CorporateVideo.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Video deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};