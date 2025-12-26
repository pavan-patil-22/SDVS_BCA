// import React from 'react';
// import { Link } from 'react-router-dom';

// const GuestFooter = () => {
//   return (
//     <footer style={styles.footer}>
//       <div style={styles.footerContainer}>
//         {/* Footer Top Section */}
//         <div style={styles.footerTop}>
//           {/* About Section */}
//           <div style={styles.footerSection}>
//             <h3 style={styles.sectionTitle}>About SDVS'S BCA College
// Sankeshwar</h3>
//             <p style={styles.sectionText}>
//               The Post Graduate Common Entrance Test (PGCET) is a state-level entrance examination
//               for admission to various postgraduate courses in Karnataka.
//             </p>
//             <div style={styles.socialIcons}>
//               <a href="#" style={styles.socialIcon} aria-label="Facebook">
//                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                   <path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" fill="currentColor"/>
//                 </svg>
//               </a>
//               <a href="#" style={styles.socialIcon} aria-label="Twitter">
//                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                   <path d="M23 3C22.0424 3.67548 20.9821 4.19211 19.86 4.53C19.2577 3.83751 18.4573 3.34669 17.567 3.12393C16.6767 2.90116 15.7395 2.9572 14.8821 3.28445C14.0247 3.61171 13.2884 4.1944 12.773 4.95372C12.2575 5.71303 11.9877 6.61234 12 7.53V8.53C10.2426 8.57557 8.50127 8.18581 6.93101 7.39545C5.36074 6.60508 4.01032 5.43864 3 4C3 4 -1 13 8 17C5.94053 18.398 3.48716 19.0989 1 19C10 24 21 19 21 7.5C20.9991 7.22145 20.9723 6.94359 20.92 6.67C21.9406 5.66349 22.6608 4.39271 23 3V3Z" fill="currentColor"/>
//                 </svg>
//               </a>
//               <a href="#" style={styles.socialIcon} aria-label="LinkedIn">
//                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                   <path d="M19 3C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19ZM18.5 18.5V13.2C18.5 12.3354 18.1565 11.5062 17.5452 10.8948C16.9338 10.2835 16.1046 9.94 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17C14.6813 12.17 15.0374 12.3175 15.2999 12.5801C15.5625 12.8426 15.71 13.1987 15.71 13.57V18.5H18.5ZM6.88 8.56C7.32556 8.56 7.75288 8.383 8.06794 8.06794C8.383 7.75288 8.56 7.32556 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19C6.43178 5.19 6.00193 5.36805 5.68499 5.68499C5.36805 6.00193 5.19 6.43178 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56ZM8.27 18.5V10.13H5.5V18.5H8.27Z" fill="currentColor"/>
//                 </svg>
//               </a>
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div style={styles.footerSection}>
//             <h3 style={styles.sectionTitle}>Quick Links</h3>
//             <ul style={styles.linkList}>
//               <li style={styles.linkItem}>
//                 <Link to="/" style={styles.footerLink}>Home</Link>
//               </li>
//               <li style={styles.linkItem}>
//                 <Link to="/about" style={styles.footerLink}>About PGCET</Link>
//               </li>
//               <li style={styles.linkItem}>
//                 <Link to="/eligibility" style={styles.footerLink}>Eligibility</Link>
//               </li>
//               <li style={styles.linkItem}>
//                 <Link to="/courses" style={styles.footerLink}>Courses</Link>
//               </li>
//               <li style={styles.linkItem}>
//                 <Link to="/contact" style={styles.footerLink}>Contact Us</Link>
//               </li>
//             </ul>
//           </div>

//           {/* Contact Info */}
//           <div style={styles.footerSection}>
//             <h3 style={styles.sectionTitle}>Contact Us</h3>
//             <ul style={styles.contactList}>
//               <li style={styles.contactItem}>
//                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={styles.contactIcon}>
//                   <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="currentColor"/>
//                 </svg>
//                 <span>123 Education St, Bengaluru, Karnataka 560001</span>
//               </li>
//               <li style={styles.contactItem}>
//                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={styles.contactIcon}>
//                   <path d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill="currentColor"/>
//                 </svg>
//                 <span>info@pgcet-portal.edu.in</span>
//               </li>
//               <li style={styles.contactItem}>
//                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={styles.contactIcon}>
//                   <path d="M20.01 15.38C18.78 15.38 17.59 15.18 16.48 14.82C16.13 14.7 15.74 14.79 15.47 15.06L13.9 17.03C11.07 15.68 8.42 13.13 7.01 10.2L8.96 8.54C9.23 8.26 9.31 7.87 9.2 7.52C8.83 6.41 8.64 5.22 8.64 3.99C8.64 3.45 8.19 3 7.65 3H4.19C3.65 3 3 3.24 3 3.99C3 13.28 10.73 21 20.01 21C20.72 21 21 20.37 21 19.82V16.37C21 15.83 20.55 15.38 20.01 15.38Z" fill="currentColor"/>
//                 </svg>
//                 <span>+91 80 2345 6789</span>
//               </li>
//             </ul>
//           </div>

