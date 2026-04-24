import express from "express";
import upload from "../middleware/upload.js";
import {
  createTopper,
  getAllToppers,
  getTopperById,
  updateTopper,
  deleteTopper,
} from "../controllers/topperCcontroller.js";

const TopperRouter = express.Router();

TopperRouter.post("/", upload.single("topperPhoto"), createTopper);

TopperRouter.get("/", getAllToppers);
TopperRouter.get("/:id", getTopperById);

TopperRouter.put("/:id", upload.single("topperPhoto"), updateTopper);

TopperRouter.delete("/:id", deleteTopper);

export default TopperRouter;
