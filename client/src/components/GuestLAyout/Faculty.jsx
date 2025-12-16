// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Container, Row, Col, Card, Form, InputGroup } from "react-bootstrap";
// import AOS from 'aos';
// import 'aos/dist/aos.css';

// const Faculty = () => {
//   const [faculty, setFaculty] = useState([]);
//   const [filteredFaculty, setFilteredFaculty] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     AOS.init({
//       duration: 800,
//       easing: 'ease-in-out',
//       once: false
//     });
    
//     const fetchFaculty = async () => {
//       try {
//         const res = await axios.get("http://localhost:8000/api/faculty");
        
//         // Sort faculty by role and experience
//         const sortedFaculty = sortFacultyByRoleAndExperience(res.data);
//         setFaculty(sortedFaculty);
//         setFilteredFaculty(sortedFaculty);
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching faculty:", err);
//         setLoading(false);
//       }
//     };
//     fetchFaculty();
//   }, []);

//   // Function to sort faculty by role and experience
//   const sortFacultyByRoleAndExperience = (facultyList) => {
//     const rolePriority = {
//       'principal': 1,
//       'hod': 2,
//       'head of department': 2,
//       'professor': 3,
//       'assistant professor': 4,
//       'associate professor': 5,
//       'lecturer': 6
//     };
    
//     return facultyList.sort((a, b) => {
//       // Get role in lowercase for comparison
//       const roleA = a.role.toLowerCase();
//       const roleB = b.role.toLowerCase();
      
//       // Compare by role priority first
//       const priorityA = rolePriority[roleA] || 7;
//       const priorityB = rolePriority[roleB] || 7;
      
//       if (priorityA !== priorityB) {
//         return priorityA - priorityB;
//       }
      
//       // If same role, sort by experience (higher first)
//       const expA = parseInt(a.experience) || 0;
//       const expB = parseInt(b.experience) || 0;
      
//       return expB - expA;
//     });
//   };

//   useEffect(() => {
//     if (searchTerm === "") {
//       setFilteredFaculty(faculty);
//     } else {
//       const filtered = faculty.filter(
//         (f) =>
//           f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           f.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           f.education.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//       setFilteredFaculty(filtered);
//     }
//   }, [searchTerm, faculty]);

//   // Function to get role color and styling
//   const getRoleStyle = (role) => {
//     const roleLower = role.toLowerCase();
    
//     if (roleLower.includes('principal')) {
//       return {
//         background: 'linear-gradient(135deg, #ff6b6b 0%, #c0392b 100%)',
//         color: 'white'
//       };
//     } else if (roleLower.includes('hod') || roleLower.includes('head of department')) {
//       return {
//         background: 'linear-gradient(135deg, #4e73df 0%, #224abe 100%)',
//         color: 'white'
//       };
//     } else if (roleLower.includes('professor')) {
//       return {
//         background: 'linear-gradient(135deg, #36b9cc 0%, #2c9faf 100%)',
//         color: 'white'
//       };
//     } else {
//       return {
//         background: 'linear-gradient(135deg, #1cc88a 0%, #17a673 100%)',
//         color: 'white'
//       };
//     }
//   };

//   return (
//     <div className="faculty-guest-page">
//       <div className="hero-section text-center">
//         <Container>
//           <div className="hero-content">
//             <h1 data-aos="fade-down">Our Distinguished Faculty</h1>
//             <p data-aos="fade-up" data-aos-delay="200">
//               Meet our experienced and dedicated faculty members who are committed to excellence in education
//             </p>
//           </div>
//         </Container>
//       </div>

//       <Container className="mt-5">
//         <Row className="justify-content-center mb-5">
//           <Col md={8}>
//             <div data-aos="fade-up" className="search-box">
//               <InputGroup>
//                 <InputGroup.Text>
//                   <i className="fas fa-search"></i>
//                 </InputGroup.Text>
//                 <Form.Control
//                   type="text"
//                   placeholder="Search faculty by name, role, or education..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//                 {searchTerm && (
//                   <InputGroup.Text 
//                     style={{cursor: 'pointer'}}
//                     onClick={() => setSearchTerm("")}
//                   >
//                     <i className="fas fa-times"></i>
//                   </InputGroup.Text>
//                 )}
//               </InputGroup>
//             </div>
//           </Col>
//         </Row>

