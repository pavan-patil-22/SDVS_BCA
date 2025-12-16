import mongoose from "mongoose";

const principalSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    profilePic: {
      type: String, 
    },
    role: {
      type: String,
      default: "principal",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Principal", principalSchema);
