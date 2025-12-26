import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const AboutSDVS = () => {
  const [showAllInstitutions, setShowAllInstitutions] = useState(false);
  
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

  const institutions = [
    { id: 1, name: "S.D.High School, Sankeshwar", year: 1927 },
    {
      id: 2,
      name: "Shri. D.L.Khot composite Pre-university College, Hebbal",
      year: 1959,
    },
    { id: 3, name: "Kannada Medium Nursery School, Sankeshwar", year: 1960 },
    {
      id: 4,
      name: "Shri. Appangouda Patil Vidya Mandir, Kanagala",
      year: 1965,
    },
    {
      id: 5,
      name: "Shri.L.B.Sardesai Comp, Pre-university College, Yadagud",
      year: 1966,
    },
    { id: 6, name: "Akkamahadevi Kanya Shale, Sankeshwar", year: 1966 },
    {
      id: 7,
      name: "S.S.Arts College and T.P.Science Institute, Sankeshwar",
      year: 1967,
    },
    {
      id: 8,
      name: "Shri. L.K.Khot College of Commerce, Sankeshwar",
      year: 1970,
    },
    {
      id: 9,
      name: "Shri. Sidagouda S.Patil(khatedar)English Medium School, Sankeshwar",
      year: 1971,
    },
    { id: 21, name: "Hira Sugar Boys Hostel", year: 1970 },
    {
      id: 10,
      name: "Pre-Primary English Medium School, Sankeshwar",
      year: 1991,
    },
    {
      id: 11,
      name: "Kannada and Marathi Convent Primary School, Sankeshwar",
      year: 1993,
    },
    { id: 12, name: "B.B.A. College, Sankeshwar", year: 1996 },
    {
      id: 13,
      name: "Arts,Science & Commerce,P.U.College, Sankeshwar",
      year: 2001,
    },
    { id: 14, name: "BSW College, Sankeshwar", year: 2006 },
    { id: 15, name: "BCA College, Sankeshwar", year: 2007 },
    {
      id: 16,
      name: "Annapurna Institute of Management Studies, Sankeshwar",
      year: 2009,
    },
    { id: 17, name: "Basagouda.A.Patil I.T.I College", year: 2009 },
    { id: 23, name: "Rani Channamma Girls Hostel", year: 2011 },
    {
      id: 18,
      name: "Shri.S.S.(K) Patil English Medium (CBSE) School, Sankeshwar",
      year: 2012,
    },
    { id: 22, name: "Akkamahadevi Girls Hostel", year: 2014 },
    {
      id: 19,
      name: "Shri. L.K.Khot College of Master of Commerce (M.Com), Sankeshwar",
      year: 2018,
    },
    {
      id: 20,
      name: "SDVS Sangh's Annapoorna Institute of Nursing",
      year: 2023,
    },
  ];

  // Founders data
  const founders = [
    { 
      id: 1, 
      name: "Shri. Nijalingeshwar Mahaswamiji", 
      position: "Durdundeshwar Math, Nidasoshi",
      image: "shri nijalingeshwar_mahaswamiji.PNG" 
    },
    { 
      id: 2, 
      name: "Shri. Shivarudreshwar Mahaswamiji", 
      position: "Gubbalagudda Math, Ghatanrabha",
      image: "shivarudreshwar mahaswamiji gubbalagudd ghataprabha.JPG" 
    },
    { 
      id: 3, 
      name: "Late Shri. Appanagouda Patil", 
      position: "Sankeshwar",
      image: "appanagouda patil.PNG"
    },
    { 
      id: 4, 
      name: "Late Shri. Basagouda A. Patil", 
      position: "Amminbavi",
      image: "basagouda patil.PNG"
    },
  ];

  const displayedInstitutions = showAllInstitutions 
    ? institutions 
    : institutions.slice(0, 10);

  return (
    <div className="about-page">
      <style>{`
        .about-page {
          font-family: Arial, sans-serif;
          color: #333;
          background-color: #f8f9fb;
        }
        
        .about-hero-section {
          background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), 
                     url('bg_pic.jpeg');
          background-size: cover;
          background-position: center;
          padding: 80px 20px;
        }
        
        .hero-content h1 {
          font-size: 42px;
          margin-bottom: 20px;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
          color: #fff;
        }
        
        .hero-content p {
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
        
        .green-title {
          color: #1f3b88;
          font-weight: bold;
          font-size: 24px;
          margin-bottom: 20px;
        }
        
        .about-text {
          font-size: 16px;
          line-height: 1.8;
          color: #333;
          margin-bottom: 20px;
        }
        
        .about-image-container {
          overflow: hidden;
          border-radius: 8px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }
        
        .about-image-container img {
          width: 100%;
          height: auto;
          transition: transform 0.5s ease;
        }
        
        .about-image-container:hover img {
          transform: scale(1.05);
        }
        
        .institutions-table-container {
          background: #fff;
          border: 1px solid #ddd;
          padding: 20px;
          margin-top: 30px;
          border-radius: 8px;
        }
        
        .institutions-table {
          margin-bottom: 0;
          width: 100%;
        }
        
        .institutions-table th {
          background: #1f3b88;
          color: white;
          font-weight: bold;
          padding: 15px;
        }
        
        .institutions-table td {
          padding: 12px 15px;
          border-color: #ddd;
        }
        
        .institutions-table tr:nth-child(even) {
          background: #f4f6fb;
        }
        
        .institutions-table tr:hover {
          background: #f0f7ff;
        }
        
        .sl-no-column {
          width: 80px;
          text-align: center;
        }
        
        .year-column {
          width: 120px;
          text-align: center;
        }
        
        .future-initiatives {
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          border-left: 4px solid #1f3b88;
        }
        
        .stat-card {
          background: white;
          border-top: 4px solid #1f3b88;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .stat-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }
        
        .view-more-btn {
          background-color: #1f3b88;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 4px;
          margin-top: 20px;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        
        .view-more-btn:hover {
          background-color: #152c6e;
        }
        
        .institution-card {
          background: white;
          border-radius: 8px;
          padding: 15px;
          margin-bottom: 15px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          display: none;
        }
        
        .institution-card .name {
          font-weight: bold;
          color: #1f3b88;
          margin-bottom: 5px;
        }
        
        .institution-card .year {
          color: #f5a623;
          font-weight: bold;
        }
        
        /* Founders Section Styles */
        .founders-section {
          margin-bottom: 50px;
        }
        
        .founders-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 30px;
          margin-top: 30px;
        }
        
        .founder-card {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.08);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .founder-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 25px rgba(0, 0, 0, 0.15);
        }
        
        .founder-image-container {
          height: 250px;
          overflow: hidden;
          position: relative;
        }
        
        .founder-image-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        
        .founder-card:hover .founder-image-container img {
          transform: scale(1.05);
        }
        
        .founder-info {
          padding: 20px;
          text-align: center;
        }
        
        .founder-name {
          font-size: 18px;
          font-weight: bold;
          color: #1f3b88;
          margin-bottom: 8px;
          line-height: 1.4;
        }
        
        .founder-position {
          font-size: 14px;
          color: #666;
          line-height: 1.4;
          font-style: italic;
        }
        
        @media (max-width: 992px) {
          .founders-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }
          
          .founder-image-container {
            height: 220px;
          }
        }
        
        @media (max-width: 768px) {
          .about-hero-section {
            padding: 60px 15px;
          }
          
          .hero-content h1 {
            font-size: 32px;
          }
          
          .hero-content p {
            font-size: 18px;
          }
          
          .section-title {
            font-size: 28px;
          }
          
          .institutions-table-container {
            overflow-x: auto;
          }
          
          .institutions-table {
            display: none;
          }
          
          .institution-card {
            display: block;
          }
          
          .stat-card {
            margin-bottom: 15px;
          }
          
          .founders-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
          }
          
          .founder-image-container {
            height: 200px;
          }
          
          .founder-name {
            font-size: 16px;
          }
          
          .founder-position {
            font-size: 13px;
          }
        }
        
        @media (max-width: 480px) {
          .founders-grid {
            grid-template-columns: 1fr;
            max-width: 300px;
            margin-left: auto;
            margin-right: auto;
          }
          
          .founder-image-container {
            height: 250px;
          }
        }
      `}</style>

      {/* Hero Section */}
      <div className="about-hero-section text-center">
        <div className="hero-content" data-aos="fade-down">
          <h1 className="fw-bold mb-3">ABOUT SDVS SANGH</h1>
          <p className="mb-4">
            90 Years of Excellence in Education and Community Development
          </p>
          <div
            className="hero-divider"
            data-aos="zoom-in"
            data-aos-delay="300"
          ></div>
        </div>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 20px" }}>
        {/* Main Content Section */}
        <div style={{ marginBottom: "50px" }}>
          <div style={{ textAlign: "center", marginBottom: "40px" }} data-aos="fade-up">
            <h2 className="section-title">About Sangh</h2>
            <p style={{ fontSize: "18px", color: "#666" }}>
              Transforming Education Since 1929
            </p>
          </div>

          <div data-aos="fade-up" data-aos-delay="200" style={{ maxWidth: "800px", margin: "0 auto" }}>
            <p className="about-text">
              It is no exaggeration that the story of Shri. Duradundeeshwar
              Vidya Samavardhak Sangh is the story of education in the
              Sankeshwar area. Besides, evolving healthily through its
              institution it has been complementary to the cultural
              development of this area. The Sangh has a glorious history of 90
              years since 1929. In its infancy, it started with a single
              school with a single teacher, now it has grown to run as many as
              20 institutions.
            </p>
          </div>
        </div>

        {/* Image and Content Section */}
        <div style={{ display: "flex", flexWrap: "wrap", marginBottom: "50px", gap: "30px", alignItems: "center" }}>
          <div style={{ flex: "1", minWidth: "300px" }} data-aos="fade-down">
            <div className="about-image-container">
              <img
                src="s.d.v.s sangh office.JPG"
                alt="SDVS Sangh Campus"
                style={{ width: "100%", borderRadius: "8px" }}
              />
            </div>
          </div>
          <div style={{ flex: "1", minWidth: "300px" }} data-aos="fade-down" data-aos-delay="200">
            <h3 className="green-title">Our Growth & Development</h3>
            <p className="about-text">
              S.D.V.S Sangh was blessed by the spirit of Siddh Samsthanmath,
              Nidasoshi. Whole hearted and selfless efforts of the management
              enabled the Sangh to secure a prominent and firm place in
              educational field in the North Karnataka. Generous donors provided
              a sound economic base to the Sangh.
            </p>
          </div>
        </div>

        {/* OUR FOUNDERS Section */}
        <div className="founders-section">
          <div data-aos="fade-up">
            <div style={{ textAlign: "center", marginBottom: "40px" }}>
              <h2 className="section-title">OUR FOUNDERS</h2>
              <p style={{ fontSize: "18px", color: "#666" }}>
                Visionary Leaders Who Built the Foundation
              </p>
            </div>
            
            <div data-aos="fade-up" data-aos-delay="200" style={{ maxWidth: "1000px", margin: "0 auto 40px" }}>
              <p className="about-text">
                Generous donors provided a sound economic base to the Sangh. 
                Shrimant L. B. Sardesai of Vantamuri, Late Shri. S. S. Patil (Khatedar) 
                of Sankeshwar, His Holiness Shri Shivarudreshwar Mahaswamiji of Gubbalgud, 
                the Pattan Panchayat Committee of Sankeshwar and Shri Appanagouda Patil 
                have taken lots of pains to establish the institution.
              </p>
            </div>
            
            {/* Founders Grid */}
            <div className="founders-grid" data-aos="zoom-in" data-aos-delay="300">
              {founders.map((founder) => (
                <div key={founder.id} className="founder-card">
                  <div className="founder-image-container">
                    <img 
                      src={founder.image} 
                      alt={founder.name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/300x250/1f3b88/ffffff?text=" + encodeURIComponent(founder.name.substring(0, 1));
                      }}
                    />
                  </div>
                  <div className="founder-info">
                    <div className="founder-name">{founder.name}</div>
                    <div className="founder-position">{founder.position}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contributors Section */}
        <div style={{ marginBottom: "50px", maxWidth: "1000px", margin: "0 auto" }}>
          <div data-aos="fade-up">
            <h3 className="text-center green-title" style={{ marginBottom: "30px" }}>
              Our Generous Contributors
            </h3>
            <p className="about-text">
              Shrimant L. B. Sardesai of Vantamuri, Late Shri. S. S. Patil
              (Khatedar) of Sankeshwar, His Holiness Shri Shivarudreshwar
              Mahaswamiji of Gubbalgud, the Pattan Panchayat Committee of
              Sankeshwar, Shri. L. K. Khot of Hebbal, Shri. M. S. Patil
              (Khatedar) of Sankeshwar Shri Basagouda Patil of Amminbhavi have
              contributed for the growth of the Sangh.
            </p>
          </div>
        </div>

        {/* Leadership Section */}
        <div style={{ display: "flex", flexWrap: "wrap", marginBottom: "50px", gap: "30px" }}>
          <div style={{ flex: "1", minWidth: "300px" }} data-aos="fade-up">
            <h3 className="green-title">Visionary Leadership</h3>
            <p className="about-text">
              After the advent of Shri Appanagouda. Patil, a man of foresight
              and noble spirit the Sangh was steered up to ambitious heights.
              The S.D.V.S Sangh is heading towards new horizon under the able
              Presidentship of Shri. A. B. Patil, Ex. Minister, Government of
              Karnataka.
            </p>
          </div>
          <div style={{ flex: "1", minWidth: "300px" }} data-aos="fade-down" data-aos-delay="200">
            <div className="about-image-container">
              <img
                src="appanagouda patil.PNG"
                alt="SDVS Sangh Leadership"
                style={{ width: "100%", borderRadius: "8px" }}
              />
            </div>
          </div>
        </div>

        {/* Institutions Section */}
        <div style={{ marginBottom: "50px" }}>
          <div data-aos="fade-up">
            <div style={{ textAlign: "center", marginBottom: "40px" }}>
              <h2 className="section-title">
                Institutions Run By SDVS Sangh
              </h2>
              <p style={{ fontSize: "18px", color: "#666" }}>
                A Legacy of Educational Excellence Spanning Over 98 Years
              </p>
            </div>

            <div className="institutions-table-container">
              {/* Desktop Table View */}
              <div style={{ overflowX: "auto" }}>
                <table className="institutions-table">
                  <thead>
                    <tr>
                      <th className="sl-no-column">Sl.No</th>
                      <th className="name-column">Name of Institution</th>
                      <th className="year-column">Year of Establishment</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayedInstitutions.map((institution, index) => (
                      <tr
                        key={institution.id}
                        data-aos="fade-up"
                        data-aos-delay={index * 50}
                      >
                        <td className="sl-no-column">{index + 1}</td>
                        <td className="name-column">{institution.name}</td>
                        <td className="year-column">{institution.year}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Mobile Card View */}
              <div className="institution-cards">
                {displayedInstitutions.map((institution, index) => (
                  <div 
                    key={institution.id} 
                    className="institution-card"
                    data-aos="fade-up"
                    data-aos-delay={index * 50}
                  >
                    <div className="name">{institution.name}</div>
                    <div className="year">Established: {institution.year}</div>
                  </div>
                ))}
              </div>
              
              {institutions.length > 10 && (
                <div style={{ textAlign: "center", marginTop: "20px" }}>
                  <button 
                    className="view-more-btn"
                    onClick={() => setShowAllInstitutions(!showAllInstitutions)}
                  >
                    {showAllInstitutions ? "View Less" : "View More"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Future Initiatives Section */}
        <div style={{ marginBottom: "50px", maxWidth: "1000px", margin: "0 auto" }}>
          <div
            className="future-initiatives"
            style={{ padding: "40px", borderRadius: "8px" }}
            data-aos="zoom-in"
          >
            <h3 className="text-center green-title" style={{ marginBottom: "30px" }}>Future Initiatives</h3>
            <p className="about-text">
              With many more plans on cards, besides the college of Business
              Administration, BCA & BSW which have already been brought into
              existence. The ITI and MBA colleges are the new feathers in the
              cap of the Sangh. In the year 2018 Shri. L.K.Khot College of
              Commerce has Started Master of Commerce (M.Com) Course.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center", marginBottom: "50px" }} data-aos="fade-up">
          <div className="stat-card" style={{ flex: "1", minWidth: "200px", padding: "30px", textAlign: "center" }}>
            <h2 style={{ fontSize: "42px", fontWeight: "bold", color: "#1f3b88", margin: "0 0 10px 0" }}>98+</h2>
            <p style={{ margin: 0 }}>Years of Service</p>
          </div>
          <div className="stat-card" style={{ flex: "1", minWidth: "200px", padding: "30px", textAlign: "center" }}>
            <h2 style={{ fontSize: "42px", fontWeight: "bold", color: "#1f3b88", margin: "0 0 10px 0" }}>21+</h2>
            <p style={{ margin: 0 }}>Institutions</p>
          </div>
          <div className="stat-card" style={{ flex: "1", minWidth: "200px", padding: "30px", textAlign: "center" }}>
            <h2 style={{ fontSize: "42px", fontWeight: "bold", color: "#1f3b88", margin: "0 0 10px 0" }}>100000+</h2>
            <p style={{ margin: 0 }}>Students Impacted</p>
          </div>
          <div className="stat-card" style={{ flex: "1", minWidth: "200px", padding: "30px", textAlign: "center" }}>
            <h2 style={{ fontSize: "42px", fontWeight: "bold", color: "#1f3b88", margin: "0 0 10px 0" }}>12+</h2>
            <p style={{ margin: 0 }}>Courses Offered</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSDVS;