import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button, Card, Modal, Alert, Spinner } from "react-bootstrap";
import { FaEdit, FaTrash, FaPlus, FaBuilding } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { BASE_API_URL, Img_BASE_URL } from "../../BaseAPI";

const ManageFacility = () => {
  const [facilities, setFacilities] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [editFacility, setEditFacility] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all facilities
  const fetchFacilities = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_API_URL}/facilities`);
      setFacilities(res.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch facilities");
      console.error("Error fetching facilities:", err);
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
    
    fetchFacilities();
  }, []);

  // Handle image selection with preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // Add new facility
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      if (image) formData.append("image", image);

      await axios.post(`${BASE_API_URL}/facilities`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setTitle("");
      setDescription("");
      setImage(null);
      setPreviewImage(null);
      setShowForm(false);
      toast.success("Facility added successfully!");
      fetchFacilities();
    } catch (err) {
      setError("Failed to add facility");
      console.error("Error adding facility:", err);
      toast.error("Failed to add facility");
    } finally {
      setLoading(false);
    }
  };

  // Delete facility
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this facility?")) {
      try {
        setLoading(true);
        await axios.delete(`${BASE_API_URL}/facilities/${id}`);
        toast.success("Facility deleted successfully!");
        fetchFacilities();
      } catch (err) {
        setError("Failed to delete facility");
        console.error("Error deleting facility:", err);
        toast.error("Failed to delete facility");
      } finally {
        setLoading(false);
      }
    }
  };

  // Open edit modal
  const handleEdit = (facility) => {
    setEditFacility(facility);
    setTitle(facility.title);
    setDescription(facility.description);
    setImage(null);
    setPreviewImage(null);
    setShowModal(true);
  };

  // Close modal and reset form
  const handleCloseModal = () => {
    setShowModal(false);
    setEditFacility(null);
    setTitle("");
    setDescription("");
    setImage(null);
    setPreviewImage(null);
  };

  // Update facility
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      if (image) formData.append("image", image);

      await axios.put(
        `${BASE_API_URL}/facilities/${editFacility._id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      toast.success("Facility updated successfully!");
      handleCloseModal();
      fetchFacilities();
    } catch (err) {
      setError("Failed to update facility");
      console.error("Error updating facility:", err);
      toast.error("Failed to update facility");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="manage-facility-page">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      
      <Container className="py-4">
        <div className="page-header" data-aos="fade-down">
          <h2>Manage Facilities</h2>
          <p>Add and manage your institution's facilities</p>
          
          <Button 
            variant="primary" 
            className="mt-3"
            onClick={() => setShowForm(!showForm)}
          >
            <FaPlus className="me-2" />
            {showForm ? "Hide Form" : "Add New Facility"}
          </Button>
        </div>

        {error && <Alert variant="danger" onClose={() => setError("")} dismissible>{error}</Alert>}

        {showForm && (
          <Row className="mb-4">
            <Col lg={8} className="mx-auto">
              <Card className="add-facility-card" data-aos="fade-right">
                <Card.Header>
                  <h4>Add New Facility</h4>
                </Card.Header>
                <Card.Body>
                  <Form onSubmit={handleAdd}>
                    <Form.Group className="mb-3">
                      <Form.Label>Title *</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter facility title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Enter facility description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Image</Form.Label>
                      <Form.Control
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                      {previewImage && (
                        <div className="image-preview mt-2">
                          <img src={previewImage} alt="Preview" className="img-thumbnail" />
                        </div>
                      )}
                    </Form.Group>

                    <div className="d-flex gap-2">
                      <Button 
                        type="submit" 
                        variant="primary" 
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <Spinner animation="border" size="sm" className="me-2" />
                            Adding...
                          </>
                        ) : (
                          "Add Facility"
                        )}
                      </Button>
                      <Button 
                        variant="outline-secondary" 
                        onClick={() => setShowForm(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}

        <div data-aos="fade-left">
          <h4 className="mb-3">Existing Facilities</h4>
          
          {loading ? (
            <div className="text-center py-4">
              <Spinner animation="border" variant="primary" />
              <p className="mt-2">Loading facilities...</p>
            </div>
          ) : facilities.length === 0 ? (
            <Card className="text-center py-5">
              <FaBuilding size={48} className="text-muted mb-3 mx-auto" />
              <h5>No Facilities Added</h5>
              <p className="text-muted">Click "Add New Facility" to get started</p>
            </Card>
          ) : (
            <Row>
              {facilities.map((f, index) => (
                <Col lg={4} md={6} className="mb-3" key={f._id}>
                  <Card className="facility-card h-100" data-aos="fade-up" data-aos-delay={index * 100}>
                    <div className="facility-image-container">
                      {f.image && (
                        <Card.Img
                          variant="top"
                          src={`${Img_BASE_URL}${f.image}`}
                          className="facility-image"
                        />
                      )}
                      <div className="facility-actions">
                        <Button 
                          variant="primary" 
                          size="sm" 
                          className="action-btn"
                          onClick={() => handleEdit(f)}
                          title="Edit"
                        >
                          <FaEdit />
                        </Button>
                        <Button 
                          variant="danger" 
                          size="sm" 
                          className="action-btn"
                          onClick={() => handleDelete(f._id)}
                          title="Delete"
                        >
                          <FaTrash />
                        </Button>
                      </div>
                    </div>
                    <Card.Body>
                      <Card.Title className="facility-title">{f.title}</Card.Title>
                      <Card.Text className="facility-description">
                        {f.description || "No description provided"}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </div>

        {/* Edit Modal */}
        <Modal show={showModal} onHide={handleCloseModal} centered className="facility-modal">
          <Modal.Header closeButton>
            <Modal.Title>
              <FaEdit className="me-2" />
              Edit Facility
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleUpdate}>
              <Form.Group className="mb-3">
                <Form.Label>Title *</Form.Label>
                <Form.Control
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>New Image (optional)</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {previewImage ? (
                  <div className="image-preview mt-2">
                    <img src={previewImage} alt="Preview" className="img-thumbnail" />
                  </div>
                ) : editFacility?.image && (
                  <div className="current-image mt-2">
                    <p className="small text-muted">Current Image:</p>
                    <img 
                      src={`${Img_BASE_URL}${editFacility.image}`} 
                      alt="Current" 
                      className="img-thumbnail" 
                    />
                  </div>
                )}
              </Form.Group>

              <div className="d-flex gap-2">
                <Button 
                  type="submit" 
                  variant="primary" 
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Spinner animation="border" size="sm" className="me-2" />
                      Updating...
                    </>
                  ) : (
                    "Update Facility"
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
          .manage-facility-page {
            min-height: 100vh;
            background: linear-gradient(135deg, #f8f9fc 0%, #eaecf4 100%);
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
          
          .add-facility-card {
            border: none;
            border-radius: 12px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.1);
          }
          
          .add-facility-card .card-header {
            background: linear-gradient(135deg, #4e73df 0%, #224abe 100%);
            color: white;
            border-radius: 12px 12px 0 0;
            border: none;
            padding: 15px 20px;
          }
          
          .add-facility-card .card-header h4 {
            margin: 0;
            font-weight: 600;
            font-size: 1.25rem;
          }
          
          .facility-card {
            border: none;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 5px 15px rgba(0,0,0,0.08);
            transition: all 0.3s ease;
          }
          
          .facility-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 12px 25px rgba(0,0,0,0.15);
          }
          
          .facility-image-container {
            position: relative;
            height: 200px;
            overflow: hidden;
          }
          
          .facility-image {
            height: 100%;
            object-fit: cover;
            transition: transform 0.5s;
          }
          
          .facility-card:hover .facility-image {
            transform: scale(1.05);
          }
          
          .facility-actions {
            position: absolute;
            top: 10px;
            right: 10px;
            display: flex;
            gap: 5px;
            opacity: 0;
            transition: opacity 0.3s;
          }
          
          .facility-card:hover .facility-actions {
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
          
          .facility-title {
            font-weight: 600;
            color: #2e3a59;
            margin-bottom: 10px;
            font-size: 1.1rem;
          }
          
          .facility-description {
            color: #5a5c69;
            font-size: 0.9rem;
            line-height: 1.5;
          }
          
          .image-preview img {
            max-width: 100%;
            max-height: 150px;
            border-radius: 8px;
          }
          
          .current-image img {
            max-width: 100%;
            max-height: 150px;
            border-radius: 8px;
          }
          
          .facility-modal .modal-content {
            border-radius: 15px;
            overflow: hidden;
            border: none;
            box-shadow: 0 15px 35px rgba(0,0,0,0.2);
          }
          
          .facility-modal .modal-header {
            background: white;
            color: #2e3a59;
            border-bottom: 1px solid #eaecf4;
            padding: 15px 20px;
          }
          
          .facility-modal .modal-title {
            font-weight: 600;
            display: flex;
            align-items: center;
          }
          
          @media (max-width: 768px) {
            .facility-image-container {
              height: 180px;
            }
            
            .facility-actions {
              opacity: 1;
            }
            
            .page-header {
              padding: 20px 15px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default ManageFacility;