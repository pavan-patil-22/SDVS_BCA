// import React, { useState, useEffect } from "react";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import Placement from "./Placement";
// import Gallery from "./Gallery";
// import EventNews from "./EventNews";
// import NotificationBar from "./NotificationBar";
// import { useNavigate } from "react-router-dom";
// // import Toppers from "./Toppers";

// const Home = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [activeCard, setActiveCard] = useState(null);
//   const [activeTab, setActiveTab] = useState("Campus");
//   const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

//   // Initialize AOS
//   useEffect(() => {
//     AOS.init({
//       duration: 1000,
//       once: false,
//       offset: 200,
//     });

//     // Handle window resize
//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= 768);
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const navigate = useNavigate();

//   const handleClick = (e) => {
//     e.preventDefault();
//     navigate("/contact");
//     setTimeout(() => {
//       window.scrollTo({ top: 700, behavior: "smooth" });
//     }, 500);
//   };

//   // SLIDE DATA WITH IMAGES AND CORRESPONDING TEXT
//   const slides = [
//     {
//       image: "collage.jpg",
//       text: "Epitome Of Excellence .",
//     },
//     {
//       image: "campus.jpg",
//       text: "Transforming Education.",
//     },
//     {
//       image: "ground.jpeg",
//       text: "Building Future Leaders.",
//     },
//     {
//       image: "Library3.JPG",
//       text: "Innovative Learning Environment.",
//     },
    
//   ];

//   const socialIcons = [
//     {
//       src: "https://cdn-icons-png.flaticon.com/512/724/724664.png",
//       alt: "Call",
//       link: "tel:9448636015                   ",
//     },
//     {
//       src: "https://cdn-icons-png.flaticon.com/512/733/733585.png",
//       alt: "WhatsApp",
//       link: "https://wa.me/9448636015                   ",
//     },
//     {
//       src: "https://cdn-icons-png.flaticon.com/512/2111/2111463.png",
//       alt: "Instagram",
//       link: "https://www.instagram.com/sdvss_bca_sankeshwar?utm_source=ig_web_button_share_sheet&igsh=MXYwN3JwN3B1bmhqbw==",
//     },
//   ];

//   const programmes = [
//     {
//       title: "What SDVS Offers",
//       items: [
//         "Workshops & Seminars",
//         "Tech Events & Hackathons",
//         "Cultural Fests & Celebrations",
//         "Sports & Athletics",
//         "Community Service & NSS Activities",
//         "Career Guidance & Placement Support",
//       ],
//       color: "#ffcc00",
//     },
//     {
//       title: "Job Opportunities After BCA",
//       items: [
//         "Software Developer / Programmer",
//         "Web Developer & Designer",
//         "Mobile App Developer",
//         "Database Administrator",
//         "System Analyst",
//         "Network Administrator",
//         "IT Support Specialist",
//         "Cybersecurity Analyst",
//       ],
//       color: "#ffcc00",
//     },
//     {
//       title: "Higher Studies After BCA",
//       items: [
//         "Master of Computer Applications (MCA)",
//         "Master of Business Administration (MBA)",
//         "Master of Science in Information Technology (M.Sc IT)",
//         "Post Graduate Diploma in Data Science / AI",
//       ],
//       color: "#1a4eb0",
//     },
//   ];

//   const admissionItems = [
//     { text: "Admission Process", link: "/admission-process" },
//     { text: "Admission Counselling", link: "/admission-counselling" },
//   ];

//   const recruiterLogos = [
//     "https://logowik.com/content/uploads/images/tcs-tata-consultancy-services2792.logowik.com.webp",
//     "https://www.wipro.com/content/dam/nexus/en/brand/images/secondary-logo-400x276.png",
//     "https://logowik.com/content/uploads/images/tcs-tata-consultancy-services2792.logowik.com.webp",
//   ];

//   // Campus section content
//   const campusContent = {
//     Campus: {
//       title: "Campus",
//       description:
//         "Our clean and eco-conscious campus creates the perfect atmosphere for focused learning and overall well-being",
//       image: "campus image.png",
//     },
//     "Computer Lab": {
//       title: "Computer Lab",
//       description:
//         "Our advanced and high-tech computer lab provides the essential tools for innovation, practical learning, and digital mastery.",
//       image: "computer lab.jpg",
//     },
//     Library: {
//       title: "Library",
//       description:
//         "Our sustainable and thoughtfully designed library supports deep learning and well-being in a calm, inspiring environment.",
//       image: "Library3.JPG",
//     },
//     "Sports & Grounds": {
//       title: "Sports & Grounds",
//       description:
//         "Our dynamic sports facilities are designed to develop physical strength, character, and a sense of collective achievement.",
//       image: "ground.jpeg",
//     },
//     "SDVS'S BCA": {
//       title: "SDVS'S BCA",
//       description:
//         "A dynamic and innovative academic program designed to shape future tech leaders, offering a perfect blend of theoretical knowledge and practical expertise in a supportive and inspiring environment.",
//       image: "collage.jpg",
//     },
//   };

