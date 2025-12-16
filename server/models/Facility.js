import mongoose from "mongoose";

const facilitySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String }, 
    image: { type: String }, 
  },
  { timestamps: true }
);

const Facility = mongoose.model("Facility", facilitySchema);
export default Facility;
