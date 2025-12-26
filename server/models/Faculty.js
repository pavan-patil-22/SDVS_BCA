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
    employmentType: {
      type: String,
      required: true,
      enum: ['Full Time', 'Part Time'],
    },
    teachingType: {
      type: String,
      required: true,
      enum: ['Teaching', 'Non Teaching'],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Faculty", facultySchema);
