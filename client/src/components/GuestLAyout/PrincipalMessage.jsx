import React, { useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import AOS from 'aos';
import 'aos/dist/aos.css';

const PrincipalMessage = () => {
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

  // Simplified qualification line
  const qualificationLine = "M.Sc (CS), M.Sc (Maths), M.Phil (CS), B.Ed (Ph.D)";

  return (
    <div className="principal-page">
      <style>{`
        .principal-page {
          font-family: Arial, sans-serif;
          color: #333;
          background-color: #f8f9fb;
        }
        
        .principal-hero-section {
          background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), 
                     url('bg_pic.jpeg');
          background-size: cover;
          background-position: center;
          padding: 80px 20px;
        }
        
        .principal-hero-section h1 {
          font-size: 42px;
          margin-bottom: 20px;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
          color: #fff;
        }
        
        .principal-hero-section p {
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
        
        /* Updated 16:9 Image Container */
        .principal-image-container {
          width: 100%;
          overflow: hidden;
          border-radius: 12px;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
          position: relative;
          aspect-ratio: 16/9;
          margin-bottom: 15px;
        }
        
        .principal-image-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        
        .principal-image-container:hover img {
          transform: scale(1.05);
        }
        
        .principal-name {
          font-size: 26px;
          color: #1f3b88;
          font-weight: bold;
          margin-bottom: 8px;
          margin-top: 5px;
        }
        
        .principal-title {
          font-size: 18px;
          color: #f5a623;
          font-weight: 600;
          margin-bottom: 8px;
        }
        
        .principal-subtitle {
          font-size: 16px;
          color: #666;
          margin-bottom: 15px;
          padding-bottom: 15px;
          border-bottom: 2px solid #eee;
        }
        
        /* Simple Qualification Line */
        .qualification-line {
          font-size: 15px;
          color: #444;
          line-height: 1.5;
          padding: 8px 12px;
          background: #f8f9fa;
          border-radius: 6px;
          border-left: 3px solid #1f3b88;
          margin-top: 15px;
          margin-bottom: 15px;
          text-align: center;
        }
        
        /* Experience Badge */
        .experience-badge {
          display: inline-block;
          background: #1f3b88;
          color: white;
          padding: 6px 16px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 600;
          margin-top: 10px;
        }
        
        .message-card {
          background: #fff;
          border-radius: 8px;
          border-top: 5px solid #1f3b88;
          margin-bottom: 300px;
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
          height: 100%;
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
        
        .vision-list {
          list-style-type: none;
          padding-left: 0;
        }
        
        .vision-list li {
          padding: 10px 15px;
          margin-bottom: 10px;
          background-color: #f8f9fa;
          border-left: 3px solid #1f3b88;
          border-radius: 4px;
          transition: all 0.3s ease;
        }
        
        .vision-list li:hover {
          background-color: #e9ecef;
          transform: translateX(5px);
        }
        
        /* Responsive Styles */
        @media (max-width: 992px) {
          .principal-image-container {
            max-width: 500px;
            margin-left: auto;
            margin-right: auto;
          }
        }
        
        @media (max-width: 768px) {
          .principal-hero-section {
            padding: 60px 15px;
          }
          
          .principal-hero-section h1 {
            font-size: 32px;
          }
          
          .principal-hero-section p {
            font-size: 18px;
          }
          
          .section-title {
            font-size: 28px;
          }
          
          .principal-name {
            font-size: 24px;
            text-align: center;
          }
          
          .principal-title {
            font-size: 17px;
            text-align: center;
          }
          
          .principal-subtitle {
            text-align: center;
          }
          
          .principal-image-container {
            aspect-ratio: 16/9;
            max-width: 450px;
          }
          
          .qualification-line {
            font-size: 14px;
            text-align: center;
          }
          
          .message-text {
            font-size: 16px;
          }
          
          .quote-text {
            font-size: 18px;
          }
          
          .experience-badge {
            display: block;
            margin: 10px auto 0;
            width: fit-content;
          }
          
          .message-card {
            margin-bottom: 0;
          }
        }
        
        @media (max-width: 576px) {
          .principal-hero-section h1 {
            font-size: 28px;
          }
          
          .principal-hero-section p {
            font-size: 16px;
          }
          
          .section-title {
            font-size: 26px;
          }
          
          .principal-image-container {
            aspect-ratio: 16/9;
            max-width: 100%;
          }
          
          .principal-name {
            font-size: 22px;
          }
          
          .principal-title {
            font-size: 16px;
          }
          
          .qualification-line {
            font-size: 13px;
            padding: 6px 10px;
          }
          
          .achievement-card h4 {
            font-size: 20px;
          }
        }
        
        @media (max-width: 480px) {
          .principal-hero-section {
            padding: 50px 15px;
          }
          
          .principal-hero-section h1 {
            font-size: 26px;
          }
          
          .section-title {
            font-size: 24px;
          }
          
          .green-title {
            font-size: 22px;
          }
          
          .message-text {
            font-size: 15px;
          }
          
          .quote-text {
            font-size: 17px;
          }
          
          .qualification-line {
            font-size: 12px;
            line-height: 1.4;
          }
        }
      `}</style>

      {/* Hero Section */}
      <div className="principal-hero-section text-center py-5">
        <Container>
          <div className="hero-content" data-aos="fade-down">
            <h1 className="display-4 fw-bold text-white mb-3">OUR PRINCIPAL</h1>
            <p className="lead text-white mb-4">Leadership in Education Excellence</p>
            <div className="hero-divider" data-aos="zoom-in" data-aos-delay="300"></div>
          </div>
        </Container>
      </div>

      <Container className="my-5">
        {/* Principal Profile Section */}
        <Row className="mb-5">
          <Col lg={8} className="mx-auto">
            <div className="text-center mb-5" data-aos="fade-up">
              <h2 className="section-title">Message from Our Principal</h2>
            </div>
          </Col>
        </Row>

        <Row className="mb-5 align-items-center">
          <Col md={6} className="text-center mb-4" data-aos="fade-down">
            {/* 16:9 Aspect Ratio Image */}
            <div className="principal-image-container mx-auto">
              <img 
                src="Principal.JPG" 
                alt="Prof. B I Hebbali" 
                className="img-fluid"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "Principal.jpg";
                }}
              />
            </div>
            
            <div className="mt-3" data-aos="fade-up" data-aos-delay="200">
              <h3 className="principal-name">Prof. B I Hebbali</h3>
              <p className="principal-title">Principal</p>
              <p className="principal-subtitle">SDVS'S BCA College, Sankeshwar</p>
              
              {/* Simple Qualification Line */}
              <div className="qualification-line" data-aos="fade-up" data-aos-delay="300">
                <strong>Qualifications:</strong> {qualificationLine}
              </div>
              
              {/* Experience Badge */}
              <div className="experience-badge" data-aos="fade-up" data-aos-delay="400">
                Experience: 18+ Years
              </div>
            </div>
          </Col>
          
          <Col md={6}  data-aos-delay="400">
            <Card className="message-card border-0 shadow-sm">
              <Card.Body className="p-4">
                <blockquote className="blockquote mb-0">
                  <p className="message-text">
                    "Education is not just about acquiring knowledge; it is about shaping character, building perspectives, and creating responsible citizens who will lead our society towards progress. At our institution, we strive to provide holistic education that balances academic excellence with moral values and social responsibility."
                  </p>
                  <footer className="blockquote-footer mt-3">Prof. B I Hebbali</footer>
                </blockquote>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Principal Details Section */}
        <Row className="mb-5">
          <Col lg={10} className="mx-auto">
            <div data-aos="fade-up">
              <h3 className="mb-4 green-title">About Prof. B I Hebbali</h3>
              <p className="about-text">
                With over 18 years of experience in the field of education, Prof. B I Hebbali has been instrumental in shaping the academic landscape of our institution. His visionary leadership and commitment to excellence have propelled our college to new heights of achievement and recognition.
              </p>
              
              <p className="about-text">
                Under his guidance, our institution has developed innovative teaching methodologies, enhanced infrastructure, and fostered an environment conducive to learning and research. His emphasis on both academic rigor and extracurricular activities ensures that students receive a well-rounded education.
              </p>
              
              <p className="about-text">
                Prof. Hebbali holds multiple postgraduate degrees and is currently pursuing his Ph.D. He has contributed significantly to educational research, with several publications in renowned journals. His dedication to creating an inclusive learning environment where every student can thrive is evident in the policies and practices he has implemented.
              </p>
            </div>
          </Col>
        </Row>

        {/* Vision Section */}
        <Row className="mb-5">
          <Col lg={10} className="mx-auto">
            <div data-aos="fade-up">
              <h3 className="mb-4 green-title">Educational Philosophy</h3>
              <p className="about-text">
                Prof. Hebbali believes that education should empower students to think critically, act ethically, and contribute meaningfully to society. His approach combines traditional values with modern pedagogical techniques to prepare students for the challenges of the 21st century.
              </p>
              
              <p className="about-text">
                He emphasizes the importance of:
              </p>
              
              <ul className="vision-list">
                <li data-aos="fade-up" data-aos-delay="100">Innovative teaching methods that engage students actively in the learning process</li>
                <li data-aos="fade-down" data-aos-delay="200">Character building and value-based education</li>
                <li data-aos="fade-up" data-aos-delay="300">Research-oriented approach to foster curiosity and innovation</li>
                <li data-aos="fade-down" data-aos-delay="400">Inclusive education that celebrates diversity</li>
                <li data-aos="fade-up" data-aos-delay="500">Community engagement and social responsibility</li>
              </ul>
            </div>
          </Col>
        </Row>


        {/* Quote Section */}
        <Row className="mb-5">
          <Col lg={8} className="mx-auto">
            <div className="inspirational-quote text-center py-5 px-4 rounded" data-aos="zoom-in">
              <i className="fas fa-quote-left fa-2x green-text mb-3"></i>
              <h4 className="quote-text fst-italic">
                "The goal of education is not to increase the amount of knowledge but to create the possibilities for a child to invent and discover, to create men who are capable of doing new things."
              </h4>
              <p className="quote-author mt-3">- Prof. B I Hebbali</p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PrincipalMessage;