//         {loading ? (
//           <div className="text-center py-5">
//             <div className="spinner-border text-primary" role="status">
//               <span className="visually-hidden">Loading...</span>
//             </div>
//             <p className="mt-3">Loading faculty information...</p>
//           </div>
//         ) : filteredFaculty.length === 0 ? (
//           <div className="text-center py-5 no-results" data-aos="fade-up">
//             <i className="fas fa-user-graduate fa-3x mb-3"></i>
//             <h4>{searchTerm ? "No matching faculty found" : "No faculty members available yet"}</h4>
//             <p className="text-muted">
//               {searchTerm ? "Try a different search term" : "Please check back later"}
//             </p>
//           </div>
//         ) : (
//           <Row>
//             {filteredFaculty.map((f, index) => {
//               const roleStyle = getRoleStyle(f.role);
              
//               return (
//                 <Col lg={4} md={6} key={f._id} className="mb-4">
//                   <Card 
//                     className="faculty-card h-100" 
//                     data-aos="fade-up" 
//                     data-aos-delay={index % 3 * 100}
//                   >
//                     <div className="card-image-container">
//                       {f.picture ? (
//                         <Card.Img
//                           variant="top"
//                           src={`http://localhost:8000/${f.picture}`}
//                           className="faculty-image"
//                         />
//                       ) : (
//                         <div className="faculty-image-placeholder">
//                           <i className="fas fa-user-graduate"></i>
//                         </div>
//                       )}
//                       <div className="card-overlay"></div>
//                       <div className="faculty-role-badge" style={roleStyle}>
//                         {f.role}
//                       </div>
//                     </div>
//                     <Card.Body className="text-center">
//                       <Card.Title className="faculty-name">{f.name}</Card.Title>
//                       <div className="faculty-details">
//                         <div className="detail-item education-item">
//                           <i className="fas fa-graduation-cap"></i>
//                           <div>
//                             <div className="detail-label">Education</div>
//                             <div className="detail-value">{f.education}</div>
//                           </div>
//                         </div>
//                         <div className="detail-item experience-item">
//                           <i className="fas fa-briefcase"></i>
//                           <div>
//                             <div className="detail-label">Experience</div>
//                             <div className="detail-value">{f.experience} years</div>
//                           </div>
//                         </div>
//                       </div>
//                     </Card.Body>
//                   </Card>
//                 </Col>
//               );
//             })}
//           </Row>
//         )}
//       </Container>

//       <style>
//         {`
//           .faculty-guest-page {
//             min-height: 100vh;
//             background: linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%);
//             padding-bottom: 50px;
//           }
          
//           .hero-section {
//             background:  linear-gradient(135deg, #1cc88a 0%, #17a673 100%);
//             color: white;
//             padding: 120px 0 60px;
//             margin-bottom: 40px;
//           }
          
//           .hero-content h1 {
//             font-weight: 700;
//             font-size: 2.5rem;
//             margin-bottom: 20px;
//           }
          
//           .hero-content p {
//             font-size: 1.2rem;
//             max-width: 700px;
//             margin: 0 auto;
//             opacity: 0.9;
//           }
          
//           .search-box {
//             background: white;
//             border-radius: 12px;
//             padding: 5px;
//             box-shadow: 0 5px 15px rgba(0,0,0,0.08);
//           }
          
//           .search-box .input-group-text {
//             background: transparent;
//             border: none;
//             color: #4e73df;
//           }
          
//           .search-box .form-control {
//             border: none;
//             box-shadow: none;
//             padding: 12px 5px;
//           }
          
//           .search-box .form-control:focus {
//             box-shadow: none;
//           }
          
//           .faculty-card {
//             border: none;
//             border-radius: 15px;
//             overflow: hidden;
//             box-shadow: 0 5px 15px rgba(0,0,0,0.08);
//             transition: all 0.3s ease;
//           }
          
//           .faculty-card:hover {
//             transform: translateY(-10px);
//             box-shadow: 0 15px 30px rgba(0,0,0,0.12);
//           }
          
//           .card-image-container {
//             position: relative;
//             height: 280px;
//             overflow: hidden;
//           }
          
//           .faculty-image {
//             height: 100%;
//             object-fit: cover;
//             transition: transform 0.5s;
//           }
          
//           .faculty-card:hover .faculty-image {
//             transform: scale(1.05);
//           }
          
//           .faculty-image-placeholder {
//             height: 100%;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             background: linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%);
//             color: #858796;
//             font-size: 4rem;
//           }
          