//           {/* Newsletter */}
//           <div style={styles.footerSection}>
//             <h3 style={styles.sectionTitle}>Newsletter</h3>
//             <p style={styles.sectionText}>Subscribe to our newsletter for updates and announcements.</p>
//             <form style={styles.newsletterForm}>
//               <input
//                 type="email"
//                 placeholder="Your email address"
//                 style={styles.newsletterInput}
//                 required
//               />
//               <button type="submit" style={styles.newsletterButton}>
//                 Subscribe
//                 <span style={styles.newsletterButtonHover}></span>
//               </button>
//             </form>
//           </div>
//         </div>

//         {/* Footer Bottom */}
//         <div style={styles.footerBottom}>
//           <p style={styles.copyrightText}>
//             &copy; {new Date().getFullYear()} SDVS'S BCA College
// Sankeshwar . All Rights Reserved.
//           </p>
//           <div style={styles.legalLinks}>
//             <Link to="/privacy-policy" style={styles.legalLink}>Privacy Policy</Link>
//             <span style={styles.legalSeparator}>|</span>
//             <Link to="/terms-of-service" style={styles.legalLink}>Terms of Service</Link>
//             <span style={styles.legalSeparator}>|</span>
//             <Link to="/sitemap" style={styles.legalLink}>Sitemap</Link>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// // Internal CSS Styles
// const styles = {
//   footer: {
//     backgroundColor: '#2c3e50',
//     color: '#ffffff',
//     padding: '3rem 0 1rem',
//     position: 'relative',
//     overflow: 'hidden',
//   },
//   footerContainer: {
//     maxWidth: '1200px',
//     margin: '0 auto',
//     padding: '0 2rem',
//   },
//   footerTop: {
//     display: 'grid',
//     gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
//     gap: '2rem',
//     marginBottom: '2rem',
//   },
//   footerSection: {
//     marginBottom: '1.5rem',
//   },
//   sectionTitle: {
//     fontSize: '1.25rem',
//     fontWeight: '600',
//     marginBottom: '1.5rem',
//     position: 'relative',
//     paddingBottom: '0.5rem',
//   },
//   sectionTitleAfter: {
//     content: '""',
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     width: '50px',
//     height: '2px',
//     backgroundColor: '#4A90E2',
//   },
//   sectionText: {
//     fontSize: '0.9rem',
//     lineHeight: '1.6',
//     color: '#ecf0f1',
//     marginBottom: '1rem',
//   },
//   socialIcons: {
//     display: 'flex',
//     gap: '1rem',
//     marginTop: '1rem',
//   },
//   socialIcon: {
//     color: '#ffffff',
//     width: '40px',
//     height: '40px',
//     borderRadius: '50%',
//     backgroundColor: 'rgba(255, 255, 255, 0.1)',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     transition: 'all 0.3s ease',
//   },
//   linkList: {
//     listStyle: 'none',
//     padding: 0,
//     margin: 0,
//   },
//   linkItem: {
//     marginBottom: '0.75rem',
//   },
//   footerLink: {
//     color: '#ecf0f1',
//     textDecoration: 'none',
//     fontSize: '0.9rem',
//     transition: 'all 0.3s ease',
//     position: 'relative',
//     paddingBottom: '2px',
//   },
//   footerLinkAfter: {
//     content: '""',
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     width: '0',
//     height: '1px',
//     backgroundColor: '#4A90E2',
//     transition: 'width 0.3s ease',
//   },
//   contactList: {
//     listStyle: 'none',
//     padding: 0,
//     margin: 0,
//   },
//   contactItem: {
//     display: 'flex',
//     alignItems: 'flex-start',
//     gap: '0.75rem',
//     marginBottom: '1rem',
//     fontSize: '0.9rem',
//     lineHeight: '1.4',
//   },
//   contactIcon: {
//     flexShrink: 0,
//     color: '#4A90E2',
//   },
//   newsletterForm: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '0.75rem',
//   },
//   newsletterInput: {
//     padding: '0.75rem',
//     borderRadius: '4px',
//     border: 'none',
//     fontSize: '0.9rem',
//     backgroundColor: 'rgba(255, 255, 255, 0.9)',
//     transition: 'all 0.3s ease',
//   },
//   newsletterButton: {
//     backgroundColor: '#4A90E2',
//     color: '#ffffff',
//     padding: '0.75rem',
//     borderRadius: '4px',
//     border: 'none',
//     fontSize: '0.9rem',
//     fontWeight: '600',
//     cursor: 'pointer',
//     transition: 'all 0.3s ease',
//     position: 'relative',
//     overflow: 'hidden',
//   },
//   newsletterButtonHover: {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: '0',
//     height: '0',
//     borderRadius: '50%',
//     backgroundColor: 'rgba(255, 255, 255, 0.2)',
//     transition: 'width 0.3s ease, height 0.3s ease',
//   },
//   footerBottom: {
//     borderTop: '1px solid rgba(255, 255, 255, 0.1)',
//     paddingTop: '1.5rem',
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     gap: '1rem',
//     textAlign: 'center',
//   },
//   copyrightText: {
//     fontSize: '0.8rem',
//     color: '#bdc3c7',
//     margin: 0,
//   },
//   legalLinks: {
//     display: 'flex',
//     gap: '1rem',
//     alignItems: 'center',
//     flexWrap: 'wrap',
//     justifyContent: 'center',
//   },
//   legalLink: {
//     color: '#bdc3c7',
//     textDecoration: 'none',
//     fontSize: '0.8rem',
//     transition: 'all 0.3s ease',
//   },
//   legalSeparator: {
//     color: '#bdc3c7',
//     fontSize: '0.8rem',
//   },
// };

