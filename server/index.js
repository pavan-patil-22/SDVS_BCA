import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import path from "path";
import principalRouter from "./routes/principalRoutes.js";
import facultyRouter from "./routes/facultyRoutes.js";
import facilityRoutes from "./routes/facilityRoutes.js";
import eventRouter from "./routes/eventRoutes.js";
import galleryRouter from "./routes/galleryRoutes.js";
import placementRouter from "./routes/placementRoutes.js";
import eventNewsRouter from "./routes/eventNewsRoutes.js";
import contactMessageRouter from "./routes/contactRoutes.js";
import notificationRrouter from "./routes/notificationRoutes.js";

const app = express();
app.use(cors({
  origin: ["http://localhost:3000", "https://sdvs-bca.vercel.app"],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(cors());


//##################### BACKEND API ######################//
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use("/api/principal", principalRouter);
app.use("/api/faculty", facultyRouter);
app.use("/api/facilities", facilityRoutes);
app.use("/api/events",eventRouter);
app.use("/api/gallery",galleryRouter);
app.use("/api/placements",placementRouter);
app.use("/api/events-news",eventNewsRouter);
app.use("/api/contact-message", contactMessageRouter);
app.use("/api/notifications", notificationRrouter);
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});








dotenv.config();
const PORT = process.env.PORT || 7000;
const URL = process.env.MONGOURL;
mongoose
  .connect(URL)
  .then(() => {
    console.log("DB connected Successfully");
    app.listen(PORT, () => {
      console.log(`Server is runniing on Port:${PORT}`);
    });
  })
  .catch((error) => console.log(error));
