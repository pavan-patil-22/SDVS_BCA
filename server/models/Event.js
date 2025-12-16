import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    coverImage: { type: String }, 
    eventName: { type: String, required: true },
    eventDate: { type: Date, required: true },
    eventTime: { type: String, required: true }, 
    duration: { type: String }, 
    description: { type: [String], required: true }, 
    participantsCount: { type: Number, default: 0 },
    facultyCoordinators: [{ type: String }], 
    guests: [{ type: String }], 
    eventImages: [{ type: String }], 
  },
  { timestamps: true }
);

export default mongoose.model("Event", eventSchema);
