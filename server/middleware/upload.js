import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: "user_profile_images",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

const upload = multer({ storage });

export default upload;