//   const tabs = Object.keys(campusContent);

//   const showSlide = (index) => {
//     setCurrentSlide(index);
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
//     }, 4000);

//     return () => clearInterval(interval);
//   }, [slides.length]);

//   const handleEnquireClick = () => {};

//   const handleTabClick = (tab) => {
//     setActiveTab(tab);
//   };

//   const handleAdmissionClick = (link) => {
//     alert(`Navigating to: ${link}`);
//   };

//   return (
//     <>
//       {/* Banner Section */}
//       <section className="banner">
//         <NotificationBar />
//         <style>{`
//           body {
//             margin: 0;
//             font-family: Arial, sans-serif;
//           }

//           /* Section Wrapper */
//           .banner {
//             position: relative;
//             width: 100%;
//             height: 80vh;
//             overflow: hidden;
//           }

//           /* Carousel Images */
//           .slides {
//             display: flex;
//             width: ${slides.length * 100}%;
//             height: 100%;
//             transition: transform 1s ease-in-out;
//           }

//           .slides img {
//             width: ${100 / slides.length}%;
//             object-fit: cover;
//           }

//           /* Red Text Box */
//           .text-box {
//             position: absolute;
//             bottom: 20px;
//             left: 50px;
//             background: #b90000;
//             color: white;
//             font-size: 32px;
//             font-weight: bold;
//             padding: 20px 30px;
//             border-radius: 5px;
//             max-width: 350px;
//             line-height: 1.3em;
//             box-shadow: 0px 4px 10px rgba(0,0,0,0.3);
//             transition: opacity 0.5s ease;
//             z-index: 5;
//           }

//           /* Left Social Icons */
//           .social-bar {
//             position: absolute;
//             top: 20%;
//             left: 0;
//             display: flex;
//             flex-direction: column;
//             gap: 10px;
//             z-index: 10;
//           }

//           .social-bar a {
//             background: #ffffffe2;
//             padding: 10px;
//             display: flex;
//             justify-content: center;
//             align-items: center;
//             border-radius: 5px;
//             transition: background 0.3s ease;
//           }

//           .social-bar a img {
//             width: 20px;
//             height: 20px;
//           }

//           .social-bar a:hover {
//             background: #f0f0f0;
//           }

//           /* Enquire Now Button */
//           .enquire-btn {
//             position: absolute;
//             top: 50%;
//             right: 0;
//             background: #b90000;
//             color: white;
//             transform: translateY(-50%);
//             writing-mode: vertical-rl;
//             text-align: center;
//             padding: 12px;
//             font-weight: bold;
//             letter-spacing: 1px;
//             border-radius: 5px 0 0 5px;
//             cursor: pointer;
//             transition: background 0.3s ease;
//             z-index: 10;
//           }

//           .enquire-btn:hover {
//             background: #8a0000;
//           }

//           /* Carousel Navigation */
//           .nav-buttons {
//             position: absolute;
//             bottom: 10px;
//             left: 50%;
//             transform: translateX(-50%);
//             display: flex;
//             gap: 10px;
//             z-index: 5;
//           }

//           .nav-buttons span {
//             width: 12px;
//             height: 12px;
//             background: white;
//             border-radius: 50%;
//             cursor: pointer;
//             transition: background 0.3s ease;
//           }

//           .nav-buttons span.active {
//             background: #b90000;
//           }

//           @media (max-width: 1024px) {
//             .banner {
//               height: 70vh;
//             }
//           }

//           @media (max-width: 768px) {
//             .banner {
//               height: 60vh;
//             }
//             .text-box {
//               font-size: 22px;
//               left: 20px;
//               max-width: 250px;
//               padding: 15px 20px;
//             }
//             .social-bar {
//               top: 10%;
//               flex-direction: column;
//               left: 10px;
//               transform: none;
//               width: auto;
//               justify-content: flex-start;
//             }
//             .social-bar a {
//               padding: 8px;
//             }
//             .social-bar a img {
//               width: 16px;
//               height: 16px;
//             }
//             .enquire-btn {
//               top: auto;
//               bottom: 60px;
//               right: 10px;
//               writing-mode: vertical-rl;
//               transform: none;
//               padding: 8px 12px;
//               font-size: 14px;
//             }
//           }

//           @media (max-width: 480px) {
//             .banner {
//               height: 50vh;
//             }
//             .text-box {
//               font-size: 18px;
//               left: 10px;
//               bottom: 10px;
//               max-width: 200px;
//               padding: 10px 15px;
//             }
//             .social-bar {
//               top: 5%;
//               left: 5px;
//             }
//             .social-bar a {
//               padding: 6px;
//             }
//             .social-bar a img {
//               width: 14px;
//               height: 14px;
//             }
//             .enquire-btn {
//               bottom: 50px;
//               right: 5px;
//               padding: 6px 10px;
//               font-size: 12px;
//             }
//           }
//         `}</style>

