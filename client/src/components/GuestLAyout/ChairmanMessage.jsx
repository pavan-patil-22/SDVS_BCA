

import React, { useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import AOS from 'aos';
import 'aos/dist/aos.css';

const ChairmanMessage = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    // Initialize AOS
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: false
    });
  }, []);

  return (
    <div className="chairman-page">
      <style>{`
        .chairman-page {
          font-family: Arial, sans-serif;
          color: #333;
          background-color: #f8f9fb;
        }
        
        .chairman-hero-section {
          background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), 
                     url('bg_pic.jpeg');
          background-size: cover;
          background-position: center;
          padding: 80px 20px;
        }
        
        .chairman-hero-section h1 {
          font-size: 42px;
          margin-bottom: 20px;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
          color: #fff;
        }
        
        .chairman-hero-section p {
          font-size: 20px;
          margin-bottom: 30px;
          color: #fff;
        }
        
        .hero-divider {
          width: 100px;
          height: 4px;
          background: #f5a623;
          margin: 0 auto;
        }
        
        .section-title {
          font-size: 32px;
          color: #1f3b88;
          font-weight: bold;
          margin-bottom: 15px;
          position: relative;
          display: inline-block;
        }
        
        .section-title:after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 0;
          width: 50px;
          height: 3px;
          background: #f5a623;
        }
        
        .green-title {
          color: #1f3b88;
          font-weight: bold;
          font-size: 24px;
          margin-bottom: 20px;
        }
        
        .about-text {
          font-size: 16px;
          line-height: 1.8;
          color: #333;
          margin-bottom: 20px;
        }
        
        .chairman-photo-container {
          width: 262px;
          height: 350px;
          overflow: hidden;
          border: 5px solid #fff;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          border-radius: 12px;
        }
        
        .chairman-photo-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .chairman-name {
          font-size: 24px;
          color: #1f3b88;
          font-weight: bold;
          margin-bottom: 5px;
        }
        
        .chairman-title {
          font-size: 18px;
          color: #f5a623;
          font-weight: 600;
          margin-bottom: 5px;
        }
        
        .chairman-subtitle {
          font-size: 16px;
          color: #666;
        }
        
        .message-card {
          background: #fff;
          border-radius: 8px;
        }
        
        .message-text {
          font-size: 17px;
          line-height: 1.8;
          color: #444;
          font-style: italic;
        }
        
        .achievement-card {
          background: #fff;
          border-top: 4px solid #1f3b88;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .achievement-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
        }
        
        .green-text {
          color: #1f3b88;
        }
        
        .inspirational-quote {
          background: #fff;
          border-left: 4px solid #f5a623;
        }
        
        .quote-text {
          font-size: 20px;
          color: #1f3b88;
          line-height: 1.6;
        }
        
        @media (max-width: 768px) {
          .chairman-hero-section {
            padding: 60px 15px;
          }
          
          .chairman-hero-section h1 {
            font-size: 32px;
          }
          
          .chairman-hero-section p {
            font-size: 18px;
          }
          
          .section-title {
            font-size: 28px;
          }
          
          .chairman-photo-container {
            width: 200px;
            height: 267px;
          }
        }
      `}</style>

      {/* Hero Section */}
      <div className="chairman-hero-section text-center py-5">
        <Container>
          <div className="hero-content" data-aos="fade-down">
            <h1 className="display-4 fw-bold text-white mb-3">OUR CHAIRMAN</h1>
            <p className="lead text-white mb-4">Leadership with Vision and Commitment</p>
            <div className="hero-divider" data-aos="zoom-in" data-aos-delay="300"></div>
          </div>
        </Container>
      </div>

      <Container className="my-5">
        {/* Chairman Profile Section */}
        <Row className="mb-5">
          <Col lg={8} className="mx-auto">
            <div className="text-center mb-5" data-aos="fade-up">
              <h2 className="section-title">Message from Our Chairman</h2>
            </div>
          </Col>
        </Row>

        <Row className="mb-5 align-items-center">
          <Col md={4} className="text-center mb-4" data-aos="fade-up">
            <div className="chairman-photo-container mx-auto">
              <img 
                src="president a.b.patil.jpg" 
                alt="Shri. A.B. Patil" 
                className="img-fluid shadow"
              />
            </div>
            <div className="mt-4" data-aos="fade-up" data-aos-delay="200">
              <h3 className="chairman-name">Shri. A.B. Patil</h3>
              <p className="chairman-title">Honorable President, S.D.V.S Sangh Sankeshwar</p>
              <p className="chairman-subtitle">Ex-Minister Govt. of Karnataka</p>
            </div>
          </Col>
          
          <Col md={8} data-aos="fade-down" data-aos-delay="300">
            <Card className="message-card border-0 shadow-sm">
              <Card.Body className="p-4">
                <blockquote className="blockquote mb-0">
                  <p className="message-text">
                    "As the citizens of this large village called 'Globe' we all have doubtlessly realized that the only success mantra today is 'Quality Education'. Quality goes hand-in-hand with Excellence. An Excellent mode of education is a balanced amalgamation of both the traditional method as well as the recent E-education. This is because of the paradigm shift from local to global; a healthy process which demands from us an urgent need to adapt to the very modern teaching and learning."
                  </p>
                  <footer className="blockquote-footer mt-3">Shri Appayagouda B. Patil</footer>
                </blockquote>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Chairman Details Section */}
        <Row className="mb-5">
          <Col lg={10} className="mx-auto">
            <div data-aos="fade-up">
              <h3 className="mb-4 green-title">About Shri Appayagouda B. Patil</h3>
              <p className="about-text">
                Shri Appayagouda B. Patil, president of Shri Duradundeeshwar Vidya Samvardhak Sangh, Sankeshwar comes from a family of the pioneers of the cooperative movement in Karnataka. SVDS Sangh now has the Midas touch, since he started a new educational institute in the last 15 years as the head he has brought a spectrum of courses, previously unthinkable, and more they are all successful, what more than 18 institutions and 7000 students.
              </p>
              
              <p className="about-text">
                The cause closest to his heart is the education of the rural masses and education of the girl child. Shri. Patil has a knack for selecting the best talent and getting them to the SVDS Sangh Sankeshwar, he has left no stone unturned in scouting for lecturers and professors and he has started yet again for this new venture comes from a family of the pioneers of the cooperative movement in Karnataka.
              </p>
              
              <p className="about-text">
                He has a track that is envy of many - a humanitarian of the highest order, a perfect educationist, and a manager's manager. He was elected for the state assembly three times and has been a minister for medical education and a minister of mining and environment.
              </p>
            </div>
          </Col>
        </Row>

        

        {/* Quote Section */}
        <Row className="mb-5">
          <Col lg={8} className="mx-auto">
            <div className="inspirational-quote text-center py-5 px-4 rounded" data-aos="zoom-in">
              <i className="fas fa-quote-left fa-2x green-text mb-3"></i>
              <h4 className="quote-text fst-italic">
                "The cause closest to his heart is the education of the rural masses and education of the girl child."
              </h4>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ChairmanMessage;