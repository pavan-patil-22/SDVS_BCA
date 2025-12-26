import Faculty from "../models/Faculty.js";

//***********************CREATE Faculty**************************//
export const createFaculty = async (req, res) => {
  try {
    const { name, role, education, experience, employmentType, teachingType } = req.body;

    const faculty = new Faculty({
      name,
      role,
      education,
      experience,
      employmentType,
      teachingType,
      picture: req.file ? req.file.path : null,
    });

    await faculty.save();
    res.status(201).json({ message: "Faculty added successfully", faculty });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//****************************READ All Faculty**************************//
export const getFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.find();
    res.json(faculty);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// *****************READ Single Faculty********************//
export const getFacultyById = async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.params.id);
    if (!faculty) return res.status(404).json({ message: "Faculty not found" });
    res.json(faculty);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// **************************UPDATE Faculty**************************//
export const updateFaculty = async (req, res) => {
  try {
    const { name, role, education, experience, employmentType, teachingType } = req.body;

    const updatedData = { name, role, education, experience, employmentType, teachingType };
    if (req.file) updatedData.picture = req.file.path;

    const faculty = await Faculty.findByIdAndUpdate(req.params.id, updatedData, {
      new: true,
    });

    if (!faculty) return res.status(404).json({ message: "Faculty not found" });

    res.json({ message: "Faculty updated successfully", faculty });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// **************************DELETE Faculty**************************// 
export const deleteFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.findByIdAndDelete(req.params.id);
    if (!faculty) return res.status(404).json({ message: "Faculty not found" });

    res.json({ message: "Faculty deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
