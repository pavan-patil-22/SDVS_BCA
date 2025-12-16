import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Modal,
  Alert,
  Spinner,
  Badge
} from "react-bootstrap";
import { FaEdit, FaTrash, FaPlus, FaCalendarAlt, FaNewspaper, FaBullhorn } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { BASE_API_URL } from "../../BaseAPI";

const API_URL = `${BASE_API_URL}/events-news`;

const ManageEventNews = () => {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    date: "",
    title: "",
    description: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch all events/news
  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setEvents(res.data);
      setError("");
    } catch (err) {
      setError("Failed to load events and news");
      console.error("Error fetching events", err);
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

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add or Update event/news
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setFormLoading(true);
      
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, formData);
        toast.success("Event/News updated successfully!");
      } else {
        await axios.post(API_URL, formData);
        toast.success("Event/News added successfully!");
      }
      
      setFormData({ date: "", title: "", description: "" });
      setEditingId(null);
      setShowModal(false);
      fetchEvents();
    } catch (err) {
      setError("Failed to save event/news");
      console.error("Error saving event", err);
      toast.error("Failed to save event/news");
    } finally {
      setFormLoading(false);
    }
  };

  // Edit
  const handleEdit = (event) => {
    setFormData({
      date: event.date ? event.date.substring(0, 10) : "",
      title: event.title,
      description: event.description,
    });
    setEditingId(event._id);
    setShowModal(true);
  };

  // Delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this event/news?")) {
      try {
        setLoading(true);
        await axios.delete(`${API_URL}/${id}`);
        toast.success("Event/News deleted successfully!");
        fetchEvents();
      } catch (err) {
        setError("Failed to delete event/news");
        console.error("Error deleting event", err);
        toast.error("Failed to delete event/news");
      } finally {
        setLoading(false);
      }
    }
  };

  // Close modal and reset form
  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({ date: "", title: "", description: "" });
    setEditingId(null);
    setError("");
  };

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Check if event is upcoming
  const isUpcoming = (dateString) => {
    return new Date(dateString) > new Date();
  };

  return (
    <div className="manage-events-news-page">
      <ToastContainer position="top-right" autoClose={3000} />
      
      <Container className="py-4">
        <div className="page-header" data-aos="fade-down">
          <h2>
            <FaBullhorn className="me-2" />
            Manage Events & News
          </h2>
          <p>Keep your community informed about upcoming events and news</p>
          <Button 
            variant="primary" 
            onClick={() => setShowModal(true)}
            className="mt-3"
          >
            <FaPlus className="me-2" />
            Add New Event/News
          </Button>
        </div>

        {error && <Alert variant="danger" onClose={() => setError("")} dismissible>{error}</Alert>}

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" className="mb-3" />
            <p>Loading events and news...</p>
          </div>
        ) : events.length === 0 ? (
          <Card className="text-center py-5 mt-4">
            <FaCalendarAlt size={48} className="text-muted mb-3 mx-auto" />
            <h4>No Events or News</h4>
            <p className="text-muted">Get started by adding your first event or news item</p>
          </Card>
        ) : (
          <Row className="mt-4">
            {events.map((event, index) => (
              <Col lg={6} className="mb-4" key={event._id}>
                <Card className="event-news-card h-100" data-aos="fade-up" data-aos-delay={index * 100}>
                  <Card.Body className="d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div>
                        <Card.Title className="event-title">{event.title}</Card.Title>
                        <div className="event-date">
                          <FaCalendarAlt className="me-2 text-primary" />
                          <span>{formatDate(event.date)}</span>
                          {isUpcoming(event.date) && (
                            <Badge bg="success" className="ms-2">
                              Upcoming
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="event-actions">
                        <Button 
                          variant="outline-primary" 
                          size="sm" 
                          className="me-2"
                          onClick={() => handleEdit(event)}
                        >
                          <FaEdit />
                        </Button>
                        <Button 
                          variant="outline-danger" 
                          size="sm"
                          onClick={() => handleDelete(event._id)}
                        >
                          <FaTrash />
                        </Button>
                      </div>
                    </div>
                    
                    <Card.Text className="event-description flex-grow-1">
                      {event.description}
                    </Card.Text>
                    
                    <div className="event-meta">
                      <small className="text-muted">
                        Added on {new Date(event.createdAt).toLocaleDateString()}
                      </small>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}

        {/* Add/Edit Modal */}
        <Modal show={showModal} onHide={handleCloseModal} centered className="event-news-modal">
          <Modal.Header closeButton>
            <Modal.Title>
              {editingId ? (
                <>
                  <FaEdit className="me-2" />
                  Edit Event/News
                </>
              ) : (
                <>
                  <FaPlus className="me-2" />
                  Add New Event/News
                </>
              )}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>
                  <FaCalendarAlt className="me-2" />
                  Date *
                </Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>
                  <FaNewspaper className="me-2" />
                  Title *
                </Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  placeholder="Enter title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>
                  <FaBullhorn className="me-2" />
                  Description *
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="description"
                  placeholder="Enter description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              
              <div className="d-grid gap-2">
                <Button 
                  type="submit" 
                  variant="primary" 
                  size="lg"
                  disabled={formLoading}
                >
                  {formLoading ? (
                    <>
                      <Spinner animation="border" size="sm" className="me-2" />
                      {editingId ? "Updating..." : "Adding..."}
                    </>
                  ) : (
                    editingId ? "Update Event/News" : "Add Event/News"
                  )}
                </Button>
                <Button 
                  variant="outline-secondary" 
                  onClick={handleCloseModal}
                >
                  Cancel
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>

      <style>
        {`
          .manage-events-news-page {
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
            display: flex;
            align-items: center;
            justify-content: center;
          }
          
          .page-header p {
            color: #6e6e6e;
            margin: 0 0 15px 0;
          }
          
          .event-news-card {
            border: none;
            border-radius: 12px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.08);
            transition: all 0.3s ease;
          }
          
          .event-news-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0,0,0,0.15);
          }
          
          .event-title {
            color: #2e3a59;
            font-weight: 600;
            margin-bottom: 5px;
          }
          
          .event-date {
            display: flex;
            align-items: center;
            color: #5a5c69;
            font-weight: 500;
          }
          
          .event-description {
            color: #555;
            line-height: 1.6;
            margin-bottom: 15px;
          }
          
          .event-actions {
            display: flex;
            gap: 5px;
          }
          
          .event-meta {
            border-top: 1px solid #eaecf4;
            padding-top: 10px;
            margin-top: auto;
          }
          
          .event-news-modal .modal-content {
            border-radius: 15px;
            overflow: hidden;
            border: none;
            box-shadow: 0 15px 35px rgba(0,0,0,0.2);
          }
          
          .event-news-modal .modal-header {
            background: white;
            color: #2e3a59;
            border-bottom: 1px solid #eaecf4;
          }
          
          .event-news-modal .modal-title {
            font-weight: 600;
            display: flex;
            align-items: center;
          }
          
          @media (max-width: 768px) {
            .page-header {
              text-align: center;
            }
            
            .event-actions {
              margin-top: 10px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default ManageEventNews;