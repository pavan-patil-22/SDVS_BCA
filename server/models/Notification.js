import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, // Display text
    link: { type: String, required: true }, // URL to navigate on click
    isActive: { type: Boolean, default: true }, // To enable/disable notification
    type: {
      type: String,
      enum: ["info", "alert", "new"], // optional type
      default: "new",
    },
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;
