// service.model.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IGalleryImage {
  src: string;
  alt: string;
}

export interface IService extends Document {
  title: string;
  slug: string; // Add this
  description: string;
  badge?: string;
  link: string;
  mainImg: string;
  galleryImgs: IGalleryImage[];
}

const ServiceSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true }, // Add this (Index clean karne ke baad hi chalega)
    description: { type: String, required: true },
    badge: { type: String },
    link: { type: String, required: true },
    mainImg: { type: String, required: true },
    galleryImgs: [
      {
        src: { type: String, required: true },
        alt: { type: String, default: "Gallery Image" },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<IService>("Service", ServiceSchema);