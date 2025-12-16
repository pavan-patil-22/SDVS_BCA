import mongoose from "mongoose";

const facultySchema = new mongoose.Schema(
  {
    picture: {
      type: String, 
    },
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true, 
    },
    education: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true, 
    },
  },
  { timestamps: true }
);

export default mongoose.model("Faculty", facultySchema);
