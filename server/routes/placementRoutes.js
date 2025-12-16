import express from "express";
import upload from "../middleware/upload.js";
import {createPlacement, getPlacementById, getPlacements,updatePlacement,deletePlacement} from "../controllers/PlacementController.js";

const placementRouter = express.Router();

// ✅ image field must match upload.single("placementImage")
placementRouter.post("/", upload.single("placementImage"), createPlacement);
placementRouter.get("/", getPlacements);
placementRouter.get("/:id", getPlacementById);
placementRouter.put("/:id", upload.single("placementImage"), updatePlacement);
placementRouter.delete("/:id", deletePlacement);

export default placementRouter;
