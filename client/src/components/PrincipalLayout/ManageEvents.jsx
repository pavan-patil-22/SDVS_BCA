import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Modal,
  Card,
  Alert,
  Spinner,
  Badge
} from "react-bootstrap";
import { FaEdit, FaTrash, FaPlus, FaCalendarAlt, FaUsers, FaClock, FaUserTie, FaImage, FaTimes } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { BASE_API_URL,_BASE_URL , Img_BASE_URL } from "../../BaseAPI";

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    eventName: "",
    eventDate: "",
    eventTime: "",
    duration: "",
    participantsCount: "",
  });
  const [description, setDescription] = useState([""]);
  const [facultyCoordinators, setFacultyCoordinators] = useState([""]);
  const [guests, setGuests] = useState([""]);
  const [coverImage, setCoverImage] = useState(null);
  const [eventImages, setEventImages] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  // Fetch events
  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_API_URL}/events`);
      setEvents(res.data);
    } catch (err) {
      console.error("Error fetching events:", err);
      toast.error("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: false
    });
    fetchEvents();
  }, []);

  // Handle simple inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Dynamic fields
  const handleArrayChange = (setter, index, value) => {
    setter((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  const addField = (setter) => {
    setter((prev) => [...prev, ""]);
  };

  const removeField = (setter, index) => {
    setter((prev) => prev.filter((_, i) => i !== index));
  };

  // File inputs
  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    setCoverImage(file);
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleEventImagesChange = (e) => {
    setEventImages(Array.from(e.target.files));
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setFormLoading(true);
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      // Append array fields correctly
      description.forEach((desc) => data.append("description[]", desc));
      facultyCoordinators.forEach((f) => data.append("facultyCoordinators[]", f));
      guests.forEach((g) => data.append("guests[]", g));

      if (coverImage) data.append("coverImage", coverImage);
      eventImages.forEach((img) => data.append("eventImages", img));

      if (editingEvent) {
        await axios.put(`${BASE_API_URL}/events/${editingEvent._id}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Event updated successfully!");
      } else {
        await axios.post(`${BASE_API_URL}/events`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Event created successfully!");
      }

      fetchEvents();
      resetForm();
      setShowModal(false);
    } catch (err) {
      console.error("Error saving event:", err);
      toast.error("Failed to save event");
    } finally {
      setFormLoading(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      eventName: "",
      eventDate: "",
      eventTime: "",
      duration: "",
      participantsCount: "",
    });
    setDescription([""]);
    setFacultyCoordinators([""]);
    setGuests([""]);
    setCoverImage(null);
    setEventImages([]);
    setPreviewImage(null);
    setEditingEvent(null);
  };

  // Close modal
  const handleCloseModal = () => {
    setShowModal(false);
    resetForm();
  };

  // Edit
  const handleEdit = (event) => {
    setEditingEvent(event);
    setFormData({
      eventName: event.eventName,
      eventDate: event.eventDate?.split("T")[0],
      eventTime: event.eventTime,
      duration: event.duration,
      participantsCount: event.participantsCount,
    });
    setDescription(event.description?.length ? event.description : [""]);
    setFacultyCoordinators(
      event.facultyCoordinators?.length ? event.facultyCoordinators : [""]
    );
    setGuests(event.guests?.length ? event.guests : [""]);
    setShowModal(true);
  };

  // Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      setLoading(true);
      await axios.delete(`${BASE_API_URL}/events/${id}`);
      toast.success("Event deleted successfully!");
      fetchEvents();
    } catch (err) {
      console.error("Error deleting event:", err);
      toast.error("Failed to delete event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="manage-events-page">
      <ToastContainer position="top-right" autoClose={3000} />
      
      <Container className="py-4">
        <div className="page-header" data-aos="fade-down">
          <h2>Manage Events</h2>
          <p>Create and manage your institution's events</p>
          <Button 
            variant="primary" 
            onClick={() => setShowModal(true)}
            className="mt-3"
          >
            <FaPlus className="me-2" />
            Add New Event
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" className="mb-3" />
            <p>Loading events...</p>
          </div>
        ) : events.length === 0 ? (
          <Card className="text-center py-5 mt-4">
            <FaCalendarAlt size={48} className="text-muted mb-3 mx-auto" />
            <h4>No Events Scheduled</h4>
            <p className="text-muted">Get started by adding your first event</p>
          </Card>
        ) : (
          <Row className="mt-4">
            {events.map((event, index) => (
              <Col lg={4} md={6} className="mb-4" key={event._id}>
                <Card className="event-card h-100" data-aos="fade-up" data-aos-delay={index * 100}>
                  {event.coverImage && (
                    <Card.Img
                      variant="top"
                      src={`${Img_BASE_URL}${event.coverImage}`}
                      className="event-image"
                    />
                  )}
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="event-title">{event.eventName}</Card.Title>
                    
                    <div className="event-details mb-3">
                      <div className="detail-item">
                        <FaCalendarAlt className="me-2 text-primary" />
                        <span>{new Date(event.eventDate).toLocaleDateString()}</span>
                      </div>
                      <div className="detail-item">
                        <FaClock className="me-2 text-primary" />
                        <span>{event.eventTime}</span>
                      </div>
                      {event.duration && (
                        <div className="detail-item">
                          <FaClock className="me-2 text-primary" />
                          <span>{event.duration}</span>
                        </div>
                      )}
                      {event.participantsCount && (
                        <div className="detail-item">
                          <FaUsers className="me-2 text-primary" />
                          <span>{event.participantsCount} participants</span>
                        </div>
                      )}
                    </div>

                    {event.description && event.description.length > 0 && (
                      <div className="mb-3">
                        <h6 className="text-muted">Description:</h6>
                        {event.description.map((para, i) => (
                          <div key={i} className="small mb-1" style={{ whiteSpace: 'pre-line' }}>{para}</div>
                        ))}
                      </div>
                    )}

                    {event.facultyCoordinators && event.facultyCoordinators.length > 0 && (
                      <div className="mb-2">
                        <h6 className="text-muted">Faculty Coordinators:</h6>
                        <div className="coordinator-list">
                          {event.facultyCoordinators.map((coordinator, idx) => (
                            <Badge key={idx} bg="light" text="dark" className="me-1 mb-1">
                              {coordinator}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {event.guests && event.guests.length > 0 && (
                      <div className="mb-3">
                        <h6 className="text-muted">Guests:</h6>
                        <div className="guest-list">
                          {event.guests.map((guest, idx) => (
                            <Badge key={idx} bg="secondary" className="me-1 mb-1">
                              {guest}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {event.eventImages?.length > 0 && (
                      <div className="mb-3">
                        <h6 className="text-muted">Event Images:</h6>
                        <div className="event-gallery">
                          {event.eventImages.slice(0, 3).map((img, idx) => (
                            <img
                              key={idx}
                              src={`${Img_BASE_URL}${img}`}
                              alt="event"
                              className="gallery-thumbnail"
                            />
                          ))}
                          {event.eventImages.length > 3 && (
                            <div className="gallery-more">
                              +{event.eventImages.length - 3} more
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="mt-auto pt-3">
                      <Button 
                        variant="outline-primary" 
                        size="sm" 
                        className="me-2"
                        onClick={() => handleEdit(event)}
                      >
                        <FaEdit className="me-1" />
                        Edit
                      </Button>
                      <Button 
                        variant="outline-danger" 
                        size="sm"
                        onClick={() => handleDelete(event._id)}
                      >
                        <FaTrash className="me-1" />
                        Delete
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}

        {/* Modal for Create/Update */}
        <Modal show={showModal} onHide={handleCloseModal} size="lg" centered className="event-modal">
          <Modal.Header closeButton>
            <Modal.Title>
              <FaCalendarAlt className="me-2" />
              {editingEvent ? "Edit Event" : "Create New Event"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ maxHeight: '70vh', overflowY: 'auto' }}>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Event Name *</Form.Label>
                    <Form.Control
                      type="text"
                      name="eventName"
                      value={formData.eventName}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Date *</Form.Label>
                    <Form.Control
                      type="date"
                      name="eventDate"
                      value={formData.eventDate}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Time *</Form.Label>
                    <Form.Control
                      type="text"
                      name="eventTime"
                      value={formData.eventTime}
                      onChange={handleChange}
                      placeholder="e.g. 10:00 AM - 2:00 PM"
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Duration</Form.Label>
                    <Form.Control
                      type="text"
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                      placeholder="e.g. 3 hours"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Participants Count</Form.Label>
                    <Form.Control
                      type="number"
                      name="participantsCount"
                      value={formData.participantsCount}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Cover Image</Form.Label>
                    <Form.Control 
                      type="file" 
                      onChange={handleCoverChange} 
                      accept="image/*"
                    />
                    {previewImage && (
                      <div className="image-preview mt-2">
                        <img src={previewImage} alt="Preview" className="img-thumbnail" />
                      </div>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Event Images (multiple)</Form.Label>
                    <Form.Control
                      type="file"
                      multiple
                      onChange={handleEventImagesChange}
                      accept="image/*"
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* Description Array Field */}
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                {description.map((desc, index) => (
                  <div key={index} className="d-flex align-items-start mb-2">
                    <Form.Control
                      as="textarea"
                      rows={2}
                      value={desc}
                      onChange={(e) => handleArrayChange(setDescription, index, e.target.value)}
                      placeholder="Enter description paragraph"
                      className="me-2"
                    />
                    {description.length > 1 && (
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => removeField(setDescription, index)}
                        className="flex-shrink-0 mt-2"
                      >
                        <FaTimes />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={() => addField(setDescription)}
                >
                  + Add Description Paragraph
                </Button>
              </Form.Group>

              {/* Faculty Coordinators Array Field */}
              <Form.Group className="mb-3">
                <Form.Label>Faculty Coordinators</Form.Label>
                {facultyCoordinators.map((coordinator, index) => (
                  <div key={index} className="d-flex align-items-center mb-2">
                    <Form.Control
                      type="text"
                      value={coordinator}
                      onChange={(e) => handleArrayChange(setFacultyCoordinators, index, e.target.value)}
                      placeholder="Enter faculty coordinator name"
                      className="me-2"
                    />
                    {facultyCoordinators.length > 1 && (
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => removeField(setFacultyCoordinators, index)}
                        className="flex-shrink-0"
                      >
                        <FaTimes />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={() => addField(setFacultyCoordinators)}
                >
                  + Add Coordinator
                </Button>
              </Form.Group>

              {/* Guests Array Field */}
              <Form.Group className="mb-3">
                <Form.Label>Guests</Form.Label>
                {guests.map((guest, index) => (
                  <div key={index} className="d-flex align-items-center mb-2">
                    <Form.Control
                      type="text"
                      value={guest}
                      onChange={(e) => handleArrayChange(setGuests, index, e.target.value)}
                      placeholder="Enter guest name"
                      className="me-2"
                    />
                    {guests.length > 1 && (
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => removeField(setGuests, index)}
                        className="flex-shrink-0"
                      >
                        <FaTimes />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={() => addField(setGuests)}
                >
                  + Add Guest
                </Button>
              </Form.Group>

              <div className="d-grid gap-2 mt-4">
                <Button 
                  type="submit" 
                  variant="primary" 
                  size="lg"
                  disabled={formLoading}
                >
                  {formLoading ? (
                    <>
                      <Spinner animation="border" size="sm" className="me-2" />
                      {editingEvent ? "Updating..." : "Creating..."}
                    </>
                  ) : (
                    editingEvent ? "Update Event" : "Create Event"
                  )}
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>

      <style>
        {`
          .manage-events-page {
            min-height: 100vh;
            background: linear-gradient(135deg, #f8f9fc 0%, #eef2f6 100%);
          }
          
          .page-header {
            background: white;
            padding: 25px;
            border-radius: 12px;
            margin-bottom: 25px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.08);
            border-left: 4px solid #4e73df;
            text-align: center;
          }
          
          .page-header h2 {
            color: #2e3a59;
            font-weight: 700;
            margin-bottom: 5px;
          }
          
          .page-header p {
            color: #6e6e6e;
            margin: 0 0 15px 0;
          }
          
          .event-card {
            border: none;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 5px 15px rgba(0,0,0,0.08);
            transition: all 0.3s ease;
          }
          
          .event-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0,0,0,0.15);
          }
          
          .event-image {
            height: 200px;
            object-fit: cover;
          }
          
          .event-title {
            color: #2e3a59;
            font-weight: 600;
            margin-bottom: 15px;
          }
          
          .event-details {
            border-left: 3px solid #4e73df;
            padding-left: 15px;
          }
          
          .detail-item {
            display: flex;
            align-items: center;
            margin-bottom: 8px;
            color: #5a5c69;
            font-size: 0.9rem;
          }
          
          .coordinator-list, .guest-list {
            display: flex;
            flex-wrap: wrap;
            margin-top: 5px;
          }
          
          .event-gallery {
            display: flex;
            gap: 8px;
            margin-top: 8px;
          }
          
          .gallery-thumbnail {
            width: 60px;
            height: 60px;
            object-fit: cover;
            border-radius: 6px;
            border: 2px solid #fff;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
          }
          
          .gallery-more {
            width: 60px;
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #f8f9fa;
            border-radius: 6px;
            font-size: 0.8rem;
            font-weight: 600;
            color: #6c757d;
          }
          
          .event-modal .modal-content {
            border-radius: 15px;
            overflow: hidden;
            border: none;
            box-shadow: 0 15px 35px rgba(0,0,0,0.2);
          }
          
          .event-modal .modal-header {
            background: white;
            color: #2e3a59;
            border-bottom: 1px solid #eaecf4;
          }
          
          .event-modal .modal-title {
            font-weight: 600;
            display: flex;
            align-items: center;
          }
          
          .image-preview img {
            max-width: 100%;
            max-height: 150px;
            border-radius: 8px;
          }
          
          @media (max-width: 768px) {
            .page-header {
              text-align: center;
            }
            
            .event-image {
              height: 180px;
            }
            
            .event-gallery {
              flex-wrap: wrap;
            }
          }
        `}
      </style>
    </div>
  );
};

export default ManageEvents;