// // Adding hover effects
// const addFooterHoverEffects = () => {
//   // Social icons hover effect
//   const socialIcons = document.querySelectorAll('.socialIcon');
//   socialIcons.forEach(icon => {
//     icon.addEventListener('mouseenter', () => {
//       icon.style.backgroundColor = '#4A90E2';
//       icon.style.transform = 'translateY(-3px)';
//     });
//     icon.addEventListener('mouseleave', () => {
//       icon.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
//       icon.style.transform = 'translateY(0)';
//     });
//   });

//   // Footer links hover effect
//   const footerLinks = document.querySelectorAll('.footerLink');
//   footerLinks.forEach(link => {
//     const hoverElement = document.createElement('span');
//     hoverElement.style.cssText = styles.footerLinkAfter;
//     link.appendChild(hoverElement);

//     link.addEventListener('mouseenter', () => {
//       link.style.color = '#4A90E2';
//       hoverElement.style.width = '100%';
//     });
//     link.addEventListener('mouseleave', () => {
//       link.style.color = '#ecf0f1';
//       hoverElement.style.width = '0';
//     });
//   });

//   // Newsletter input hover effect
//   const newsletterInput = document.querySelector('.newsletterInput');
//   if (newsletterInput) {
//     newsletterInput.addEventListener('focus', () => {
//       newsletterInput.style.backgroundColor = '#ffffff';
//       newsletterInput.style.boxShadow = '0 0 0 2px rgba(74, 144, 226, 0.5)';
//     });
//     newsletterInput.addEventListener('blur', () => {
//       newsletterInput.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
//       newsletterInput.style.boxShadow = 'none';
//     });
//   }

//   // Newsletter button hover effect
//   const newsletterButton = document.querySelector('.newsletterButton');
//   if (newsletterButton) {
//     const hoverElement = newsletterButton.querySelector('.newsletterButtonHover');
//     newsletterButton.addEventListener('mouseenter', () => {
//       newsletterButton.style.backgroundColor = '#3a7bc8';
//       hoverElement.style.width = '200%';
//       hoverElement.style.height = '200%';
//     });
//     newsletterButton.addEventListener('mouseleave', () => {
//       newsletterButton.style.backgroundColor = '#4A90E2';
//       hoverElement.style.width = '0';
//       hoverElement.style.height = '0';
//     });
//   }

//   // Legal links hover effect
//   const legalLinks = document.querySelectorAll('.legalLink');
//   legalLinks.forEach(link => {
//     link.addEventListener('mouseenter', () => {
//       link.style.color = '#4A90E2';
//     });
//     link.addEventListener('mouseleave', () => {
//       link.style.color = '#bdc3c7';
//     });
//   });
// };

