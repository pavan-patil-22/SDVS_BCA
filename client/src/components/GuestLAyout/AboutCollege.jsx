import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import BoardOfDirectors from "./BoardOfDirectors";

const AboutCollege = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: false,
    });
  }, []);

  // Principals data
  const principals = [
    { period: "2007-2009", name: "Prof. S. S. Patil" },
    { period: "2009-2010", name: "Prof B. I. Hebbali" },
    { period: "2010-2012", name: "Prof. D. S. Khade" },
    { period: "2012-2013", name: "Prof. B. I. Hebbali" },
    { period: "2013-2015", name: "Prof. G. L. Badiger" },
    { period: "2015-till date", name: "Prof. B. I. Hebbali" },
  ];

  // Local Governing Body Members with image paths
  const governingBodyMembers = [
    
    { 
      name: "Shri. R. B. Patil", 
      position: "Chairman LGB",
      image: "r.b.patil l.g.b president.JPG" 
    },
    { 
      name: "Shri. G. C. Kotagi", 
      position: "Secretory SDVS'S,Member",
      image: "SECRETORY G.C.KOTAGI.JPG" 
    },
    { 
      name: "Dr. B. A. Pujari", 
      position: "Administrator SDVS'S,Member",
      image: "B.A. PUJARI ADMINISTRATOR.JPG" 
    },
    { 
      name: "Shri. K. C. Shirakoli", 
      position: "Member",
      image: "K. C. Shirakoli.JPG" 
    },
    { 
      name: "Shri. Mallappa Hukkeri", 
      position: "Member",
      image: "L.G.B MEMBER MALLAPPA HUKKERI.JPG" 
    },
    { 
      name: "Shri. Nitin Jadhav", 
      position: "Member",
      image: "governing-body/nitin-jadhav.jpg" 
    },
    { 
      name: "Shri. S. M. Patil", 
      position: "Member",
      image: "L.G.B MEMEBER S.M.PATIL.JPG" 
    },
    { 
      name: "Dr. P. S. Manoli", 
      position: "Member",
      image: "DR P.S.MANNOLI L.G.B MEMBER.JPG" 
    },
    
    { 
      name: "Prof. B.I. Hebbali", 
      position: "Secretary",
      image: "B.I.HEBBALI PRINCIPAL.JPG" 
    },
    { 
      name: "Prof. R.G. Bagewadi", 
      position: "Staff Representative",
      image: "H.O.D R.G.BAGEWADI.JPG" 
    },
  ];

  // Rules & Regulations
  const rulesRegulations = [
    "Students are informed not to move in the corridors and disturb other classes.",
    "If they do not have classes they are advised to be either in the library or in Gymkhana Hall.",
    "The students are informed to maintain perfect discipline in the college campus.",
    "The students are advised to be in constant touch with the Students Welfare Officer and other members of staff for any of their difficulties.",
    "The students are requested to Co-operate with the college authorities in maintaining the campus clean.",
    "Students are requested to participate actively in all activities of the college.",
    "Raging and Use of Cell Phones are prohibited and punishable.",
    "Wearing of the prescribed chest identity cards in the college campus is compulsory.",
    "Tobbaco, Gutkha chewing and smoking in the college campus is strictly prohibited.",
    "Prior permission of the Principal is mandatory for college tours and excursions.",
  ];

  return (
    <div className="about-college-page">
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .about-college-page {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #333;
          background-color: #f8f9fb;
          width: 100%;
          overflow-x: hidden;
        }
        
        .college-hero-section {
          background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), 
                     url('bg_pic.jpeg');
          background-size: cover;
          background-position: center;
          padding: 100px 20px;
          text-align: center;
          position: relative;
        }
        
        .college-hero-section h1 {
          font-size: 48px;
          margin-bottom: 20px;
          text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.8);
          color: #fff;
          font-weight: 700;
        }
        
        .college-hero-section p {
          font-size: 22px;
          margin-bottom: 30px;
          color: #fff;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
          text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
        }
        
        .hero-divider {
          width: 120px;
          height: 4px;
          background: #f5a623;
          margin: 20px auto;
          border-radius: 2px;
        }
        
        .section-title {
          font-size: 36px;
          color: #1f3b88;
          font-weight: bold;
          margin-bottom: 20px;
          position: relative;
          display: inline-block;
          padding-bottom: 15px;
        }
        
        .section-title:after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 4px;
          background: #f5a623;
          border-radius: 2px;
        }
        
        .sub-title {
          color: #1f3b88;
          font-weight: bold;
          font-size: 26px;
          margin-bottom: 25px;
          border-left: 5px solid #f5a623;
          padding-left: 20px;
          line-height: 1.3;
        }
        
        .content-text {
          font-size: 17px;
          line-height: 1.8;
          color: #444;
          margin-bottom: 20px;
          text-align: justify;
          text-align-last: left;
          word-spacing: 0.1em;
          letter-spacing: 0.01em;
        }
        
        .highlight-box {
          background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
          border-radius: 12px;
          padding: 30px;
          margin-bottom: 30px;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
          border: 1px solid #eaeaea;
        }
        
        .card {
          background: white;
          border-radius: 10px;
          padding: 30px;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
          min-height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
        }
        
        .vision-card {
          border-top: 5px solid #4CAF50;
        }
        
        .mission-card {
          border-top: 5px solid #2196F3;
        }
        
        .goals-card {
          border-top: 5px solid #FF9800;
        }
        
        .principals-container {
          background: linear-gradient(135deg, #1f3b88 0%, #2c4ba5 100%);
          color: white;
          padding: 40px;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(31, 59, 136, 0.2);
        }
        
        .principals-title {
          color: white;
          font-size: 28px;
          margin-bottom: 30px;
          text-align: center;
          font-weight: 600;
        }
        
        .principals-list {
          list-style-type: none;
          padding: 0;
          margin: 0;
        }
        
        .principals-list li {
          padding: 15px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          display: flex;
          align-items: center;
          transition: all 0.3s ease;
        }
        
        .principals-list li:hover {
          background: rgba(255, 255, 255, 0.1);
          padding-left: 15px;
          border-radius: 8px;
        }
        
        .principals-list li:last-child {
          border-bottom: none;
        }
        
        .principals-list li:before {
          content: '▸';
          color: #f5a623;
          margin-right: 15px;
          font-size: 20px;
          font-weight: bold;
          flex-shrink: 0;
        }
        
        .period-badge {
          background: rgba(255, 255, 255, 0.15);
          color: white;
          padding: 8px 16px;
          border-radius: 25px;
          font-size: 14px;
          margin-right: 20px;
          min-width: 140px;
          text-align: center;
          border: 1px solid rgba(255, 255, 255, 0.3);
          font-weight: 500;
          flex-shrink: 0;
        }
        
        .governing-body-card {
          // background: white;
          border-radius: 12px;
          padding: 30px;
          // box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }
        
        .governing-title {
          color: #1f3b88;
          font-size: 28px;
          margin-bottom: 30px;
          text-align: center;
          font-weight: 600;
        }
        
        .member-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 25px;
          margin-top: 20px;
          width: 100%;
        }
        
        .member-card {
          background: white;
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 5px 18px rgba(0, 0, 0, 0.08);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border: 1px solid #eaeaea;
          display: flex;
          flex-direction: column;
          min-height: 1px;
        }
        
        .member-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 16px 35px rgba(0, 0, 0, 0.14);
        }
        
        .member-image-container {
          aspect-ratio: 4 / 5;
          overflow: hidden;
          position: relative;
          background: #f5f7fa;
          flex-shrink: 0;
          min-height: 220px;
        }
        
        .member-image-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
          display: block;
        }
        
        .member-card:hover .member-image-container img {
          transform: scale(1.08);
        }
        
        .member-info {
          padding: 18px 16px 22px;
          text-align: center;
          background: white;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 6px;
        }
        
        .member-name {
          font-size: 17px;
          font-weight: 700;
          color: #1f3b88;
          margin-bottom: 0;
          line-height: 1.3;
        }
        
        .member-position {
          font-size: 13px;
          color: #6f6f6f;
          line-height: 1.5;
          font-style: italic;
        }
        
        .rules-card {
          border-top: 5px solid #607D8B;
          background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
        }
        
        .rules-list {
          padding-left: 25px;
          margin: 0;
        }
        
        .rules-list li {
          padding: 12px 0;
          border-bottom: 1px solid #eee;
          font-size: 16px;
          color: #444;
        }
        
        .rules-list li:last-child {
          border-bottom: none;
        }
        
        .image-container {
          overflow: hidden;
          border-radius: 12px;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }
        
        .image-container img {
          width: 100%;
          height: auto;
          transition: transform 0.5s ease;
          display: block;
        }
        
        .image-container:hover img {
          transform: scale(1.05);
        }
        
        .stats-container {
          display: flex;
          flex-wrap: wrap;
          gap: 25px;
          justify-content: center;
          margin: 50px 0;
        }
        
        .stat-card {
          background: white;
          border-radius: 12px;
          padding: 35px 25px;
          text-align: center;
          flex: 1;
          min-width: 200px;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
          border-top: 4px solid #1f3b88;
          transition: all 0.3s ease;
        }
        
        .stat-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
        }
        
        .stat-number {
          font-size: 48px;
          font-weight: 800;
          color: #1f3b88;
          margin: 0 0 10px 0;
          line-height: 1;
        }
        
        .stat-label {
          font-size: 16px;
          color: #666;
          font-weight: 500;
          margin: 0;
        }
        
        /* Responsive Grids - Multiple Cards in Row on Mobile */
        @media (min-width: 1200px) {
          .member-grid {
            grid-template-columns: repeat(4, minmax(220px, 1fr));
          }
        }
        
        @media (min-width: 992px) and (max-width: 1199px) {
          .member-grid {
            grid-template-columns: repeat(3, minmax(200px, 1fr));
          }
        }
        
        @media (min-width: 768px) and (max-width: 991px) {
          .member-grid {
            grid-template-columns: repeat(2, minmax(180px, 1fr));
          }
        }
        
        @media (max-width: 767px) {
          .member-grid {
            grid-template-columns: repeat(2, minmax(140px, 1fr));
            gap: 16px;
          }
        }
        
        @media (max-width: 480px) {
          .member-grid {
            grid-template-columns: repeat(2, minmax(120px, 1fr));
            gap: 12px;
            width: 100%;
            margin: 0 auto;
            padding: 0 10px;
          }

          .member-image-container {
            aspect-ratio: 1 / 1;
            min-height: 0;
          }

          .member-name {
            font-size: 15px;
          }

          .member-position {
            font-size: 12px;
          }
        }
        
        /* Responsive Principals Timeline */
        @media (max-width: 768px) {
          .principals-list li {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
            padding: 12px 0;
          }
          
          .principals-list li:before {
            display: none;
          }
          
          .period-badge {
            margin-right: 0;
            margin-bottom: 5px;
            width: 100%;
          }
          
          .principals-list li span:last-child {
            padding-left: 5px;
          }
        }
        
        @media (max-width: 576px) {
          .principals-container {
            padding: 20px;
          }
          
          .principals-title {
            font-size: 22px;
            margin-bottom: 20px;
          }
          
          .period-badge {
            font-size: 12px;
            padding: 6px 12px;
            text-align: center;
            width: 100%;
          }
          
          .principals-list li span:last-child {
            font-size: 16px;
            text-align: center;
            width: 100%;
          }
        }
        
        /* Other Responsive Styles */
        @media (max-width: 992px) {
          .college-hero-section h1 {
            font-size: 40px;
          }
        }
        
        @media (max-width: 768px) {
          .college-hero-section {
            padding: 80px 15px;
          }
          
          .college-hero-section h1 {
            font-size: 34px;
          }
          
          .college-hero-section p {
            font-size: 19px;
          }
          
          .section-title {
            font-size: 30px;
          }
          
          .sub-title {
            font-size: 24px;
          }
          
          .card {
            padding: 25px;
          }
          
          .member-image-container {
            height: 280px;
          }
          
          .stat-card {
            min-width: 170px;
            padding: 25px 20px;
          }
          
          .stat-number {
            font-size: 42px;
          }
          
          .about-college-page > div > div {
            flex-direction: column !important;
          }
        }
        
        @media (max-width: 576px) {
          .college-hero-section h1 {
            font-size: 28px;
          }
          
          .college-hero-section p {
            font-size: 16px;
          }
          
          .section-title {
            font-size: 26px;
          }
          
          .sub-title {
            font-size: 20px;
            padding-left: 12px;
            border-left-width: 3px;
          }
          
          .content-text {
            font-size: 15px;
            line-height: 1.6;
          }
          
          .highlight-box {
            padding: 20px;
          }
          
          .rules-list li {
            font-size: 14px;
            padding: 10px 0;
          }
          
          .member-image-container {
            height: 250px;
          }
          
          .member-name {
            font-size: 16px;
          }
          
          .member-position {
            font-size: 12px;
          }
        }
        
        @media (max-width: 480px) {
          .college-hero-section {
            padding: 60px 15px;
          }
          
          .member-image-container {
            height: 220px;
          }
        }
        
        /* Utility Classes */
        .flex-wrap {
          display: flex;
          flex-wrap: wrap;
        }
        
        .gap-30 {
          gap: 30px;
        }
        
        .grid-3-cols {
          display: grid;
          grid-template-columns: repeat(3, minmax(240px, 1fr));
          gap: 30px;
          align-items: start;
          width: 100%;
        }
        
        @media (max-width: 992px) {
          .grid-3-cols {
            grid-template-columns: repeat(2, minmax(220px, 1fr));
          }
        }
        
        @media (max-width: 768px) {
          .grid-3-cols {
            grid-template-columns: 1fr;
          }
        }
        
        @media (max-width: 576px) {
          .grid-3-cols {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* Hero Section */}
      <div className="college-hero-section">
        <div className="hero-content" data-aos="fade-down">
          <h1 className="fw-bold mb-3">SDVS'S BCA COLLEGE</h1>
          <p className="mb-4">
            Bachelor of Computer Applications - Empowering Future IT Professionals Since 2007
          </p>
          <div
            className="hero-divider"
            data-aos="zoom-in"
            data-aos-delay="300"
          ></div>
        </div>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 20px" }}>
        
        {/* Introduction Section */}
        <div style={{ marginBottom: "60px" }}>
          <div style={{ textAlign: "center", marginBottom: "40px" }} data-aos="fade-up">
            <h2 className="section-title">About Our BCA College</h2>
            <p style={{ fontSize: "18px", color: "#666", maxWidth: "800px", margin: "0 auto" }}>
              Excellence in Computer Education with State-of-the-Art Infrastructure
            </p>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "30px", alignItems: "center", marginBottom: "40px" }}>
            <div style={{ flex: "1", minWidth: "280px" }} >
              <div className="image-container">
                <img
                  src="bca-college-building.jpg"
                  alt="BCA College Building"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "Library Building.JPG";
                  }}
                />
              </div>
            </div>
            <div style={{ flex: "1", minWidth: "280px" }} >
              <p className="content-text">
                The Bachelor of Computer Applications (BCA) College at SDVS Sangh was established in 2007 with a vision to provide quality computer education to students in North Karnataka. Over the years, we have grown into a premier institution known for our excellent faculty, state-of-the-art infrastructure, and industry-relevant curriculum.
              </p>
              <p className="content-text">
                Our BCA program is designed to equip students with the knowledge and skills required to excel in the dynamic field of information technology. With a perfect blend of theoretical knowledge and practical exposure, we prepare our students for successful careers in software development, web technologies, database management, and more.
              </p>
            </div>
          </div>
        </div>

        {/* Vision, Mission & Goals Section - Responsive 3 cards row that wraps on mobile */}
        <div style={{ marginBottom: "60px" }}>
          <div style={{ textAlign: "center", marginBottom: "40px" }} data-aos="fade-up">
            <h2 className="section-title">Our Guiding Principles</h2>
          </div>

          <div className="grid-3-cols">
            {/* Vision Card */}
            <div data-aos="fade-up" data-aos-delay="100">
              <div className="card vision-card" style={{ height: "100%" }}>
                <h3 className="sub-title">OUR VISION</h3>
                <p className="content-text">
                  We aim to be a prominent institute where pioneering technology meets transformative learning experiences, empowering students to thrive in a rapidly evolving digital landscape.
                </p>
              </div>
            </div>

            {/* Mission Card */}
            <div data-aos="fade-up" data-aos-delay="200">
              <div className="card mission-card" style={{ height: "100%" }}>
                <h3 className="sub-title">OUR MISSION</h3>
                <p className="content-text">
                  Our mission is to empower individuals through education and innovation to create positive change in the society. We encourage our students to achieve more in the field of education, both nationally and internationally.
                </p>
              </div>
            </div>

            {/* Goals Card */}
            <div data-aos="fade-up" data-aos-delay="300">
              <div className="card goals-card" style={{ height: "100%" }}>
                <h3 className="sub-title">GOALS</h3>
                <ul className="content-text" style={{ paddingLeft: "20px", margin: 0 }}>
                  <li>To develop young minds by providing intellectual nourishment.</li>
                  <li>To eradicate social evils.</li>
                  <li>To enlight about environment.</li>
                  <li>To gear up the youth for the service of rural community.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Principals Section - Responsive Timeline */}
        <div style={{ marginBottom: "60px" }}>
          <div style={{ textAlign: "center", marginBottom: "40px" }} data-aos="fade-up">
            <h2 className="section-title">Principals Who Have Served Our College</h2>
            <p style={{ fontSize: "18px", color: "#666", maxWidth: "800px", margin: "0 auto" }}>
              Dedicated Leadership Over The Years
            </p>
          </div>

          <div className="principals-container" data-aos="zoom-in" data-aos-delay="200">
            <h3 className="principals-title">Principals Timeline (2007 - Present)</h3>
            <ul className="principals-list">
              {principals.map((principal, index) => (
                <li key={index} data-aos="fade-up" data-aos-delay={index * 100}>
                  <span className="period-badge">{principal.period}</span>
                  <span style={{ fontSize: "18px", fontWeight: "500" }}>{principal.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div>
          <BoardOfDirectors />
        </div>

        {/* Local Governing Body Section - Responsive Grid with multiple cards per row */}
        <div style={{ marginBottom: "60px" }}>
          <div style={{ textAlign: "center", marginBottom: "40px" }} data-aos="fade-up">
            <h2 className="section-title">Our College Local Governing Body</h2>
            <p style={{ fontSize: "18px", color: "#666" }}>Dedicated Leadership for Academic Excellence</p>
          </div>

          <div data-aos="zoom-in">
            <div className="governing-body-card">
              <h3 className="governing-title">Governing Body Members</h3>
              <div className="member-grid">
                {governingBodyMembers.map((member, index) => (
                  <div key={index} className="member-card" data-aos="fade-up" data-aos-delay={index * 100}>
                    <div className="member-image-container">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%231f3b88'/%3E%3Ctext x='50' y='50' font-size='14' text-anchor='middle' fill='white' dy='.3em'%3E" + encodeURIComponent(member.name.split(' ').pop() || member.name.substring(0, 2)) + "%3C/text%3E%3C/svg%3E";
                        }}
                      />
                    </div>
                    <div className="member-info">
                      <div className="member-name">{member.name}</div>
                      <div className="member-position">{member.position}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Rules & Regulations Section */}
        <div style={{ marginBottom: "60px" }}>
          <div style={{ textAlign: "center", marginBottom: "40px" }} data-aos="fade-up">
            <h2 className="section-title">Rules & Regulations</h2>
            <p style={{ fontSize: "18px", color: "#666" }}>Guidelines for Maintaining Academic Discipline</p>
          </div>

          <div data-aos="fade-up" data-aos-delay="200">
            <div className="card rules-card">
              <div className="highlight-box">
                <h3 className="sub-title" style={{ marginTop: "0", borderLeft: "none", paddingLeft: "0", textAlign: "center" }}>
                  College Code of Conduct
                </h3>
                <ol className="rules-list">
                  {rulesRegulations.map((rule, index) => (
                    <li key={index} className="content-text" style={{ marginBottom: 0 }}>{rule}</li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>

        {/* Infrastructure Section - Responsive row with 2 columns that wraps */}
        <div style={{ marginBottom: "60px" }}>
          <div style={{ textAlign: "center", marginBottom: "40px" }} data-aos="fade-up">
            <h2 className="section-title">Our Infrastructure</h2>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "30px" }}>
            <div style={{ flex: "1", minWidth: "280px" }} data-aos="fade-up">
              <div className="image-container">
                <img
                  src="computer-lab.jpg"
                  alt="Computer Lab"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "computer lab.jpg";
                  }}
                />
              </div>
              <h3 className="sub-title" style={{ marginTop: "20px" }}>State-of-the-Art Computer Labs</h3>
              <p className="content-text">
                Our college boasts modern computer labs equipped with the latest hardware and software, providing students with hands-on experience in programming, networking, and software development.
              </p>
            </div>

            <div style={{ flex: "1", minWidth: "280px" }} data-aos="fade-up">
              <div className="image-container">
                <img
                  src="library.jpg"
                  alt="Library"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "Library3.JPG";
                  }}
                />
              </div>
              <h3 className="sub-title" style={{ marginTop: "20px" }}>Well-Stocked Library</h3>
              <p className="content-text">
                Our digital library provides access to thousands of books, journals, and online resources in the field of computer science and information technology, supporting both academic and research activities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutCollege;