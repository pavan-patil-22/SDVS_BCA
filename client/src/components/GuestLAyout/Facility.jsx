import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaTv } from "react-icons/fa";
import { BASE_API_URL, Img_BASE_URL } from "../../BaseAPI";

const Facility = () => {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
    
    const fetchFacilities = async () => {
      try {
        const res = await axios.get( `${BASE_API_URL}/facilities`);
        setFacilities(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchFacilities();
  }, []);

  return (
    <div className="facilities-page">
      {/* Hero Section */}
      <section className="facilities-hero">
        <div className="hero-content">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8 text-center">
                <h1 className="hero-title" data-aos="fade-down">
                  Our <span className="text-highlight">Facilities</span>
                </h1>
                <p className="hero-subtitle" data-aos="fade-up" data-aos-delay="200">
                  Discover our state-of-the-art infrastructure designed to provide 
                  the perfect environment for learning, innovation, and growth
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Container className="mt-5 mb-5 facilities-container">
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border" style={{ color: '#1f3b88' }} role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading facilities...</p>
          </div>
        ) : facilities.length === 0 ? (
          <div className="text-center py-5 no-facilities">
            <i className="fas fa-building fa-3x mb-3 text-muted"></i>
            <h4>No Facilities Available</h4>
            <p className="text-muted">Check back later for updates on our facilities</p>
          </div>
        ) : (
          <>
            <h2 className="text-center mb-5 section-title" data-aos="fade-down">
              Explore Our <span className="text-highlight">Facilities</span>
            </h2>
            
            {facilities.map((f, index) => (
              <div
                key={f._id}
                className={`d-flex flex-column ${index % 2 === 0 ? "flex-md-row" : "flex-md-row-reverse"} align-items-center mb-5 position-relative facility-item`}
                style={{ minHeight: "400px" }}
                data-aos={index % 2 === 0 ? "fade-up" : "fade-down"}
              >
                {/* Text Card with overlapping effect */}
                <div
                  className="p-4 shadow bg-white facility-card"
                  style={{
                    flex: "0 0 55%",
                    borderTop: "5px solid #f5a623",
                    zIndex: 2,
                    position: "relative",
                    marginRight: index % 2 === 0 ? "-80px" : "0",
                    marginLeft: index % 2 !== 0 ? "-80px" : "0",
                    borderRadius: "8px",
                  }}
                >
                  {/* Icon with background */}
                  <div className="text-center mb-3 icon-container">
                    <div className="icon-bg">
                      <span style={{ fontSize: "24px", color: "#fff" }}><FaTv /></span>
                    </div>
                  </div>
                  
                  <h3 className="fw-bold text-uppercase facility-title">{f.title}</h3>
                  <p className="facility-description" style={{ lineHeight: "1.7", textAlign: "justify" }}>
                    {f.description}
                  </p>
                  
                  {/* Decorative elements */}
                  <div className="facility-decoration">
                    <div className="decoration-line"></div>
                    <div className="decoration-dot"></div>
                  </div>
                </div>

                {/* Image with shadow and border */}
                {f.image && (
                  <div
                    className="shadow facility-image-container"
                    style={{
                      flex: 1,
                      zIndex: 1,
                      borderRadius: "8px",
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    <img
                      src={`${Img_BASE_URL}${f.image}`}
                      alt={f.title}
                      className="facility-image"
                      style={{
                        width: "100%",
                        height: "350px",
                        objectFit: "cover",
                      }}
                    />
                    
                    {/* Image overlay effect */}
                    <div className="image-overlay"></div>
                  </div>
                )}
              </div>
            ))}
          </>
        )}
      </Container>
      
      <style>{`
        .facilities-page {
          background-color: #f8f9fb;
        }
        
        /* Hero Section Styles */
        .facilities-hero {
          position: relative;
          background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), 
                     url('bg_pic.jpeg');
          background-size: cover;
          background-position: center;
          color: white;
          padding: 100px 0 80px;
          overflow: hidden;
        }
        
        .hero-content {
          position: relative;
          z-index: 2;
        }
        
        .hero-title {
          font-size: 3.5rem;
          font-weight: 700;
          margin-bottom: 20px;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
        }
        
        .text-highlight {
          color: #f5a623;
          font-weight: 800;
        }
        
        .hero-subtitle {
          font-size: 1.3rem;
          margin-bottom: 40px;
          opacity: 0.9;
          line-height: 1.6;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
        }
        
        /* Facilities Container */
        .facilities-container {
          padding-top: 50px;
        }
        
        .section-title {
          font-size: 2.5rem;
          font-weight: 700;
          position: relative;
          padding-bottom: 15px;
          color: #1f3b88;
          display: inline-block;
        }
        
        .section-title:after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 50px;
          height: 3px;
          background: #f5a623;
        }
        
        .facility-item {
          margin: 80px 0;
        }
        
        .facility-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          padding: 30px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1) !important;
        }
        
        .facility-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(0,0,0,0.15) !important;
        }
        
        .icon-container {
          margin-top: -50px;
        }
        
        .icon-bg {
          display: inline-flex;
          justify-content: center;
          align-items: center;
          width: 60px;
          height: 60px;
          background: #1f3b88;
          border-radius: 50%;
          box-shadow: 0 5px 15px rgba(31, 59, 136, 0.3);
        }
        
        .facility-title {
          color: #1f3b88;
          font-size: 1.8rem;
          margin: 15px 0;
          position: relative;
          padding-bottom: 10px;
        }
        
        .facility-title:after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 50px;
          height: 2px;
          background-color: #f5a623;
        }
        
        .facility-description {
          color: #333;
          font-size: 1.05rem;
        }
        
        .facility-decoration {
          position: absolute;
          bottom: -20px;
          right: 30px;
          display: flex;
          align-items: center;
        }
        
        .decoration-line {
          width: 40px;
          height: 2px;
          background-color: #f5a623;
          margin-right: 10px;
        }
        
        .decoration-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: #1f3b88;
        }
        
        .facility-image-container {
          transition: transform 0.3s ease;
          box-shadow: 0 15px 30px rgba(0,0,0,0.15) !important;
          border: 8px solid #fff;
        }
        
        .facility-image-container:hover {
          transform: scale(1.03);
        }
        
        .image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.1) 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .facility-image-container:hover .image-overlay {
          opacity: 1;
        }
        
        .no-facilities {
          background: white;
          padding: 50px;
          border-radius: 15px;
          box-shadow: 0 5px 20px rgba(0,0,0,0.08);
        }
        
        /* Responsive Design */
        @media (max-width: 992px) {
          .hero-title {
            font-size: 2.8rem;
          }
          
          .hero-subtitle {
            font-size: 1.1rem;
          }
          
          .facility-card {
            margin: 0 !important;
            flex: 0 0 100% !important;
            margin-bottom: -40px !important;
            z-index: 3;
          }
          
          .facility-image-container {
            z-index: 1;
          }
        }
        
        @media (max-width: 768px) {
          .facilities-hero {
            padding: 80px 0 60px;
          }
          
          .hero-title {
            font-size: 2.3rem;
          }
          
          .facility-card {
            margin: 0 !important;
            flex: 0 0 100% !important;
            margin-bottom: -40px !important;
            z-index: 3;
          }
        }
        
        @media (max-width: 576px) {
          .hero-title {
            font-size: 2rem;
          }
          
          .hero-subtitle {
            font-size: 1rem;
          }
          
          .section-title {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Facility;