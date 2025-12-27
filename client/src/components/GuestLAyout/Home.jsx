import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Placement from "./Placement";
import Gallery from "./Gallery";
import EventNews from "./EventNews";
import NotificationBar from "./NotificationBar";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeCard, setActiveCard] = useState(null);
  const [activeTab, setActiveTab] = useState("Campus");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      offset: 200,
    });

    // Handle window resize
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate("/contact"); 
    setTimeout(() => {
      window.scrollTo({ top: 700, behavior: "smooth" }); 
    }, 500);
  };


  

  // SLIDE DATA WITH IMAGES AND CORRESPONDING TEXT
  const slides = [
    {
      image: "collage.jpg",
      text: "Epitome Of Excellence .",
    },
    {
      image:
        "campus.jpg",
      text: "Transforming Education.",
    },
    {
      image: "ground.jpeg",
      text: "Building Future Leaders.",
    },
    {
      image: "Library3.JPG",
      text: "Innovative Learning Environment.",
    },
    {
      image:
        "https://images.pexels.com/photos/159775/library-la-trobe-study-students-159775.jpeg",
      text: "Knowledge Without Boundaries.",
    },
  ];

  const socialIcons = [
    {
      src: "https://cdn-icons-png.flaticon.com/512/724/724664.png",
      alt: "Call",
      link: "tel:9448636015                   ",
    },
    {
      src: "https://cdn-icons-png.flaticon.com/512/733/733585.png",
      alt: "WhatsApp",
      link: "https://wa.me/9448636015                   ",
    },
    {
      src: "https://cdn-icons-png.flaticon.com/512/2111/2111463.png",
      alt: "Instagram",
      link: "https://www.instagram.com/sdvss_bca_sankeshwar?utm_source=ig_web_button_share_sheet&igsh=MXYwN3JwN3B1bmhqbw==",
    },
  ];

  const programmes = [
    {
      title: "What SDVS Offers",
      items: [
        "Workshops & Seminars",
        "Tech Events & Hackathons",
        "Cultural Fests & Celebrations",
        "Sports & Athletics",
        "Community Service & NSS Activities",
        "Career Guidance & Placement Support",
      ],
      color: "#ffcc00",
    },
    {
      title: "Job Opportunities After BCA",
      items: [
        "Software Developer / Programmer",
        "Web Developer & Designer",
        "Mobile App Developer",
        "Database Administrator",
        "System Analyst",
        "Network Administrator",
        "IT Support Specialist",
        "Cybersecurity Analyst",
      ],
      color: "#ffcc00",
    },
    {
      title: "Higher Studies After BCA",
      items: [
        "Master of Computer Applications (MCA)",
        "Master of Business Administration (MBA)",
        "Master of Science in Information Technology (M.Sc IT)",
        "Post Graduate Diploma in Data Science / AI",
      ],
      color: "#1a4eb0",
    },
  ];

  const admissionItems = [
    { text: "Admission Process", link: "/admission-process" },
    { text: "Admission Counselling", link: "/admission-counselling" },
  ];

  const recruiterLogos = [
    "https://logowik.com/content/uploads/images/tcs-tata-consultancy-services2792.logowik.com.webp",
    "https://www.wipro.com/content/dam/nexus/en/brand/images/secondary-logo-400x276.png",
    "https://logowik.com/content/uploads/images/tcs-tata-consultancy-services2792.logowik.com.webp",
  ];

  // Campus section content
  const campusContent = {
    Campus: {
        title: "Campus",
      description: "Our clean and eco-conscious campus creates the perfect atmosphere for focused learning and overall well-being",
      image: "campus image.png"
    },
    "Computer Lab": {
      title: "Computer Lab",
      description: "Our advanced and high-tech computer lab provides the essential tools for innovation, practical learning, and digital mastery.",
      image: "computer lab.jpg"
    },
    "Library": {
      title: "Library",
      description: "Our sustainable and thoughtfully designed library supports deep learning and well-being in a calm, inspiring environment.",
      image: 'Library3.JPG'
    },
    "Sports & Grounds": {
      title: "Sports & Grounds",
      description: "Our dynamic sports facilities are designed to develop physical strength, character, and a sense of collective achievement.",
      image: "ground.jpeg"
    },
    "SDVS'S BCA": {
      title: "SDVS'S BCA",
      description: "A dynamic and innovative academic program designed to shape future tech leaders, offering a perfect blend of theoretical knowledge and practical expertise in a supportive and inspiring environment.",
      image: "collage.jpg"
    }
  };

  const tabs = Object.keys(campusContent);

  const showSlide = (index) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const handleEnquireClick = () => {
    
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleAdmissionClick = (link) => {
    alert(`Navigating to: ${link}`);
  };

  return (
    <>
      {/* Banner Section */}
      <section className="banner">
        <NotificationBar/>
        <style>{`
          body {
            margin: 0;
            font-family: Arial, sans-serif;
          }

          /* Section Wrapper */
          .banner {
            position: relative;
            width: 100%;
            height: 80vh;
            overflow: hidden;
          }

          /* Carousel Images */
          .slides {
            display: flex;
            width: ${slides.length * 100}%;
            height: 100%;
            transition: transform 1s ease-in-out;
          }

          .slides img {
            width: ${100 / slides.length}%;
            object-fit: cover;
          }

          /* Red Text Box */
          .text-box {
            position: absolute;
            bottom: 20px;
            left: 50px;
            background: #b90000;
            color: white;
            font-size: 32px;
            font-weight: bold;
            padding: 20px 30px;
            border-radius: 5px;
            max-width: 350px;
            line-height: 1.3em;
            box-shadow: 0px 4px 10px rgba(0,0,0,0.3);
            transition: opacity 0.5s ease;
            z-index: 5;
          }

          /* Left Social Icons */
          .social-bar {
            position: absolute;
            top: 20%;
            left: 0;
            display: flex;
            flex-direction: column;
            gap: 10px;
            z-index: 10;
          }

          .social-bar a {
            background: #ffffffe2;
            padding: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 5px;
            transition: background 0.3s ease;
          }

          .social-bar a img {
            width: 20px;
            height: 20px;
          }

          .social-bar a:hover {
            background: #f0f0f0;
          }

          /* Enquire Now Button */
          .enquire-btn {
            position: absolute;
            top: 50%;
            right: 0;
            background: #b90000;
            color: white;
            transform: translateY(-50%);
            writing-mode: vertical-rl;
            text-align: center;
            padding: 12px;
            font-weight: bold;
            letter-spacing: 1px;
            border-radius: 5px 0 0 5px;
            cursor: pointer;
            transition: background 0.3s ease;
            z-index: 10;
          }

          .enquire-btn:hover {
            background: #8a0000;
          }

          /* Carousel Navigation */
          .nav-buttons {
            position: absolute;
            bottom: 10px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 10px;
            z-index: 5;
          }

          .nav-buttons span {
            width: 12px;
            height: 12px;
            background: white;
            border-radius: 50%;
            cursor: pointer;
            transition: background 0.3s ease;
          }

          .nav-buttons span.active {
            background: #b90000;
          }

          @media (max-width: 1024px) {
            .banner {
              height: 70vh;
            }
          }

          @media (max-width: 768px) {
            .banner {
              height: 60vh;
            }
            .text-box {
              font-size: 22px;
              left: 20px;
              max-width: 250px;
              padding: 15px 20px;
            }
            .social-bar {
              top: 10%;
              flex-direction: column;
              left: 10px;
              transform: none;
              width: auto;
              justify-content: flex-start;
            }
            .social-bar a {
              padding: 8px;
            }
            .social-bar a img {
              width: 16px;
              height: 16px;
            }
            .enquire-btn {
              top: auto;
              bottom: 60px;
              right: 10px;
              writing-mode: vertical-rl;
              transform: none;
              padding: 8px 12px;
              font-size: 14px;
            }
          }

          @media (max-width: 480px) {
            .banner {
              height: 50vh;
            }
            .text-box {
              font-size: 18px;
              left: 10px;
              bottom: 10px;
              max-width: 200px;
              padding: 10px 15px;
            }
            .social-bar {
              top: 5%;
              left: 5px;
            }
            .social-bar a {
              padding: 6px;
            }
            .social-bar a img {
              width: 14px;
              height: 14px;
            }
            .enquire-btn {
              bottom: 50px;
              right: 5px;
              padding: 6px 10px;
              font-size: 12px;
            }
          }
        `}</style>

        {/* Image Carousel */}
        <div
          className="slides"
          style={{
            transform: `translateX(-${currentSlide * (100 / slides.length)}%)`,
          }}
        >
          {slides.map((slide, index) => (
            <img key={index} src={slide.image} alt={`Slide ${index + 1}`} />
          ))}
        </div>

        {/* Social Icons */}
        <div className="social-bar">
          {socialIcons.map((icon, index) => (
            <a
              key={index}
              href={icon.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={icon.src} alt={icon.alt} />
            </a>
          ))}
        </div>

        {/* Dynamic Text Box */}
        <div className="text-box" data-aos="fade-up">
          {slides[currentSlide].text}
        </div>

        {/* Enquire Now Button */}
        <div className="enquire-btn" onClick={handleClick}>
          Enquire Now
        </div>

        {/* Navigation Dots */}
        <div className="nav-buttons">
          {slides.map((_, index) => (
            <span
              key={index}
              className={index === currentSlide ? "active" : ""}
              onClick={() => showSlide(index)}
            ></span>
          ))}
        </div>
      </section>

      {/* Programme Section */}
      <div
        style={{
          margin: 0,
          fontFamily: "Arial, sans-serif",
          background: "#f5f5f5",
          color: "#333",
          padding: "40px 20px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            maxWidth: "1200px",
            margin: "0 auto",
            gap: "30px",
            flexWrap: "wrap",
          }}
        >
          {/* Left Section */}
          <div style={{ flex: 1, minWidth: "300px" }}>
            <div
              style={{
                fontSize: isMobile ? "24px" : "32px",
                color: "#1a4eb0",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
              }}
              data-aos="fade-down"
            >
              Why SDVS'S BCA...?
              <span
                style={{
                  display: "inline-block",
                  width: "50px",
                  height: "3px",
                  backgroundColor: "#ffcc00",
                  marginLeft: "10px",
                }}
              ></span>
            </div>

            <div
              style={{
                fontSize: isMobile ? "18px" : "24px",
                fontWeight: "bold",
                marginTop: "10px",
                marginBottom: "20px",
                lineHeight: "1.3",
              }}
              data-aos="fade-up"
              data-aos-delay="100"
            >
              The Right Choice for a Successful Career in IT{" "}
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                gap: "20px",
                flexWrap: "wrap",
              }}
            >
              {programmes.map((programme, index) => (
                <div
                  key={index}
                  style={{
                    background: "white",
                    borderRadius: "10px",
                    padding: "20px",
                    boxShadow:
                      activeCard === index
                        ? "0 8px 16px rgba(0,0,0,0.2)"
                        : "0 4px 8px rgba(0,0,0,0.1)",
                    flex: isMobile ? "1" : "1",
                    minWidth: isMobile ? "100%" : "250px",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    transform:
                      activeCard === index ? "translateY(-5px)" : "none",
                    cursor: "pointer",
                  }}
                  onMouseEnter={() => setActiveCard(index)}
                  onMouseLeave={() => setActiveCard(null)}
                  data-aos="fade-left"
                  data-aos-delay='100'
                >
                  <h3
                    style={{
                      borderTop: `4px solid ${programme.color}`,
                      paddingTop: "10px",
                      marginBottom: "10px",
                      marginTop: 0,
                      fontSize: isMobile ? "16px" : "18px",
                    }}
                  >
                    {programme.title}
                  </h3>
                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                      margin: 0,
                    }}
                  >
                    {programme.items.map((item, i) => (
                      <li
                        key={i}
                        style={{
                          margin: "8px 0",
                          position: "relative",
                          paddingLeft: "15px",
                          transition: "color 0.2s ease",
                          fontSize: isMobile ? "14px" : "16px",
                        }}
                      >
                        <span
                          style={{
                            position: "absolute",
                            left: 0,
                            color: "#555",
                          }}
                        >
                          ›
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Right Section */}
          <div
            style={{
              flex: isMobile ? "1" : "0.8",
              position: "relative",
              minWidth: isMobile ? "100%" : "300px",
              borderRadius: "10px",
              overflow: "hidden",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              marginTop: isMobile ? "20px" : "0",
            }}
            data-aos="fade-down"
            data-aos-delay="300"
          >
            <img
              src="https://startuppakistan.com.pk/wp-content/uploads/2022/03/Youniform-School-Stills-64-of-66-scaled.jpg"
              alt="College Student"
              style={{
                width: "100%",
                height: isMobile ? "300px" : "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "15px",
                left: "15px",
                background: "rgba(255, 255, 255, 0.85)",
                padding: "15px 20px",
                borderRadius: "8px",
                fontWeight: "bold",
              }}
            >
              {admissionItems.map((item, index) => (
                <div
                  key={index}
                  style={{ 
                    margin: "8px 0", 
                    cursor: "pointer",
                    fontSize: isMobile ? "14px" : "16px"
                  }}
                  onClick={handleClick}
                >
                  › {item.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Accreditation Section */}
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "30px",
          background: "#fff",
          fontFamily: "Arial, sans-serif",
          maxWidth: "1200px",
          margin: "0 auto",
          flexWrap: "wrap",
          gap: isMobile ? "20px" : "0",
        }}
        data-aos="fade-up"
      >
        <div style={{ textAlign: isMobile ? "center" : "left" }}>
          <h3 style={{ margin: 0, fontSize: isMobile ? "18px" : "24px" }}>Accreditations and Affiliations</h3>
        </div>
        <div style={{ 
          display: "flex", 
          gap: isMobile ? "20px" : "40px", 
          flexWrap: "wrap",
          justifyContent: isMobile ? "center" : "flex-end"
        }}>
          <img
            src="https://www.presidencycollege.ac.in/assets/frontend/images/accr/recognized.webp"
            alt="UGC"
            style={{ height: isMobile ? "60px" : "80px", objectFit: "contain" }}
          />
          <img
            src="https://tse2.mm.bing.net/th/id/OIP.zULu3PJC9TnpyU7vv5LKIAHaFf?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
            alt="NAAC"
            style={{ height: isMobile ? "60px" : "80px", objectFit: "contain" }}
          />
          <img
            src="https://www.presidencycollege.ac.in/assets/frontend/images/accr/permanently.webp"
            alt="NAAC"
            style={{ height: isMobile ? "60px" : "80px", objectFit: "contain" }}
          />
        </div>
      </div>

      {/* Stats Section */}
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          marginTop: "0",
          fontFamily: "Arial, sans-serif",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            flex: 1,
            padding: "30px",
            color: "#fff",
            fontSize: isMobile ? "20px" : "24px",
            fontWeight: "bold",
            textAlign: "center",
            background: "#c4122f",
            minWidth: "300px",
          }}
          data-aos="fade-down"
        >
          10k+
          <span
            style={{
              fontSize: isMobile ? "12px" : "14px",
              display: "block",
              marginTop: "10px",
              fontWeight: "normal",
            }}
          >
            Alumni Across the Globe
          </span>
        </div>
        <div
          style={{
            flex: 1,
            padding: "30px",
            color: "#fff",
            fontSize: isMobile ? "20px" : "24px",
            fontWeight: "bold",
            textAlign: "center",
            background: "#004aad",
            minWidth: "300px",
          }}
          data-aos="fade-up"
        >
          18+
          <span
            style={{
              fontSize: isMobile ? "12px" : "14px",
              display: "block",
              marginTop: "10px",
              fontWeight: "normal",
            }}
          >
            Years of Education Experience
          </span>
        </div>
      </div>

      {/* Placements Section */}
      <div>
        <Placement />
      </div>
      
      <div>
        <EventNews />
      </div>
      
      {/* Campus Life Section */}
      <div
        style={{
          margin: 0,
          fontFamily: "Arial, sans-serif",
          background: "#fff",
          color: "#000",
          padding: "50px 20px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            alignItems: "center",
            maxWidth: "1200px",
            margin: "0 auto",
            flexWrap: "wrap",
            gap: "30px",
          }}
        >
          <div
            style={{ width: "100%", maxWidth: isMobile ? "100%" : "600px", minWidth: "300px" }}
            data-aos="fade-down"
          >
            <h2
              style={{
                fontSize: isMobile ? "22px" : "28px",
                color: "#1a4d8f",
                marginBottom: "10px",
              }}
            >
              Campus Life
            </h2>
            <h1
              style={{
                fontSize: isMobile ? "26px" : "34px",
                fontWeight: "bold",
                marginBottom: "20px",
              }}
            >
              A lively, international community that makes every day at SDVS
              enriching.
            </h1>
            <h3
              style={{
                fontSize: isMobile ? "16px" : "18px",
                marginTop: "20px",
                marginBottom: "10px",
              }}
            >
              {campusContent[activeTab].title}
            </h3>
            <p style={{ 
              fontSize: isMobile ? "14px" : "15px", 
              lineHeight: "1.6", 
              color: "#444" 
            }}>
              {campusContent[activeTab].description}
            </p>
            <a
              href="#"
              style={{
                display: "inline-block",
                marginTop: "20px",
                background: "#fff",
                border: "1px solid #ccc",
                width: "35px",
                height: "35px",
                textAlign: "center",
                lineHeight: "35px",
                fontWeight: "bold",
                textDecoration: "none",
                color: "#000",
                borderRadius: "4px",
              }}
            >
              ›
            </a>

            {/* Bottom Tab Buttons */}
            <div
              style={{ 
                display: "flex", 
                marginTop: "20px", 
                flexWrap: "wrap", 
                gap: "5px",
                overflowX: isMobile ? "auto" : "visible",
                paddingBottom: isMobile ? "10px" : "0"
              }}
            >
              {tabs.map((tab) => (
                <button
                  key={tab}
                  style={{
                    textAlign: "center",
                    padding: isMobile ? "10px 8px" : "15px 10px",
                    fontWeight: "bold",
                    background: activeTab === tab ? "#fcb900" : "#000",
                    color: activeTab === tab ? "#000" : "#fff",
                    cursor: "pointer",
                    border: "none",
                    transition: "0.3s",
                    minWidth: isMobile ? "100px" : "120px",
                    flex: isMobile ? "0 0 auto" : "1 0 auto",
                    fontSize: isMobile ? "12px" : "14px",
                  }}
                  onClick={() => handleTabClick(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div style={{ 
            width: "100%", 
            maxWidth: isMobile ? "100%" : "500px", 
            minWidth: "300px" 
          }} data-aos="fade-up">
            <img
              src={campusContent[activeTab].image}
              alt="Campus Life"
              style={{ width: "100%", borderRadius: "6px" }}
            />
          </div>
        </div>
        <Gallery />
      </div>
    </>
  );
};

export default Home;