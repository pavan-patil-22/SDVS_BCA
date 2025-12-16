// import React, { useEffect } from "react";
// import { Container, Row, Col, Card } from "react-bootstrap";
// import AOS from 'aos';
// import 'aos/dist/aos.css';

// const PrincipalMessage = () => {
//   useEffect(() => {
//     window.scrollTo({
//       top: 0,
//       left: 0,
//       behavior: "smooth",
//     });
//     // Initialize AOS
//     AOS.init({
//       duration: 800,
//       easing: 'ease-in-out',
//       once: false
//     });
//   }, []);

//   return (
//     <div className="principal-page">
//       {/* Hero Section */}
//       <div className="principal-hero-section text-center py-5">
//         <Container>
//           <div className="hero-content" data-aos="fade-down">
//             <h1 className="display-4 fw-bold text-white mb-3">PRINCIPAL'S MESSAGE</h1>
//             <p className="lead text-white mb-4">Leadership in Education Excellence</p>
//             <div className="hero-divider" data-aos="zoom-in" data-aos-delay="300"></div>
//           </div>
//         </Container>
//       </div>

//       <Container className="my-5">
//         {/* Principal Profile Section */}
//         <Row className="mb-5">
//           <Col lg={8} className="mx-auto">
//             <div className="text-center mb-5" data-aos="fade-up">
//               <h2 className="section-title">Message from Our Principal</h2>
//             </div>
//           </Col>
//         </Row>

//         <Row className="mb-5 align-items-center">
//           <Col md={4} className="text-center mb-4" data-aos="fade-right">
//             <div className="principal-photo-container mx-auto">
//               <img 
//                 src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" 
//                 alt="B I Hebbali" 
//                 className="img-fluid rounded-circle shadow"
//               />
//             </div>
//             <div className="mt-4" data-aos="fade-up" data-aos-delay="200">
//               <h3 className="principal-name">B I Hebbali</h3>
//               <p className="principal-title">Principal</p>
//               <p className="principal-subtitle">SDVS'S BCA College Sankeshwar</p>
//             </div>
//           </Col>
          
//           <Col md={8} data-aos="fade-left" data-aos-delay="300">
//             <Card className="message-card border-0 shadow-sm">
//               <Card.Body className="p-4">
//                 <blockquote className="blockquote mb-0">
//                   <p className="message-text">
//                     "Education is not just about acquiring knowledge; it is about shaping character, building perspectives, and creating responsible citizens who will lead our society towards progress. At our institution, we strive to provide holistic education that balances academic excellence with moral values and social responsibility."
//                   </p>
//                   <footer className="blockquote-footer mt-3">B I Hebbali</footer>
//                 </blockquote>
//               </Card.Body>
//             </Card>
//           </Col>
//         </Row>

//         {/* Principal Details Section */}
//         <Row className="mb-5">
//           <Col lg={10} className="mx-auto">
//             <div data-aos="fade-up">
//               <h3 className="mb-4 green-title">About B I Hebbali</h3>
//               <p className="about-text">
//                 With over two decades of experience in the field of education, B I Hebbali has been instrumental in shaping the academic landscape of our institution. His visionary leadership and commitment to excellence have propelled our college to new heights of achievement and recognition.
//               </p>
              
//               <p className="about-text">
//                 Under his guidance, our institution has developed innovative teaching methodologies, enhanced infrastructure, and fostered an environment conducive to learning and research. His emphasis on both academic rigor and extracurricular activities ensures that students receive a well-rounded education.
//               </p>
              
//               <p className="about-text">
//                 B I Hebbali holds a Master's degree in Education and has contributed significantly to educational research, with several publications in renowned journals. His dedication to creating an inclusive learning environment where every student can thrive is evident in the policies and practices he has implemented.
//               </p>
//             </div>
//           </Col>
//         </Row>

//         {/* Vision Section */}
//         <Row className="mb-5">
//           <Col lg={10} className="mx-auto">
//             <div data-aos="fade-up">
//               <h3 className="mb-4 green-title">Educational Philosophy</h3>
//               <p className="about-text">
//                 B I Hebbali believes that education should empower students to think critically, act ethically, and contribute meaningfully to society. His approach combines traditional values with modern pedagogical techniques to prepare students for the challenges of the 21st century.
//               </p>
              
