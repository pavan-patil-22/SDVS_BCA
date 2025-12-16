import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Carousel, Badge, Card, Spinner, Button } from "react-bootstrap";
import { FaCalendarAlt, FaClock, FaUsers, FaUserTie, FaStar, FaMapMarkerAlt, FaShareAlt, FaEye } from "react-icons/fa";
import axios from "axios";
import { BASE_API_URL, Img_BASE_URL } from "../../BaseAPI";
import AOS from 'aos';
import 'aos/dist/aos.css';

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedImage, setExpandedImage] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: false, 
      mirror: true
    });
    
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`${BASE_API_URL}/events/${id}`);
        setEvent(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const handleSelect = (selectedIndex) => {
    setActiveIndex(selectedIndex);
  };

  const openImageModal = (img, index) => {
    setExpandedImage({ img, index });
  };

  const closeImageModal = () => {
    setExpandedImage(null);
  };

  const shareEvent = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: event.eventName,
          text: event.description?.[0]?.substring(0, 100) + '...',
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div>
          <Spinner animation="border" variant="primary" className="mb-3" style={{ width: '3rem', height: '3rem' }} />
          <p className="fs-5">Loading event details...</p>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <Container className="py-5 text-center" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div>
          <h3 className="text-danger mb-3">Event Not Found</h3>
          <p className="fs-5">The event you're looking for doesn't exist.</p>
        </div>
      </Container>
    );
  }

  return (
    <div className="event-details-page">
      {/* Expanded Image Modal */}
      {expandedImage && (
        <div className="image-modal-overlay" onClick={closeImageModal}>
          <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeImageModal}>
              &times;
            </button>
            <img
              src={`${Img_BASE_URL}${expandedImage.img}`}
              alt={`Event image ${expandedImage.index + 1}`}
              className="expanded-image"
            />
            <div className="image-nav">
              <button 
                disabled={expandedImage.index === 0}
                onClick={() => setExpandedImage({
                  img: event.eventImages[expandedImage.index - 1],
                  index: expandedImage.index - 1
                })}
              >
                &lt;
              </button>
              <span>{expandedImage.index + 1} / {event.eventImages.length}</span>
              <button 
                disabled={expandedImage.index === event.eventImages.length - 1}
                onClick={() => setExpandedImage({
                  img: event.eventImages[expandedImage.index + 1],
                  index: expandedImage.index + 1
                })}
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section with Side-by-side Layout */}
      <div className="event-hero-section" style={{ background: 'linear-gradient(rgba(11, 46, 85, 1),rgba(111, 94, 221, 0.54))', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <Container className="py-5">
          <Row className="align-items-center">
            <Col lg={6} className="pe-lg-5" data-aos="fade-up" data-aos-duration="1000" data-aos-once="false">
              <div className="hero-content text-white">
                <h1 className="hero-title mb-4">{event.eventName}</h1>
                <div className="event-meta mb-4">
                  <div className="meta-item d-flex align-items-center mb-3">
                    <FaCalendarAlt className="me-3 fs-5" />
                    <span>
                      {new Date(event.eventDate).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="meta-item d-flex align-items-center mb-3">
                    <FaClock className="me-3 fs-5" />
                    <span>{event.eventTime}</span>
                  </div>
                  {event.venue && (
                    <div className="meta-item d-flex align-items-center mb-3">
                      <FaMapMarkerAlt className="me-3 fs-5" />
                      <span>{event.venue}</span>
                    </div>
                  )}
                  {event.duration && (
                    <div className="meta-item d-flex align-items-center mb-3">
                      <FaClock className="me-3 fs-5" />
                      <span>{event.duration}</span>
                    </div>
                  )}
                  {event.participantsCount && (
                    <div className="meta-item d-flex align-items-center mb-3">
                      <FaUsers className="me-3 fs-5" />
                      <span>{event.participantsCount} Participants</span>
                    </div>
                  )}
                </div>
                <Button variant="light" className="share-btn" onClick={shareEvent}>
                  <FaShareAlt className="me-1" /> Share Event
                </Button>
              </div>
            </Col>
            <Col lg={6} data-aos="fade-down" data-aos-duration="1000" data-aos-once="false">
              {event.coverImage && (
                <div className="hero-image-container">
                  <img
                    src={`${Img_BASE_URL}${event.coverImage}`}
                    alt="event cover"
                    className="hero-image img-fluid rounded shadow"
                  />
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="py-5">
        <Row>
          {/* Main Content */}
          <Col lg={8}>
            {/* Description */}
            <Card className="mb-4 shadow-sm" data-aos="fade-up" data-aos-duration="800" data-aos-once="false">
              <Card.Body className="p-4">
                <Card.Title className="section-title">
                  <FaStar className="me-2" style={{ color: '#f5a623' }} />
                  About the Event
                </Card.Title>
                <div className="description-content">
                  {event.description?.map((para, idx) => (
                    <div key={idx} className="description-para" style={{ whiteSpace: 'pre-line' }}>
                      {para}
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>

            {/* Event Gallery Carousel */}
            {event.eventImages?.length > 0 && (
              <Card className="mb-4 shadow-sm" data-aos="fade-down" data-aos-duration="800" data-aos-once="false">
                <Card.Body className="p-4">
                  <Card.Title className="section-title">
                    Event Gallery
                  </Card.Title>
                  <Carousel 
                    activeIndex={activeIndex} 
                    onSelect={handleSelect}
                    interval={4000}
                    className="event-carousel"
                    fade
                  >
                    {event.eventImages.map((img, idx) => (
                      <Carousel.Item key={idx}>
                        <div 
                          className="carousel-image-container"
                          onClick={() => openImageModal(img, idx)}
                        >
                          <img
                            className="d-block w-100 carousel-image"
                            src={`${Img_BASE_URL}${img}`}
                            alt={`Event image ${idx + 1}`}
                          />
                          <div className="carousel-image-overlay">
                            <div className="expand-icon"><FaEye/> </div>
                          </div>
                        </div>
                        <Carousel.Caption>
                          <p className="carousel-caption">Image {idx + 1} of {event.eventImages.length}</p>
                        </Carousel.Caption>
                      </Carousel.Item>
                    ))}
                  </Carousel>
                  <div className="carousel-thumbnails mt-3">
                    {event.eventImages.map((img, idx) => (
                      <div 
                        key={idx} 
                        className={`thumbnail-container ${activeIndex === idx ? 'active' : ''}`}
                        onClick={() => setActiveIndex(idx)}
                      >
                        <img
                          src={`${Img_BASE_URL}${img}`}
                          alt={`Thumbnail ${idx + 1}`}
                          className="thumbnail"
                        />
                      </div>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            )}
          </Col>

          {/* Sidebar */}
          <Col lg={4}>
            {/* Faculty Coordinators */}
            <Card className="mb-4 shadow-sm" data-aos="fade-down" data-aos-duration="800" data-aos-once="false">
              <Card.Body className="p-4">
                <Card.Title className="section-title">
                  <FaUserTie className="me-2" style={{ color: '#1f3b88' }} />
                  Faculty Coordinators
                </Card.Title>
                <div className="people-list">
                  {event.facultyCoordinators.map((f, idx) => (
                    <div key={idx} className="person-item" data-aos="fade-up" data-aos-duration="600" data-aos-delay={idx * 100}>
                      <div className="person-avatar">
                        <FaUserTie />
                      </div>
                      <div className="person-info">
                        <span className="person-name">{f}</span>
                        <span className="person-role">Faculty Coordinator</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>

            {/* Guests */}
            {event.guests?.length > 0 && (
              <Card className="mb-4 shadow-sm" data-aos="fade-down" data-aos-duration="800" data-aos-once="false">
                <Card.Body className="p-4">
                  <Card.Title className="section-title">
                    <FaStar className="me-2" style={{ color: '#f5a623' }} />
                    Special Guests
                  </Card.Title>
                  <div className="people-list">
                    {event.guests.map((g, idx) => (
                      <div key={idx} className="person-item" data-aos="fade-up" data-aos-duration="600" data-aos-delay={idx * 100}>
                        <div className="person-avatar guest">
                          <FaStar />
                        </div>
                        <div className="person-info">
                          <span className="person-name">{g}</span>
                          <span className="person-role">Guest</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            )}

            {/* Event Summary */}
            <Card className="shadow-sm" data-aos="fade-up" data-aos-duration="800" data-aos-once="false">
              <Card.Body className="p-4">
                <Card.Title className="section-title">
                  Event Summary
                </Card.Title>
                <div className="event-summary">
                  <div className="summary-item">
                    <span className="summary-label">Date:</span>
                    <span className="summary-value">
                      {new Date(event.eventDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Time:</span>
                    <span className="summary-value">{event.eventTime}</span>
                  </div>
                  {event.venue && (
                    <div className="summary-item">
                      <span className="summary-label">Venue:</span>
                      <span className="summary-value">{event.venue}</span>
                    </div>
                  )}
                  {event.duration && (
                    <div className="summary-item">
                      <span className="summary-label">Duration:</span>
                      <span className="summary-value">{event.duration}</span>
                    </div>
                  )}
                  {event.participantsCount && (
                    <div className="summary-item">
                      <span className="summary-label">Participants:</span>
                      <span className="summary-value">{event.participantsCount}</span>
                    </div>
                  )}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <style>
        {`
          .event-details-page {
            background-color: #f8f9fb;
            min-height: 100vh;
          }
          
          .event-hero-section {
            padding: 80px 0;
            color: white;
          }
          
          .hero-title {
            font-size: 2.8rem;
            font-weight: 800;
            margin-bottom: 25px;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
          }
          
          .hero-content {
            padding-right: 20px;
          }
          
          .hero-image-container {
            position: relative;
          }
          
          .hero-image {
            width: 100%;
            height: 350px;
            object-fit: cover;
            transition: all 0.5s ease;
            box-shadow: 0 15px 35px rgba(0,0,0,0.2);
          }
          
          .hero-image:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
          }
          
          .meta-item {
            padding: 8px 0;
            border-bottom: 1px solid rgba(255,255,255,0.2);
          }
          
          .meta-item:last-child {
            border-bottom: none;
          }
          
          .share-btn {
            border-radius: 50px;
            padding: 10px 25px;
            font-weight: 600;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            transition: all 0.3s ease;
            background-color: #fff;
            color: #1f3b88;
            border: none;
          }
          
          .share-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 12px rgba(0,0,0,0.25);
            background-color: #f8f9fa;
            color: #1f3b88;
          }
          
          .section-title {
            color: #1f3b88;
            font-weight: 700;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            font-size: 1.4rem;
            border-bottom: 2px solid #e9ecef;
            padding-bottom: 10px;
            position: relative;
          }
          
          .section-title:after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 0;
            width: 50px;
            height: 3px;
            background: #f5a623;
          }
          
          .description-content {
            line-height: 1.8;
            font-size: 1.05rem;
          }
          
          .description-para {
            margin-bottom: 20px;
            color: #495057;
          }
          
          .event-carousel {
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 8px 20px rgba(0,0,0,0.12);
          }
          
          .carousel-image-container {
            height: 400px;
            overflow: hidden;
            position: relative;
            cursor: pointer;
          }
          
          .carousel-image {
            height: 100%;
            object-fit: cover;
            transition: transform 0.5s ease;
          }
          
          .carousel-image-container:hover .carousel-image {
            transform: scale(1.05);
          }
          
          .carousel-image-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s ease;
          }
          
          .carousel-image-container:hover .carousel-image-overlay {
            opacity: 1;
          }
          
          .expand-icon {
            color: white;
            font-size: 3rem;
            font-weight: 300;
          }
          
          .carousel-caption {
            background: rgba(0,0,0,0.7);
            padding: 8px 15px;
            border-radius: 20px;
            display: inline-block;
            font-size: 0.9rem;
          }
          
          .carousel-thumbnails {
            display: flex;
            gap: 12px;
            overflow-x: auto;
            padding-bottom: 8px;
          }
          
          .thumbnail-container {
            width: 90px;
            height: 70px;
            border-radius: 8px;
            overflow: hidden;
            cursor: pointer;
            opacity: 0.6;
            transition: all 0.3s ease;
            border: 3px solid transparent;
            flex-shrink: 0;
          }
          
          .thumbnail-container:hover,
          .thumbnail-container.active {
            opacity: 1;
            border-color: #1f3b88;
            transform: scale(1.08);
          }
          
          .thumbnail {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          
          .people-list {
            display: flex;
            flex-direction: column;
            gap: 15px;
          }
          
          .person-item {
            display: flex;
            align-items: center;
            gap: 15px;
            padding: 12px;
            border-radius: 10px;
            background: #f8f9fa;
            transition: all 0.3s ease;
          }
          
          .person-item:hover {
            background: #e9ecef;
            transform: translateX(5px);
          }
          
          .person-avatar {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: #1f3b88;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 1.2rem;
            flex-shrink: 0;
          }
          
          .person-avatar.guest {
            background: #f5a623;
          }
          
          .person-info {
            display: flex;
            flex-direction: column;
          }
          
          .person-name {
            font-weight: 600;
            color: #1f3b88;
            margin-bottom: 3px;
          }
          
          .person-role {
            font-size: 0.85rem;
            color: #6c757d;
          }
          
          .event-summary {
            display: flex;
            flex-direction: column;
            gap: 12px;
          }
          
          .summary-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 0;
            border-bottom: 1px solid #eee;
          }
          
          .summary-item:last-child {
            border-bottom: none;
          }
          
          .summary-label {
            font-weight: 600;
            color: #1f3b88;
          }
          
          .summary-value {
            color: #6c757d;
            text-align: right;
            font-weight: 500;
          }
          
          /* Image Modal Styles */
          .image-modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            padding: 20px;
          }
          
          .image-modal-content {
            position: relative;
            max-width: 90%;
            max-height: 90%;
          }
          
          .expanded-image {
            max-width: 100%;
            max-height: 80vh;
            object-fit: contain;
            border-radius: 8px;
          }
          
          .modal-close-btn {
            position: absolute;
            top: -40px;
            right: 0;
            background: none;
            border: none;
            color: white;
            font-size: 2.5rem;
            cursor: pointer;
            transition: color 0.3s ease;
          }
          
          .modal-close-btn:hover {
            color: #f8f9fa;
          }
          
          .image-nav {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 20px;
            margin-top: 15px;
            color: white;
          }
          
          .image-nav button {
            background: rgba(255,255,255,0.2);
            border: none;
            color: white;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
            cursor: pointer;
            transition: all 0.3s ease;
          }
          
          .image-nav button:hover:not(:disabled) {
            background: rgba(255,255,255,0.3);
          }
          
          .image-nav button:disabled {
            opacity: 0.3;
            cursor: not-allowed;
          }
          
          /* Continuous animations */
          [data-aos] {
            transition-property: transform, opacity;
          }
          
          @media (max-width: 992px) {
            .hero-title {
              font-size: 2.3rem;
            }
            
            .carousel-image-container {
              height: 350px;
            }
            
            .hero-image {
              height: 300px;
            }
          }
          
          @media (max-width: 768px) {
            .hero-title {
              font-size: 2rem;
            }
            
            .hero-content {
              padding-right: 0;
              margin-bottom: 30px;
            }
            
            .hero-image {
              height: 250px;
            }
            
            .carousel-image-container {
              height: 300px;
            }
            
            .thumbnail-container {
              width: 75px;
              height: 60px;
            }
            
            .section-title {
              font-size: 1.3rem;
            }
          }
          
          @media (max-width: 576px) {
            .hero-title {
              font-size: 1.8rem;
            }
            
            .hero-image {
              height: 200px;
            }
            
            .carousel-image-container {
              height: 250px;
            }
            
            .thumbnail-container {
              width: 60px;
              height: 50px;
            }
            
            .person-avatar {
              width: 45px;
              height: 45px;
              font-size: 1.1rem;
            }
            
            .section-title {
              font-size: 1.2rem;
            }
            
            .description-content {
              font-size: 1rem;
            }
          }
        `}
      </style>
    </div>
  );
};

export default EventDetails;