// // Call the hover effects after component mounts
// document.addEventListener('DOMContentLoaded', addFooterHoverEffects);

// export default GuestFooter;

// import React from "react";
// import { Container, Row, Col } from "react-bootstrap";
// import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

// const GuestFooter = () => {
//   const brand = "GET-IN-TOUCH-SDVS'S-BCA-COLLAGESANKESHWAR";
//   const brandChar = brand.split("");

//   return (
//     <>
//       <style>
//         {`
//           .footer {
//             background: linear-gradient(135deg, #7bd3f4, #1f93b2, #10ff9f);
//             color: white;
//             padding: 60px 0 30px;
//             position: relative;
//             overflow: hidden;
//           }

//           .footer::before {
//             content: '';
//             position: absolute;
//             top: 0;
//             left: 0;
//             right: 0;
//             bottom: 0;
//             background: rgba(0, 0, 0, 0.7);
//             z-index: 1;
//           }

//           .footer-content {
//             position: relative;
//             z-index: 2;
//           }

//           .brand-animation {
//             text-align: center;
//             margin-bottom: 40px;
//             font-weight: bold;
//           }

//           .brand-char {
//             font-size: 2.2vw;
//             display: inline-block;
//             transition: all 5ms;
//             text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
//           }

//           #ft1{animation:rotatechar 2s ease 1s infinite}
//           #ft3{animation:rotatecharZ 2s ease 0s infinite}
//           #ft8{animation:rotatechar 3s ease 0s infinite}
//           #ft11{animation:rotatechar 3s ease 0s infinite}
//           #ft12{animation:barrel 3s linear 0.1s infinite}
//           #ft13{animation:barrel 3s linear 0.2s infinite}
//           #ft14{animation:barrel 3s linear 0.3s infinite}
//           #ft15{animation:barrel 3s linear 0.4s infinite}
//           #ft16{animation:barrel 3s linear 0.5s infinite}
//           #ft17{animation:barrel 3s linear 0.6s infinite}
//           #ft18{animation:barrel 3s linear 0.7s infinite}
//           #ft19{animation:barrel 3s linear 0.8s infinite}
//           #ft20{animation:barrel 3s linear 0.9s infinite}
//           #ft21{animation:barrel 3s linear 1s infinite}
//           #ft22{animation:barrel 3s linear 1.1s infinite}
//           #ft23{animation:barrel 3s linear 1.2s infinite}
//           #ft24{animation:barrel 3s linear 1.3s infinite}
//           #ft25{animation:barrel 3s linear 1.4s infinite}
//           #ft26{animation:barrel 3s linear 1.5s infinite}
//           #ft27{animation:barrel 3s linear 1.6s infinite}
//           #ft28{animation:barrel 3s linear 1.7s infinite}
//           #ft29{animation:barrel 3s linear 1.8s infinite}
//           #ft30{animation:barrel 3s linear 1.9s infinite}
//           #ft31{animation:barrel 3s linear 2s infinite}
//           #ft32{animation:barrel 3s linear 2.1s infinite}
//           #ft33{animation:barrel 3s linear 2.2s infinite}
//           #ft34{animation:barrel 3s linear 2.3s infinite}
//           #ft35{animation:barrel 3s linear 2.4s infinite}
//           #ft36{animation:barrel 3s linear 2.5s infinite}
//           #ft37{animation:barrel 3s linear 2.6s infinite}
//           #ft38{animation:barrel 3s linear 2.7s infinite}
//           #ft39{animation:barrel 3s linear 2.8s infinite}
//           #ft40{animation:barrel 3s linear 2.9s infinite}
//           #ft41{animation:barrel 3s linear 3s infinite}

//           @keyframes rotatechar {
//             from { transform: rotateY(0deg); }
//             to { transform: rotateY(-360deg); }
//           }

//           @keyframes rotatecharZ {
//             from { transform: rotate3d(0, 0, 0, 0deg); }
//             to { transform: rotate3d(1, 0, 0, 360deg); }
//           }

//           @keyframes barrel {
//             0% { opacity: 1; }
//             100% { opacity: 0; }
//           }

//           .footer-section {
//             margin-bottom: 30px;
//           }

//           .footer-heading {
//             font-size: 1.5rem;
//             margin-bottom: 20px;
//             position: relative;
//             padding-bottom: 10px;
//             font-weight: bold;
//           }

