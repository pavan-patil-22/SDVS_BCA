import Facility from "../models/Facility.js";

// *****************Create facility********************//
export const createFacility = async (req, res) => {
  try {
    const { title, description } = req.body;
    const imagePath = req.file ? req.file.path : null;

    const facility = new Facility({ title, description, image: imagePath });
    await facility.save();

    res.status(201).json(facility);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//*****************Get all facilities********************//
export const getFacilities = async (req, res) => {
  try {
    const facilities = await Facility.find();
    res.json(facilities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//*****************Get single facility********************//
export const getFacility = async (req, res) => {
  try {
    const facility = await Facility.findById(req.params.id);
    if (!facility) return res.status(404).json({ error: "Facility not found" });
    res.json(facility);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ********************Update facility********************//
export const updateFacility = async (req, res) => {
  try {
    const { title, description } = req.body;
    const updateData = { title, description };
    if (req.file) updateData.image = req.file.path;

    const facility = await Facility.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!facility) return res.status(404).json({ error: "Facility not found" });
    res.json(facility);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// *****************Delete facility********************//
export const deleteFacility = async (req, res) => {
  try {
    const facility = await Facility.findByIdAndDelete(req.params.id);
    if (!facility) return res.status(404).json({ error: "Facility not found" });
    res.json({ message: "Facility deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
