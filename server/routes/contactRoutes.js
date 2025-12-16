import express from "express";
import { submitMessage, replyToMessage, getAllMessages } from "../controllers/contactController.js";

const contactMessageRouter = express.Router();

contactMessageRouter.post("/", submitMessage); 
contactMessageRouter.get("/", getAllMessages); 
contactMessageRouter.post("/:id/reply", replyToMessage); 

export default contactMessageRouter;
