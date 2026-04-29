import React from "react";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaHome,
  FaBook,
  FaUserGraduate,
  FaAddressBook,
  FaInstagram,
  FaFacebookF,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const GuestFooter = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  const copyrightYear = currentYear > 2025 ? `2025-${currentYear}` : "2025";

  const handleClick = (e) => {
    e.preventDefault();
    navigate("/contact");
    setTimeout(() => {
      window.scrollTo({ top: 700, behavior: "smooth" });
    }, 100);
  };

  return (
    <footer
      style={{
        background: "#093037ff",
        color: "white",
        fontFamily: "Arial, sans-serif",
        padding: "40px 20px 25px",
        textAlign: "center",
      }}
    >
      {/* Animated Heading */}
      <h2
        style={{
          marginBottom: "35px",
          fontSize: "2.5rem",
          fontWeight: "bold",
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "4px",
        }}
      >
        {[
          { char: "L", delay: "0s" },
          { char: "E", delay: "0.1s" },
          { char: "T", delay: "0.2s" },
          { char: "'", delay: "0.3s" },
          { char: "S", delay: "0.4s" },
          { char: " ", delay: null },
          { char: "G", delay: "0.5s" },
          { char: "E", delay: "0.6s" },
          { char: "T", delay: "0.7s" },
          { char: " ", delay: null },
          { char: "I", delay: "0.8s" },
          { char: "N", delay: "0.9s" },
          { char: " ", delay: null },
          { char: "T", delay: "1s" },
          { char: "O", delay: "1.1s" },
          { char: "U", delay: "1.2s" },
          { char: "C", delay: "1.3s" },
          { char: "H", delay: "1.4s" },
        ].map((item, index) =>
          item.char === " " ? (
            <span key={index}>&nbsp;</span>
          ) : (
            <span
              key={index}
              className="letter"
              style={{ "--delay": item.delay }}
            >
              {item.char}
            </span>
          )
        )}
      </h2>

      {/* Footer Content - Flexbox for better alignment */}
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto 30px auto",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          gap: "20px",
          textAlign: "center",
        }}
      >
        {/* About Us */}
        <div style={{ flex: "1", minWidth: "200px", textAlign: "center" }}>
          <h3 style={{ marginBottom: "15px", fontSize: "1.2rem", fontWeight: "600", color: "#fff" }}>
            About Us
          </h3>
          <div style={{ width: "50px", height: "3px", background: "#ff5722", marginBottom: "15px", margin: "0 auto 15px auto" }}></div>
          <p style={{ fontSize: "0.85rem", lineHeight: 1.6, color: "#ddd" }}>
            SDVS's BCA College Sankeshwar is committed to providing quality
            education and shaping bright futures.
          </p>
        </div>

        {/* Contact */}
        <div style={{ flex: "1", minWidth: "200px", textAlign: "center" }}>
          <h3 style={{ marginBottom: "15px", fontSize: "1.2rem", fontWeight: "600", color: "#fff" }}>
            Contact
          </h3>
          <div style={{ width: "50px", height: "3px", background: "#ff5722", marginBottom: "15px", margin: "0 auto 15px auto" }}></div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", alignItems: "center", justifyContent: "center" }}>
            <p style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.85rem", color: "#ddd" }}>
              <FaMapMarkerAlt color="#ff5722" size={14} />
              <span>Sankeshwar, Karnataka</span>
            </p>
            <p style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.85rem", color: "#ddd" }}>
              <FaPhone color="#ff5722" size={14} />
              <span>+91 9448636015</span>
            </p>
            <p style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.85rem", color: "#ddd" }}>
              <FaEnvelope color="#ff5722" size={14} />
              <span>sdvssbca2007@gmail.com</span>
            </p>
          </div>
        </div>

        {/* Quick Links */}
        <div style={{ flex: "1", minWidth: "160px", textAlign: "center" }}>
          <h3 style={{ marginBottom: "15px", fontSize: "1.2rem", fontWeight: "600", color: "#fff" }}>
            Quick Links
          </h3>
          <div style={{ width: "50px", height: "3px", background: "#ff5722", marginBottom: "15px", margin: "0 auto 15px auto" }}></div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center", justifyContent: "center" }}>
            <a href="/" style={{ color: "#ddd", textDecoration: "none", fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "8px", transition: "color 0.3s", cursor: "pointer" }} onMouseEnter={(e) => e.target.style.color = "#ff5722"} onMouseLeave={(e) => e.target.style.color = "#ddd"}>
              <FaHome size={12} /> Home
            </a>
            <a href="/events" style={{ color: "#ddd", textDecoration: "none", fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "8px", transition: "color 0.3s", cursor: "pointer" }} onMouseEnter={(e) => e.target.style.color = "#ff5722"} onMouseLeave={(e) => e.target.style.color = "#ddd"}>
              <FaBook size={12} /> Events
            </a>
            <a href="/contact" style={{ color: "#ddd", textDecoration: "none", fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "8px", transition: "color 0.3s", cursor: "pointer" }} onMouseEnter={(e) => e.target.style.color = "#ff5722"} onMouseLeave={(e) => e.target.style.color = "#ddd"}>
              <FaAddressBook size={12} /> Contact
            </a>
            <a href="/contact" onClick={handleClick} style={{ color: "#ddd", textDecoration: "none", fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "8px", transition: "color 0.3s", cursor: "pointer" }} onMouseEnter={(e) => e.target.style.color = "#ff5722"} onMouseLeave={(e) => e.target.style.color = "#ddd"}>
              <FaUserGraduate size={12} /> Admissions
            </a>
          </div>
        </div>

        {/* Address */}
        <div style={{ flex: "1", minWidth: "200px", textAlign: "center" }}>
          <h3 style={{ marginBottom: "15px", fontSize: "1.2rem", fontWeight: "600", color: "#fff" }}>
            Campus Address
          </h3>
          <div style={{ width: "50px", height: "3px", background: "#ff5722", marginBottom: "15px", margin: "0 auto 15px auto" }}></div>
          <p style={{ fontSize: "0.85rem", lineHeight: 1.6, color: "#ddd" }}>
            SDVS's BCA College <br />
            Nipani Road, Sankeshwar <br />
            Hukkeri Taluk, Belagavi Dist <br />
            Karnataka - 591313
          </p>
        </div>
      </div>

      {/* Social Media Icons - Only Instagram & Facebook */}
      <div
        style={{
          padding: "20px 0 15px",
          // borderTop: "1px solid rgba(255,255,255,0.1)",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          marginBottom: "15px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
          }}
        >
          {/* Instagram Icon */}
          <a
            href="https://www.instagram.com/sdvss_bca_sankeshwar"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "38px",
              height: "38px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.1)",
              color: "white",
              transition: "all 0.3s ease",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "radial-gradient(circle at 30% 110%, #fdf497 0%, #fd5949 45%, #d6249f 60%, #285aeb 90%)";
              e.currentTarget.style.transform = "translateY(-3px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.1)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
            aria-label="Instagram"
          >
            <FaInstagram size={18} />
          </a>

          {/* Facebook Icon */}
          <a
            href="https://www.instagram.com/sdvss_bca_sankeshwar"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "38px",
              height: "38px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.1)",
              color: "white",
              transition: "all 0.3s ease",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#1877f2";
              e.currentTarget.style.transform = "translateY(-3px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.1)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
            aria-label="Facebook"
          >
            <FaFacebookF size={18} />
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div style={{ fontSize: "0.7rem", color: "#888" }}>
        © Copyright {copyrightYear} All rights reserved | Powered by{" "}
        <a
          href="https://ligandsoftware.com/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#ff5722", textDecoration: "none" }}
        >
          Ligand Software Solutions
        </a>
      </div>

      {/* Styles */}
      <style>{`
        .letter {
          display: inline-block;
          font-weight: bold;
          font-size: 2.5rem;
          color: #ff5722;
          animation: letterWave 1.5s ease-in-out infinite;
          animation-delay: var(--delay);
        }

        @keyframes letterWave {
          0% {
            transform: translateY(0) scale(1);
            color: #e7dadaff;
          }
          30% {
            transform: translateY(-8px) scale(1.15);
            color: #ff9800;
          }
          60% {
            transform: translateY(4px) scale(1.05);
            color: #d35a35ff;
          }
          100% {
            transform: translateY(0) scale(1);
            color: #d79090ff;
          }
        }

        /* Quick Links Hover */
        a:hover {
          color: #ff5722 !important;
        }

        /* Desktop - 768px and above */
        @media (min-width: 769px) {
          footer {
            padding: 40px 20px 25px !important;
          }
          
          footer > div:nth-of-type(2) {
            flex-wrap: wrap;
            justify-content: space-around;
            gap: 30px;
          }
          
          footer > div:nth-of-type(2) > div {
            flex: 1;
            min-width: 200px;
            text-align: center;
          }
          
          footer > div:nth-of-type(2) > div h3,
          footer > div:nth-of-type(2) > div p,
          footer > div:nth-of-type(2) > div a {
            color: inherit;
          }
          
          .letter {
            font-size: 2.5rem !important;
          }
          
          h2 {
            font-size: 2.5rem !important;
          }
        }

        /* Tablet - 481px to 768px */
        @media (min-width: 481px) and (max-width: 768px) {
          footer {
            padding: 30px 15px 20px !important;
          }
          
          footer > div:nth-of-type(2) {
            flex-wrap: wrap;
            justify-content: center;
            gap: 30px !important;
          }
          
          footer > div:nth-of-type(2) > div {
            flex: 1;
            min-width: 160px;
            text-align: center;
          }
          
          .letter {
            font-size: 2rem !important;
          }
          
          h2 {
            font-size: 2rem !important;
            margin-bottom: 25px !important;
          }
          
          footer > div:nth-of-type(3) {
            padding: 15px 0 !important;
          }
        }

        /* Mobile - Below 480px */
        @media (max-width: 480px) {
          footer {
            padding: 25px 12px 15px !important;
          }
          
          footer > h2 {
            margin-bottom: 20px !important;
          }
          
          footer > div:nth-of-type(2) {
            flex-direction: column !important;
            margin: 0 auto 20px !important;
            gap: 30px !important;
            justify-content: center !important;
          }
          
          footer > div:nth-of-type(2) > div {
            flex: 1 !important;
            min-width: 100% !important;
            text-align: center !important;
            width: 100% !important;
          }
          
          footer > div:nth-of-type(2) > div h3 {
            font-size: 1.05rem !important;
            margin-bottom: 12px !important;
            color: #fff !important;
          }
          
          footer > div:nth-of-type(2) > div p,
          footer > div:nth-of-type(2) > div a {
            font-size: 0.8rem !important;
            text-align: center !important;
            color: #ddd !important;
          }
          
          footer > div:nth-of-type(2) > div div {
            align-items: center !important;
            justify-content: center !important;
          }
          
          .letter {
            font-size: 1.5rem !important;
          }
          
          h2 {
            font-size: 1.5rem !important;
            gap: 2px !important;
            margin-bottom: 20px !important;
          }
          
          footer > div:nth-of-type(3) {
            padding: 15px 0 !important;
            margin-bottom: 10px !important;
          }
          
          footer > div:nth-of-type(3) > div {
            gap: 15px !important;
          }
          
          footer > div:nth-of-type(4) {
            font-size: 0.65rem !important;
          }
        }

        /* Extra small phones - Below 360px */
        @media (max-width: 360px) {
          footer {
            padding: 20px 8px 12px !important;
          }
          
          .letter {
            font-size: 1.2rem !important;
          }
          
          h2 {
            font-size: 1.2rem !important;
            gap: 1px !important;
          }
          
          footer > div:nth-of-type(2) > div h3 {
            font-size: 1rem !important;
          }
          
          footer > div:nth-of-type(2) > div p,
          footer > div:nth-of-type(2) > div a {
            font-size: 0.75rem !important;
          }
        }
      `}</style>
    </footer>
  );
};

export default GuestFooter;