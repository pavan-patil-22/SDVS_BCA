import mongoose from "mongoose";


const gallerySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    type: { type: String, enum: ['image', 'video'], required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Gallery", gallerySchema);
