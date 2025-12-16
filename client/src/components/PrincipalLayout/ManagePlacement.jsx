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
import { FaEdit, FaTrash, FaPlus, FaUserGraduate, FaBuilding, FaMoneyBillWave, FaCalendarAlt } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { BASE_API_URL, Img_BASE_URL } from "../../BaseAPI";

const API_URL = `${BASE_API_URL}/placements`;
const IMG_URL = `${Img_BASE_URL}`;

const ManagePlacement = () => {
  const [placements, setPlacements] = useState([]);
  const [show, setShow] = useState(false);
  const [editing, setEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    studentname: "",
    company: "",
    package: "",
    batch: "",
    placementImage: null,
  });
  const [previewImage, setPreviewImage] = useState(null);

  // Fetch placements
  const fetchPlacements = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setPlacements(res.data);
      setError("");
    } catch (error) {
      setError("Failed to load placements");
      console.error("Error fetching placements:", error);
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
    fetchPlacements();
  }, []);

  // Handle form input
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "placementImage") {
      const file = files[0];
      setFormData({ ...formData, placementImage: file });
      if (file) {
        setPreviewImage(URL.createObjectURL(file));
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Submit new or updated placement
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setFormLoading(true);
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null) {
          data.append(key, formData[key]);
        }
      });

      if (editing) {
        await axios.put(`${API_URL}/${currentId}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Placement updated successfully!");
      } else {
        await axios.post(API_URL, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Placement added successfully!");
      }

      setShow(false);
      resetForm();
      fetchPlacements();
    } catch (error) {
      setError("Failed to save placement");
      console.error("Error saving placement:", error);
      toast.error("Failed to save placement");
    } finally {
      setFormLoading(false);
    }
  };

  // Delete placement
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this placement record?"))
      return;
    try {
      setLoading(true);
      await axios.delete(`${API_URL}/${id}`);
      toast.success("Placement deleted successfully!");
      fetchPlacements();
    } catch (error) {
      setError("Failed to delete placement");
      console.error("Error deleting placement:", error);
      toast.error("Failed to delete placement");
    } finally {
      setLoading(false);
    }
  };

  // Edit placement
  const handleEdit = (placement) => {
    setEditing(true);
    setCurrentId(placement._id);
    setFormData({
      studentname: placement.studentname,
      company: placement.company,
      package: placement.package,
      batch: placement.batch,
      placementImage: null,
    });
    setPreviewImage(`${IMG_URL}${placement.image}`);
    setShow(true);
  };

  // Reset form
  const resetForm = () => {
    setEditing(false);
    setCurrentId(null);
    setFormData({
      studentname: "",
      company: "",
      package: "",
      batch: "",
      placementImage: null,
    });
    setPreviewImage(null);
    setError("");
  };

  // Close modal
  const handleCloseModal = () => {
    setShow(false);
    resetForm();
  };

  return (
    <div className="manage-placement-page">
      <ToastContainer position="top-right" autoClose={3000} />
      
      <Container className="py-4">
        <div className="page-header" data-aos="fade-down">
          <h2>Manage Placements</h2>
          <p>Track and manage student placement records</p>
          <Button 
            variant="primary" 
            onClick={() => setShow(true)}
            className="mt-3"
          >
            <FaPlus className="me-2" />
            Add New Placement
          </Button>
        </div>

        {error && <Alert variant="danger" onClose={() => setError("")} dismissible>{error}</Alert>}

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" className="mb-3" />
            <p>Loading placements...</p>
          </div>
        ) : placements.length === 0 ? (
          <Card className="text-center py-5 mt-4">
            <FaUserGraduate size={48} className="text-muted mb-3 mx-auto" />
            <h4>No Placement Records</h4>
            <p className="text-muted">Get started by adding your first placement record</p>
          </Card>
        ) : (
          <Row className="mt-4">
            {placements.map((placement, index) => (
              <Col lg={4} md={6} className="mb-4" key={placement._id}>
                <Card className="placement-card h-100" data-aos="fade-up" data-aos-delay={index * 100}>
                  <div className="placement-image-container">
                    <Card.Img
                      variant="top"
                      src={`${IMG_URL}${placement.image}`}
                      className="placement-image"
                    />
                    <div className="package-badge">
                      <FaMoneyBillWave className="me-1" />
                      {placement.package} LPA
                    </div>
                    <div className="placement-actions">
                      <Button 
                        variant="primary" 
                        size="sm" 
                        className="action-btn"
                        onClick={() => handleEdit(placement)}
                      >
                        <FaEdit />
                      </Button>
                      <Button 
                        variant="danger" 
                        size="sm" 
                        className="action-btn"
                        onClick={() => handleDelete(placement._id)}
                      >
                        <FaTrash />
                      </Button>
                    </div>
                  </div>
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="placement-title">{placement.studentname}</Card.Title>
                    
                    <div className="placement-details">
                      <div className="detail-item">
                        <FaBuilding className="me-2 text-primary" />
                        <span>{placement.company}</span>
                      </div>
                      <div className="detail-item">
                        <FaCalendarAlt className="me-2 text-primary" />
                        <span>Batch: {placement.batch}</span>
                      </div>
                    </div>

                    <div className="mt-auto pt-3">
                      <Badge bg="success" className="package-badge-full">
                        Package: {placement.package} LPA
                      </Badge>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}

        {/* Add/Edit Placement Modal */}
        <Modal show={show} onHide={handleCloseModal} centered className="placement-modal">
          <Modal.Header closeButton>
            <Modal.Title>
              {editing ? "Edit Placement Record" : "Add New Placement"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit} encType="multipart/form-data">
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Student Name *</Form.Label>
                    <Form.Control
                      type="text"
                      name="studentname"
                      value={formData.studentname}
                      onChange={handleChange}
                      placeholder="Enter student name"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Company *</Form.Label>
                    <Form.Control
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Enter company name"
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Package (LPA) *</Form.Label>
                    <Form.Control
                      type="number"
                      name="package"
                      value={formData.package}
                      onChange={handleChange}
                      placeholder="Enter package amount"
                      step="0.1"
                      min="0"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Batch *</Form.Label>
                    <Form.Control
                      type="text"
                      name="batch"
                      value={formData.batch}
                      onChange={handleChange}
                      placeholder="Enter batch year"
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Student Image {!editing && '*'}</Form.Label>
                <Form.Control
                  type="file"
                  name="placementImage"
                  onChange={handleChange}
                  accept="image/*"
                  required={!editing}
                />
                {(previewImage || editing) && (
                  <div className="image-preview mt-3">
                    <h6 className="text-muted mb-2">Preview:</h6>
                    <img 
                      src={previewImage} 
                      alt="Preview" 
                      className="preview-img" 
                    />
                    {editing && (
                      <small className="text-muted d-block mt-1">
                        Leave empty if you don't want to change the image
                      </small>
                    )}
                  </div>
                )}
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
                      {editing ? "Updating..." : "Adding..."}
                    </>
                  ) : (
                    editing ? "Update Placement" : "Add Placement"
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
          .manage-placement-page {
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
          
          .placement-card {
            border: none;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 5px 15px rgba(0,0,0,0.08);
            transition: all 0.3s ease;
          }
          
          .placement-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0,0,0,0.15);
          }
          
          .placement-image-container {
            position: relative;
            height: 200px;
            overflow: hidden;
          }
          
          .placement-image {
            height: 100%;
            object-fit: cover;
            transition: transform 0.5s;
          }
          
          .placement-card:hover .placement-image {
            transform: scale(1.05);
          }
          
          .package-badge {
            position: absolute;
            top: 10px;
            left: 10px;
            background: rgba(40, 167, 69, 0.9);
            color: white;
            padding: 5px 10px;
            border-radius: 20px;
            font-weight: 600;
            font-size: 0.8rem;
          }
          
          .placement-actions {
            position: absolute;
            top: 10px;
            right: 10px;
            display: flex;
            gap: 5px;
            opacity: 0;
            transition: opacity 0.3s;
          }
          
          .placement-card:hover .placement-actions {
            opacity: 1;
          }
          
          .action-btn {
            border-radius: 50%;
            width: 35px;
            height: 35px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 0;
          }
          
          .placement-title {
            color: #2e3a59;
            font-weight: 600;
            margin-bottom: 15px;
          }
          
          .placement-details {
            margin-bottom: 15px;
          }
          
          .detail-item {
            display: flex;
            align-items: center;
            margin-bottom: 8px;
            color: #5a5c69;
          }
          
          .package-badge-full {
            font-size: 0.9rem;
            padding: 8px 12px;
          }
          
          .image-preview {
            text-align: center;
          }
          
          .preview-img {
            max-width: 100%;
            max-height: 200px;
            border-radius: 8px;
            border: 2px solid #e9ecef;
          }
          
          .placement-modal .modal-content {
            border-radius: 15px;
            overflow: hidden;
            border: none;
            box-shadow: 0 15px 35px rgba(0,0,0,0.2);
          }
          
          .placement-modal .modal-header {
            background: white;
            color: #2e3a59;
            border-bottom: 1px solid #eaecf4;
          }
          
          .placement-modal .modal-title {
            font-weight: 600;
          }
          
          @media (max-width: 768px) {
            .page-header {
              text-align: center;
            }
            
            .placement-image-container {
              height: 180px;
            }
            
            .placement-actions {
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
};

export default ManagePlacement;