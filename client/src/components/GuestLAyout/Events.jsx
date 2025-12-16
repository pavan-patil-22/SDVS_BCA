// import React, { useEffect, useState } from "react";
// import { Container, Row, Col, Card } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { BASE_API_URL, Img_BASE_URL } from "../../BaseAPI";
// import AOS from 'aos';
// import 'aos/dist/aos.css';

// const Events = () => {
//   const [events, setEvents] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Initialize AOS
//     AOS.init({
//       duration: 800,
//       easing: 'ease-in-out',
//       once: false
//     });
    
//     const fetchEvents = async () => {
//       try {
//         const res = await axios.get(`${BASE_API_URL}/events`);
//         setEvents(res.data);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchEvents();
//   }, []);

//   return (
//     <div className="events-page">
//       {/* Hero Section with Slogan */}
//       <div className="events-hero-section text-center py-5">
//         <Container>
//           <div className="hero-content" data-aos="fade-down">
//             <h1 className="display-4 fw-bold text-white mb-3">Experience Memorable Moments</h1>
//             <p className="lead text-white mb-4">Join us for exciting events that bring our community together</p>
//             <div className="hero-divider" data-aos="zoom-in" data-aos-delay="300"></div>
//           </div>
//         </Container>
//       </div>

//       <Container className="my-5">
//         <h2 className="text-center mb-5 section-title" data-aos="fade-up">Our Events</h2>
//         <Row>
//           {events.map((event, index) => (
//             <Col lg={4} md={6} key={event._id} className="mb-4">
//               <Card
//                 className="h-100 shadow-sm event-card"
//                 style={{ cursor: "pointer" }}
//                 onClick={() => navigate(`/events/${event._id}`)}
//                 data-aos="fade-up"
//                 data-aos-delay={index * 100}
//               >
//                 {event.coverImage && (
//                   <div className="card-image-container">
//                     <Card.Img
//                       variant="top"
//                       src={`${Img_BASE_URL}${event.coverImage}`}
//                       className="event-card-img"
//                     />
//                     <div className="card-overlay"></div>
//                   </div>
//                 )}
//                 <Card.Body className="text-center d-flex flex-column">
//                   <Card.Title className="fw-bold event-name mt-auto">{event.eventName}</Card.Title>
//                 </Card.Body>
//               </Card>
//             </Col>
//           ))}
//         </Row>
        
//         {events.length === 0 && (
//           <div className="text-center py-5" data-aos="fade-up">
//             <div className="no-events-placeholder">
//               <i className="fas fa-calendar-alt fa-4x mb-3 text-muted"></i>
//               <h4 className="text-muted">No events scheduled yet</h4>
//               <p>Check back later for upcoming events!</p>
//             </div>
//           </div>
//         )}
//       </Container>

//       <style>{`
//         .events-page {
//           min-height: 100vh;
//           background: #f8f9fa;
//         }
        
//         .events-hero-section {
//           background: linear-gradient(135deg, #1cc88a 0%, #17a673 100%);
//           padding: 80px 0;
//           position: relative;
//           overflow: hidden;
//         }
        
//         .events-hero-section::before {
//           content: '';
//           position: absolute;
//           top: 0;
//           left: 0;
//           right: 0;
//           bottom: 0;
//           background-size: cover;
//           background-position: center bottom;
//         }
        
//         .hero-content {
//           position: relative;
//           padding: 90px;
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
        
//         .event-card {
//           border: none;
//           border-radius: 12px;
//           overflow: hidden;
//           transition: all 0.3s ease;
//         }
        
//         .event-card:hover {
//           transform: translateY(-8px);
//           box-shadow: 0 12px 25px rgba(0, 0, 0, 0.1);
//         }
        
//         .card-image-container {
//           position: relative;
//           height: 220px;
//           overflow: hidden;
//         }
        
//         .event-card-img {
//           height: 100%;
//           object-fit: cover;
//           transition: transform 0.5s ease;
//         }
        
//         .event-card:hover .event-card-img {
//           transform: scale(1.05);
//         }
        
//         .card-overlay {
//           position: absolute;
//           top: 0;
//           left: 0;
//           right: 0;
//           bottom: 0;
//           background: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.25) 100%);
//           opacity: 0;
//           transition: opacity 0.3s ease;
//         }
        