//           .footer-heading::after {
//             content: '';
//             position: absolute;
//             bottom: 0;
//             left: 0;
//             width: 50px;
//             height: 3px;
//             background: #fdbb2d;
//           }

//           .contact-info {
//             display: flex;
//             align-items: center;
//             margin-bottom: 15px;
//           }

//           .contact-icon {
//             margin-right: 15px;
//             font-size: 1.2rem;
//             color: #fdbb2d;
//           }

//           .quick-links {
//             list-style: none;
//             padding: 0;
//           }

//           .quick-links li {
//             margin-bottom: 12px;
//           }

//           .quick-links a {
//             color: #ddd;
//             text-decoration: none;
//             transition: all 0.3s ease;
//             display: block;
//           }

//           .quick-links a:hover {
//             color: #fdbb2d;
//             transform: translateX(5px);
//           }

//           .social-icons {
//             display: flex;
//             gap: 15px;
//             margin-top: 20px;
//           }

//           .social-icon {
//             width: 40px;
//             height: 40px;
//             border-radius: 50%;
//             background: rgba(255, 255, 255, 0.1);
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             color: white;
//             font-size: 1.2rem;
//             transition: all 0.3s ease;
//           }

//           .social-icon:hover {
//             background: #fdbb2d;
//             transform: translateY(-5px);
//           }

//           .copyright {
//             text-align: center;
//             margin-top: 40px;
//             padding-top: 20px;
//             border-top: 1px solid rgba(255, 255, 255, 0.1);
//           }

//           @media (max-width: 768px) {
//             .brand-char {
//               font-size: 3.5vw;
//             }
//           }
//         `}
//       </style>

//       <footer className="footer">
//         <Container className="footer-content">
//           {/* Animated Brand Text */}
//           <div className="brand-animation">
//             {brandChar.map((ch, index) => (
//               <span className="brand-char" key={index} id={`ft${index + 1}`}>
//                 {ch}
//               </span>
//             ))}
//           </div>

//           <Row>
//             {/* Contact Information */}
//             <Col md={4} className="footer-section">
//               <h4 className="footer-heading">Contact Us</h4>
//               <div className="contact-info">
//                 <FaMapMarkerAlt className="contact-icon" />
//                 <div>
//                   <p>SDVS'S BCA College</p>
//                   <p>Sankeshwar, Karnataka</p>
//                 </div>
//               </div>
//               <div className="contact-info">
//                 <FaPhone className="contact-icon" />
//                 <p>+91 XXXXX XXXXX</p>
//               </div>
//               <div className="contact-info">
//                 <FaEnvelope className="contact-icon" />
//                 <p>info@sdvsbca.edu.in</p>
//               </div>

//               <div className="social-icons">
//                 <a href="#" className="social-icon"><FaFacebook /></a>
//                 <a href="#" className="social-icon"><FaTwitter /></a>
//                 <a href="#" className="social-icon"><FaInstagram /></a>
//                 <a href="#" className="social-icon"><FaLinkedin /></a>
//               </div>
//             </Col>

//             {/* Quick Links */}
//             <Col md={4} className="footer-section">
//               <h4 className="footer-heading">Quick Links</h4>
//               <ul className="quick-links">
//                 <li><a href="#">Home</a></li>
//                 <li><a href="#">About Us</a></li>
//                 <li><a href="#">Courses</a></li>
//                 <li><a href="#">Admissions</a></li>
//                 <li><a href="#">Faculty</a></li>
//                 <li><a href="#">Contact</a></li>
//               </ul>
//             </Col>

//             {/* College Information */}
//             <Col md={4} className="footer-section">
//               <h4 className="footer-heading">About College</h4>
//               <p>
//                 SDVS'S BCA College in Sankeshwar is committed to providing quality education
//                 in computer applications. We strive to create future IT professionals with
//                 strong technical skills and ethical values.
//               </p>
//               <p>
//                 Our campus provides state-of-the-art facilities and a conducive learning
//                 environment for students to excel in their academic pursuits.
//               </p>
//             </Col>
//           </Row>

//           {/* Copyright */}
//           <div className="copyright">
//             <p>&copy; {new Date().getFullYear()} SDVS'S BCA College, Sankeshwar. All Rights Reserved.</p>
//           </div>
//         </Container>
//       </footer>
//     </>
//   );
// };

// export default GuestFooter;

