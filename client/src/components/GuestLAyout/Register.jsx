import React, { useState } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button, Card, Alert } from "react-bootstrap";
import { BASE_API_URL } from "../../BaseAPI";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
  });
  const [profilePic, setProfilePic] = useState(null);
  const [message, setMessage] = useState("");

  // handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle file change
  const handleFileChange = (e) => {
    setProfilePic(e.target.files[0]);
  };

  // submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", formData.password);
      formDataToSend.append("name", formData.name);
      formDataToSend.append("phone", formData.phone);
      if (profilePic) {
        formDataToSend.append("profilePic", profilePic);
      }

      const res = await axios.post(
        `${BASE_API_URL}/principal/register`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Container className="register-container">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Card className="p-4 shadow-sm">
            <h2 className="text-center mb-4">Principal Register</h2>
            {message && <Alert variant="info">{message}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Enter full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Profile Picture</Form.Label>
                <Form.Control type="file" onChange={handleFileChange} />
              </Form.Group>

              <Button type="submit" variant="primary" className="w-100">
                Register
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
      <style>{`
      .register-container {
        margin-top: 50px;
        }

        .card {
        border-radius: 15px;
        }

        h2 {
        color: #2c3e50;
        font-weight: bold;
        }

      `}</style>
    </Container>
  );
};

export default Register;
