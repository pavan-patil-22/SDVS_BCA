import React, { useState } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button, Card, Alert } from "react-bootstrap";
import { BASE_API_URL } from "../../BaseAPI";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaSignInAlt, FaEnvelope, FaLock, FaUserTie } from "react-icons/fa";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    
    try {
      const res = await axios.post(`${BASE_API_URL}/principal/login`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      // Store token in localStorage
      localStorage.setItem("principalToken", res.data.token);
      
      setMessage("Login successful ✅");
      
      // Navigate after a short delay to show success message
      setTimeout(() => {
        navigate("/principal");
      }, 1000);
      
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed ❌");
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <Row className="justify-content-center align-items-center min-vh-100">
        <Col md={6} className="d-none d-md-block">
          <div className="login-hero">
            <div className="brand-animation">
              <h1>Principal Portal</h1>
              <p>SDVS'S BCA College Management System</p>
            </div>
            <div className="floating-elements">
              <div className="floating-icon">
                <FaUserTie />
              </div>
              <div className="floating-icon">
                <FaEnvelope />
              </div>
              <div className="floating-icon">
                <FaLock />
              </div>
            </div>
          </div>
        </Col>
        
        <Col md={6} className="d-flex justify-content-center">
          <Card className="login-card">
            <Card.Body>
              <div className="text-center mb-4">
                <h2 className="login-title">Principal Login</h2>
                <p className="login-subtitle">Access your admin dashboard</p>
              </div>
              
              {message && (
                <Alert variant={message.includes("✅") ? "success" : "danger"} className="alert-custom">
                  {message}
                </Alert>
              )}
              
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FaEnvelope />
                    </span>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Password</Form.Label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FaLock />
                    </span>
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <span 
                      className="input-group-text password-toggle"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                </Form.Group>

                <div className="d-grid mb-3">
                  <Button 
                    variant="primary" 
                    type="submit" 
                    size="lg"
                    disabled={isLoading}
                    className="login-btn"
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" />
                        Signing in...
                      </>
                    ) : (
                      <>
                        <FaSignInAlt className="me-2" />
                        Login
                      </>
                    )}
                  </Button>
                </div>
                
                <div className="text-center">
                  <a href="/forgot-password" className="forgot-link">Forgot password?</a>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <style>
        {`
        /* Login.css */
.login-container {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.min-vh-100 {
  min-height: 100vh;
}

.login-hero {
  color: white;
  padding: 40px;
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.brand-animation h1 {
  font-size: 2.5rem;
  margin-bottom: 15px;
  font-weight: 700;
  animation: fadeInUp 1s ease-out;
}

.brand-animation p {
  font-size: 1.2rem;
  opacity: 0.9;
  animation: fadeInUp 1s ease-out 0.2s both;
}

.floating-elements {
  position: relative;
  width: 100%;
  height: 200px;
  margin-top: 40px;
}

.floating-icon {
  position: absolute;
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: white;
  animation: float 6s ease-in-out infinite;
}

.floating-icon:nth-child(1) {
  top: 0;
  left: 20%;
  animation-delay: 0s;
}

.floating-icon:nth-child(2) {
  top: 40%;
  left: 70%;
  animation-delay: 2s;
}

.floating-icon:nth-child(3) {
  top: 70%;
  left: 40%;
  animation-delay: 4s;
}

.login-card {
  width: 100%;
  max-width: 400px;
  border: none;
  border-radius: 15px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  animation: slideInRight 0.8s ease-out;
}

.login-card .card-body {
  padding: 30px;
}

.login-title {
  color: #333;
  font-weight: 700;
  margin-bottom: 10px;
}

.login-subtitle {
  color: #666;
  margin-bottom: 30px;
}

.alert-custom {
  border-radius: 10px;
  border: none;
}

.input-group-text {
  background-color: #f8f9fa;
  border-right: none;
}

.form-control {
  border-left: none;
  padding: 12px;
}

.form-control:focus {
  box-shadow: none;
  border-color: #ced4da;
}

.input-group:focus-within {
  box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
  border-radius: 0.375rem;
}

.password-toggle {
  cursor: pointer;
  transition: color 0.3s;
}

.password-toggle:hover {
  color: #667eea;
}

.login-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  padding: 12px;
  font-weight: 600;
  transition: all 0.3s;
}

.login-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

.login-btn:disabled {
  opacity: 0.8;
}

.forgot-link {
  color: #667eea;
  text-decoration: none;
  transition: color 0.3s;
}

.forgot-link:hover {
  color: #764ba2;
  text-decoration: underline;
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes float {
  0% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(10deg);
  }
  100% {
    transform: translateY(0) rotate(0deg);
  }
}

/* Responsive design */
@media (max-width: 768px) {
  .login-hero {
    padding: 20px;
  }
  
  .brand-animation h1 {
    font-size: 2rem;
  }
  
  .login-card {
    margin-top: 20px;
  }
}

        `}
      </style>
    </div>
  );
};

export default Login;