//               <p className="about-text">
//                 He emphasizes the importance of:
//               </p>
              
//               <ul className="vision-list">
//                 <li data-aos="fade-right" data-aos-delay="100">Innovative teaching methods that engage students actively in the learning process</li>
//                 <li data-aos="fade-right" data-aos-delay="200">Character building and value-based education</li>
//                 <li data-aos="fade-right" data-aos-delay="300">Research-oriented approach to foster curiosity and innovation</li>
//                 <li data-aos="fade-right" data-aos-delay="400">Inclusive education that celebrates diversity</li>
//                 <li data-aos="fade-right" data-aos-delay="500">Community engagement and social responsibility</li>
//               </ul>
//             </div>
//           </Col>
//         </Row>

//         {/* Achievements Section */}
//         <Row className="text-center mb-5" data-aos="fade-up">
//           <Col md={3} sm={6} className="mb-4">
//             <div className="achievement-card p-4 rounded shadow-sm">
//               <div className="achievement-icon mb-3">
//                 <i className="fas fa-chalkboard-teacher fa-2x green-text"></i>
//               </div>
//               <h4 className="fw-bold">20+</h4>
//               <p className="mb-0">Years Experience</p>
//             </div>
//           </Col>
//           <Col md={3} sm={6} className="mb-4">
//             <div className="achievement-card p-4 rounded shadow-sm">
//               <div className="achievement-icon mb-3">
//                 <i className="fas fa-book-open fa-2x green-text"></i>
//               </div>
//               <h4 className="fw-bold">15+</h4>
//               <p className="mb-0">Research Papers</p>
//             </div>
//           </Col>
//           <Col md={3} sm={6} className="mb-4">
//             <div className="achievement-card p-4 rounded shadow-sm">
//               <div className="achievement-icon mb-3">
//                 <i className="fas fa-trophy fa-2x green-text"></i>
//               </div>
//               <h4 className="fw-bold">10+</h4>
//               <p className="mb-0">Awards Received</p>
//             </div>
//           </Col>
//           <Col md={3} sm={6} className="mb-4">
//             <div className="achievement-card p-4 rounded shadow-sm">
//               <div className="achievement-icon mb-3">
//                 <i className="fas fa-users fa-2x green-text"></i>
//               </div>
//               <h4 className="fw-bold">5000+</h4>
//               <p className="mb-0">Students Mentored</p>
//             </div>
//           </Col>
//         </Row>

//         {/* Quote Section */}
//         <Row className="mb-5">
//           <Col lg={8} className="mx-auto">
//             <div className="inspirational-quote text-center py-5 px-4 rounded" data-aos="zoom-in">
//               <i className="fas fa-quote-left fa-2x green-text mb-3"></i>
//               <h4 className="quote-text fst-italic">
//                 "The goal of education is not to increase the amount of knowledge but to create the possibilities for a child to invent and discover, to create men who are capable of doing new things."
//               </h4>
//               <p className="quote-author mt-3">- B I Hebbali</p>
//             </div>
//           </Col>
//         </Row>
//       </Container>

//       <style>{`
//         .principal-page {
//           min-height: 100vh;
//           background: #f8f9fa;
//         }
        
//         .principal-hero-section {
//           background: linear-gradient(135deg, #1cc88a 0%, #17a673 100%);
//           padding: 80px 0;
//           position: relative;
//           overflow: hidden;
//         }
        
//         .principal-hero-section::before {
//           content: '';
//           position: absolute;
//           top: 0;
//           left: 0;
//           right: 0;
//           bottom: 0;
//           background: url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80') center center/cover no-repeat;
//           opacity: 0.1;
//         }
        
//         .hero-content {
//           position: relative;
//           padding: 60px 0;
//           z-index: 2;
//         }
        
//         .hero-divider {
//           width: 100px;
//           height: 4px;
//           background: rgba(255, 255, 255, 0.7);
//           margin: 0 auto;
//           border-radius: 2px;
//         }
        
//         .section-title {
//           position: relative;
//           padding-bottom: 15px;
//           color: #2e3a59;
//         }
        