//         {/* Image Carousel */}
//         <div
//           className="slides"
//           style={{
//             transform: `translateX(-${currentSlide * (100 / slides.length)}%)`,
//           }}
//         >
//           {slides.map((slide, index) => (
//             <img key={index} src={slide.image} alt={`Slide ${index + 1}`} />
//           ))}
//         </div>

//         {/* Social Icons */}
//         <div className="social-bar">
//           {socialIcons.map((icon, index) => (
//             <a
//               key={index}
//               href={icon.link}
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               <img src={icon.src} alt={icon.alt} />
//             </a>
//           ))}
//         </div>

//         {/* Dynamic Text Box */}
//         <div className="text-box" data-aos="fade-up">
//           {slides[currentSlide].text}
//         </div>

//         {/* Enquire Now Button */}
//         <div className="enquire-btn" onClick={handleClick}>
//           Enquire Now
//         </div>

//         {/* Navigation Dots */}
//         <div className="nav-buttons">
//           {slides.map((_, index) => (
//             <span
//               key={index}
//               className={index === currentSlide ? "active" : ""}
//               onClick={() => showSlide(index)}
//             ></span>
//           ))}
//         </div>
//       </section>

//       {/* Programme Section */}
//       <div
//         style={{
//           margin: 0,
//           fontFamily: "Arial, sans-serif",
//           background: "#f5f5f5",
//           color: "#333",
//           padding: "40px 20px",
//         }}
//       >
//         <div
//           style={{
//             display: "flex",
//             alignItems: "flex-start",
//             justifyContent: "space-between",
//             maxWidth: "1200px",
//             margin: "0 auto",
//             gap: "30px",
//             flexWrap: "wrap",
//           }}
//         >
//           {/* Left Section */}
//           <div style={{ flex: 1, minWidth: "300px" }}>
//             <div
//               style={{
//                 fontSize: isMobile ? "24px" : "32px",
//                 color: "#1a4eb0",
//                 fontWeight: "bold",
//                 display: "flex",
//                 alignItems: "center",
//               }}
//               data-aos="fade-down"
//             >
//               Why SDVS'S BCA...?
//               <span
//                 style={{
//                   display: "inline-block",
//                   width: "50px",
//                   height: "3px",
//                   backgroundColor: "#ffcc00",
//                   marginLeft: "10px",
//                 }}
//               ></span>
//             </div>

//             <div
//               style={{
//                 fontSize: isMobile ? "18px" : "24px",
//                 fontWeight: "bold",
//                 marginTop: "10px",
//                 marginBottom: "20px",
//                 lineHeight: "1.3",
//               }}
//               data-aos="fade-up"
//               data-aos-delay="100"
//             >
//               The Right Choice for a Successful Career in IT{" "}
//             </div>

