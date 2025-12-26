import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

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
    { period: "2011-2012", name: "Prof. D. S. Khade" },
    { period: "2012-2013", name: "Prof. B. I. Hebbali" },
    { period: "2013-2015", name: "Prof. G. L. Badiger" },
    { period: "2016-till date", name: "Prof. B. I. Hebbali" },
  ];

  // Local Governing Body Members with image paths
  const governingBodyMembers = [
    { 
      name: "Shri. R. B. Patil", 
      position: "Chairman LGB",
      image: "r.b.patil l.g.b president.JPG" 
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
      name: "Shri. G. C. Kotagi", 
      position: "Member",
      image: "SECRETORY G.C.KOTAGI.JPG" 
    },
    { 
      name: "Dr. B. A. Pujari", 
      position: "Member",
      image: "B.A. PUJARI ADMINISTRATOR.JPG" 
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
        .about-college-page {
          font-family: Arial, sans-serif;
          color: #333;
          background-color: #f8f9fb;
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
          height: 100%;
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
        }
        
        .governing-body-card {
          background: white;
          border-radius: 12px;
          padding: 30px;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
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
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 25px;
          margin-top: 20px;
        }
        
        .member-card {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
          border: 1px solid #eaeaea;
        }
        
        .member-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
        }
        
        .member-image-container {
          height: 400px;
          overflow: hidden;
          position: relative;
          background: #f5f7fa;
        }
        
        .member-image-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        
        .member-card:hover .member-image-container img {
          transform: scale(1.1);
        }
        
        .member-info {
          padding: 20px;
          text-align: center;
          background: white;
        }
        
        .member-name {
          font-size: 18px;
          font-weight: bold;
          color: #1f3b88;
          margin-bottom: 8px;
          line-height: 1.4;
        }
        
        .member-position {
          font-size: 14px;
          color: #666;
          line-height: 1.4;
          font-style: italic;
        }
        
        .rules-card {
          border-top: 5px solid #607D8B;
          background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
        }
        
        .rules-list {
          list-style-type: decimal;
          padding-left: 25px;
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
        
        .rules-list li:before {
          font-weight: bold;
          color: #1f3b88;
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
        
        @media (max-width: 992px) {
          .member-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
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
          
          .member-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }
          
          .period-badge {
            min-width: 120px;
            font-size: 13px;
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
        }
        
        @media (max-width: 576px) {
          .member-grid {
            grid-template-columns: 1fr;
            max-width: 350px;
            margin-left: auto;
            margin-right: auto;
          }
          
          .college-hero-section h1 {
            font-size: 30px;
          }
          
          .college-hero-section p {
            font-size: 17px;
          }
          
          .period-badge {
            min-width: 110px;
            font-size: 12px;
            margin-right: 15px;
          }
          
          .principals-container {
            padding: 25px;
          }
          
          .member-image-container {
            height: 320px;
          }
          
          .stats-container {
            flex-direction: column;
            align-items: center;
          }
          
          .stat-card {
            width: 100%;
            max-width: 300px;
          }
        }
        
        @media (max-width: 480px) {
          .college-hero-section {
            padding: 70px 15px;
          }
          
          .college-hero-section h1 {
            font-size: 28px;
          }
          
          .section-title {
            font-size: 26px;
          }
          
          .sub-title {
            font-size: 22px;
          }
          
          .period-badge {
            min-width: 100px;
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
            <div style={{ flex: "1", minWidth: "300px" }} >
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
            <div style={{ flex: "1", minWidth: "300px" }} >
              <p className="content-text">
                The Bachelor of Computer Applications (BCA) College at SDVS Sangh was established in 2007 with a vision to provide quality computer education to students in North Karnataka. Over the years, we have grown into a premier institution known for our excellent faculty, state-of-the-art infrastructure, and industry-relevant curriculum.
              </p>
              <p className="content-text">
                Our BCA program is designed to equip students with the knowledge and skills required to excel in the dynamic field of information technology. With a perfect blend of theoretical knowledge and practical exposure, we prepare our students for successful careers in software development, web technologies, database management, and more.
              </p>
            </div>
          </div>
        </div>

        {/* Vision, Mission & Goals Section */}
        <div style={{ marginBottom: "60px" }}>
          <div style={{ textAlign: "center", marginBottom: "40px" }} data-aos="fade-up">
            <h2 className="section-title">Our Guiding Principles</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "30px" }}>
            {/* Vision Card */}
            <div data-aos="fade-up" data-aos-delay="100">
              <div className="card vision-card">
                <h3 className="sub-title">OUR VISION</h3>
                <p className="content-text">
                  We aim to be a prominent institute where pioneering technology meets transformative learning experiences, empowering students to thrive in a rapidly evolving digital landscape.
                </p>
              </div>
            </div>

            {/* Mission Card */}
            <div data-aos="fade-up" data-aos-delay="200">
              <div className="card mission-card">
                <h3 className="sub-title">OUR MISSION</h3>
                <p className="content-text">
                  Our mission is to empower individuals through education and innovation to create positive change in the society. We encourage our students to achieve more in the field of education, both nationally and internationally.
                </p>
              </div>
            </div>

            {/* Goals Card */}
            <div data-aos="fade-up" data-aos-delay="300">
              <div className="card goals-card">
                <h3 className="sub-title">GOALS</h3>
                <ul className="content-text" style={{ paddingLeft: "20px" }}>
                  <li>To develop young minds by providing intellectual nourishment.</li>
                  <li>To eradicate social evils.</li>
                  <li>To enlight about environment.</li>
                  <li>To gear up the youth for the service of rural community.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Principals Section */}
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

        {/* Local Governing Body Section */}
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
                          e.target.src = "https://via.placeholder.com/300x200/1f3b88/ffffff?text=" + encodeURIComponent(member.name.split(' ')[1] || member.name.substring(0, 2));
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
                    <li key={index} className="content-text">{rule}</li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>

        {/* Infrastructure Section */}
        <div style={{ marginBottom: "60px" }}>
          <div style={{ textAlign: "center", marginBottom: "40px" }} data-aos="fade-up">
            <h2 className="section-title">Our Infrastructure</h2>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "30px" }}>
            <div style={{ flex: "1", minWidth: "300px" }} data-aos="fade-up">
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

            <div style={{ flex: "1", minWidth: "300px" }} data-aos="fade-up">
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