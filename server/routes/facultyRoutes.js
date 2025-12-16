import express from "express";
import {
  createFaculty,
  getFaculty,
  getFacultyById,
  updateFaculty,
  deleteFaculty,
} from "../controllers/facultyController.js";
import upload from "../middleware/upload.js";

const facultyRouter = express.Router();

// CRUD routes
facultyRouter.post("/", upload.single("facultyPicture"), createFaculty);
facultyRouter.get("/", getFaculty);
facultyRouter.get("/:id", getFacultyById);
facultyRouter.put("/:id", upload.single("facultyPicture"), updateFaculty);
facultyRouter.delete("/:id", deleteFaculty);

export default facultyRouter;
