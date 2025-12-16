import EventNews from "../models/EventNews.js";

//*****************************CREATE EVENT&NEWS**************************/
export const createEventNews = async (req, res) => {
  try {
    const { date, title, description } = req.body;

    if (!date || !title || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newEventNews = new EventNews({ date, title, description });
    await newEventNews.save();

    res.status(201).json({ message: "Event/News created successfully", data: newEventNews });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//***************************GET ALL EVENT&NEWS**************************/
export const getAllEventNews = async (req, res) => {
  try {
    const events = await EventNews.find().sort({ date: 1 }); 
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//********************GET BY ID*****************************/
export const getEventNewsById = async (req, res) => {
  try {
    const event = await EventNews.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Not found" });

    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//*************************UPDATE******************************/
export const updateEventNews = async (req, res) => {
  try {
    const { date, title, description } = req.body;
    const updatedEvent = await EventNews.findByIdAndUpdate(
      req.params.id,
      { date, title, description },
      { new: true }
    );

    if (!updatedEvent) return res.status(404).json({ message: "Not found" });

    res.status(200).json({ message: "Updated successfully", data: updatedEvent });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//********************************DELETE****************************/
export const deleteEventNews = async (req, res) => {
  try {
    const deleted = await EventNews.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });

    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
