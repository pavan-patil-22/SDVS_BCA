import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card } from "react-bootstrap";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaGraduationCap, FaBriefcase, FaChalkboardTeacher, FaClock, FaUserTie, FaUserFriends } from "react-icons/fa";
import { BASE_API_URL, Img_BASE_URL } from "../../BaseAPI";

const DEFAULT_PROFILE_IMAGE = "https://res.cloudinary.com/dj4tc4ih1/image/upload/v1777048403/user_profile_images/gukheby9nktqooefmsbu.png";

const Faculty = () => {
  const [teachingStaff, setTeachingStaff] = useState([]);
  const [nonTeachingStaff, setNonTeachingStaff] = useState([]);
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
        
        const { teaching, nonTeaching } = separateAndSortStaff(res.data);
        setTeachingStaff(teaching);
        setNonTeachingStaff(nonTeaching);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching faculty:", err);
        setLoading(false);
      }
    };
    fetchFaculty();
  }, []);

  const separateAndSortStaff = (facultyList) => {
    const teaching = [];
    const nonTeaching = [];

    facultyList.forEach(staff => {
      const roleLower = staff.role?.toLowerCase() || '';
      const teachingTypeLower = staff.teachingType?.toLowerCase() || '';
      
      const isTeaching = teachingTypeLower === 'teaching' || 
                        roleLower.includes('teacher') || 
                        roleLower.includes('faculty') || 
                        roleLower.includes('professor') || 
                        roleLower.includes('lecturer') || 
                        roleLower.includes('hod') || 
                        roleLower.includes('principal');
      
      if (isTeaching) {
        teaching.push(staff);
      } else {
        nonTeaching.push(staff);
      }
    });

    const sortedTeaching = sortTeachingStaff(teaching);
    const sortedNonTeaching = sortNonTeachingStaff(nonTeaching);

    return { teaching: sortedTeaching, nonTeaching: sortedNonTeaching };
  };

  const sortTeachingStaff = (staffList) => {
    const rolePriority = {
      'principal': 1,
      'hod': 2,
      'head of department': 2,
      'professor': 3,
      'assistant professor': 4,
      'associate professor': 5,
      'lecturer': 6,
      'teacher': 7,
      'faculty': 8
    };
    
    return staffList.sort((a, b) => {
      const roleA = (a.role || '').toLowerCase();
      const roleB = (b.role || '').toLowerCase();
      
      const priorityA = rolePriority[roleA] || 9;
      const priorityB = rolePriority[roleB] || 9;
      
      if (priorityA !== priorityB) {
        return priorityA - priorityB;
      }
      
      const empTypeA = (a.employmentType || '').toLowerCase();
      const empTypeB = (b.employmentType || '').toLowerCase();
      
      if (empTypeA.includes('full') && !empTypeB.includes('full')) {
        return -1;
      }
      if (!empTypeA.includes('full') && empTypeB.includes('full')) {
        return 1;
      }
      
      const expA = parseInt(a.experience) || 0;
      const expB = parseInt(b.experience) || 0;
      
      return expB - expA;
    });
  };

  const sortNonTeachingStaff = (staffList) => {
    const rolePriority = {
      'director': 1,
      'administrator': 2,
      'manager': 3,
      'coordinator': 4,
      'office staff': 5,
      'clerk': 6,
      'accountant': 7,
      'librarian': 8,
      'lab assistant': 9,
      'lab technician': 10,
      'security': 11,
      'peon': 12,
      'cleaner': 13,
      'sweeper': 14
    };
    
    return staffList.sort((a, b) => {
      const roleA = (a.role || '').toLowerCase();
      const roleB = (b.role || '').toLowerCase();
      
      const isPeonA = roleA.includes('peon') || roleA.includes('messenger');
      const isPeonB = roleB.includes('peon') || roleB.includes('messenger');
      
      if (isPeonA && !isPeonB) return 1;
      if (!isPeonA && isPeonB) return -1;
      
      const priorityA = rolePriority[roleA] || 15;
      const priorityB = rolePriority[roleB] || 15;
      
      if (priorityA !== priorityB) {
        return priorityA - priorityB;
      }
      
      const empTypeA = (a.employmentType || '').toLowerCase();
      const empTypeB = (b.employmentType || '').toLowerCase();
      
      if (empTypeA.includes('full') && !empTypeB.includes('full')) {
        return -1;
      }
      if (!empTypeA.includes('full') && empTypeB.includes('full')) {
        return 1;
      }
      
      const expA = parseInt(a.experience) || 0;
      const expB = parseInt(b.experience) || 0;
      
      return expB - expA;
    });
  };

  const formatExperience = (exp) => {
    const experience = parseInt(exp) || 0;
    return experience === 0 ? "Fresher" : `${experience} years`;
  };

  const getRoleColor = (role) => {
    const roleLower = role?.toLowerCase() || '';
    
    if (roleLower.includes('principal') || roleLower.includes('director')) {
      return '#dc3545';
    } else if (roleLower.includes('hod') || roleLower.includes('head')) {
      return '#0d6efd';
    } else if (roleLower.includes('professor')) {
      return '#198754';
    } else if (roleLower.includes('teacher') || roleLower.includes('lecturer')) {
      return '#6f42c1';
    } else if (roleLower.includes('clerk') || roleLower.includes('accountant')) {
      return '#fd7e14';
    } else if (roleLower.includes('lab')) {
      return '#20c997';
    } else if (roleLower.includes('librarian')) {
      return '#0dcaf0';
    } else {
      return '#6c757d';
    }
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
                     url('bg_pic.jpeg');
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
        
        .sub-section-title {
          font-size: 28px;
          color: #1f3b88;
          font-weight: bold;
          margin-bottom: 25px;
          padding-bottom: 10px;
          border-bottom: 2px solid #f5a623;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .sub-section-title i {
          color: #f5a623;
        }
        
        .section-container {
          // background: white;
          border-radius: 12px;
          padding: 30px;
          margin-bottom: 40px;
          // box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
        }
        
        .staff-count-badge {
          background: #f5a623;
          color: white;
          border-radius: 20px;
          padding: 4px 12px;
          font-size: 14px;
          font-weight: bold;
          margin-left: 10px;
        }
        
        .faculty-card {
          background: #fff;
          border-radius: 8px;
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          height: 100%;
          border: 1px solid #eaeaea;
        }
        
        .faculty-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
        }
        
        .faculty-image-container {
          width: 100%;
          height: 400px;
          overflow: hidden;
          position: relative;
        }
        
        .faculty-image-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        
        .faculty-card:hover .faculty-image-container img {
          transform: scale(1.05);
        }
        
        .faculty-image-placeholder {
          width: 100%;
          height: 280px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          color: #6c757d;
          font-size: 3rem;
        }
        
        .role-badge {
          position: absolute;
          top: 15px;
          left: 15px;
          color: white;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
        }
        
        .employment-badge {
          position: absolute;
          top: 15px;
          right: 15px;
          background: #1f3b88;
          color: white;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 600;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
        }
        
        .faculty-details {
          padding: 20px;
        }
        
        .faculty-name {
          font-size: 20px;
          color: #1f3b88;
          font-weight: bold;
          margin-bottom: 8px;
        }
        
        .faculty-education {
          color: #666;
          font-size: 15px;
          margin-bottom: 15px;
          padding-bottom: 15px;
          border-bottom: 1px solid #e9ecef;
        }
        
        .detail-item {
          display: flex;
          align-items: flex-start;
          margin-bottom: 12px;
        }
        
        .detail-icon {
          color: #1f3b88;
          margin-right: 12px;
          font-size: 16px;
          margin-top: 2px;
          flex-shrink: 0;
        }
        
        .detail-content {
          flex-grow: 1;
        }
        
        .detail-label {
          font-size: 13px;
          color: #6c757d;
          margin-bottom: 2px;
        }
        
        .detail-value {
          color: #495057;
          font-weight: 500;
          font-size: 14px;
          line-height: 1.4;
        }
        
        .no-results {
          text-align: center;
          padding: 40px;
          background: #fff;
          border-radius: 8px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
        }
        
        .empty-state {
          text-align: center;
          padding: 60px 20px;
          color: #6c757d;
        }
        
        .empty-state i {
          font-size: 4rem;
          margin-bottom: 20px;
          color: #dee2e6;
        }
        
        .summary-stats {
          background: #f8f9fa;
          border-radius: 8px;
          padding: 15px;
          margin-bottom: 20px;
          border-left: 4px solid #1f3b88;
        }
        
        .stat-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 0;
          border-bottom: 1px solid #e9ecef;
        }
        
        .stat-item:last-child {
          border-bottom: none;
        }
        
        .stat-label {
          font-weight: 500;
          color: #495057;
        }
        
        .stat-value {
          font-weight: bold;
          color: #1f3b88;
          font-size: 16px;
        }
        
        /* Desktop styles */
        @media (min-width: 992px) {
          .faculty-image-container {
            height: 400px;
          }
          
          .employment-badge {
            display: block;
          }
        }
        
        /* Mobile responsive styles */
        @media (max-width: 991px) {
          .faculty-image-container {
            height: 320px;
          }
          
          /* Hide employment badge on mobile */
          .employment-badge {
            display: none;
          }
          
          /* Remove additional details on mobile */
          .faculty-education,
          .detail-item {
            display: none;
          }
          
          /* Show only name and role on mobile */
          .faculty-details {
            text-align: center;
            padding: 15px;
          }
          
          .faculty-name {
            font-size: 16px;
            margin-bottom: 8px;
          }
          
          /* Ensure 3 cards per row on mobile */
          .row > [class*='col-'] {
            padding-left: 8px;
            padding-right: 8px;
          }
          
          .faculty-card {
            margin-bottom: 16px;
          }
          
          .role-badge {
            font-size: 10px;
            padding: 3px 10px;
            top: 10px;
            left: 10px;
          }
        }
        
        /* Very small screens */
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
          
          .sub-section-title {
            font-size: 24px;
          }
          
          .section-container {
            padding: 20px;
          }
          
          .faculty-image-container {
            height: 280px;
          }
          
          .faculty-name {
            font-size: 15px;
          }
          
          .role-badge {
            font-size: 9px;
            padding: 3px 8px;
          }
        }
        
        /* Extra small devices */
        @media (max-width: 576px) {
          .faculty-hero-section h1 {
            font-size: 28px;
          }
          
          .faculty-hero-section p {
            font-size: 16px;
          }
          
          .sub-section-title {
            font-size: 22px;
            flex-direction: column;
            align-items: flex-start;
            gap: 5px;
          }
          
          .staff-count-badge {
            margin-left: 0;
            margin-top: 5px;
          }
          
          .faculty-image-container {
            height: 250px;
          }
          
          .faculty-name {
            font-size: 14px;
          }
          
          .role-badge {
            font-size: 8px;
            padding: 2px 6px;
          }
        }
      `}</style>

      <div className="faculty-hero-section text-center py-5">
        <Container>
          <div className="hero-content" data-aos="fade-down">
            <h1 className="display-4 fw-bold text-white mb-3">OUR FACULTY & STAFF</h1>
            <p className="lead text-white mb-4">Dedicated Team Committed to Academic Excellence</p>
            <div className="hero-divider" data-aos="zoom-in" data-aos-delay="300"></div>
          </div>
        </Container>
      </div>

      <Container className="my-5">
        <Row className="mb-5">
          <Col lg={10} className="mx-auto">
            <div className="text-center mb-5" data-aos="fade-up">
              <h2 className="section-title">Meet Our Team</h2>
              <p className="text-muted" style={{ fontSize: '18px' }}>
                Experienced professionals dedicated to student success
              </p>
            </div>
          </Col>
        </Row>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading faculty and staff information...</p>
          </div>
        ) : (
          <>
            {/* Teaching Staff Section */}
            <div className="section-container" data-aos="fade-up">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <h3 className="sub-section-title">
                  <FaChalkboardTeacher /> Teaching Faculty
                </h3>
              </div>
              
              {teachingStaff.length === 0 ? (
                <div className="empty-state" data-aos="fade-up">
                  <FaChalkboardTeacher />
                  <h4>No teaching faculty available</h4>
                  <p>Check back later for teaching faculty information</p>
                </div>
              ) : (
                <Row>
                  {teachingStaff.map((staff, index) => (
                    <Col lg={4} md={6} sm={6} xs={6} key={staff._id} className="mb-4">
                      <Card 
                        className="faculty-card" 
                        data-aos="fade-up" 
                        data-aos-delay={index % 3 * 100}
                      >
                        <div className="faculty-image-container">
                          {staff.picture ? (
                            <img
                              src={`${staff.picture}`}
                              alt={staff.name}
                              onError={(e) => { e.target.src = DEFAULT_PROFILE_IMAGE; }}
                            />
                          ) : (
                            <img
                              src={DEFAULT_PROFILE_IMAGE}
                              alt={staff.name}
                              onError={(e) => { e.target.src = DEFAULT_PROFILE_IMAGE; }}
                            />
                          )}
                          <div 
                            className="role-badge" 
                            style={{ backgroundColor: getRoleColor(staff.role) }}
                          >
                            {staff.role}
                          </div>
                          <div className="employment-badge">
                            {staff.employmentType || 'Full-time'}
                          </div>
                        </div>
                        <div className="faculty-details">
                          <h3 className="faculty-name">{staff.name}</h3>
                          <div className="faculty-education">{staff.education}</div>
                          
                          <div className="detail-item">
                            <span className="detail-icon">
                              <FaBriefcase />
                            </span>
                            <div className="detail-content">
                              <div className="detail-label">Experience</div>
                              <div className="detail-value">{formatExperience(staff.experience)}</div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </Col>
                  ))}
                </Row>
              )}
            </div>
            
            {/* Non-Teaching Staff Section */}
            <div className="section-container" data-aos="fade-up" data-aos-delay="200">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <h3 className="sub-section-title">
                  <FaUserFriends /> Non-Teaching Staff
                </h3>
              </div>
              
              {nonTeachingStaff.length === 0 ? (
                <div className="empty-state" data-aos="fade-up">
                  <FaUserFriends />
                  <h4>No non-teaching staff available</h4>
                  <p>Check back later for non-teaching staff information</p>
                </div>
              ) : (
                <Row>
                  {nonTeachingStaff.map((staff, index) => (
                    <Col lg={4} md={6} sm={6} xs={6} key={staff._id} className="mb-4">
                      <Card 
                        className="faculty-card" 
                        data-aos="fade-up" 
                        data-aos-delay={index % 3 * 100}
                      >
                        <div className="faculty-image-container">
                          {staff.picture ? (
                            <img
                              src={`${staff.picture}`}
                              alt={staff.name}
                              onError={(e) => { e.target.src = DEFAULT_PROFILE_IMAGE; }}
                            />
                          ) : (
                            <img
                              src={DEFAULT_PROFILE_IMAGE}
                              alt={staff.name}
                              onError={(e) => { e.target.src = DEFAULT_PROFILE_IMAGE; }}
                            />
                          )}
                          <div 
                            className="role-badge" 
                            style={{ backgroundColor: getRoleColor(staff.role) }}
                          >
                            {staff.role}
                          </div>
                          <div className="employment-badge">
                            {staff.employmentType || 'Full-time'}
                          </div>
                        </div>
                        <div className="faculty-details">
                          <h3 className="faculty-name">{staff.name}</h3>
                        </div>
                      </Card>
                    </Col>
                  ))}
                </Row>
              )}
            </div>
          </>
        )}
      </Container>
    </div>
  );
};

export default Faculty;