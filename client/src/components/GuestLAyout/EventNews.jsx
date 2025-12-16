// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
// import { FaCalendarAlt, FaRegCalendarCheck } from "react-icons/fa";
// import AOS from "aos";
// import "aos/dist/aos.css";

// const API_URL = "http://localhost:8000/api/events-news"; // Your backend API

// const EventNews = () => {
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);

//   // Initialize AOS
//   useEffect(() => {
//     AOS.init({
//       duration: 800,
//       easing: "ease-in-out",
//       once: false,
//     });
//   }, []);

//   // Fetch events/news
//   const fetchEvents = async () => {
//     try {
//       const res = await axios.get(API_URL);
//       // Sort by date and get latest 4
//       const sortedEvents = res.data
//         .sort((a, b) => new Date(b.date) - new Date(a.date))
//         .slice(0, 4);
//       setEvents(sortedEvents);
//       setLoading(false);
//     } catch (err) {
//       console.error("Error fetching events/news", err);
//       setError(true);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   // Format date as "15 Oct 2023"
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-GB", {
//       day: "numeric",
//       month: "short",
//       year: "numeric",
//     });
//   };

//   if (loading) {
//     return (
//       <section className="event-news-section">
//         <Container>
//           <h2 className="section-title" data-aos="fade-up">Upcoming Events & News</h2>
//           <div className="text-center py-5">
//             <Spinner animation="border" role="status" variant="primary">
//               <span className="visually-hidden">Loading...</span>
//             </Spinner>
//           </div>
//         </Container>
//       </section>
//     );
//   }

//   return (
//     <section className="event-news-section">
//       <Container>
//         <h2 className="section-title" data-aos="fade-up">Upcoming Events & News</h2>
//         <Row>
//           {events.length > 0 && !error ? (
//             events.map((ev, index) => (
//               <Col 
//                 md={6} 
//                 lg={3} 
//                 key={ev._id} 
//                 className="mb-4"
//                 data-aos="fade-up" 
//                 data-aos-delay={index * 100}
//               >
//                 <Card className="h-100 event-card">
//                   <div className="event-date">
//                     <FaCalendarAlt className="me-2" />
//                     {formatDate(ev.date)}
//                   </div>
//                   <Card.Body className="event-content">
//                     <Card.Title className="event-title">{ev.title}</Card.Title>
//                     <Card.Text className="event-description">{ev.description}</Card.Text>
//                     {/* <div className="event-read-more">Read More</div> */}
//                   </Card.Body>
//                 </Card>
//               </Col>
//             ))
//           ) : (
//             <Col className="text-center py-5" data-aos="fade-up">
//               <div className="no-events">
//                 <FaRegCalendarCheck className="no-events-icon" />
//                 <h3>No Upcoming Events</h3>
//                 <p className="text-muted">Check back later for upcoming events and news.</p>
//               </div>
//             </Col>
//           )}
//         </Row>
//       </Container>
      
//       {/* Add custom styles */}
//       <style>{`
//         .event-news-section {
//           padding: 80px 0;
//           background: #f8f9fa;
//         }
        
//         .section-title {
//           text-align: center;
//           margin-bottom: 50px;
//           color: #2c3e50;
//           font-size: 2.5rem;
//           position: relative;
//           padding-bottom: 15px;
//         }
        
//         .section-title:after {
//           content: '';
//           position: absolute;
//           bottom: 0;
//           left: 50%;
//           transform: translateX(-50%);
//           width: 80px;
//           height: 4px;
//           background: linear-gradient(135deg, #1cc88a 0%, #17a673 100%);
//           border-radius: 2px;
//         }
        
//         .event-card {
//           border: none;
//           border-radius: 15px;
//           overflow: hidden;
//           transition: all 0.4s ease;
//           background: white;
//           box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
//           position: relative;
//         }
        
//         .event-card:hover {
//           transform: translateY(-10px);
//           box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
//         }
        
