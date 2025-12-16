import Event from "../models/Event.js";

// *******************Create Event********************//
export const createEvent = async (req, res) => {
  try {
    const {
      eventName,
      eventDate,
      eventTime,
      duration,
      description,
      participantsCount,
      facultyCoordinators,
      guests,
    } = req.body;

    const coverImage = req.files["coverImage"]
      ? req.files["coverImage"][0].path
      : null;

    const eventImages = req.files["eventImages"]
      ? req.files["eventImages"].map((file) => file.path)
      : [];

    const event = new Event({
      coverImage,
      eventName,
      eventDate,
      eventTime,
      duration,
      description: Array.isArray(description) ? description : [description],
      participantsCount,
      facultyCoordinators: Array.isArray(facultyCoordinators)
        ? facultyCoordinators
        : facultyCoordinators
        ? facultyCoordinators.split(",")
        : [],
      guests: Array.isArray(guests)
        ? guests
        : guests
        ? guests.split(",")
        : [],
      eventImages,
    });

    await event.save();
    res.status(201).json({ success: true, event });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ***********************Get all events*****************//
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// *****************Get single event********************//
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// *****************Update Event********************//
export const updateEvent = async (req, res) => {
  try {
    const {
      eventName,
      eventDate,
      eventTime,
      duration,
      description,
      participantsCount,
      facultyCoordinators,
      guests,
    } = req.body;

    let updateData = {
      eventName,
      eventDate,
      eventTime,
      duration,
      description: Array.isArray(description) ? description : [description],
      participantsCount,
      facultyCoordinators: Array.isArray(facultyCoordinators)
        ? facultyCoordinators
        : facultyCoordinators
        ? facultyCoordinators.split(",")
        : [],
      guests: Array.isArray(guests)
        ? guests
        : guests
        ? guests.split(",")
        : [],
    };

    // If new cover uploaded
    if (req.files["coverImage"]) {
      updateData.coverImage = req.files["coverImage"][0].path;
    }

    // If new event images uploaded
    if (req.files["eventImages"]) {
      updateData.eventImages = req.files["eventImages"].map((file) => file.path);
    }

    const event = await Event.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!event) return res.status(404).json({ message: "Event not found" });

    res.json({ success: true, event });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// *****************Delete Event********************//
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json({ success: true, message: "Event deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