import React from "react";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaHome,
  FaBook,
  FaUserGraduate,
  FaAddressBook,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const GuestFooter = () => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault(); // prevent default link behavior
    navigate("/contact"); // navigate first
    setTimeout(() => {
      window.scrollTo({ top: 700, behavior: "smooth" }); // scroll after navigation
    }, 100); // slight delay to ensure page has rendered
  };

  return (
    <footer
      style={{
        background: "#093037ff",
        color: "white",
        fontFamily: "Arial, sans-serif",
        padding: "30px 20px",
        textAlign: "center",
      }}
    >
      {/* Animated Heading */}
      <h2
        style={{
          marginBottom: "25px",
          fontSize: "3rem",
          fontWeight: "bold",
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "6px",
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

      {/* Footer Content */}
      <div
        style={{
          maxWidth: "1000px",
          margin: "auto",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          gap: "20px",
        }}
      >
        <div style={{ flex: 1, minWidth: "200px" }}>
          <h3 style={{ marginBottom: "10px" }}>About Us</h3>
          <p style={{ fontSize: "0.9rem", lineHeight: 1.4 }}>
            SDVS's BCA College Sankeshwar is committed to providing quality
            education and shaping bright futures.
          </p>
        </div>

        <div style={{ flex: 1, minWidth: "200px" }}>
          <h3 style={{ marginBottom: "10px" }}>Contact</h3>
          <p
            style={{
              fontSize: "0.9rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            <FaMapMarkerAlt color="#e02828ff" />
            Sankeshwar, Karnataka
          </p>
          <p
            style={{
              fontSize: "0.9rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            <FaPhone color="#0df5f5ff" /> +91 9448636015
          </p>
          <p
            style={{
              fontSize: "0.9rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            <FaEnvelope color="#de2c6aff" /> sdvssbca2007@gmail.com
          </p>
        </div>

        <div style={{ flex: 1, minWidth: "200px" }}>
          <h3 style={{ marginBottom: "10px" }}>Quick Links</h3>
          <a
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              color: "#ffffffff",
              textDecoration: "none",
              margin: "8px 0",
            }}
          >
            <FaHome /> Home
          </a>
          <a
            href="/events"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              color: "#ffffffff",
              textDecoration: "none",
              margin: "8px 0",
            }}
          >
            <FaBook /> Events
          </a>
          <a
            href="/contact"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              color: "#ffffffff",
              textDecoration: "none",
              margin: "8px 0",
            }}
          >
            <FaAddressBook /> Contact
          </a>
          <a
            href="/contact"
            onClick={handleClick}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              color: "#ffffffff",
              textDecoration: "none",
              margin: "8px 0",
            }}
          >
            <FaUserGraduate /> Admissions
          </a>
        </div>
        <div style={{ flex: 1, minWidth: "200px" }}>
          <h3 style={{ marginBottom: "10px" }}>College Address</h3>
          <p style={{ fontSize: "0.9rem", lineHeight: 1.4 }}>
            SDVS's BCA College Nipani Road, Sankeshwar Hukkeri Taluk, Belagavi
            Dist Karnataka - 591313
          </p>
        </div>
      </div>

     <div style={{ marginTop: "20px", fontSize: "0.8rem", color: "#bbb" }}>
  &copy; Copyright 2025 All rights reserved |{" "} Powered by
  <a
    href="https://ligandsoftware.com/"
    target="_blank"
    rel="noopener noreferrer"
    style={{ fontSize: "0.8rem", color: "#bbb",marginLeft:"0.4rem" }}
  >
    Ligand Software Solutions
  </a>
</div>


      {/* Animation Styles */}
      <style>{`
        .letter {
          display: inline-block;
          font-weight: bold;
          font-size: 3rem;
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
            transform: translateY(-10px) scale(1.2);
            color: #ff9800;
          }
          60% {
            transform: translateY(5px) scale(1.05);
            color: #d35a35ff;
          }
          100% {
            transform: translateY(0) scale(1);
            color: #d79090ff;
          }
        }

        @media (max-width: 768px) {
          h2 {
            font-size: 2rem;
          }
          .letter {
            font-size: 2rem;
          }
          
          /* Improved mobile responsiveness */
          .footer-content {
            flex-direction: column;
            align-items: center;
          }
          
          .footer-section {
            min-width: 100%;
            margin-bottom: 20px;
          }
        }

        @media (max-width: 480px) {
          h2 {
            font-size: 1.5rem;
          }
          .letter {
            font-size: 1.5rem;
          }
          
          /* Adjust icon sizes for very small screens */
          .footer-section svg {
            width: 14px;
            height: 14px;
          }
        }
      `}</style>
    </footer>
  );
};

export default GuestFooter;