//         .event-card:hover .event-date {
//           background: linear-gradient(135deg, #17a673 0%, #1cc88a 100%);
//         }
        
//         .event-date {
//           background: linear-gradient(135deg, #1cc88a 0%, #17a673 100%);
//           color: white;
//           padding: 12px 15px;
//           font-weight: 600;
//           display: flex;
//           align-items: center;
//           border-radius: 0 0 15px 0;
//           position: absolute;
//           top: 0;
//           left: 0;
//           z-index: 2;
//           transition: all 0.3s ease;
//         }
        
//         .event-content {
//           padding: 25px;
//           padding-top: 50px;
//           display: flex;
//           flex-direction: column;
//           height: 100%;
//         }
        
//         .event-title {
//           font-weight: 700;
//           color: #2c3e50;
//           margin-bottom: 15px;
//           font-size: 1.25rem;
//           min-height: 60px;
//         }
        
//         .event-description {
//           color: #555;
//           line-height: 1.6;
//           flex-grow: 1;
//           margin-bottom: 20px;
//         }
        
//         .event-read-more {
//           color: #1cc88a;
//           font-weight: 600;
//           display: inline-flex;
//           align-items: center;
//           cursor: pointer;
//           transition: all 0.3s ease;
//         }
        
//         .event-read-more:hover {
//           color: #17a673;
//           transform: translateX(5px);
//         }
        
//         .event-read-more:after {
//           content: '→';
//           margin-left: 5px;
//           transition: all 0.3s ease;
//         }
        
//         .event-read-more:hover:after {
//           margin-left: 8px;
//         }
        
//         .no-events {
//           padding: 40px 20px;
//           color: #6c757d;
//         }
        
//         .no-events-icon {
//           font-size: 4rem;
//           margin-bottom: 20px;
//           color: #dee2e6;
//         }
        
//         @media (max-width: 768px) {
//           .event-news-section {
//             padding: 60px 0;
//           }
          
//           .section-title {
//             font-size: 2rem;
//             margin-bottom: 30px;
//           }
//         }
//       `}</style>
//     </section>
//   );
// };

// export default EventNews;




import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Spinner, Button } from "react-bootstrap";
import { FaCalendarAlt, FaRegCalendarCheck, FaArrowRight } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import { BASE_API_URL, Img_BASE_URL } from "../../BaseAPI";

const API_URL = `${BASE_API_URL}/events-news`; // Your backend API