//         .event-card:hover .card-overlay {
//           opacity: 1;
//         }
        
//         .event-name {
//           color: #2e3a59;
//           font-size: 1.2rem;
//         }
        
//         .no-events-placeholder {
//           padding: 40px 20px;
//           background: white;
//           border-radius: 12px;
//           box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
//         }
        
//         /* Responsive styles */
//         @media (max-width: 768px) {
//           .events-hero-section {
//             padding: 60px 0;
//           }
          
//           .events-hero-section h1 {
//             font-size: 2.2rem;
//           }
          
//           .events-hero-section p {
//             font-size: 1rem;
//           }
          
//           .card-image-container {
//             height: 200px;
//           }
//         }
        
//         @media (max-width: 576px) {
//           .events-hero-section h1 {
//             font-size: 1.8rem;
//           }
          
//           .section-title {
//             font-size: 1.8rem;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Events;


import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_API_URL, Img_BASE_URL } from "../../BaseAPI";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Events = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: false
    });
    
    const fetchEvents = async () => {
      try {
        const res = await axios.get(`${BASE_API_URL}/events`);
        setEvents(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="events-page">
      <style>{`
        .events-page {
          font-family: Arial, sans-serif;
          color: #333;
          background-color: #f8f9fb;
        }
        
        .events-hero-section {
          background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), 
                     url('https://images.pexels.com/photos/2263435/pexels-photo-2263435.jpeg');
          background-size: cover;
          background-position: center;
          padding: 80px 20px;
        }
        
        .events-hero-section h1 {
          font-size: 42px;
          margin-bottom: 20px;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
          color: #fff;
        }
        
        .events-hero-section p {
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
        
        .event-card {
          background: #fff;
          border-radius: 8px;
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          height: 100%;
        }
        
        .event-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
        }
        
        .card-image-container {
          position: relative;
          height: 250px;
          overflow: hidden;
        }
        
        .event-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s;
        }
        
        .event-card:hover .event-card-img {
          transform: scale(1.05);
        }
        
        .card-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 100%);
          opacity: 0;
          transition: opacity 0.3s;
        }
        
        .event-card:hover .card-overlay {
          opacity: 1;
        }
        
        .event-name {
          font-size: 20px;
          color: #1f3b88;
          font-weight: bold;
          margin-bottom: 5px;
        }
        
        .no-events-placeholder {
          background: #fff;
          padding: 40px;
          border-radius: 8px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
        }
        
        @media (max-width: 768px) {
          .events-hero-section {
            padding: 60px 15px;
          }
          
          .events-hero-section h1 {
            font-size: 32px;
          }
          
          .events-hero-section p {
            font-size: 18px;
          }
          
          .section-title {
            font-size: 28px;
          }
          
          .card-image-container {
            height: 200px;
          }
        }
      `}</style>

      {/* Hero Section with Event Image */}
      <div className="events-hero-section text-center py-5">
        <Container>
          <div className="hero-content" data-aos="fade-down">
            <h1 className="display-4 fw-bold text-white mb-3">Experience Memorable Moments</h1>
            <p className="lead text-white mb-4">Join us for exciting events that bring our community together</p>
            <div className="hero-divider" data-aos="zoom-in" data-aos-delay="300"></div>
          </div>
        </Container>
      </div>

      <Container className="my-5">
        <h2 className="text-center mb-5 section-title" data-aos="fade-up">Our Events</h2>
        <Row>
          {events.map((event, index) => (
            <Col lg={4} md={6} key={event._id} className="mb-4">
              <Card
                className="h-100 shadow-sm event-card"
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/events/${event._id}`)}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                {event.coverImage && (
                  <div className="card-image-container">
                    <Card.Img
                      variant="top"
                      src={`${Img_BASE_URL}${event.coverImage}`}
                      className="event-card-img"
                    />
                    <div className="card-overlay"></div>
                  </div>
                )}
                <Card.Body className="text-center d-flex flex-column">
                  <Card.Title className="fw-bold event-name mt-auto">{event.eventName}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        
        {events.length === 0 && (
          <div className="text-center py-5" data-aos="fade-up">
            <div className="no-events-placeholder">
              <i className="fas fa-calendar-alt fa-4x mb-3 text-muted"></i>
              <h4 className="text-muted">No events scheduled yet</h4>
              <p>Check back later for upcoming events!</p>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Events;