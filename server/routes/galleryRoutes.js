import express from "express";
import upload from "../middleware/upload.js";
import {
  createGallery,
  getGalleries,
  getGallery,
  updateGallery,
  deleteGallery,
} from "../controllers/galleryController.js";

const galleryRouter = express.Router();

// Create
galleryRouter.post("/", upload.single("galleryImage"), createGallery);

// Read
galleryRouter.get("/", getGalleries);
galleryRouter.get("/:id", getGallery);

// Update
galleryRouter.put("/:id", upload.single("galleryImage"), updateGallery);

// Delete
galleryRouter.delete("/:id", deleteGallery);

export default galleryRouter;
