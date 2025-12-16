// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Container, Row, Col, Card } from "react-bootstrap";
// import AOS from 'aos';
// import 'aos/dist/aos.css';

// const API_URL = "http://localhost:8000/api/placements";
// const IMG_URL = "http://localhost:8000/";

// const Placement = () => {
//   const [placements, setPlacements] = useState([]);

//   useEffect(() => {
//     // Initialize AOS
//     AOS.init({
//       duration: 800,
//       easing: 'ease-in-out',
//       once: false
//     });
    
//     const fetchPlacements = async () => {
//       try {
//         const res = await axios.get(API_URL);
//         setPlacements(res.data);
//       } catch (err) {
//         console.error("Error fetching placements:", err);
//       }
//     };
//     fetchPlacements();
//   }, []);

//   return (
//     <div className="placement-page">
//       {/* Hero Section */}
//       <div className="placement-hero-section text-center py-5">
//         <Container>
//           <div className="hero-content" data-aos="fade-down">
//             <h1 className="display-4 fw-bold text-white mb-3">PLACEMENTS</h1>
//             <p className="lead text-white mb-4">Our Students' Success Stories</p>
//             <div className="hero-divider" data-aos="zoom-in" data-aos-delay="300"></div>
//           </div>
//         </Container>
//       </div>

//       <Container className="my-5">
        
//         {/* Placement Cards */}
//         <Row>
//           {placements.length > 0 ? (
//             placements.map((placement, index) => (
//               <Col lg={4} md={6} className="mb-4" key={placement._id} 
//                    data-aos="fade-up" data-aos-delay={index % 6 * 100}>
//                 <Card className="placement-card shadow-sm border-0 h-100">
//                   {placement.image && (
//                     <div className="placement-image-container">
//                       <Card.Img
//                         variant="top"
//                         src={`${IMG_URL}${placement.image}`}
//                         className="placement-img"
//                       />
//                       <div className="company-badge">{placement.company}</div>
//                     </div>
//                   )}
//                   <Card.Body className="text-center">
//                     <Card.Title className="student-name">{placement.studentname}</Card.Title>
//                     <div className="placement-details">
//                       <p className="package-detail">
//                         <span className="package-icon">💰</span>
//                         {placement.package} LPA
//                       </p>
//                       <p className="company-detail">
//                         <span className="company-icon">🏢</span>
//                         {placement.company}
//                       </p>
//                       <p className="batch-detail">
//                         <span className="batch-icon">🎓</span>
//                         Batch: {placement.batch}
//                       </p>
//                     </div>
//                   </Card.Body>
//                 </Card>
//               </Col>
//             ))
//           ) : (
//             <Col className="text-center">
//               <div className="no-placements py-5" data-aos="fade-up">
//                 <h3 className="text-muted">No placement records found</h3>
//                 <p className="text-muted">Check back later for our students' achievements</p>
//               </div>
//             </Col>
//           )}
//         </Row>
//       </Container>

//       <style>{`
//         .placement-page {
//           min-height: 100vh;
//           background: #f8f9fa;
//         }
        
//         .placement-hero-section {
//           background: linear-gradient(135deg, #1cc88a 0%, #17a673 100%);
//           padding: 80px 0;
//           position: relative;
//           overflow: hidden;
//         }
        
//         .placement-hero-section::before {
//           content: '';
//           position: absolute;
//           top: 0;
//           left: 0;
//           right: 0;
//           bottom: 0;
//           background: url('https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80') center center/cover no-repeat;
//           opacity: 0.15;
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
        
//         .stat-card {
//           background: white;
//           transition: all 0.3s ease;
//           border-bottom: 3px solid transparent;
//         }
        
//         .stat-card:hover {
//           transform: translateY(-8px);
//           box-shadow: 0 12px 25px rgba(0, 0, 0, 0.1);
//           background: linear-gradient(135deg, #1cc88a 0%, #17a673 100%);
//           color: white;
//           border-bottom: 3px solid #0f5e43;
//         }
        
//         .stat-card:hover p {
//           color: white !important;
//         }
        
//         .green-text {
//           color: #17a673;
//         }
        
//         .stat-card:hover .green-text {
//           color: white !important;
//         }
        
//         /* Placement Card Styles */
//         .placement-card {
//           border-radius: 12px;
//           overflow: hidden;
//           transition: all 0.3s ease;
//         }
        
//         .placement-card:hover {
//           transform: translateY(-5px);
//           box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1) !important;
//         }
        
