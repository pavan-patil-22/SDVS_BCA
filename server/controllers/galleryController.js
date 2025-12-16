import Gallery from "../models/Gallery.js";

//****************************CREATE NEW GALLERY*********************/
export const createGallery = async (req, res) => {
  try {
    const { title } = req.body;
    const image = req.file ? req.file.path : null;
    const mimetype = req.file ? req.file.mimetype : null;
    const type = mimetype && mimetype.startsWith('video/') ? 'video' : 'image';

    if (!title || !image) {
      return res.status(400).json({ message: "Title and image/video are required" });
    }

    const newGallery = new Gallery({ title, image, type });
    await newGallery.save();

    res.status(201).json(newGallery);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//*******************************GET ALL**************************/
export const getGalleries = async (req, res) => {
  try {
    const galleries = await Gallery.find().sort({ createdAt: -1 });
    res.json(galleries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// *********************GET BY ID************************//
export const getGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);
    if (!gallery) return res.status(404).json({ message: "Not found" });
    res.json(gallery);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//*****************UPDATE************************/
export const updateGallery = async (req, res) => {
  try {
    const { title } = req.body;
    let updateData = { title };

    if (req.file) {
      updateData.image = req.file.path;
      const mimetype = req.file.mimetype;
      updateData.type = mimetype && mimetype.startsWith('video/') ? 'video' : 'image';
    }

    const updatedGallery = await Gallery.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedGallery) return res.status(404).json({ message: "Not found" });

    res.json(updatedGallery);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//************************DELETE************************/
export const deleteGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findByIdAndDelete(req.params.id);
    if (!gallery) return res.status(404).json({ message: "Not found" });

    res.json({ message: "Gallery deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
