import { Request, Response } from "express";
import { Contact } from "../models/contact.model";
import logger from "../utils/logger";

// Submit new contact
export const submitContact = async (req: Request, res: Response) => {
  try {
    const contactData = {
      ...req.body,
      ipAddress: req.ip,
      userAgent: req.get("User-Agent"),
    };

    const contact = await Contact.create(contactData);

    res.status(201).json({
      success: true,
      message: "Contact form submitted successfully",
      data: contact,
    });
  } catch (error) {
    logger.error("Submit contact error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all contacts (Admin only)
export const getContacts = async (req: Request, res: Response) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, data: contacts });
  } catch (error) {
    logger.error("Get contacts error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get single contact
export const getContact = async (req: Request, res: Response) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: "Not found" });
    res.json({ success: true, data: contact });
  } catch (error) {
    logger.error("Get contact error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update contact
export const updateContact = async (req: Request, res: Response) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!contact) return res.status(404).json({ message: "Not found" });
    res.json({ success: true, data: contact });
  } catch (error) {
    logger.error("Update contact error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete contact
export const deleteContact = async (req: Request, res: Response) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: "Not found" });
    await contact.deleteOne();
    res.json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    logger.error("Delete contact error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