//         .placement-image-container {
//           position: relative;
//           overflow: hidden;
//           height: 250px;
//         }
        
//         .placement-img {
//           height: 100%;
//           width: 100%;
//           object-fit: cover;
//           transition: transform 0.5s ease;
//         }
        
//         .placement-card:hover .placement-img {
//           transform: scale(1.05);
//         }
        
//         .company-badge {
//           position: absolute;
//           top: 15px;
//           right: 15px;
//           background: linear-gradient(135deg, #1cc88a 0%, #17a673 100%);
//           color: white;
//           padding: 5px 12px;
//           border-radius: 20px;
//           font-size: 0.8rem;
//           font-weight: 600;
//           box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
//         }
        
//         .student-name {
//           color: #2e3a59;
//           font-weight: 700;
//           margin-bottom: 1rem;
//           font-size: 1.3rem;
//         }
        
//         .placement-details {
//           text-align: left;
//         }
        
//         .placement-details p {
//           margin-bottom: 0.7rem;
//           display: flex;
//           align-items: center;
//           color: #555;
//         }
        
//         .package-detail, .company-detail, .batch-detail {
//           font-size: 1rem;
//         }
        
//         .package-icon, .company-icon, .batch-icon {
//           margin-right: 10px;
//           font-size: 1.2rem;
//           min-width: 25px;
//           text-align: center;
//         }
        
//         .package-detail {
//           font-weight: 600;
//           color: #17a673 !important;
//           font-size: 1.1rem !important;
//         }
        
//         .no-placements {
//           background: white;
//           border-radius: 12px;
//           padding: 40px;
//           box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
//         }
        
//         /* Responsive styles */
//         @media (max-width: 768px) {
//           .placement-hero-section {
//             padding: 60px 0;
//           }
          
//           .placement-hero-section h1 {
//             font-size: 2.2rem;
//           }
          
//           .placement-hero-section p {
//             font-size: 1rem;
//           }
          
//           .placement-image-container {
//             height: 200px;
//           }
//         }
        
//         @media (max-width: 576px) {
//           .placement-hero-section h1 {
//             font-size: 1.8rem;
//           }
          
//           .stat-card {
//             padding: 1.5rem !important;
//           }
          
//           .stat-card h2 {
//             font-size: 2.5rem;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Placement;import React, { useEffect, useState } from "react";











import React, { useEffect, useState } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaBuilding, FaHandshake, FaMoneyBillWave } from "react-icons/fa";
import { BASE_API_URL, Img_BASE_URL } from "../../BaseAPI";

const API_URL = `${BASE_API_URL}/placements`;
const IMG_URL = `${Img_BASE_URL}`;

const COMPANY_LOGOS = [
  "https://mms.businesswire.com/media/20190123005482/en/594194/23/Wiprologo1.jpg",
  "https://indiancompanies.in/wp-content/uploads/2020/05/TCS-Logo-Tata-consultancy-service-1920x1144.png",
  "https://logowik.com/content/uploads/images/cognizant-new-20223302.jpg",
  "https://pngimg.com/uploads/ibm/ibm_PNG19658.png",
  "https://logos-world.net/wp-content/uploads/2020/11/HP-Logo.png",
];

