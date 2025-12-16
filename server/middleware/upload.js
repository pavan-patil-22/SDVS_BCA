import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure folder exists
const ensureDirExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadPath = "uploads/profile"; // default

    if (file.fieldname === "coverImage") {
      uploadPath = "uploads/events/cover";
    } else if (file.fieldname === "eventImages") {
      uploadPath = "uploads/events/images";
    } else if (file.fieldname === "facultyPicture") {
      uploadPath = "uploads/faculty";
    } else if (file.fieldname === "facilitiesImage") {
      uploadPath = "uploads/facilities";
    }else if (file.fieldname === "image") {   // for gallery
  uploadPath = "uploads/gallery";
} else if (file.fieldname === "placementImage") {  // ✅ for placements
  uploadPath = "uploads/placements";
}


    ensureDirExists(uploadPath);
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// ✅ Allow any image/* or video/* mimetype
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype.startsWith("image/") ||
    file.mimetype.startsWith("video/")
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage, fileFilter });

export default upload;
