import React, { useState, useEffect } from "react";

const NotFoundPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="not-found-container">
      {/* Animated background elements */}
      <div className="floating-books">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="floating-book" style={{ animationDelay: `${i * 0.7}s` }}>
            <div className="book-cover"></div>
            <div className="book-pages"></div>
          </div>
        ))}
      </div>
      
      <div className="floating-icons">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="floating-icon" style={{ animationDelay: `${i * 1.2}s` }}>
            {i % 3 === 0 ? "💻" : i % 3 === 1 ? "🧑‍💻" : "🎓"}
          </div>
        ))}
      </div>

      <div className={`not-found-content ${isVisible ? "visible" : ""}`}>
        <div className="error-code">
          <span className="digit">4</span>
          <span className="digit">0</span>
          <span className="digit">4</span>
        </div>
        
        <h1 className="title">Page Not Found</h1>
        
        <p className="message">
          Focus on building your career, not searching for missing pages.
        </p>
        
        <div className="campus-guide">
          <p>Let’s get you back to learning and growing:</p>
          <div className="navigation-links">
            <a href="/" className="nav-link">Home</a>
            <a href="/courses" className="nav-link">Courses</a>
            <a href="/about-sdvs" className="nav-link">About</a>
            <a href="/contact" className="nav-link">Contact</a>
          </div>
        </div>
        
        <div className="college-info">
          <h3>SDVS's BCA College, Sankeshwar</h3>
          <p>Empowering minds through education since 2007</p>
        </div>
      </div>
      <style>
        {`
        /* NotFoundPage.css */
.not-found-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #1a2a6c, #b21f1f, #1a2a6c);
  background-size: 400% 400%;
  animation: gradientShift 15s ease infinite;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: white;
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* Floating books animation */
.floating-books {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
}

.floating-book {
  position: absolute;
  animation: float 12s linear infinite;
  opacity: 0.7;
}

.floating-book:nth-child(1) { top: 10%; left: 5%; }
.floating-book:nth-child(2) { top: 20%; left: 80%; }
.floating-book:nth-child(3) { top: 60%; left: 10%; }
.floating-book:nth-child(4) { top: 70%; left: 75%; }
.floating-book:nth-child(5) { top: 30%; left: 15%; }
.floating-book:nth-child(6) { top: 40%; left: 85%; }
.floating-book:nth-child(7) { top: 80%; left: 20%; }
.floating-book:nth-child(8) { top: 15%; left: 65%; }

.book-cover {
  width: 30px;
  height: 40px;
  background: #8B4513;
  border-radius: 3px 8px 8px 3px;
  position: relative;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
}

.book-pages {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 26px;
  height: 36px;
  background: #FFF8E1;
  border-radius: 2px 6px 6px 2px;
}

@keyframes float {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 0.7;
  }
  25% {
    transform: translateY(-20px) rotate(5deg);
  }
  50% {
    transform: translateY(0) rotate(0deg);
  }
  75% {
    transform: translateY(20px) rotate(-5deg);
  }
  100% {
    transform: translateY(0) rotate(0deg);
    opacity: 0.7;
  }
}

/* Floating icons animation */
.floating-icons {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
}

.floating-icon {
  position: absolute;
  font-size: 2rem;
  animation: floatIcon 15s linear infinite;
  opacity: 0.5;
}

.floating-icon:nth-child(1) { top: 15%; left: 20%; }
.floating-icon:nth-child(2) { top: 25%; left: 70%; }
.floating-icon:nth-child(3) { top: 65%; left: 25%; }
.floating-icon:nth-child(4) { top: 75%; left: 65%; }
.floating-icon:nth-child(5) { top: 45%; left: 50%; }

@keyframes floatIcon {
  0% {
    transform: translateY(0) translateX(0) rotate(0deg);
    opacity: 0.5;
  }
  25% {
    transform: translateY(-30px) translateX(20px) rotate(10deg);
  }
  50% {
    transform: translateY(0) translateX(40px) rotate(0deg);
  }
  75% {
    transform: translateY(30px) translateX(20px) rotate(-10deg);
  }
  100% {
    transform: translateY(0) translateX(0) rotate(0deg);
    opacity: 0.5;
  }
}

/* Content styling */
.not-found-content {
  text-align: center;
  z-index: 10;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 1s ease, transform 1s ease;
  max-width: 800px;
  padding: 2rem;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 15px;
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.not-found-content.visible {
  opacity: 1;
  transform: translateY(0);
}

.error-code {
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.digit {
  font-size: 8rem;
  font-weight: 800;
  margin: 0 0.5rem;
  text-shadow: 3px 3px 0 #000;
  animation: pulse 2s infinite;
}

.digit:nth-child(1) { animation-delay: 0s; color: #FF6B6B; }
.digit:nth-child(2) { animation-delay: 0.2s; color: #4ECDC4; }
.digit:nth-child(3) { animation-delay: 0.4s; color: #FFE66D; }

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

.title {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: #FFD700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.message {
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.campus-guide {
  margin-bottom: 2rem;
}

.campus-guide p {
  margin-bottom: 1rem;
  font-weight: 500;
}

.navigation-links {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.nav-link {
  display: inline-block;
  padding: 0.8rem 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  text-decoration: none;
  border-radius: 50px;
  transition: all 0.3s ease;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.college-info {
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  padding-top: 1.5rem;
}

.college-info h3 {
  margin-bottom: 0.5rem;
  color: #FFD700;
}

.college-info p {
  font-style: italic;
  opacity: 0.8;
}

/* Responsive design */
@media (max-width: 768px) {
  .digit {
    font-size: 5rem;
  }
  
  .title {
    font-size: 2rem;
  }
  
  .navigation-links {
    flex-direction: column;
    align-items: center;
  }
  
  .nav-link {
    width: 200px;
  }
}

@media (max-width: 480px) {
  .digit {
    font-size: 4rem;
  }
  
  .not-found-content {
    padding: 1.5rem;
  }
  
  .title {
    font-size: 1.8rem;
  }
  
  .message {
    font-size: 1rem;
  }
}
        `}
      </style>
    </div>
  );
};

export default NotFoundPage;