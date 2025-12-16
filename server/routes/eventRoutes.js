import express from "express";
import upload from "../middleware/upload.js";
import {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController.js";

const eventRouter = express.Router();

// Create event
eventRouter.post(
  "/",
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "eventImages", maxCount: 10 },
  ]),
  createEvent
);

// Read events
eventRouter.get("/", getEvents);
eventRouter.get("/:id", getEventById);

// Update event
eventRouter.put(
  "/:id",
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "eventImages", maxCount: 10 },
  ]),
  updateEvent
);

// Delete event
eventRouter.delete("/:id", deleteEvent);

export default eventRouter;