const EventNews = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: false,
    });
  }, []);

  // Fetch events/news
  const fetchEvents = async () => {
    try {
      const res = await axios.get(API_URL);
      // Sort by date and get latest 4
      const sortedEvents = res.data
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 4);
      setEvents(sortedEvents);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching events/news", err);
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Format date as "15 Oct 2023"
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <section className="event-news-section py-5" style={{ backgroundColor: '#f8f9fb' }}>
        <Container>
          <div className="text-center py-5">
            <Spinner animation="border" role="status" style={{ color: '#1f3b88', width: '3rem', height: '3rem' }}>
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <p className="mt-3">Loading events...</p>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="event-news-section py-5" style={{ backgroundColor: '#f8f9fb' }}>
      <Container>
        <div className="text-center mb-5" data-aos="fade-up">
          <h2 className="section-title">Upcoming Events & News</h2>
          <p className="section-subtitle">Stay updated with the latest happenings at our institution</p>
        </div>
        
        <Row>
          {events.length > 0 && !error ? (
            events.map((ev, index) => (
              <Col 
                md={6} 
                lg={3} 
                key={ev._id} 
                className="mb-4"
                data-aos="fade-up" 
                data-aos-delay={index * 100}
              >
                <Card className="h-100 event-card shadow-sm border-0">
                  {/* Date Badge */}
                  <div className="event-date-badge">
                    <FaCalendarAlt className="me-1" />
                    {formatDate(ev.date)}
                  </div>
                  
                  {/* Card Image */}
                  {ev.image && (
                    <Card.Img 
                      variant="top" 
                      src={`${Img_BASE_URL}${ev.image}`} 
                      alt={ev.title}
                      className="event-image"
                    />
                  )}
                  
                  <Card.Body className="p-4">
                    <Card.Title className="event-title mt-5 mb-3">{ev.title}</Card.Title>
                    <Card.Text className="event-description text-muted">
                      {ev.description.length > 100 
                        ? `${ev.description.substring(0, 100)}...` 
                        : ev.description
                      }
                    </Card.Text>
                    
                   
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col className="text-center py-5" data-aos="fade-up">
              <div className="no-events py-4">
                <FaRegCalendarCheck className="no-events-icon mb-3" style={{ fontSize: '3rem', color: '#1f3b88' }} />
                <h3 className="mb-2">No Upcoming Events</h3>
                <p className="text-muted">Check back later for upcoming events and news.</p>
              </div>
            </Col>
          )}
        </Row>
        
        
      </Container>

      <style>{`
        .event-news-section {
          background-color: #f8f9fb;
        }
        
        .section-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: #1f3b88;
          position: relative;
          padding-bottom: 15px;
          display: inline-block;
        }
        
        .section-title:after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 3px;
          background: #f5a623;
        }
        
        .section-subtitle {
          font-size: 1.1rem;
          color: #666;
          max-width: 600px;
          margin: 0 auto;
        }
        
        .event-card {
          transition: all 0.3s ease;
          border-radius: 12px;
          overflow: hidden;
          position: relative;
        }
        
        .event-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.1) !important;
        }
        
        .event-date-badge {
          position: absolute;
          top: 15px;
          left: 15px;
          background: #1f3b88;
          color: white;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 500;
          z-index: 2;
          display: flex;
          align-items: center;
        }
        
        .event-image {
          height: 200px;
          object-fit: cover;
          transition: transform 0.3s ease;
        }
        
        .event-card:hover .event-image {
          transform: scale(1.05);
        }
        
        .event-title {
          font-size: 1.2rem;
          font-weight: 600;
          color: #1f3b88;
          margin-bottom: 15px;
          line-height: 1.4;
        }
        
        .event-description {
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 20px;
        }
        
        .event-read-more-btn {
          border-color: #1f3b88;
          color: #1f3b88;
          border-radius: 20px;
          font-weight: 500;
          padding: 5px 15px;
          transition: all 0.3s ease;
        }
        
        .event-read-more-btn:hover {
          background: #1f3b88;
          color: white;
          border-color: #1f3b88;
        }
        
        .event-type-badge {
          background: rgba(245, 166, 35, 0.15);
          color: #f5a623;
          padding: 4px 10px;
          border-radius: 15px;
          font-size: 0.75rem;
          font-weight: 600;
        }
        
        .view-all-btn {
          background: #1f3b88;
          border: none;
          padding: 12px 30px;
          border-radius: 30px;
          font-weight: 600;
          transition: all 0.3s ease;
        }
        
        .view-all-btn:hover {
          background: #172b69;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(31, 59, 136, 0.3);
        }
        
        .no-events {
          background: white;
          padding: 50px;
          border-radius: 15px;
          box-shadow: 0 5px 20px rgba(0,0,0,0.08);
        }
        
        .no-events-icon {
          font-size: 3rem;
          color: #1f3b88;
          margin-bottom: 20px;
        }
        
        /* Responsive Design */
        @media (max-width: 992px) {
          .section-title {
            font-size: 2.2rem;
          }
        }
        
        @media (max-width: 768px) {
          .section-title {
            font-size: 2rem;
          }
          
          .event-card {
            margin-bottom: 30px;
          }
        }
        
        @media (max-width: 576px) {
          .section-title {
            font-size: 1.8rem;
          }
          
          .section-subtitle {
            font-size: 1rem;
          }
        }
      `}</style>
    </section>
  );
};

export default EventNews;