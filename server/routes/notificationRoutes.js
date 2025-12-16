import express from "express";
import {
  getNotifications,
  createNotification,
  updateNotification,
  deleteNotification,
} from "../controllers/notificationController.js";

const notificationRrouter = express.Router();

notificationRrouter.get("/", getNotifications); // Fetch all active notifications
notificationRrouter.post("/", createNotification); // Add new notification
notificationRrouter.put("/:id", updateNotification); // Update notification
notificationRrouter.delete("/:id", deleteNotification); // Delete notification

export default notificationRrouter;
