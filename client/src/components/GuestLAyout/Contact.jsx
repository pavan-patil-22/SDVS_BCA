import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPaperPlane } from 'react-icons/fa';
import { BASE_API_URL } from "../../BaseAPI";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: false,
      offset: 50
    });
    
    setTimeout(() => {
      AOS.refresh();
    }, 100);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch(`${BASE_API_URL}/contact-message`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    if (res.ok) {
      alert("Message sent successfully!");
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } else {
      alert("Failed to send message.");
    }
  } catch (err) {
    console.error(err);
    alert("Error sending message.");
  }
};


  return (
    <div className="contact-page">
      {/* Hero Section */}
      <div className="contact-hero-section text-center py-5">
        <Container>
          <div className="hero-content" data-aos="fade-down">
            <h1 className="display-4 fw-bold text-white mb-3">GET IN TOUCH</h1>
            <p className="lead text-white mb-4">We're here to answer your questions and connect with you</p>
            <div className="hero-divider" data-aos="zoom-in" data-aos-delay="300"></div>
          </div>
        </Container>
      </div>

      <Container className="my-5">
        {/* Contact Information Cards */}
        <Row className="mb-5 justify-content-center">
          <Col lg={4} md={6} className="mb-4" data-aos="fade-up" data-aos-delay="100">
            <Card className="h-100 text-center contact-info-card shadow">
              <Card.Body className="p-4">
                <div className="contact-icon mb-3">
                  <FaMapMarkerAlt className="fa-2x" style={{ color: '#1f3b88' }} />
                </div>
                <h4 className="blue-title">Our Location</h4>
                <p>
                  SDVS's BCA College<br />
                  Nipani Road, Sankeshwar<br />
                  Hukkeri Taluk, Belagavi Dist<br />
                  Karnataka - 591313
                </p>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4} md={6} className="mb-4" data-aos="fade-up" data-aos-delay="200">
            <Card className="h-100 text-center contact-info-card shadow">
              <Card.Body className="p-4">
                <div className="contact-icon mb-3">
                  <FaPhone className="fa-2x" style={{ color: '#1f3b88' }} />
                </div>
                <h4 className="blue-title">Call Us</h4>
                <p>
                  Office: +91-9448636015<br />
                  Principal: +91-9448636015<br />
                  HOD: +91-8147947926
                </p>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4} md={6} className="mb-4" data-aos="fade-up" data-aos-delay="300">
            <Card className="h-100 text-center contact-info-card shadow">
              <Card.Body className="p-4">
                <div className="contact-icon mb-3">
                  <FaEnvelope className="fa-2x" style={{ color: '#1f3b88' }} />
                </div>
                <h4 className="blue-title">Email Us</h4>
                <p>
                 Office: sdvsbca2007@gmail.com <br />
                  Principal: bihebbali@gmail.com <br />
                  HOD: ranjanamagadum21166@gmail.com
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Main Content Section */}
        <Row className="mb-5">
          <Col lg={6} className="mb-4" data-aos="fade-down">
            <div className="p-4 rounded contact-form-container shadow-sm">
              <h3 className="mb-4 blue-title">Send Us a Message</h3>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Group>
                      <Form.Label>Full Name *</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Your Name"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Group>
                      <Form.Label>Email Address *</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Your Email"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Group>
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Your Phone"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Group>
                      <Form.Label>Subject *</Form.Label>
                      <Form.Control
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        placeholder="Subject"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-4">
                  <Form.Label>Message *</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Your Message"
                  />
                </Form.Group>
                <Button 
                  type="submit" 
                  className="btn-blue btn-lg w-100 py-3"
                >
                  <FaPaperPlane className="me-2" />
                  Send Message
                </Button>
              </Form>
            </div>
          </Col>

          <Col lg={6} className="mb-4" data-aos="fade-up" data-aos-delay="200">
            <div className="p-4 rounded map-container shadow-sm h-100">
              <h3 className="mb-4 blue-title">Find Us Here</h3>
              <div className="map-wrapper rounded overflow-hidden">
                <iframe
                  title="SDVS BCA College Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3830.1421261657247!2d74.47223387514009!3d16.264484684443655!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc093dbb5f68e67%3A0x2b780f78707ce045!2zU0RWUyBTYW5naCdzIEJDQSBDb2xsZWdlIOCyjuCyuOCzjS7gsqHgsr8u4LK14LON4LK54LK_LuCyjuCyuOCzjSDgsqzgsr8u4LK44LK_LuCyjiDgspXgsr7gsrLgs4fgspzgs4E!5e0!3m2!1sen!2sin!4v1757746097128!5m2!1sen!2sin"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              
              <div className="office-hours mt-4">
                <h5 className="d-flex align-items-center blue-title">
                  <FaClock className="me-2" />
                  Office Hours
                </h5>
                <Row>
                  <Col sm={6}>
                    <p className="mb-1"><strong>Admin Office:</strong></p>
                    <p className="mb-2">Mon-Fri: 9:00 AM - 5:00 PM</p>
                    <p>Sat: 9:00 AM - 1:00 PM</p>
                  </Col>
                  <Col sm={6}>
                    <p className="mb-1"><strong>Admission Office:</strong></p>
                    <p>Mon-Sat: 10:00 AM - 4:00 PM</p>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>

        {/* Social Media Section */}
        <Row className="mb-5">
          <Col lg={8} className="mx-auto">
            <div className="text-center py-4 px-3 rounded social-section" data-aos="zoom-in">
              <h3 className="mb-4 blue-title">Connect With Us</h3>
              <p className="mb-4">Follow our social media channels to stay updated with the latest news and events</p>
              <div className="social-icons d-flex justify-content-center">
               
                <a href="https://instagram.com/sdvss_bca_sankeshwar" className="social-link mx-3">
                  <FaInstagram className="fa-2x" style={{ color: '#1f3b88' }} />
                </a>
                
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      <style>{`
        .contact-page {
          min-height: 100vh;
          background-color: #f8f9fb;
        }
        
        .contact-hero-section {
          background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), 
                     url('bg_pic.jpeg');
          background-size: cover;
          background-position: center;
          padding: 80px 0;
          position: relative;
          overflow: hidden;
        }
        
        .hero-content {
          position: relative;
          padding: 60px 0;
          z-index: 2;
        }
        
        .hero-divider {
          width: 100px;
          height: 4px;
          background: #f5a623;
          margin: 0 auto;
          border-radius: 2px;
        }
        
        .blue-title {
          color: #1f3b88;
          position: relative;
          padding-bottom: 10px;
          display: inline-block;
          font-weight: bold;
        }
        
        .blue-title::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 50px;
          height: 3px;
          background: #f5a623;
          border-radius: 3px;
        }
        
        .contact-info-card {
          transition: all 0.3s ease;
          border: none;
          border-radius: 12px;
          background: #fff;
        }
        
        .contact-info-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 25px rgba(0, 0, 0, 0.15) !important;
        }
        
        .contact-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 70px;
          height: 70px;
          background: rgba(31, 59, 136, 0.1);
          border-radius: 50%;
          margin-bottom: 20px;
        }
        
        .contact-form-container {
          background: white;
          height: 100%;
          border-radius: 12px;
        }
        
        .map-container {
          background: white;
          border-radius: 12px;
        }
        
        .btn-blue {
          background: #1f3b88;
          border: none;
          color: white;
          font-weight: 600;
          transition: all 0.3s ease;
          border-radius: 8px;
        }
        
        .btn-blue:hover {
          background: #172b69;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          color: white;
        }
        
        .social-section {
          background: #fff;
          border-left: 4px solid #1f3b88;
        }
        
        .social-link {
          color: #1f3b88;
          transition: all 0.3s ease;
        }
        
        .social-link:hover {
          color: #f5a623;
          transform: translateY(-5px);
        }
        
        .form-control {
          border: 1px solid #dee2e6;
          padding: 12px 15px;
          border-radius: 8px;
          transition: all 0.3s ease;
        }
        
        .form-control:focus {
          border-color: #1f3b88;
          box-shadow: 0 0 0 0.2rem rgba(31, 59, 136, 0.25);
        }
        
        .form-label {
          font-weight: 500;
          color: #495057;
          margin-bottom: 8px;
        }
        
        .map-wrapper {
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
        }
        
        /* Responsive styles */
        @media (max-width: 768px) {
          .contact-hero-section {
            padding: 60px 0;
          }
          
          .contact-hero-section h1 {
            font-size: 2.2rem;
          }
          
          .contact-hero-section p {
            font-size: 1rem;
          }
          
          .contact-icon {
            width: 60px;
            height: 60px;
          }
        }
        
        @media (max-width: 576px) {
          .contact-hero-section h1 {
            font-size: 1.8rem;
          }
          
          .social-icons {
            flex-wrap: wrap;
          }
          
          .social-link {
            margin: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default Contact;