import Placement from "../models/Placement.js";

// ➕ Create Placement// Create new placement
export const createPlacement = async (req, res) => {
  try {
    const { studentname, company, package: pkg, batch } = req.body;

    const newPlacement = new Placement({
      studentname,
      company,
      package: pkg,
      batch,
      image: req.file ? req.file.path : null,
    });

    await newPlacement.save();
    res.status(201).json(newPlacement);
  } catch (err) {
    res.status(500).json({ error: "Error creating placement" });
  }
};


// 📖 Get All Placements
export const getPlacements = async (req, res) => {
  try {
    const placements = await Placement.find().sort({ createdAt: -1 });
    res.status(200).json(placements);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 📖 Get One Placement
export const getPlacementById = async (req, res) => {
  try {
    const placement = await Placement.findById(req.params.id);
    if (!placement) return res.status(404).json({ message: "Not found" });
    res.status(200).json(placement);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✏️ Update Placement
export const updatePlacement = async (req, res) => {
  try {
    const { studentname, company, package: pkg, batch } = req.body;
    const updateData = { studentname, company, package: pkg, batch };

    if (req.file) updateData.image = req.file.path;

    const placement = await Placement.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!placement) return res.status(404).json({ message: "Not found" });

    res.status(200).json(placement);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ❌ Delete Placement
export const deletePlacement = async (req, res) => {
  try {
    const placement = await Placement.findByIdAndDelete(req.params.id);
    if (!placement) return res.status(404).json({ message: "Not found" });

    res.status(200).json({ message: "Placement deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
