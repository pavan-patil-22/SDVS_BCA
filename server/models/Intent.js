import mongoose from "mongoose";

const intentSchema = new mongoose.Schema({
  intent: { type: String, required: true }, // e.g. "admission_process"
  patterns: [{ type: String, required: true }], // training phrases
  entities: [{ type: String }], // optional, e.g. ["btech", "mba"]
  response: { type: mongoose.Schema.Types.Mixed, required: true } // can be string or object
}, { timestamps: true });

export default mongoose.model("Intent", intentSchema);