//           .card-overlay {
//             position: absolute;
//             top: 0;
//             left: 0;
//             right: 0;
//             bottom: 0;
//             background: linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 100%);
//             opacity: 0;
//             transition: opacity 0.3s;
//           }
          
//           .faculty-card:hover .card-overlay {
//             opacity: 1;
//           }
          
//           .faculty-role-badge {
//             position: absolute;
//             top: 15px;
//             left: 15px;
//             padding: 5px 12px;
//             border-radius: 20px;
//             font-size: 0.8rem;
//             font-weight: 600;
//             box-shadow: 0 3px 10px rgba(0,0,0,0.2);
//           }
          
//           .faculty-name {
//             font-weight: 700;
//             color: #2e3a59;
//             margin-bottom: 15px;
//           }
          
//           .faculty-details {
//             text-align: left;
//           }
          
//           .detail-item {
//             display: flex;
//             align-items: flex-start;
//             margin-bottom: 15px;
//             padding: 10px;
//             border-radius: 8px;
//             background: #f8f9fc;
//           }
          
//           .detail-item i {
//             color: #4e73df;
//             width: 25px;
//             margin-right: 10px;
//             margin-top: 3px;
//             font-size: 1.1rem;
//           }
          
//           .detail-label {
//             font-size: 0.8rem;
//             color: #858796;
//             font-weight: 600;
//             text-transform: uppercase;
//             margin-bottom: 3px;
//           }
          
//           .detail-value {
//             color: #5a5c69;
//             font-weight: 500;
//           }
          
//           .education-item {
//             border-left: 3px solid #4e73df;
//           }
          
//           .experience-item {
//             border-left: 3px solid #1cc88a;
//           }
          
//           .no-results {
//             background: white;
//             padding: 40px;
//             border-radius: 15px;
//             box-shadow: 0 5px 15px rgba(0,0,0,0.05);
//           }
          
//           @media (max-width: 768px) {
//             .hero-section {
//               padding: 60px 0 40px;
//             }
            
//             .hero-content h1 {
//               font-size: 2rem;
//             }
            
//             .hero-content p {
//               font-size: 1rem;
//             }
            
//             .card-image-container {
//               height: 250px;
//             }
            
//             .search-box {
//               margin: 0 15px;
//             }
//           }
//         `}
//       </style>
//     </div>
//   );
// };

// export default Faculty;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card } from "react-bootstrap";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaGraduationCap, FaBriefcase, FaChalkboardTeacher } from "react-icons/fa";
import { BASE_API_URL, Img_BASE_URL } from "../../BaseAPI";

