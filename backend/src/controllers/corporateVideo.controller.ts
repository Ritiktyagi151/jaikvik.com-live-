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
    await video.save();
    res.status(201).json(video);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const updateVideo = async (req: Request, res: Response) => {
  try {
    const updatedVideo = await CorporateVideo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
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