//             <div
//               style={{
//                 display: "flex",
//                 flexDirection: isMobile ? "column" : "row",
//                 gap: "20px",
//                 flexWrap: "wrap",
//               }}
//             >
//               {programmes.map((programme, index) => (
//                 <div
//                   key={index}
//                   style={{
//                     background: "white",
//                     borderRadius: "10px",
//                     padding: "20px",
//                     boxShadow:
//                       activeCard === index
//                         ? "0 8px 16px rgba(0,0,0,0.2)"
//                         : "0 4px 8px rgba(0,0,0,0.1)",
//                     flex: isMobile ? "1" : "1",
//                     minWidth: isMobile ? "100%" : "250px",
//                     transition: "transform 0.3s ease, box-shadow 0.3s ease",
//                     transform:
//                       activeCard === index ? "translateY(-5px)" : "none",
//                     cursor: "pointer",
//                   }}
//                   onMouseEnter={() => setActiveCard(index)}
//                   onMouseLeave={() => setActiveCard(null)}
//                   data-aos="fade-left"
//                   data-aos-delay="100"
//                 >
//                   <h3
//                     style={{
//                       borderTop: `4px solid ${programme.color}`,
//                       paddingTop: "10px",
//                       marginBottom: "10px",
//                       marginTop: 0,
//                       fontSize: isMobile ? "16px" : "18px",
//                     }}
//                   >
//                     {programme.title}
//                   </h3>
//                   <ul
//                     style={{
//                       listStyle: "none",
//                       padding: 0,
//                       margin: 0,
//                     }}
//                   >
//                     {programme.items.map((item, i) => (
//                       <li
//                         key={i}
//                         style={{
//                           margin: "8px 0",
//                           position: "relative",
//                           paddingLeft: "15px",
//                           transition: "color 0.2s ease",
//                           fontSize: isMobile ? "14px" : "16px",
//                         }}
//                       >
//                         <span
//                           style={{
//                             position: "absolute",
//                             left: 0,
//                             color: "#555",
//                           }}
//                         >
//                           ›
//                         </span>
//                         {item}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Right Section */}
//           <div
//             style={{
//               flex: isMobile ? "1" : "0.8",
//               position: "relative",
//               minWidth: isMobile ? "100%" : "300px",
//               borderRadius: "10px",
//               overflow: "hidden",
//               boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
//               marginTop: isMobile ? "20px" : "0",
//             }}
//             data-aos="fade-down"
//             data-aos-delay="300"
//           >
//             <img
//               src="https://startuppakistan.com.pk/wp-content/uploads/2022/03/Youniform-School-Stills-64-of-66-scaled.jpg"
//               alt="College Student"
//               style={{
//                 width: "100%",
//                 height: isMobile ? "300px" : "100%",
//                 objectFit: "cover",
//                 display: "block",
//               }}
//             />
//             <div
//               style={{
//                 position: "absolute",
//                 bottom: "15px",
//                 left: "15px",
//                 background: "rgba(255, 255, 255, 0.85)",
//                 padding: "15px 20px",
//                 borderRadius: "8px",
//                 fontWeight: "bold",
//               }}
//             >
//               {admissionItems.map((item, index) => (
//                 <div
//                   key={index}
//                   style={{
//                     margin: "8px 0",
//                     cursor: "pointer",
//                     fontSize: isMobile ? "14px" : "16px",
//                   }}
//                   onClick={handleClick}
//                 >
//                   › {item.text}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Accreditation Section */}
//       <div
//         style={{
//           display: "flex",
//           flexDirection: isMobile ? "column" : "row",
//           alignItems: "center",
//           justifyContent: "space-between",
//           padding: "30px",
//           background: "#fff",
//           fontFamily: "Arial, sans-serif",
//           maxWidth: "1200px",
//           margin: "0 auto",
//           flexWrap: "wrap",
//           gap: isMobile ? "20px" : "0",
//         }}
//         data-aos="fade-up"
//       >
//         <div style={{ textAlign: isMobile ? "center" : "left" }}>
//           <h3 style={{ margin: 0, fontSize: isMobile ? "18px" : "24px" }}>
//             Accreditations and Affiliations
//           </h3>
//         </div>
//         <div
//           style={{
//             display: "flex",
//             gap: isMobile ? "20px" : "40px",
//             flexWrap: "wrap",
//             justifyContent: isMobile ? "center" : "flex-end",
//           }}
//         >
//           <img
//             src="https://tse2.mm.bing.net/th/id/OIP.zULu3PJC9TnpyU7vv5LKIAHaFf?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
//             alt="NAAC"
//             style={{ height: isMobile ? "60px" : "80px", objectFit: "contain" }}
//           />
//         </div>
//       </div>

//       {/* Stats Section */}
//       <div
//         style={{
//           display: "flex",
//           flexDirection: isMobile ? "column" : "row",
//           marginTop: "0",
//           fontFamily: "Arial, sans-serif",
//           flexWrap: "wrap",
//         }}
//       >
//         <div
//           style={{
//             flex: 1,
//             padding: "30px",
//             color: "#fff",
//             fontSize: isMobile ? "20px" : "24px",
//             fontWeight: "bold",
//             textAlign: "center",
//             background: "#c4122f",
//             minWidth: "300px",
//           }}
//           data-aos="fade-down"
//         >
//           10k+
//           <span
//             style={{
//               fontSize: isMobile ? "12px" : "14px",
//               display: "block",
//               marginTop: "10px",
//               fontWeight: "normal",
//             }}
//           >
//             Alumni Across the Globe
//           </span>
//         </div>
//         <div
//           style={{
//             flex: 1,
//             padding: "30px",
//             color: "#fff",
//             fontSize: isMobile ? "20px" : "24px",
//             fontWeight: "bold",
//             textAlign: "center",
//             background: "#004aad",
//             minWidth: "300px",
//           }}
//           data-aos="fade-up"
//         >
//           18+
//           <span
//             style={{
//               fontSize: isMobile ? "12px" : "14px",
//               display: "block",
//               marginTop: "10px",
//               fontWeight: "normal",
//             }}
//           >
//             Years of Education Experience
//           </span>
//         </div>
//       </div>
//       {/* Toppers Section */}
//       {/* <div>
//         <Toppers />
//       </div> */}
//       {/* Placements Section */}
//       <div>
//         <Placement />
//       </div>

//       <div>
//         <EventNews />
//       </div>

