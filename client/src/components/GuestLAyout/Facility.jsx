import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaTv, FaWifi, FaBook, FaDesktop, FaFlask, FaUtensils, FaDumbbell, FaFirstAid } from "react-icons/fa";
import { BASE_API_URL, Img_BASE_URL } from "../../BaseAPI";

const Facility = () => {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);

  // Icon mapping for different facility types
  const getFacilityIcon = (title) => {
    const titleLower = title.toLowerCase();
    
    if (titleLower.includes('library')) return <FaBook />;
    if (titleLower.includes('computer') || titleLower.includes('lab')) return <FaDesktop />;
    if (titleLower.includes('wifi') || titleLower.includes('internet')) return <FaWifi />;
    if (titleLower.includes('science') || titleLower.includes('lab')) return <FaFlask />;
    if (titleLower.includes('canteen') || titleLower.includes('cafeteria')) return <FaUtensils />;
    if (titleLower.includes('gym') || titleLower.includes('sports')) return <FaDumbbell />;
    if (titleLower.includes('medical') || titleLower.includes('health')) return <FaFirstAid />;
    return <FaTv />; // default icon
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
    
    const fetchFacilities = async () => {
      try {
        const res = await axios.get(`${BASE_API_URL}/facilities`);
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
                className={`facility-item-wrapper ${index % 2 === 0 ? "facility-even" : "facility-odd"}`}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="facility-item">
                  {/* Text Card */}
                  <div className="facility-card">
                    <div className="icon-container">
                      <div className="icon-bg">
                        <span style={{ fontSize: "24px", color: "#fff" }}>
                          {getFacilityIcon(f.title)}
                        </span>
                      </div>
                    </div>
                    
                    <h3 className="facility-title">{f.title}</h3>
                    <p className="facility-description">
                      {f.description}
                    </p>
                    
                    <div className="facility-decoration">
                      <div className="decoration-line"></div>
                      <div className="decoration-dot"></div>
                    </div>
                  </div>

                  {/* Image Container with 16:9 aspect ratio */}
                  <div className="facility-image-wrapper">
                    {f.image && (
                      <div className="facility-image-container">
                        <img
                          src={`${Img_BASE_URL}${f.image}`}
                          alt={f.title}
                          className="facility-image"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `https://via.placeholder.com/600x338/1f3b88/ffffff?text=${encodeURIComponent(f.title)}`;
                          }}
                        />
                        <div className="image-overlay"></div>
                      </div>
                    )}
                  </div>
                </div>
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
        
        /* Facility Item Layout */
        .facility-item-wrapper {
          margin: 60px 0;
        }
        
        .facility-item {
          display: flex;
          flex-direction: column;
          gap: 30px;
          position: relative;
        }
        
        /* For desktop - side by side layout */
        @media (min-width: 992px) {
          .facility-item {
            flex-direction: row;
            align-items: center;
            gap: 40px;
          }
          
          .facility-even .facility-card {
            order: 1;
          }
          
          .facility-even .facility-image-wrapper {
            order: 2;
          }
          
          .facility-odd .facility-card {
            order: 2;
          }
          
          .facility-odd .facility-image-wrapper {
            order: 1;
          }
          
          .facility-card {
            flex: 0 0 55%;
            margin-top: -40px;
            z-index: 2;
          }
          
          .facility-image-wrapper {
            flex: 0 0 45%;
          }
          
          .facility-even .facility-card {
            margin-left: -40px;
          }
          
          .facility-odd .facility-card {
            margin-right: -40px;
          }
        }
        
        /* Facility Card */
        .facility-card {
          background: white;
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          border-top: 5px solid #f5a623;
          position: relative;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .facility-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(0,0,0,0.15);
        }
        
        .icon-container {
          text-align: center;
          margin-top: -50px;
          margin-bottom: 20px;
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
          font-weight: bold;
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
          line-height: 1.7;
          text-align: justify;
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
        
        /* Image Container with 16:9 aspect ratio */
        .facility-image-wrapper {
          position: relative;
        }
        
        .facility-image-container {
          position: relative;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 15px 30px rgba(0,0,0,0.15);
          border: 8px solid white;
          transition: transform 0.3s ease;
          aspect-ratio: 16/9; /* This ensures 16:9 aspect ratio */
          width: 100%;
        }
        
        .facility-image-container:hover {
          transform: scale(1.03);
        }
        
        .facility-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
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
        @media (max-width: 1199px) {
          .hero-title {
            font-size: 3rem;
          }
          
          .section-title {
            font-size: 2.2rem;
          }
        }
        
        @media (max-width: 991px) {
          .facilities-hero {
            padding: 80px 0 60px;
          }
          
          .hero-title {
            font-size: 2.5rem;
          }
          
          .hero-subtitle {
            font-size: 1.1rem;
          }
          
          .section-title {
            font-size: 2rem;
          }
          
          .facility-item {
            gap: 20px;
          }
          
          .facility-card {
            margin: 0 !important;
            padding: 25px;
          }
          
          .icon-container {
            margin-top: -40px;
          }
          
          .facility-image-container {
            aspect-ratio: 16/9;
            max-width: 100%;
            margin: 0 auto;
          }
        }
        
        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.2rem;
          }
          
          .section-title {
            font-size: 1.8rem;
          }
          
          .facility-title {
            font-size: 1.6rem;
          }
          
          .facility-description {
            font-size: 1rem;
          }
          
          .facility-image-container {
            aspect-ratio: 16/9;
            max-width: 100%;
          }
        }
        
        @media (max-width: 576px) {
          .facilities-hero {
            padding: 70px 0 50px;
          }
          
          .hero-title {
            font-size: 1.8rem;
          }
          
          .hero-subtitle {
            font-size: 1rem;
            padding: 0 15px;
          }
          
          .section-title {
            font-size: 1.6rem;
          }
          
          .facility-card {
            padding: 20px;
          }
          
          .icon-container {
            margin-top: -35px;
          }
          
          .icon-bg {
            width: 50px;
            height: 50px;
          }
          
          .facility-title {
            font-size: 1.4rem;
          }
          
          .facility-image-container {
            aspect-ratio: 16/9;
            border-width: 5px;
          }
          
          .facility-description {
            font-size: 0.95rem;
          }
        }
        
        @media (max-width: 400px) {
          .hero-title {
            font-size: 1.6rem;
          }
          
          .section-title {
            font-size: 1.4rem;
          }
          
          .facility-title {
            font-size: 1.3rem;
          }
        }
        
        /* Ensure images maintain 16:9 on all devices */
        .facility-image-container {
          aspect-ratio: 16/9;
          width: 100%;
        }
        
        /* Fallback for browsers that don't support aspect-ratio */
        @supports not (aspect-ratio: 16/9) {
          .facility-image-container::before {
            content: '';
            display: block;
            padding-top: 56.25%; /* 9/16 = 0.5625 = 56.25% */
          }
          
          .facility-image {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default Facility;