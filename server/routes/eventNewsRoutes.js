import express from "express";
import {
  createEventNews,
  getAllEventNews,
  getEventNewsById,
  updateEventNews,
  deleteEventNews,
} from "../controllers/eventNewsController.js";

const eventNewsRouter = express.Router();

// Create new event/news
eventNewsRouter.post("/", createEventNews);

// Get all
eventNewsRouter.get("/", getAllEventNews);

// Get by ID
eventNewsRouter.get("/:id", getEventNewsById);

// Update
eventNewsRouter.put("/:id", updateEventNews);

// Delete
eventNewsRouter.delete("/:id", deleteEventNews);

export default eventNewsRouter;
