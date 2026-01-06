import mongoose, { Schema, Document } from 'mongoose';

export interface IJob extends Document { title: string; experience: string; }
const JobSchema = new Schema({
    title: { type: String, required: true },
    experience: { type: String, required: true }
}, { timestamps: true });

export interface IApp extends Document { name: string; email: string; phone: string; position: string; message: string; resumeUrl: string; }
const AppSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    position: { type: String, required: true },
    message: String,
    resumeUrl: { type: String, required: true }
}, { timestamps: true });

export const Job = mongoose.model<IJob>('Job', JobSchema);
export const Application = mongoose.model<IApp>('Application', AppSchema);