const Faculty = () => {
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: false
    });
    
    const fetchFaculty = async () => {
      try {
        const res = await axios.get(`${BASE_API_URL}/faculty`);
        
        // Sort faculty by role and experience
        const sortedFaculty = sortFacultyByRoleAndExperience(res.data);
        setFaculty(sortedFaculty);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching faculty:", err);
        setLoading(false);
      }
    };
    fetchFaculty();
  }, []);

  // Function to sort faculty by role and experience
  const sortFacultyByRoleAndExperience = (facultyList) => {
    const rolePriority = {
      'principal': 1,
      'hod': 2,
      'head of department': 2,
      'professor': 3,
      'assistant professor': 4,
      'associate professor': 5,
      'lecturer': 6
    };
    
    return facultyList.sort((a, b) => {
      // Get role in lowercase for comparison
      const roleA = a.role.toLowerCase();
      const roleB = b.role.toLowerCase();
      
      // Compare by role priority first
      const priorityA = rolePriority[roleA] || 7;
      const priorityB = rolePriority[roleB] || 7;
      
      if (priorityA !== priorityB) {
        return priorityA - priorityB;
      }
      
      // If same role, sort by experience (higher first)
      const expA = parseInt(a.experience) || 0;
      const expB = parseInt(b.experience) || 0;
      
      return expB - expA;
    });
  };

  // Function to format experience display
  const formatExperience = (exp) => {
    const experience = parseInt(exp) || 0;
    return experience === 0 ? "Fresher" : `${experience} years`;
  };

  return (
    <div className="faculty-page">
      <style>{`
        .faculty-page {
          font-family: Arial, sans-serif;
          color: #333;
          background-color: #f8f9fb;
        }
        
        .faculty-hero-section {
          background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), 
                     url('https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg');
          background-size: cover;
          background-position: center;
          padding: 80px 20px;
        }
        
        .faculty-hero-section h1 {
          font-size: 42px;
          margin-bottom: 20px;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
          color: #fff;
        }
        
        .faculty-hero-section p {
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
        
        .faculty-card {
          background: #fff;
          border-radius: 8px;
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          height: 100%;
        }
        
        .faculty-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
        }
        
        .faculty-image-container {
          width: 100%;
          height: 280px;
          overflow: hidden;
        }
        
        .faculty-image-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .faculty-image-placeholder {
          width: 100%;
          height: 280px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #e9ecef;
          color: #6c757d;
          font-size: 3rem;
        }
        
        .faculty-name {
          font-size: 20px;
          color: #1f3b88;
          font-weight: bold;
          margin-bottom: 5px;
        }
        
        .faculty-role {
          font-size: 16px;
          color: #f5a623;
          font-weight: 600;
          margin-bottom: 15px;
          padding-bottom: 10px;
          border-bottom: 1px solid #e9ecef;
        }
        
        .faculty-details {
          padding: 20px;
        }
        
        .detail-item {
          display: flex;
          align-items: flex-start;
          margin-bottom: 15px;
        }
        
        .detail-icon {
          color: #1f3b88;
          margin-right: 12px;
          font-size: 18px;
          margin-top: 2px;
          flex-shrink: 0;
        }
        
        .detail-content {
          flex-grow: 1;
        }
        
        .detail-label {
          font-size: 14px;
          color: #6c757d;
          margin-bottom: 3px;
        }
        
        .detail-value {
          color: #495057;
          font-weight: 500;
          line-height: 1.4;
        }
        
        .no-results {
          text-align: center;
          padding: 40px;
          background: #fff;
          border-radius: 8px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
        }
        
        @media (max-width: 768px) {
          .faculty-hero-section {
            padding: 60px 15px;
          }
          
          .faculty-hero-section h1 {
            font-size: 32px;
          }
          
          .faculty-hero-section p {
            font-size: 18px;
          }
          
          .section-title {
            font-size: 28px;
          }
          
          .faculty-image-container {
            height: 250px;
          }
        }
      `}</style>

      {/* Hero Section */}
      <div className="faculty-hero-section text-center py-5">
        <Container>
          <div className="hero-content" data-aos="fade-down">
            <h1 className="display-4 fw-bold text-white mb-3">OUR FACULTY</h1>
            <p className="lead text-white mb-4">Dedicated Educators Committed to Excellence</p>
            <div className="hero-divider" data-aos="zoom-in" data-aos-delay="300"></div>
          </div>
        </Container>
      </div>

      <Container className="my-5">
        <Row className="mb-5">
          <Col lg={8} className="mx-auto">
            <div className="text-center mb-5" data-aos="fade-up">
              <h2 className="section-title">Meet Our Faculty Members</h2>
            </div>
          </Col>
        </Row>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading faculty information...</p>
          </div>
        ) : faculty.length === 0 ? (
          <div className="text-center py-5 no-results" data-aos="fade-up">
            <FaChalkboardTeacher className="mb-3" style={{fontSize: '3rem', color: '#1f3b88'}} />
            <h4>No faculty members available yet</h4>
            <p className="text-muted">Please check back later</p>
          </div>
        ) : (
          <Row>
            {faculty.map((f, index) => (
              <Col lg={4} md={6} key={f._id} className="mb-4">
                <Card 
                  className="faculty-card border-0 shadow-sm" 
                  data-aos="fade-up" 
                  data-aos-delay={index % 3 * 100}
                >
                  <div className="faculty-image-container">
                    {f.picture ? (
                      <img
                        src={`${Img_BASE_URL}${f.picture}`}
                        alt={f.name}
                      />
                    ) : (
                      <div className="faculty-image-placeholder">
                        <FaChalkboardTeacher />
                      </div>
                    )}
                  </div>
                  <div className="faculty-details">
                    <h3 className="faculty-name">{f.name}</h3>
                    <p className="faculty-role">{f.role}</p>
                    
                    <div className="detail-item">
                      <span className="detail-icon">
                        <FaGraduationCap />
                      </span>
                      <div className="detail-content">
                        <div className="detail-label">Education</div>
                        <div className="detail-value">{f.education}</div>
                      </div>
                    </div>
                    
                    <div className="detail-item">
                      <span className="detail-icon">
                        <FaBriefcase />
                      </span>
                      <div className="detail-content">
                        <div className="detail-label">Experience</div>
                        <div className="detail-value">{formatExperience(f.experience)}</div>
                      </div>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
};

export default Faculty;