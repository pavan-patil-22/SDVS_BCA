import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Alert,
  Spinner,
  Badge,
  Modal
} from "react-bootstrap";
import { 
  FaEdit, 
  FaTrash, 
  FaPlus, 
  FaBell, 
  FaLink, 
  FaToggleOn, 
  FaToggleOff,
  FaEye,
  FaEyeSlash
} from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { BASE_API_URL } from "../../BaseAPI";

const API_URL = `${BASE_API_URL}/notifications`;

const ManageNotification = () => {
  const [notifications, setNotifications] = useState([]);
  const [form, setForm] = useState({ 
    title: "", 
    link: "", 
    type: "new" 
  });
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch Notifications
  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setNotifications(res.data);
      setError("");
    } catch (error) {
      setError("Failed to load notifications");
      console.error("Error fetching notifications", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true
    });
    fetchNotifications();
  }, []);

  // Handle Form Input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Create / Update Notification
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setFormLoading(true);
      
      if (editId) {
        await axios.put(`${API_URL}/${editId}`, form);
        toast.success("Notification updated successfully!");
      } else {
        await axios.post(API_URL, form);
        toast.success("Notification added successfully!");
      }
      
      setForm({ title: "", link: "", type: "new" });
      setEditId(null);
      setShowModal(false);
      fetchNotifications();
    } catch (error) {
      setError("Failed to save notification");
      console.error("Error saving notification", error);
      toast.error("Failed to save notification");
    } finally {
      setFormLoading(false);
    }
  };

  // Edit Notification
  const handleEdit = (n) => {
    setForm({ title: n.title, link: n.link, type: n.type });
    setEditId(n._id);
    setShowModal(true);
  };

  // Delete Notification
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this notification?")) return;
    try {
      setLoading(true);
      await axios.delete(`${API_URL}/${id}`);
      toast.success("Notification deleted successfully!");
      fetchNotifications();
    } catch (error) {
      setError("Failed to delete notification");
      console.error("Error deleting notification", error);
      toast.error("Failed to delete notification");
    } finally {
      setLoading(false);
    }
  };

  // Toggle Active
  const toggleActive = async (id, isActive) => {
    try {
      await axios.put(`${API_URL}/${id}`, { isActive: !isActive });
      toast.success(`Notification ${!isActive ? "activated" : "deactivated"}!`);
      fetchNotifications();
    } catch (error) {
      setError("Failed to update notification status");
      console.error("Error toggling active status", error);
      toast.error("Failed to update notification status");
    }
  };

  // Close modal and reset form
  const handleCloseModal = () => {
    setShowModal(false);
    setForm({ title: "", link: "", type: "new" });
    setEditId(null);
    setError("");
  };

  // Get badge color based on type
  const getTypeBadge = (type) => {
    switch (type) {
      case "new": return "primary";
      case "info": return "info";
      case "alert": return "warning";
      default: return "secondary";
    }
  };

  // Format link for display
  const formatLink = (link) => {
    if (link.length > 40) {
      return link.substring(0, 40) + "...";
    }
    return link;
  };

  return (
    <div className="manage-notifications-page">
      <ToastContainer position="top-right" autoClose={3000} />
      
      <Container className="py-4">
        <div className="page-header" data-aos="fade-down">
          <h2>
            <FaBell className="me-2" />
            Manage Notifications
          </h2>
          <p>Create and manage system notifications for your users</p>
          <Button 
            variant="primary" 
            onClick={() => setShowModal(true)}
            className="mt-3"
          >
            <FaPlus className="me-2" />
            Add New Notification
          </Button>
        </div>

        {error && <Alert variant="danger" onClose={() => setError("")} dismissible>{error}</Alert>}

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" className="mb-3" />
            <p>Loading notifications...</p>
          </div>
        ) : notifications.length === 0 ? (
          <Card className="text-center py-5 mt-4">
            <FaBell size={48} className="text-muted mb-3 mx-auto" />
            <h4>No Notifications</h4>
            <p className="text-muted">Get started by adding your first notification</p>
          </Card>
        ) : (
          <Row className="mt-4">
            {notifications.map((notification, index) => (
              <Col lg={6} className="mb-4" key={notification._id}>
                <Card className="notification-card h-100" data-aos="fade-up" data-aos-delay={index * 100}>
                  <Card.Body className="d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div className="flex-grow-1">
                        <Card.Title className="notification-title">
                          {notification.title}
                        </Card.Title>
                        <div className="notification-meta">
                          <Badge bg={getTypeBadge(notification.type)} className="me-2">
                            {notification.type}
                          </Badge>
                          <Badge bg={notification.isActive ? "success" : "secondary"}>
                            {notification.isActive ? 
                              <><FaEye className="me-1" /> Active</> : 
                              <><FaEyeSlash className="me-1" /> Inactive</>
                            }
                          </Badge>
                        </div>
                      </div>
                      <div className="notification-actions">
                        <Button 
                          variant="outline-primary" 
                          size="sm" 
                          className="me-2"
                          onClick={() => handleEdit(notification)}
                        >
                          <FaEdit />
                        </Button>
                        <Button 
                          variant="outline-danger" 
                          size="sm"
                          onClick={() => handleDelete(notification._id)}
                        >
                          <FaTrash />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="notification-link mb-3">
                      <FaLink className="me-2 text-muted" />
                      <a 
                        href={notification.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="link-text"
                        title={notification.link}
                      >
                        {formatLink(notification.link)}
                      </a>
                    </div>
                    
                    <div className="mt-auto pt-3">
                      <Button 
                        variant={notification.isActive ? "outline-warning" : "outline-success"}
                        size="sm"
                        className="w-100"
                        onClick={() => toggleActive(notification._id, notification.isActive)}
                      >
                        {notification.isActive ? (
                          <>
                            <FaToggleOff className="me-2" />
                            Deactivate
                          </>
                        ) : (
                          <>
                            <FaToggleOn className="me-2" />
                            Activate
                          </>
                        )}
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}

        {/* Add/Edit Modal */}
        <Modal show={showModal} onHide={handleCloseModal} centered className="notification-modal">
          <Modal.Header closeButton>
            <Modal.Title>
              {editId ? (
                <>
                  <FaEdit className="me-2" />
                  Edit Notification
                </>
              ) : (
                <>
                  <FaPlus className="me-2" />
                  Add New Notification
                </>
              )}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>
                  <FaBell className="me-2" />
                  Notification Text *
                </Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  placeholder="Enter notification text"
                  value={form.title}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>
                  <FaLink className="me-2" />
                  Link URL *
                </Form.Label>
                <Form.Control
                  type="url"
                  name="link"
                  placeholder="https://example.com"
                  value={form.link}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Type *</Form.Label>
                <Form.Select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  required
                >
                  <option value="new">New</option>
                  <option value="info">Information</option>
                  <option value="alert">Alert</option>
                </Form.Select>
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
                      {editId ? "Updating..." : "Adding..."}
                    </>
                  ) : (
                    editId ? "Update Notification" : "Add Notification"
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
          .manage-notifications-page {
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
          
          .notification-card {
            border: none;
            border-radius: 12px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.08);
            transition: all 0.3s ease;
          }
          
          .notification-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0,0,0,0.15);
          }
          
          .notification-title {
            color: #2e3a59;
            font-weight: 600;
            margin-bottom: 10px;
          }
          
          .notification-meta {
            margin-bottom: 15px;
          }
          
          .notification-link {
            display: flex;
            align-items: center;
            margin-bottom: 15px;
          }
          
          .link-text {
            color: #0066cc;
            text-decoration: none;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          
          .link-text:hover {
            text-decoration: underline;
          }
          
          .notification-actions {
            display: flex;
            gap: 5px;
          }
          
          .notification-modal .modal-content {
            border-radius: 15px;
            overflow: hidden;
            border: none;
            box-shadow: 0 15px 35px rgba(0,0,0,0.2);
          }
          
          .notification-modal .modal-header {
            background: white;
            color: #2e3a59;
            border-bottom: 1px solid #eaecf4;
          }
          
          .notification-modal .modal-title {
            font-weight: 600;
            display: flex;
            align-items: center;
          }
          
          @media (max-width: 768px) {
            .page-header {
              text-align: center;
            }
            
            .notification-actions {
              margin-top: 10px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default ManageNotification;