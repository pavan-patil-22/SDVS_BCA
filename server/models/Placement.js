import mongoose from "mongoose";

const placementSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    studentname: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    package: {
      type: String,
      required: true,
    },
    batch: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Placement", placementSchema);