const Placement = () => {
  const [placements, setPlacements] = useState([]);

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: false,
    });

    const fetchPlacements = async () => {
      try {
        const res = await axios.get(API_URL);
        setPlacements(res.data);
      } catch (err) {
        console.error("Error fetching placements:", err);
      }
    };
    fetchPlacements();
  }, []);

  return (
    <div className="placement-container">
      {/* Placement Info Section */}
      <div className="placement-row" data-aos="fade-up">
        <div className="placement-left">
          <h2>🚀 100% Placements</h2>
          <p>
            SDVS'S BCA College invites recruiters from across the globe. 
          </p>
          <p>
            Our
            students are future-ready, skilled, and committed to excellence.
          </p>
        </div>
        <div className="placement-right">
          <button className="placement-know-more-btn"
          onClick={() => window.location.href = '/placements'}
          >KNOW MORE</button>
          <div className="placement-percent-box">
            <span className="placement-percentage">100%</span>
            <div className="placement-percent-text">
              Placement Rate <br /> Over the Years
            </div>
          </div>
        </div>
      </div>

      {/* Auto Scroll Placement Cards */}
      <div className="placement-marquee">
        <div className="placement-marquee-content">
          {placements.concat(placements).map((placement, index) => (
            <div
              className="placement-marquee-card"
              key={index}
              data-aos="fade-up"
              data-aos-delay={index % 6 * 100}
            >
              {placement.image && (
                <img
                  src={`${IMG_URL}${placement.image}`}
                  alt={placement.studentname}
                  className="placement-marquee-img"
                />
              )}
              <h3 className="placement-student-name">
                {placement.studentname}, {placement.course} ({placement.batch})
              </h3>
              <p className="placement-company">
                <FaBuilding /> {placement.company}
              </p>
              <p className="placement-package">
                <FaMoneyBillWave /> {placement.package} LPA
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Recruiters Section */}
      <div className="placement-recruiters-section" data-aos="fade-up">
        <h2>
          <FaHandshake /> Some of Our Esteemed Recruiters
        </h2>
        <div className="placement-recruiters-marquee">
          <div className="placement-recruiters-content">
            {COMPANY_LOGOS.concat(COMPANY_LOGOS).map((logo, index) => (
              <div className="placement-logo-card" key={index}>
                <img src={logo} alt={`Recruiter-${index}`} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CSS Styling */}
      <style jsx>{`
        /* --- Placement Info Section --- */
        .placement-row {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: linear-gradient(135deg, #014d5a, #013b45);
          color: white;
          padding: 30px 40px;
          margin: 0 auto 30px;
          box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.2);
        }
        .placement-left h2 {
          margin: 0;
          font-size: 32px;
          font-weight: 800;
          color: #ffcc00;
        }
        .placement-left p {
          margin: 10px 0 0;
          font-size: 16px;
          opacity: 0.9;
          line-height: 1.4;
        }
        .placement-right {
          display: flex;
          align-items: center;
          gap: 25px;
        }
        .placement-percent-box {
          background: white;
          color: #014d5a;
          padding: 18px 24px;
          border-radius: 10px;
          text-align: center;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
        }
        .placement-percentage {
          font-size: 34px;
          font-weight: 800;
          color: #ff8c00;
        }
        .placement-percent-text {
          font-size: 14px;
          font-weight: 600;
          margin-top: 5px;
        }
        .placement-know-more-btn {
          background: #ff8c00;
          color: white;
          border: none;
          padding: 12px 24px;
          font-size: 15px;
          font-weight: bold;
          cursor: pointer;
          border-radius: 8px;
          transition: 0.3s ease;
        }
        .placement-know-more-btn:hover {
          background: #e67e00;
          transform: translateY(-2px);
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        }

        /* Responsive Info Section */
        @media (max-width: 768px) {
          .placement-row {
            flex-direction: column;
            text-align: center;
            gap: 20px;
            padding: 20px;
          }
          .placement-right {
            flex-direction: column-reverse;
          }
        }

        /* --- Placement Marquee --- */
        .placement-marquee {
          overflow: hidden;
          white-space: nowrap;
          width: 100%;
          background: #f9f9f9;
          padding: 20px 0;
        }
        .placement-marquee-content {
          display: inline-flex;
          gap: 30px;
          animation: placement-marquee-left 25s linear infinite;
        }
        .placement-marquee-card {
          flex: 0 0 auto;
          text-align: center;
          background: #fff;
          border-radius: 12px;
          padding: 15px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          min-width: 250px;
        }
        .placement-marquee-img {
          width: 200px;
          height: 230px;
          object-fit: cover;
          border-radius: 12px;
          margin-bottom: 10px;
        }
        .placement-student-name {
          font-size: 16px;
          font-weight: bold;
          margin-bottom: 8px;
        }
        .placement-company,
        .placement-package {
          font-size: 14px;
          margin: 4px 0;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }
        @keyframes placement-marquee-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        /* --- Recruiters Section --- */
        .placement-recruiters-section {
          width: 100%;
          text-align: center;
          margin: 40px 0;
        }
        .placement-recruiters-section h2 {
          font-size: 26px;
          font-weight: 700;
          color: #014d5a;
          margin-bottom: 20px;
        }
        .placement-recruiters-marquee {
          overflow: hidden;
          white-space: nowrap;
          width: 100%;
          background: #ffffff;
          padding: 15px 0;
        }
        .placement-recruiters-content {
          display: inline-flex;
          gap: 50px;
          animation: placement-marquee-right 25s linear infinite;
        }
        .placement-logo-card img {
          height: 50px;
          object-fit: contain;
          filter: grayscale(20%);
          transition: transform 0.3s ease;
        }
        .placement-logo-card img:hover {
          transform: scale(1.1);
          filter: none;
        }
        @keyframes placement-marquee-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Placement;