//       {/* Campus Life Section */}
//       <div
//         style={{
//           margin: 0,
//           fontFamily: "Arial, sans-serif",
//           background: "#fff",
//           color: "#000",
//           padding: "50px 20px",
//         }}
//       >
//         <div
//           style={{
//             display: "flex",
//             flexDirection: isMobile ? "column" : "row",
//             justifyContent: "space-between",
//             alignItems: "center",
//             maxWidth: "1200px",
//             margin: "0 auto",
//             flexWrap: "wrap",
//             gap: "30px",
//           }}
//         >
//           <div
//             style={{
//               width: "100%",
//               maxWidth: isMobile ? "100%" : "600px",
//               minWidth: "300px",
//             }}
//             data-aos="fade-down"
//           >
//             <h2
//               style={{
//                 fontSize: isMobile ? "22px" : "28px",
//                 color: "#1a4d8f",
//                 marginBottom: "10px",
//               }}
//             >
//               Campus Life
//             </h2>
//             <h1
//               style={{
//                 fontSize: isMobile ? "26px" : "34px",
//                 fontWeight: "bold",
//                 marginBottom: "20px",
//               }}
//             >
//               A lively, international community that makes every day at SDVS
//               enriching.
//             </h1>
//             <h3
//               style={{
//                 fontSize: isMobile ? "16px" : "18px",
//                 marginTop: "20px",
//                 marginBottom: "10px",
//               }}
//             >
//               {campusContent[activeTab].title}
//             </h3>
//             <p
//               style={{
//                 fontSize: isMobile ? "14px" : "15px",
//                 lineHeight: "1.6",
//                 color: "#444",
//               }}
//             >
//               {campusContent[activeTab].description}
//             </p>
//             <a
//               href="#"
//               style={{
//                 display: "inline-block",
//                 marginTop: "20px",
//                 background: "#fff",
//                 border: "1px solid #ccc",
//                 width: "35px",
//                 height: "35px",
//                 textAlign: "center",
//                 lineHeight: "35px",
//                 fontWeight: "bold",
//                 textDecoration: "none",
//                 color: "#000",
//                 borderRadius: "4px",
//               }}
//             >
//               ›
//             </a>

//             {/* Bottom Tab Buttons */}
//             <div
//               style={{
//                 display: "flex",
//                 marginTop: "20px",
//                 flexWrap: "wrap",
//                 gap: "5px",
//                 overflowX: isMobile ? "auto" : "visible",
//                 paddingBottom: isMobile ? "10px" : "0",
//               }}
//             >
//               {tabs.map((tab) => (
//                 <button
//                   key={tab}
//                   style={{
//                     textAlign: "center",
//                     padding: isMobile ? "10px 8px" : "15px 10px",
//                     fontWeight: "bold",
//                     background: activeTab === tab ? "#fcb900" : "#000",
//                     color: activeTab === tab ? "#000" : "#fff",
//                     cursor: "pointer",
//                     border: "none",
//                     transition: "0.3s",
//                     minWidth: isMobile ? "100px" : "120px",
//                     flex: isMobile ? "0 0 auto" : "1 0 auto",
//                     fontSize: isMobile ? "12px" : "14px",
//                   }}
//                   onClick={() => handleTabClick(tab)}
//                 >
//                   {tab}
//                 </button>
//               ))}
//             </div>
//           </div>

//           <div
//             style={{
//               width: "100%",
//               maxWidth: isMobile ? "100%" : "500px",
//               minWidth: "300px",
//             }}
//             data-aos="fade-up"
//           >
//             <img
//               src={campusContent[activeTab].image}
//               alt="Campus Life"
//               style={{ width: "100%", borderRadius: "6px" }}
//             />
//           </div>
//         </div>
//         <Gallery />
//       </div>
//     </>
//   );
// };

// export default Home;











import React, { useState, useEffect, useRef } from "react";
import Placement from "./Placement";
import Gallery from "./Gallery";
import EventNews from "./EventNews";
import NotificationBar from "./NotificationBar";
import { useNavigate } from "react-router-dom";

/* ─── Design tokens ─────────────────────────────────── */
const T = {
  red: "#c4122f",
  redDark: "#8a0000",
  blue: "#1a4eb0",
  blueDark: "#0d2f6e",
  yellow: "#ffcc00",
  yellowDark: "#d4a800",
  white: "#ffffff",
  offWhite: "#f7f7f5",
  dark: "#111111",
  muted: "#555555",
  cardShadow: "0 2px 16px rgba(0,0,0,0.09)",
};

/* ─── Google Fonts import via style injection ────────── */
const FONT_STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'DM Sans', sans-serif; background: ${T.offWhite}; }
`;

/* ─── Keyframes ──────────────────────────────────────── */
const KEYFRAMES = `
  @keyframes fadeSlideUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:none; } }
  @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
  @keyframes pulse { 0%,100%{transform:scale(1);} 50%{transform:scale(1.04);} }
  @keyframes slideInLeft { from { opacity:0; transform:translateX(-20px); } to { opacity:1; transform:none; } }
  @keyframes countUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:none; } }
