import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Alert, Container, Row, Col, Card } from "react-bootstrap";
import { BASE_API_URL } from "../../BaseAPI";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaPaperPlane, FaCheckCircle } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    setLoading(true);

    try {
      const res = await axios.post(`${BASE_API_URL}/principal/forgot-password`, { email });
      setMessage(res.data.message);
      
      // Show success toast notification
      toast.success("New password has been set and sent to your email!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        icon: <FaCheckCircle />
      });
      
      // Navigate to login after 3 seconds
      setTimeout(() => {
        navigate("/login");
      }, 3000);
      
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Something went wrong";
      setError(errorMsg);
      
      // Show error toast notification
      toast.error(errorMsg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-container">
      <ToastContainer />
      <Container>
        <Row className="justify-content-center align-items-center min-vh-100">
          <Col md={6} className="d-none d-md-block">
            <div className="forgot-password-hero">
              <div className="brand-animation">
                <h1>Reset Password</h1>
                <p>We'll help you get back into your account</p>
              </div>
              <div className="floating-elements">
                <div className="floating-icon">
                  <FaEnvelope />
                </div>
                <div className="floating-icon">
                  <FaPaperPlane />
                </div>
                <div className="floating-icon">
                  <FaCheckCircle />
                </div>
              </div>
            </div>
          </Col>
          
          <Col md={6} className="d-flex justify-content-center">
            <Card className="forgot-password-card">
              <Card.Body>
                <div className="text-center mb-4">
                  <h2 className="forgot-password-title">Reset Your Password</h2>
                  <p className="forgot-password-subtitle">
                    Enter your email address and we'll send you instructions to reset your password.
                  </p>
                </div>
                
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-4">
                    <Form.Label>Email Address</Form.Label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <FaEnvelope />
                      </span>
                      <Form.Control
                        type="email"
                        placeholder="Enter your registered email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </Form.Group>

                  <div className="d-grid mb-3">
                    <Button 
                      variant="primary" 
                      type="submit" 
                      size="lg"
                      disabled={loading}
                      className="submit-btn"
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <FaPaperPlane className="me-2" />
                          Send Reset Instructions
                        </>
                      )}
                    </Button>
                  </div>
                  
                  <div className="text-center">
                    <a href="/login" className="back-to-login">Back to Login</a>
                  </div>
                </Form>

                {message && (
                  <Alert variant="success" className="mt-3 alert-custom">
                    {message}
                  </Alert>
                )}
                {error && (
                  <Alert variant="danger" className="mt-3 alert-custom">
                    {error}
                  </Alert>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <style>
        {`
        /* ForgotPassword.css */
.forgot-password-container {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.min-vh-100 {
  min-height: 100vh;
}

.forgot-password-hero {
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

.forgot-password-card {
  width: 100%;
  max-width: 450px;
  border: none;
  border-radius: 15px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  animation: slideInRight 0.8s ease-out;
}

.forgot-password-card .card-body {
  padding: 30px;
}

.forgot-password-title {
  color: #333;
  font-weight: 700;
  margin-bottom: 10px;
}

.forgot-password-subtitle {
  color: #666;
  margin-bottom: 30px;
  font-size: 0.95rem;
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

.submit-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  padding: 12px;
  font-weight: 600;
  transition: all 0.3s;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

.submit-btn:disabled {
  opacity: 0.8;
}

.back-to-login {
  color: #667eea;
  text-decoration: none;
  transition: color 0.3s;
  font-size: 0.9rem;
}

.back-to-login:hover {
  color: #764ba2;
  text-decoration: underline;
}

/* Toast customization */
.Toastify__toast {
  border-radius: 10px;
}

.Toastify__toast--success {
  background: linear-gradient(135deg, #4caf50 0%, #2e7d32 100%);
}

.Toastify__toast--error {
  background: linear-gradient(135deg, #f44336 0%, #c62828 100%);
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
  .forgot-password-hero {
    padding: 20px;
  }
  
  .brand-animation h1 {
    font-size: 2rem;
  }
  
  .forgot-password-card {
    margin-top: 20px;
  }
}
        `}
      </style>
    </div>
  );
};

export default ForgotPassword;