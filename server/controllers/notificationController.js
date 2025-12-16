import Notification from "../models/Notification.js";

// 📌 Get all active notifications
export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ isActive: true }).sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Error fetching notifications", error });
  }
};

// 📌 Add a new notification (Admin)
export const createNotification = async (req, res) => {
  try {
    const { title, link, type } = req.body;
    const newNotification = await Notification.create({ title, link, type });
    res.status(201).json(newNotification);
  } catch (error) {
    res.status(500).json({ message: "Error creating notification", error });
  }
};

// 📌 Update notification (optional)
export const updateNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Notification.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Notification not found" });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error updating notification", error });
  }
};

// 📌 Delete notification
export const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Notification.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Notification not found" });
    res.status(200).json({ message: "Notification deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting notification", error });
  }
};