//         .section-title::after {
//           content: '';
//           position: absolute;
//           bottom: 0;
//           left: 50%;
//           transform: translateX(-50%);
//           width: 60px;
//           height: 3px;
//           background: linear-gradient(135deg, #1cc88a 0%, #17a673 100%);
//           border-radius: 3px;
//         }
        
//         .green-title {
//           color: #17a673;
//           position: relative;
//           padding-bottom: 10px;
//         }
        
//         .green-title::after {
//           content: '';
//           position: absolute;
//           bottom: 0;
//           left: 0;
//           width: 50px;
//           height: 3px;
//           background: linear-gradient(135deg, #1cc88a 0%, #17a673 100%);
//           border-radius: 3px;
//         }
        
//         .principal-photo-container {
//           width: 250px;
//           height: 250px;
//           overflow: hidden;
//           border-radius: 50%;
//           border: 5px solid #fff;
//           box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
//         }
        
//         .principal-name {
//           color: #2e3a59;
//           font-weight: bold;
//           margin-bottom: 0.5rem;
//         }
        
//         .principal-title {
//           color: #17a673;
//           font-weight: 500;
//           margin-bottom: 0.3rem;
//         }
        
//         .principal-subtitle {
//           color: #6c757d;
//         }
        
//         .message-card {
//           border-left: 4px solid #17a673 !important;
//           border-radius: 12px;
//         }
        
//         .message-text {
//           font-size: 1.1rem;
//           line-height: 1.8;
//           color: #555;
//           font-style: italic;
//         }
        
//         .about-text {
//           font-size: 1.1rem;
//           line-height: 1.8;
//           color: #555;
//           margin-bottom: 1.5rem;
//         }
        
//         .vision-list {
//           list-style-type: none;
//           padding-left: 0;
//         }
        
//         .vision-list li {
//           padding: 10px 15px;
//           margin-bottom: 10px;
//           background-color: #f8f9fa;
//           border-left: 3px solid #17a673;
//           border-radius: 4px;
//           transition: all 0.3s ease;
//         }
        
//         .vision-list li:hover {
//           background-color: #e9f7ef;
//           transform: translateX(5px);
//         }
        
//         .achievement-card {
//           background: white;
//           transition: all 0.3s ease;
//           border-bottom: 3px solid transparent;
//         }
        
//         .achievement-card:hover {
//           transform: translateY(-8px);
//           box-shadow: 0 12px 25px rgba(0, 0, 0, 0.1);
//           background: linear-gradient(135deg, #1cc88a 0%, #17a673 100%);
//           color: white;
//           border-bottom: 3px solid #0f5e43;
//         }
        
//         .achievement-card:hover .green-text {
//           color: white !important;
//         }
        
//         .green-text {
//           color: #17a673;
//         }
        
//         .inspirational-quote {
//           background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
//           border-top: 4px solid #17a673;
//         }
        
//         .quote-text {
//           font-size: 1.2rem;
//           line-height: 1.8;
//           color: #2e3a59;
//         }
        
//         .quote-author {
//           color: #17a673;
//           font-weight: 500;
//         }
        
//         /* Responsive styles */
//         @media (max-width: 768px) {
//           .principal-hero-section {
//             padding: 60px 0;
//           }
          
//           .principal-hero-section h1 {
//             font-size: 2.2rem;
//           }
          
//           .principal-hero-section p {
//             font-size: 1rem;
//           }
          
//           .principal-photo-container {
//             width: 200px;
//             height: 200px;
//           }
//         }
        
//         @media (max-width: 576px) {
//           .principal-hero-section h1 {
//             font-size: 1.8rem;
//           }
          
//           .section-title {
//             font-size: 1.8rem;
//           }
          
