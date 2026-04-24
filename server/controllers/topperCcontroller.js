import Topper from "../models/topper.js";
import fs from "fs";

/**
 * CREATE Topper
 */
export const createTopper = async (req, res) => {
  try {
    const { studentName, semester, year, percentage, rank, topperType, gender } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Photo is required" });
    }

    const topper = await Topper.create({
      studentName,
      semester: semester ? parseInt(semester, 10) : undefined,
      year,
      percentage: percentage ? parseFloat(percentage) : undefined,
      rank: rank ? parseInt(rank, 10) : undefined,
      topperType,
      gender,
      photo: req.file.path,
    });

    res.status(201).json({
      success: true,
      message: "Topper added successfully",
      data: topper,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * READ All Toppers (Website)
 */
export const getAllToppers = async (req, res) => {
  try {
    const toppers = await Topper.find().sort({ rank: 1 });

    res.status(200).json({
      success: true,
      count: toppers.length,
      data: toppers,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * READ Single Topper
 */
export const getTopperById = async (req, res) => {
  try {
    const topper = await Topper.findById(req.params.id);
    if (!topper) {
      return res.status(404).json({ message: "Topper not found" });
    }
    res.json(topper);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * UPDATE Topper
 */
export const updateTopper = async (req, res) => {
  try {
    const topper = await Topper.findById(req.params.id);
    if (!topper) {
      return res.status(404).json({ message: "Topper not found" });
    }

    // If new image uploaded, delete old image
    if (req.file) {
      if (fs.existsSync(topper.photo)) {
        fs.unlinkSync(topper.photo);
      }
      topper.photo = req.file.path;
    }

    topper.studentName = req.body.studentName || topper.studentName;
    topper.semester = req.body.semester === "__clear__" ? undefined : (req.body.semester ? parseInt(req.body.semester, 10) : topper.semester);
    topper.year = req.body.year || topper.year;
    topper.percentage = req.body.percentage === "__clear__" ? undefined : (req.body.percentage ? parseFloat(req.body.percentage) : topper.percentage);
    topper.rank = req.body.rank === "__clear__" ? undefined : (req.body.rank ? parseInt(req.body.rank, 10) : topper.rank);
    topper.topperType = req.body.topperType || topper.topperType;
    topper.gender = req.body.gender === "__clear__" ? undefined : (req.body.gender || topper.gender);

    await topper.save();

    res.json({
      success: true,
      message: "Topper updated successfully",
      data: topper,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * DELETE Topper
 */
export const deleteTopper = async (req, res) => {
  try {
    const topper = await Topper.findById(req.params.id);
    if (!topper) {
      return res.status(404).json({ message: "Topper not found" });
    }

    // Delete image from folder
    if (fs.existsSync(topper.photo)) {
      fs.unlinkSync(topper.photo);
    }

    await topper.deleteOne();

    res.json({
      success: true,
      message: "Topper deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
