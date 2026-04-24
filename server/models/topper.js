import mongoose from "mongoose";

const topperSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: true,
      trim: true,
    },
    semester: {
      type: Number,
      min: 1,
    },
    year: {
      type: String, // e.g. 2023-24
      required: true,
    },
    percentage: {
      type: Number, // percentage or SGPA
    },
    rank: {
      type: Number,
    },
    topperType: {
      type: String,
      required: true,
      enum: ['Sem topper', 'university topper', 'best boy/girl of the college'],
    },
    gender: {
      type: String,
      enum: ['boy', 'girl'],
    },
    photo: {
      type: String, // image path
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Topper", topperSchema);
