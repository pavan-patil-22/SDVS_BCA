
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
  Alert,
  Spinner,
  Badge
} from "react-bootstrap";
import { FaEdit, FaTrash, FaPlus, FaGraduationCap, FaBriefcase, FaUserTie, FaCamera } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { BASE_API_URL, Img_BASE_URL } from "../../BaseAPI";

const ManageFaculty = () => {
  const [faculty, setFaculty] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    education: "",
    experience: "",
    employmentType: "",
    teachingType: "",
    facultyPicture: null,
  });
  const [previewImage, setPreviewImage] = useState(null);

  // Fetch all faculty
  const fetchFaculty = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_API_URL}/faculty`);
      setFaculty(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load faculty data");
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
    fetchFaculty();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
      setPreviewImage(URL.createObjectURL(files[0]));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle form submit (Create or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("role", formData.role);
    data.append("education", formData.education);
    data.append("experience", formData.experience);
    data.append("employmentType", formData.employmentType);
    data.append("teachingType", formData.teachingType);
    if (formData.facultyPicture) {
      data.append("facultyPicture", formData.facultyPicture);
    }

    try {
      setFormLoading(true);
      if (editMode && selectedFaculty) {
        await axios.put(
          `${BASE_API_URL}/faculty/${selectedFaculty._id}`,
          data
        );
        toast.success("Faculty updated successfully!");
      } else {
        await axios.post(`${BASE_API_URL}/faculty`, data);
        toast.success("Faculty added successfully!");
      }
      fetchFaculty();
      setShowModal(false);
      resetForm();
    } catch (err) {
      console.error(err);
      toast.error("Failed to save faculty data");
    } finally {
      setFormLoading(false);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this faculty member?")) {
      try {
        setLoading(true);
        await axios.delete(`${BASE_API_URL}/faculty/${id}`);
        toast.success("Faculty deleted successfully!");
        fetchFaculty();
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete faculty member");
      } finally {
        setLoading(false);
      }
    }
  };

  // Open modal for edit
  const handleEdit = (faculty) => {
    setEditMode(true);
    setSelectedFaculty(faculty);
    setFormData({
      name: faculty.name,
      role: faculty.role,
      education: faculty.education,
      experience: faculty.experience,
      employmentType: faculty.employmentType || "",
      teachingType: faculty.teachingType || "",
      facultyPicture: null,
    });
    setPreviewImage(faculty.picture ? `${Img_BASE_URL}${faculty.picture}` : null);
    setShowModal(true);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: "",
      role: "",
      education: "",
      experience: "",
      employmentType: "",
      teachingType: "",
      facultyPicture: null,
    });
    setPreviewImage(null);
    setEditMode(false);
    setSelectedFaculty(null);
  };

  // Close modal
  const handleCloseModal = () => {
    setShowModal(false);
    resetForm();
  };

  // Get role badge color
  const getRoleBadgeColor = (role) => {
    const roleLower = role.toLowerCase();
    if (roleLower.includes('principal')) return 'danger';
    if (roleLower.includes('hod') || roleLower.includes('head')) return 'primary';
    if (roleLower.includes('professor')) return 'info';
    if (roleLower.includes('assistant')) return 'warning';
    return 'secondary';
  };

  return (
    <div className="manage-faculty-page">
      <ToastContainer position="top-right" autoClose={3000} />
      
      <Container className="py-4">
        <div className="page-header" data-aos="fade-down">
          <h2>Faculty Management</h2>
          <p>Add and manage your institution's faculty members</p>
          <Button 
            variant="primary" 
            className="mt-3"
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
          >
            <FaPlus className="me-2" />
            Add New Faculty
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" className="mb-3" />
            <p>Loading faculty data...</p>
          </div>
        ) : faculty.length === 0 ? (
          <div className="text-center py-5 empty-state">
            <FaUserTie size={48} className="text-muted mb-3" />
            <h4>No Faculty Members</h4>
            <p className="text-muted">Get started by adding your first faculty member</p>
            <Button 
              variant="primary" 
              onClick={() => setShowModal(true)}
              className="px-4"
            >
              Add Faculty
            </Button>
          </div>
        ) : (
          <Row className="faculty-grid">
            {faculty.map((f, index) => (
              <Col xl={3} lg={4} md={6} className="mb-4" key={f._id}>
                <Card className="faculty-card h-100" data-aos="fade-up" data-aos-delay={index * 100}>
                  <div className="faculty-image-container">
                    {f.picture ? (
                      <Card.Img
                        variant="top"
                        src={`${Img_BASE_URL}${f.picture}`}
                        className="faculty-image"
                      />
                    ) : (
                      <div className="faculty-image-placeholder">
                        <FaUserTie size={48} />
                      </div>
                    )}
                    <div className="faculty-actions">
                      <Button 
                        variant="primary" 
                        size="sm" 
                        className="action-btn"
                        onClick={() => handleEdit(f)}
                      >
                        <FaEdit />
                      </Button>
                      <Button 
                        variant="danger" 
                        size="sm" 
                        className="action-btn"
                        onClick={() => handleDelete(f._id)}
                      >
                        <FaTrash />
                      </Button>
                    </div>
                  </div>
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="faculty-name">{f.name}</Card.Title>
                    <div className="faculty-role mb-2">
                      <Badge bg={getRoleBadgeColor(f.role)}>
                        {f.role}
                      </Badge>
                    </div>
                    <div className="faculty-details">
                      <div className="faculty-detail-item">
                        <FaGraduationCap className="me-2 text-primary" />
                        <span>{f.education}</span>
                      </div>
                      <div className="faculty-detail-item">
                        <FaBriefcase className="me-2 text-primary" />
                        <span>{f.experience} years experience</span>
                      </div>
                      <div className="faculty-detail-item">
                        <span className="badge bg-secondary me-2">{f.employmentType}</span>
                        <span className="badge bg-info">{f.teachingType}</span>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}

        {/* Modal for Add/Edit */}
        <Modal show={showModal} onHide={handleCloseModal} centered className="faculty-modal">
          <Modal.Header closeButton>
            <Modal.Title>
              {editMode ? "Edit Faculty Member" : "Add New Faculty Member"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={12} className="text-center mb-4">
                  <div className="image-upload-container">
                    {previewImage ? (
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="image-preview"
                      />
                    ) : (
                      <div className="image-placeholder">
                        <FaCamera size={32} />
                        <span>Upload Photo</span>
                      </div>
                    )}
                    <Form.Control
                      type="file"
                      name="facultyPicture"
                      onChange={handleChange}
                      accept="image/*"
                      className="image-upload-input"
                    />
                  </div>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Full Name *</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter faculty member's full name"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Role/Position *</Form.Label>
                <Form.Control
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Professor, Department Head"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Education *</Form.Label>
                <Form.Control
                  type="text"
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  required
                  placeholder="e.g., PhD in Computer Science"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Experience *</Form.Label>
                <Form.Control
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  required
                  placeholder="e.g., 10 years of teaching experience"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Employment Type *</Form.Label>
                <Form.Select
                  name="employmentType"
                  value={formData.employmentType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Employment Type</option>
                  <option value="Full Time">Full Time</option>
                  <option value="Part Time">Part Time</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Teaching Type *</Form.Label>
                <Form.Select
                  name="teachingType"
                  value={formData.teachingType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Teaching Type</option>
                  <option value="Teaching">Teaching</option>
                  <option value="Non Teaching">Non Teaching</option>
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
                      {editMode ? "Updating..." : "Adding..."}
                    </>
                  ) : (
                    editMode ? "Update Faculty" : "Add Faculty"
                  )}
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>

      <style>
        {`
          .manage-faculty-page {
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
          
          .faculty-card {
            border: none;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 5px 15px rgba(0,0,0,0.08);
            transition: all 0.3s ease;
          }
          
          .faculty-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0,0,0,0.15);
          }
          
          .faculty-image-container {
            position: relative;
            height: 250px;
            overflow: hidden;
          }
          
          .faculty-image {
            height: 100%;
            object-fit: cover;
            transition: transform 0.5s;
          }
          
          .faculty-card:hover .faculty-image {
            transform: scale(1.05);
          }
          
          .faculty-image-placeholder {
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #f5f7fa 0%, #e4e6f0 100%);
            color: #858796;
          }
          
          .faculty-actions {
            position: absolute;
            top: 10px;
            right: 10px;
            display: flex;
            gap: 5px;
            opacity: 0;
            transition: opacity 0.3s;
          }
          
          .faculty-card:hover .faculty-actions {
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
          
          .faculty-name {
            color: #2e3a59;
            font-weight: 600;
            margin-bottom: 10px;
          }
          
          .faculty-details {
            margin-top: auto;
          }
          
          .faculty-detail-item {
            display: flex;
            align-items: center;
            margin-bottom: 8px;
            color: #5a5c69;
          }
          
          .image-upload-container {
            position: relative;
            width: 150px;
            height: 150px;
            margin: 0 auto;
            cursor: pointer;
          }
          
          .image-preview {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 50%;
            border: 3px solid #eaecf4;
          }
          
          .image-placeholder {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            border: 2px dashed #d4d8e2;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: #b3b7c1;
            transition: all 0.3s;
            background: #f8f9fc;
          }
          
          .image-placeholder:hover {
            border-color: #4e73df;
            color: #4e73df;
          }
          
          .image-upload-input {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            cursor: pointer;
          }
          
          .faculty-modal .modal-content {
            border-radius: 15px;
            overflow: hidden;
            border: none;
            box-shadow: 0 15px 35px rgba(0,0,0,0.2);
          }
          
          .faculty-modal .modal-header {
            background: white;
            color: #2e3a59;
            border-bottom: 1px solid #eaecf4;
          }
          
          .empty-state {
            background: white;
            padding: 40px;
            border-radius: 15px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.05);
          }
          
          @media (max-width: 768px) {
            .page-header {
              text-align: center;
            }
            
            .faculty-image-container {
              height: 220px;
            }
            
            .faculty-actions {
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
};

export default ManageFaculty;