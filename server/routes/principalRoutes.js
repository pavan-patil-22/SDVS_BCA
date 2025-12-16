import express from "express";
import { register, login, changePassword, forgotPassword } from "../controllers/principalController.js";
import upload from "../middleware/upload.js";
import { auth, authMiddleware } from "../middleware/auth.js";

const principalRouter = express.Router();

// Register with profile picture upload
principalRouter.post("/register", upload.single("profilePic"), register);
principalRouter.post("/login", login);
principalRouter.post("/forgot-password", forgotPassword);
principalRouter.post("/change-password", auth, changePassword);

export default principalRouter;
