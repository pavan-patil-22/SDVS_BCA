import express from "express";
import {
  createFacility,
  getFacilities,
  getFacility,
  updateFacility,
  deleteFacility,
} from "../controllers/facilityController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// CURD Routes
router.post("/", upload.single("image"), createFacility);
router.get("/", getFacilities);
router.get("/:id", getFacility);
router.put("/:id", upload.single("image"), updateFacility);
router.delete("/:id", deleteFacility);

export default router;
