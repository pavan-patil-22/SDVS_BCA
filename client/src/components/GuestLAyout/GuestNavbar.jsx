import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const GuestNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    closeMenu();
    navigate("/contact");
    setTimeout(() => {
      window.scrollTo({ top: 700, behavior: "smooth" });
    }, 100);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when clicking on overlay
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMenuOpen && e.target.classList.contains('mobile-overlay')) {
        closeMenu();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <style>{`
        * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Navbar */
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(135deg, #1a2a6c, #2b5876);
  padding: 15px 5%;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 90px;
  z-index: 1000;
  transition: all 0.3s ease;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
}

.navbar.scrolled {
  height: 80px;
  background: linear-gradient(135deg, #1a2a6c, #2b5876);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.logo {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.logo img {
  height: 50px;
  margin-right: 12px;
  transition: transform 0.3s ease;
}

.logo img:hover {
  transform: scale(1.05);
}

.logo-text {
  font-family: "Georgia", serif;
  font-weight: bold;
  color: white;
  line-height: 1.2;
  display: flex;
  flex-direction: column;
}

.logo-text span {
  display: block;
  font-size: 16px;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.logo-text .location {
  font-size: 14px;
  font-style: italic;
  color: #f8f8f8;
  margin-top: 2px;
}

.nav-links {
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  transition: all 0.4s ease;
  flex: 1;
  margin: 0 20px;
}

.nav-links li {
  position: relative;
}

.nav-links a {
  text-decoration: none;
  color: white;
  font-size: 16px;
  padding: 10px 12px;
  display: block;
  transition: all 0.3s ease;
  position: relative;
  font-weight: 500;
  border-radius: 4px;
}

.nav-links a:hover {
  color: #ffd700;
  background: rgba(255, 255, 255, 0.1);
}

.nav-links a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background: #ffd700;
  transition: all 0.3s ease;
  transform: translateX(-50%);
}

.nav-links a:hover::after {
  width: 70%;
}

.dropdown {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background: #2b5876;
  min-width: 220px;
  z-index: 999;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  overflow: hidden;
}

.dropdown-parent:hover .dropdown {
  display: block;
  opacity: 1;
  transform: translateY(0);
}

.dropdown a {
  padding: 12px 15px;
  font-size: 15px;
  transition: all 0.2s ease;
  border-radius: 0;
}

.dropdown a:hover {
  background: rgba(255, 215, 0, 0.15);
  padding-left: 20px;
  color: #ffd700;
}

.apply-btn {
  background: linear-gradient(135deg, #ff8a00, #ffb800);
  color: #1a2a6c;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
  border-radius: 30px;
  text-decoration: none;
  display: inline-block;
  font-size: 15px;
  box-shadow: 0 4px 10px rgba(255, 138, 0, 0.25);
}

.apply-btn:hover {
  background: linear-gradient(135deg, #ff9a00, #ffc800);
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(255, 138, 0, 0.35);
  color: #1a2a6c;
}

/* Mobile Styles */
.menu-toggle {
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 30px;
  height: 25px;
  cursor: pointer;
  z-index: 1001;
}

.menu-toggle span {
  width: 100%;
  height: 3px;
  background-color: white;
  border-radius: 2px;
  transition: all 0.3s ease;
  transform-origin: center;
}

.menu-toggle.active span:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
}

.menu-toggle.active span:nth-child(2) {
  opacity: 0;
}

.menu-toggle.active span:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
}

/* Mobile Overlay */
.mobile-overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 998;
}

.mobile-overlay.active {
  display: block;
}

/* Side Menu Styles */
@media (max-width: 1268px) {
  .nav-links {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    right: -300px;
    width: 300px;
    height: 100vh;
    background: linear-gradient(135deg, #0b233cf3, #214861ff);
    padding: 80px 20px 20px;
    gap: 0;
    justify-content: flex-start;
    margin: 0;
    transition: right 0.3s ease;
    z-index: 999;
    box-shadow: -5px 0 15px rgba(0, 0, 0, 0.3);
    overflow-y: auto;
  }

  .nav-links.active {
    right: 0;
  }

  .nav-links li {
    width: 100%;
    opacity: 0;
    transform: translateX(20px);
    transition: all 0.3s ease;
    margin-bottom: 10px;
  }

  .nav-links.active li {
    opacity: 1;
    transform: translateX(0);
  }

  .nav-links.active li:nth-child(1) { transition-delay: 0.1s; }
  .nav-links.active li:nth-child(2) { transition-delay: 0.15s; }
  .nav-links.active li:nth-child(3) { transition-delay: 0.2s; }
  .nav-links.active li:nth-child(4) { transition-delay: 0.25s; }
  .nav-links.active li:nth-child(5) { transition-delay: 0.3s; }
  .nav-links.active li:nth-child(6) { transition-delay: 0.35s; }
  .nav-links.active li:nth-child(7) { transition-delay: 0.4s; }
  .nav-links.active li:nth-child(8) { transition-delay: 0.45s; }

  .nav-links a {
    padding: 15px;
    text-align: left;
    border-radius: 5px;
    margin-bottom: 5px;
    background: rgba(255, 255, 255, 0.05);
    font-size: 16px;
  }

  .nav-links .dropdown {
    position: static;
    background: rgba(255, 255, 255, 0.1);
    display: none;
    opacity: 1;
    transform: none;
    margin: 10px 0;
    box-shadow: none;
    width: 100%;
    border-radius: 5px;
  }

  .dropdown-parent.active .dropdown {
    display: block;
  }

  .dropdown a {
    padding: 12px 20px;
    font-size: 14px;
  }

  .menu-toggle {
    display: flex;
  }
  
  .apply-btn {
    text-align: center;
    margin-top: 10px;
    width: 100%;
  }
}

@media (max-width: 1100px) {
  .nav-links {
    gap: 10px;
  }
  
  .nav-links a {
    font-size: 15px;
    padding: 8px 10px;
  }
}

@media (max-width: 968px) {
  .nav-links {
    gap: 8px;
  }
  
  .nav-links a {
    font-size: 14px;
    padding: 6px 8px;
  }
  
  .apply-btn {
    padding: 8px 15px;
    font-size: 14px;
  }
}

@media (max-width: 868px) {
  .navbar {
    padding: 15px 20px;
  }
  
  .logo-text span {
    font-size: 15px;
  }
  
  .logo-text .location {
    font-size: 13px;
  }
}

@media (max-width: 480px) {
  .logo img {
    height: 40px;
  }
  
  .logo-text span {
    font-size: 14px;
  }
  
  .logo-text .location {
    font-size: 12px;
  }
  
  .navbar {
    height: 80px;
    padding: 10px 15px;
  }
  
  .nav-links {
    width: 280px;
    right: -280px;
  }
}
      `}</style>
      
      <div className="logo">
        <img 
          src="https://thfvnext.bing.com/th/id/OIP.UtneUDXsACp3MrIN9PXfYQHaFF?w=263&h=181&c=7&r=0&o=7&cb=thfvnext&dpr=1.3&pid=1.7&rm=3" 
          alt="Logo" 
        />
        <div className="logo-text">
          <span>SDVS'S BCA COLLEGE</span>
          <span className="location">Sankeshwar</span>
        </div>
      </div>

      <div className={`menu-toggle ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Mobile Overlay */}
      <div className={`mobile-overlay ${isMenuOpen ? 'active' : ''}`} onClick={closeMenu}></div>

      <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
        <li><Link to="/" onClick={closeMenu}>Home</Link></li>
        <li className="dropdown-parent">
          <a href="#about" onClick={(e) => {
            e.preventDefault();
            e.target.parentElement.classList.toggle('active');
          }}>About Us ▾</a>
          <div className="dropdown">
            <Link to="/about-sdvs" onClick={closeMenu}>About SDVS</Link>
            <Link to="/about-college" onClick={closeMenu}>About College</Link>
            <Link to="/chairmans-message" onClick={closeMenu}>Chairman's Message</Link>
            <Link to="/principal-message" onClick={closeMenu}>Principal's Message</Link>
          </div>
        </li>
        <li><Link to="/faculty" onClick={closeMenu}>Faculty</Link></li>
        <li><Link to="/events" onClick={closeMenu}>Events</Link></li>
        <li><Link to="/facilities" onClick={closeMenu}>Facilities</Link></li>
        <li><Link to="/placements" onClick={closeMenu}>Placements</Link></li>
        <li><Link to="/contact" onClick={closeMenu}>Contact Us</Link></li>
        <li>
          <a href="/contact" className="apply-btn" onClick={handleClick}>
            APPLY ONLINE
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default GuestNavbar;