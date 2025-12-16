import React, { useState, useEffect } from "react";
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
import { FaEdit, FaTrash, FaPlus, FaImage, FaTimes, FaVideo } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { BASE_API_URL, Img_BASE_URL } from "../../BaseAPI";

const API_URL = `${BASE_API_URL}/gallery`;

const ManageGallery = () => {
  const [galleries, setGalleries] = useState([]);
  const [title, setTitle] = useState("");
  const [media, setMedia] = useState(null);
  const [previewMedia, setPreviewMedia] = useState(null);
  const [mediaType, setMediaType] = useState(null); // 'image' or 'video'
  const [editingGallery, setEditingGallery] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch all galleries
  const fetchGalleries = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setGalleries(res.data);
      setError("");
    } catch (err) {
      setError("Failed to load gallery images");
      console.error(err);
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
    fetchGalleries();
  }, []);

  // Handle image selection with preview
  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMedia(file);
      setPreviewMedia(URL.createObjectURL(file));
      setMediaType(file.type.startsWith('video') ? 'video' : 'image');
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setFormLoading(true);
      const formData = new FormData();
      formData.append("title", title);
  if (media) formData.append("galleryImage", media);

      if (editingGallery) {
        await axios.put(`${API_URL}/${editingGallery._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Gallery image updated successfully!");
      } else {
        await axios.post(API_URL, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Gallery image added successfully!");
      }
      
      resetForm();
      setShowModal(false);
      fetchGalleries();
    } catch (err) {
      setError("Failed to save gallery image");
      console.error(err);
      toast.error("Failed to save gallery image");
    } finally {
      setFormLoading(false);
    }
  };

  // Delete gallery image
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;
    try {
      setLoading(true);
      await axios.delete(`${API_URL}/${id}`);
      toast.success("Gallery image deleted successfully!");
      fetchGalleries();
    } catch (err) {
      setError("Failed to delete gallery image");
      console.error(err);
      toast.error("Failed to delete gallery image");
    } finally {
      setLoading(false);
    }
  };

  // Edit gallery image
  const handleEdit = (gallery) => {
    setEditingGallery(gallery);
    setTitle(gallery.title);
  setMedia(null);
  setPreviewMedia(null);
  setMediaType(null);
    setShowModal(true);
  };

  // Reset form
  const resetForm = () => {
    setTitle("");
  setMedia(null);
  setPreviewMedia(null);
  setMediaType(null);
    setEditingGallery(null);
    setError("");
  };

  // Close modal
  const handleCloseModal = () => {
    setShowModal(false);
    resetForm();
  };

  return (
    <div className="manage-gallery-page">
      <ToastContainer position="top-right" autoClose={3000} />
      
      <Container className="py-4">
        <div className="page-header" data-aos="fade-down">
          <h2>Manage Gallery</h2>
          <p>Upload and manage images for your gallery</p>
          <Button 
            variant="primary" 
            onClick={() => setShowModal(true)}
            className="mt-3"
          >
            <FaPlus className="me-2" />
            Add New Image
          </Button>
        </div>

        {error && <Alert variant="danger" onClose={() => setError("")} dismissible>{error}</Alert>}

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" className="mb-3" />
            <p>Loading gallery images...</p>
          </div>
        ) : galleries.length === 0 ? (
          <Card className="text-center py-5 mt-4">
            <FaImage size={48} className="text-muted mb-3 mx-auto" />
            <h4>No Gallery Images</h4>
            <p className="text-muted">Get started by adding your first image</p>
          </Card>
        ) : (
          <Row className="mt-4">
            {galleries.map((gallery, index) => (
              <Col lg={3} md={4} sm={6} className="mb-4" key={gallery._id}>
                <Card className="gallery-card h-100" data-aos="fade-up" data-aos-delay={index * 100}>
                  <div className="gallery-image-container">
                    {gallery.type === 'video' || (gallery.image && gallery.image.match(/\.(mp4|webm|ogg)$/i)) ? (
                      <video
                        controls
                        className="gallery-image"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        src={`${Img_BASE_URL}${gallery.image}`}
                      />
                    ) : (
                      <Card.Img
                        variant="top"
                        src={`${Img_BASE_URL}${gallery.image}`}
                        className="gallery-image"
                      />
                    )}
                    <div className="gallery-actions">
                      <Button 
                        variant="primary" 
                        size="sm" 
                        className="action-btn"
                        onClick={() => handleEdit(gallery)}
                      >
                        <FaEdit />
                      </Button>
                      <Button 
                        variant="danger" 
                        size="sm" 
                        className="action-btn"
                        onClick={() => handleDelete(gallery._id)}
                      >
                        <FaTrash />
                      </Button>
                    </div>
                  </div>
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="gallery-title">{gallery.title}</Card.Title>
                    <div className="mt-auto pt-3">
                      <Badge bg="secondary" className="image-info">
                        {gallery.type === 'video' || (gallery.image && gallery.image.match(/\.(mp4|webm|ogg)$/i)) ? (
                          <><FaVideo className="me-1" />Gallery Video</>
                        ) : (
                          <><FaImage className="me-1" />Gallery Image</>
                        )}
                      </Badge>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}

        {/* Add/Edit Modal */}
        <Modal show={showModal} onHide={handleCloseModal} centered className="gallery-modal">
          <Modal.Header closeButton>
            <Modal.Title>
              <FaImage className="me-2" />
              {editingGallery ? "Edit Gallery Image" : "Add New Gallery Image"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Title *</Form.Label>
                <Form.Control
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter image title"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Image/Video *</Form.Label>
                <Form.Control
                  type="file"
                  onChange={handleMediaChange}
                  accept="image/*,video/*"
                  required={!editingGallery}
                />
                {(previewMedia || editingGallery?.image) && (
                  <div className="image-preview mt-3">
                    <h6 className="text-muted mb-2">Preview:</h6>
                    {previewMedia ? (
                      mediaType === 'video' ? (
                        <video src={previewMedia} controls className="preview-img" style={{ maxHeight: 200 }} />
                      ) : (
                        <img src={previewMedia} alt="Preview" className="preview-img" />
                      )
                    ) : editingGallery?.image && (editingGallery.type === 'video' || editingGallery.image.match(/\.(mp4|webm|ogg)$/i)) ? (
                      <video src={`${Img_BASE_URL}${editingGallery.image}`} controls className="preview-img" style={{ maxHeight: 200 }} />
                    ) : (
                      <img src={`${Img_BASE_URL}${editingGallery.image}`} alt="Preview" className="preview-img" />
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
                      {editingGallery ? "Updating..." : "Uploading..."}
                    </>
                  ) : (
                    editingGallery ? "Update Image" : "Upload Image"
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
          .manage-gallery-page {
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
          
          .gallery-card {
            border: none;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 5px 15px rgba(0,0,0,0.08);
            transition: all 0.3s ease;
          }
          
          .gallery-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0,0,0,0.15);
          }
          
          .gallery-image-container {
            position: relative;
            height: 200px;
            overflow: hidden;
          }
          
          .gallery-image {
            height: 100%;
            object-fit: cover;
            transition: transform 0.5s;
          }
          
          .gallery-card:hover .gallery-image {
            transform: scale(1.05);
          }
          
          .gallery-actions {
            position: absolute;
            top: 10px;
            right: 10px;
            display: flex;
            gap: 5px;
            opacity: 0;
            transition: opacity 0.3s;
          }
          
          .gallery-card:hover .gallery-actions {
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
          
          .gallery-title {
            color: #2e3a59;
            font-weight: 600;
            font-size: 1.1rem;
            margin-bottom: 10px;
          }
          
          .image-info {
            font-size: 0.8rem;
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
          
          .gallery-modal .modal-content {
            border-radius: 15px;
            overflow: hidden;
            border: none;
            box-shadow: 0 15px 35px rgba(0,0,0,0.2);
          }
          
          .gallery-modal .modal-header {
            background: white;
            color: #2e3a59;
            border-bottom: 1px solid #eaecf4;
          }
          
          .gallery-modal .modal-title {
            font-weight: 600;
            display: flex;
            align-items: center;
          }
          
          @media (max-width: 768px) {
            .page-header {
              text-align: center;
            }
            
            .gallery-image-container {
              height: 180px;
            }
            
            .gallery-actions {
              opacity: 1;
            }
            
            .gallery-card {
              margin: 0 10px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default ManageGallery;