//           .about-text, .message-text {
//             font-size: 1rem;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default PrincipalMessage;

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
                     url('https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg');
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
        
        .principal-photo-container {
          width: 250px;
          height: 250px;
          overflow: hidden;
          border-radius: 50%;
          border: 5px solid #fff;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }
        
        .principal-photo-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .principal-name {
          font-size: 24px;
          color: #1f3b88;
          font-weight: bold;
          margin-bottom: 5px;
        }
        
        .principal-title {
          font-size: 18px;
          color: #f5a623;
          font-weight: 600;
          margin-bottom: 5px;
        }
        
        .principal-subtitle {
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
          
          .principal-photo-container {
            width: 200px;
            height: 200px;
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
          <Col md={4} className="text-center mb-4" data-aos="fade-down">
            <div className="principal-photo-container mx-auto">
              <img 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" 
                alt="Dr. B I Hebbali" 
                className="img-fluid rounded-circle shadow"
              />
            </div>
            <div className="mt-4" data-aos="fade-up" data-aos-delay="200">
              <h3 className="principal-name">Dr. B I Hebbali</h3>
              <p className="principal-title">Principal</p>
              <p className="principal-subtitle">SDVS'S BCA College Sankeshwar</p>
            </div>
          </Col>
          
          <Col md={8} data-aos="fade-up" data-aos-delay="300">
            <Card className="message-card border-0 shadow-sm">
              <Card.Body className="p-4">
                <blockquote className="blockquote mb-0">
                  <p className="message-text">
                    "Education is not just about acquiring knowledge; it is about shaping character, building perspectives, and creating responsible citizens who will lead our society towards progress. At our institution, we strive to provide holistic education that balances academic excellence with moral values and social responsibility."
                  </p>
                  <footer className="blockquote-footer mt-3">Dr. B I Hebbali</footer>
                </blockquote>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Principal Details Section */}
        <Row className="mb-5">
          <Col lg={10} className="mx-auto">
            <div data-aos="fade-up">
              <h3 className="mb-4 green-title">About Dr. B I Hebbali</h3>
              <p className="about-text">
                With over two decades of experience in the field of education, Dr. B I Hebbali has been instrumental in shaping the academic landscape of our institution. His visionary leadership and commitment to excellence have propelled our college to new heights of achievement and recognition.
              </p>
              
              <p className="about-text">
                Under his guidance, our institution has developed innovative teaching methodologies, enhanced infrastructure, and fostered an environment conducive to learning and research. His emphasis on both academic rigor and extracurricular activities ensures that students receive a well-rounded education.
              </p>
              
              <p className="about-text">
                Dr. Hebbali holds a Ph.D. in Education and has contributed significantly to educational research, with several publications in renowned journals. His dedication to creating an inclusive learning environment where every student can thrive is evident in the policies and practices he has implemented.
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
                Dr. Hebbali believes that education should empower students to think critically, act ethically, and contribute meaningfully to society. His approach combines traditional values with modern pedagogical techniques to prepare students for the challenges of the 21st century.
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

        {/* Achievements Section */}
        <Row className="text-center mb-5" data-aos="fade-up">
          <Col md={3} sm={6} className="mb-4">
            <div className="achievement-card p-4 rounded shadow-sm">
              <div className="achievement-icon mb-3">
                <i className="fas fa-chalkboard-teacher fa-2x green-text"></i>
              </div>
              <h4 className="fw-bold">20+</h4>
              <p className="mb-0">Years Experience</p>
            </div>
          </Col>
          <Col md={3} sm={6} className="mb-4">
            <div className="achievement-card p-4 rounded shadow-sm">
              <div className="achievement-icon mb-3">
                <i className="fas fa-book-open fa-2x green-text"></i>
              </div>
              <h4 className="fw-bold">15+</h4>
              <p className="mb-0">Research Papers</p>
            </div>
          </Col>
          <Col md={3} sm={6} className="mb-4">
            <div className="achievement-card p-4 rounded shadow-sm">
              <div className="achievement-icon mb-3">
                <i className="fas fa-trophy fa-2x green-text"></i>
              </div>
              <h4 className="fw-bold">10+</h4>
              <p className="mb-0">Awards Received</p>
            </div>
          </Col>
          <Col md={3} sm={6} className="mb-4">
            <div className="achievement-card p-4 rounded shadow-sm">
              <div className="achievement-icon mb-3">
                <i className="fas fa-users fa-2x green-text"></i>
              </div>
              <h4 className="fw-bold">5000+</h4>
              <p className="mb-0">Students Mentored</p>
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
              <p className="quote-author mt-3">- Dr. B I Hebbali</p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PrincipalMessage;