`;

const injectStyles = () => {
  if (document.getElementById("home-fonts")) return;
  const el = document.createElement("style");
  el.id = "home-fonts";
  el.textContent = FONT_STYLE + KEYFRAMES;
  document.head.appendChild(el);
};

/* ─── Reusable micro-components ─────────────────────── */

const SectionLabel = ({ children, light }) => (
  <div style={{
    display: "inline-flex", alignItems: "center", gap: 8,
    fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 600,
    letterSpacing: "0.12em", textTransform: "uppercase",
    color: light ? "rgba(255,255,255,0.7)" : T.red,
    marginBottom: 10,
  }}>
    <span style={{ width: 28, height: 2, background: light ? T.yellow : T.red, borderRadius: 2 }} />
    {children}
  </div>
);

const Tag = ({ children, color = T.yellow }) => (
  <span style={{
    display: "inline-block", background: color, color: T.dark,
    fontSize: 11, fontWeight: 600, borderRadius: 3,
    padding: "3px 8px", letterSpacing: "0.05em",
  }}>{children}</span>
);

/* ─── HOME COMPONENT ─────────────────────────────────── */
const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeCard, setActiveCard] = useState(null);
  const [activeTab, setActiveTab] = useState("Campus");
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => { injectStyles(); }, []);

  /* ── Intersection Observer for stats animation ── */
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  /* ── Slide auto-advance ── */
  const slides = [
    { image: "collage.jpg",   text: "Epitome Of Excellence." },
    { image: "campus.jpg",    text: "Transforming Education." },
    { image: "ground.jpeg",   text: "Building Future Leaders." },
    { image: "Library3.JPG",  text: "Innovative Learning Environment." },
  ];

  useEffect(() => {
    const id = setInterval(() =>
      setCurrentSlide(p => (p + 1) % slides.length), 4500);
    return () => clearInterval(id);
  }, [slides.length]);

  const handleContact = (e) => {
    e?.preventDefault();
    navigate("/contact");
    setTimeout(() => window.scrollTo({ top: 700, behavior: "smooth" }), 500);
  };

  /* ── Data ── */
  const socialIcons = [
    { src: "https://cdn-icons-png.flaticon.com/512/724/724664.png",   alt: "Call",      link: "tel:9448636015" },
    { src: "https://cdn-icons-png.flaticon.com/512/733/733585.png",   alt: "WhatsApp",  link: "https://wa.me/9448636015" },
    { src: "https://cdn-icons-png.flaticon.com/512/2111/2111463.png", alt: "Instagram", link: "https://www.instagram.com/sdvss_bca_sankeshwar" },
  ];

  const programmes = [
    {
      title: "What We Offers",
      accent: T.yellow,
      icon: "🎯",
      items: ["Workshops & Seminars","Tech Events & Hackathons","Cultural Fests","Sports & Athletics","Community Service & NSS","Career Guidance & Placements"],
    },
    {
      title: "Job Opportunities",
      accent: T.red,
      icon: "💼",
      items: ["Software Developer","Web Developer & Designer","Mobile App Developer","Database Administrator","System Analyst","Cybersecurity Analyst"],
    },
    {
      title: "Higher Studies",
      accent: T.blue,
      icon: "🎓",
      items: ["MCA","MBA","M.Sc(Computer Science)","SLET/NET/M.Tech(C.S &Tech)/M.Phil/Ph.D)"],
    },
  ];

  const campusContent = {
    Campus:         { description: "Our clean, eco-conscious campus creates the perfect atmosphere for focused learning and overall well-being.", image: "campus image.png" },
    "Computer Lab": { description: "Our advanced lab provides the essential tools for innovation, practical learning, and digital mastery.", image: "computer lab.jpg" },
    Library:        { description: "Thoughtfully designed to support deep learning and well-being in a calm, inspiring environment.", image: "Library3.JPG" },
    "Sports":       { description: "Dynamic facilities designed to develop physical strength, character, and collective achievement.", image: "ground.jpeg" },
    "BCA Program":  { description: "A dynamic program that shapes future tech leaders with a blend of theory and practical expertise.", image: "collage.jpg" },
  };
  const tabs = Object.keys(campusContent);

  /* ─── RENDER ─────────────────────────────────────────── */
  return (
    <>
      {/* ── HERO BANNER ────────────────────────────────── */}
      <section style={{ position: "relative", width: "100%", height: "92vh", overflow: "hidden", background: T.dark }}>
        <NotificationBar />

        {/* Slides */}
        <div style={{
          display: "flex",
          width: `${slides.length * 100}%`,
          height: "100%",
          transition: "transform 1s cubic-bezier(0.77,0,0.18,1)",
          transform: `translateX(-${currentSlide * (100 / slides.length)}%)`,
        }}>
          {slides.map((s, i) => (
            <div key={i} style={{ width: `${100 / slides.length}%`, position: "relative", flexShrink: 0 }}>
              <img src={s.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.82 }} />
              {/* Gradient overlay */}
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.18) 55%, transparent 100%)",
              }} />
            </div>
          ))}
        </div>

        {/* Social bar */}
        <div style={{
          position: "absolute", left: 0, top: "22%",
          display: "flex", flexDirection: "column", gap: 6, zIndex: 10,
        }}>
          {socialIcons.map((ic, i) => (
            <a key={i} href={ic.link} target="_blank" rel="noopener noreferrer"
              style={{
                background: "rgba(255,255,255,0.92)", padding: "10px 12px",
                display: "flex", alignItems: "center", justifyContent: "center",
                borderRadius: "0 6px 6px 0",
                borderLeft: `3px solid ${T.red}`,
                transition: "background 0.2s, transform 0.2s",
              }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateX(4px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "none"}
            >
              <img src={ic.src} alt={ic.alt} style={{ width: 18, height: 18 }} />
            </a>
          ))}
        </div>

        {/* Slide text */}
        <div key={currentSlide} style={{
          position: "absolute", bottom: 64, left: 0, right: 0,
          padding: "0 20px 0 24px",
          animation: "fadeSlideUp 0.7s ease both",
          zIndex: 6,
        }}>
          <div style={{
            display: "inline-block",
            background: T.red,
            color: T.white,
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(22px, 5vw, 40px)",
            fontWeight: 700,
            lineHeight: 1.25,
            padding: "18px 24px",
            borderRadius: "0 8px 8px 0",
            borderLeft: `5px solid ${T.yellow}`,
            maxWidth: "min(380px, 90vw)",
            boxShadow: "4px 4px 32px rgba(0,0,0,0.3)",
          }}>
            {slides[currentSlide].text}
          </div>
        </div>

        {/* Enquire button */}
        <button onClick={handleContact} style={{
          position: "absolute", top: "50%", right: 0,
          transform: "translateY(-50%)",
          background: T.yellow, color: T.dark,
          writingMode: "vertical-rl", padding: "16px 10px",
          fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 700,
          letterSpacing: "0.1em", textTransform: "uppercase",
          border: "none", borderRadius: "6px 0 0 6px",
          cursor: "pointer", zIndex: 10,
          transition: "background 0.2s, transform 0.2s",
          boxShadow: "-2px 0 12px rgba(0,0,0,0.2)",
        }}
          onMouseEnter={e => { e.currentTarget.style.background = T.yellowDark; e.currentTarget.style.transform = "translateY(-50%) translateX(-3px)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = T.yellow; e.currentTarget.style.transform = "translateY(-50%)"; }}
        >
          Enquire Now
        </button>

        {/* Dots */}
        <div style={{
          position: "absolute", bottom: 20, left: "50%",
          transform: "translateX(-50%)", display: "flex", gap: 8, zIndex: 6,
        }}>
          {slides.map((_, i) => (
            <button key={i} onClick={() => setCurrentSlide(i)} style={{
              width: i === currentSlide ? 28 : 10, height: 10,
              background: i === currentSlide ? T.yellow : "rgba(255,255,255,0.5)",
              border: "none", borderRadius: 5, cursor: "pointer",
              transition: "all 0.3s", padding: 0,
            }} />
          ))}
        </div>
      </section>

      {/* ── WHY SDVS SECTION ──────────────────────────── */}
      <section style={{ background: T.offWhite, padding: "60px 20px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <SectionLabel>Our Programs</SectionLabel>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(26px, 5vw, 42px)",
            color: T.blue, fontWeight: 900, lineHeight: 1.2, marginBottom: 6,
          }}>
            Why SDVSS BCA?
          </h2>
          <p style={{ color: T.muted, fontSize: 16, marginBottom: 36, maxWidth: 520 }}>
            The right choice for a successful, future-ready career in Information Technology.
          </p>

          {/* Cards grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
            gap: 20, marginBottom: 40,
          }}>
            {programmes.map((prog, idx) => (
              <div key={idx}
                onMouseEnter={() => setActiveCard(idx)}
                onMouseLeave={() => setActiveCard(null)}
                style={{
                  background: T.white, borderRadius: 12,
                  borderTop: `4px solid ${prog.accent}`,
                  padding: "24px 22px",
                  boxShadow: activeCard === idx ? "0 8px 32px rgba(0,0,0,0.14)" : T.cardShadow,
                  transform: activeCard === idx ? "translateY(-4px)" : "none",
                  transition: "transform 0.25s, box-shadow 0.25s",
                  cursor: "default",
                }}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>{prog.icon}</div>
                <h3 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 18, color: T.dark, fontWeight: 700, marginBottom: 14,
                }}>{prog.title}</h3>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                  {prog.items.map((item, i) => (
                    <li key={i} style={{
                      display: "flex", alignItems: "flex-start", gap: 8,
                      fontSize: 14, color: T.muted, lineHeight: 1.4,
                    }}>
                      <span style={{
                        width: 6, height: 6, borderRadius: "50%",
                        background: prog.accent, marginTop: 6, flexShrink: 0,
                      }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Admission CTA */}
          <div style={{
            background: T.blue, borderRadius: 12,
            padding: "28px 28px", display: "flex",
            flexWrap: "wrap", gap: 16,
            alignItems: "center", justifyContent: "space-between",
          }}>
            <div>
              <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 13, marginBottom: 4 }}>
                Ready to take the next step?
              </p>
              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                color: T.white, fontSize: 20, fontWeight: 700,
              }}>
                Begin your BCA journey at SDVS
              </h3>
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {[{ text: "Admission Process" }, { text: "Counselling" }].map((btn, i) => (
                <button key={i} onClick={handleContact} style={{
                  padding: "11px 22px",
                  background: i === 0 ? T.yellow : "transparent",
                  color: i === 0 ? T.dark : T.white,
                  border: i === 0 ? "none" : `1.5px solid rgba(255,255,255,0.5)`,
                  borderRadius: 7, cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 14, fontWeight: 600,
                  transition: "opacity 0.2s",
                }}
                  onMouseEnter={e => e.currentTarget.style.opacity = "0.82"}
                  onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                >
                  {btn.text}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ACCREDITATION STRIP ───────────────────────── */}
      <div style={{
        background: T.white, padding: "24px 20px",
        borderTop: `1px solid #ebebeb`, borderBottom: `1px solid #ebebeb`,
      }}>
        <div style={{
          maxWidth: 1100, margin: "0 auto",
          display: "flex", flexWrap: "wrap",
          alignItems: "center", justifyContent: "space-between", gap: 16,
        }}>
          <div>
            <p style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: T.muted, marginBottom: 2 }}>Accreditations & Affiliations</p>
            <p style={{ fontSize: 14, fontWeight: 600, color: T.dark }}>Recognized for Academic Excellence</p>
          </div>
          <img
            src="https://tse2.mm.bing.net/th/id/OIP.zULu3PJC9TnpyU7vv5LKIAHaFf?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
            alt="NAAC Accreditation"
            style={{ height: 64, objectFit: "contain" }}
          />
        </div>
      </div>

      {/* ── STATS SECTION ─────────────────────────────── */}
      <div ref={statsRef} style={{ display: "flex", flexWrap: "wrap" }}>
        {[
          { value: "10,000+", label: "Alumni Across the Globe", bg: T.red },
          { value: "18+",     label: "Years of Education Experience", bg: T.blue },
        ].map((stat, i) => (
          <div key={i} style={{
            flex: "1 1 240px", padding: "44px 28px",
            background: stat.bg, textAlign: "center",
            animation: statsVisible ? `countUp 0.6s ${i * 0.2}s both` : "none",
          }}>
            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(32px, 7vw, 52px)", fontWeight: 900,
              color: T.white, lineHeight: 1, marginBottom: 10,
            }}>{stat.value}</p>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.75)", fontWeight: 500 }}>{stat.label}</p>
          </div>
        ))}
      </div>

      {/* ── PLACEMENTS ────────────────────────────────── */}
      <Placement />

      {/* ── EVENT NEWS ────────────────────────────────── */}
      <EventNews />

      {/* ── CAMPUS LIFE ───────────────────────────────── */}
      <section style={{ background: T.white, padding: "64px 20px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <SectionLabel>Explore</SectionLabel>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(26px, 5vw, 40px)",
            color: T.blue, fontWeight: 900, marginBottom: 6,
          }}>Campus Life</h2>
          <p style={{ color: T.muted, fontSize: 15, marginBottom: 32, maxWidth: 480 }}>
            A lively community that makes every day at SDVS enriching and memorable.
          </p>

          {/* Tab bar */}
          <div style={{
            display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 28,
          }}>
            {tabs.map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} style={{
                padding: "9px 16px", borderRadius: 6,
                border: activeTab === tab ? "none" : `1.5px solid #d4d4d4`,
                background: activeTab === tab ? T.yellow : "transparent",
                color: activeTab === tab ? T.dark : T.muted,
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13, fontWeight: 600, cursor: "pointer",
                transition: "all 0.2s",
              }}>
                {tab}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div key={activeTab} style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
            gap: 24, animation: "fadeIn 0.4s ease both",
          }}>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 16 }}>
              <Tag>{activeTab}</Tag>
              <p style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(18px, 3.5vw, 26px)", fontWeight: 700,
                color: T.dark, lineHeight: 1.35,
              }}>
                {campusContent[activeTab].description}
              </p>
              <button onClick={handleContact} style={{
                alignSelf: "flex-start",
                padding: "11px 24px", background: T.blue, color: T.white,
                border: "none", borderRadius: 7, cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600,
                transition: "background 0.2s",
              }}
                onMouseEnter={e => e.currentTarget.style.background = T.blueDark}
                onMouseLeave={e => e.currentTarget.style.background = T.blue}
              >
                Learn More →
              </button>
            </div>
            <div style={{
              borderRadius: 12, overflow: "hidden",
              boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
              aspectRatio: "4/3",
            }}>
              <img
                src={campusContent[activeTab].image}
                alt={activeTab}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
          </div>
        </div>

        {/* Gallery sub-component */}
        <Gallery />
      </section>
    </>
  );
};

export default Home;