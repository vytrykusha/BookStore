import React, { useState } from "react";
import { Form, Button, Container, Alert, Card } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = login(formData);
    if (result.success) {
      navigate("/");
    } else {
      setError(result.message);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <Card className="p-4 shadow" style={{ width: "100%", maxWidth: "400px", borderRadius: "20px" }}>
        <h2 className="text-center mb-4">Welcome Back</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" required name="email" placeholder="Enter your email" onChange={handleChange} className="rounded-pill" />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" required name="password" placeholder="Enter your password" onChange={handleChange} className="rounded-pill" />
          </Form.Group>
          <div className="text-end mb-3 d-flex justify-content-center">
            <a href="/reset-password" className="small text-decoration-none text-primary">Forgot password?</a>
          </div>
          <Button type="submit" variant="primary" className="w-100 rounded-pill">Login</Button>
        </Form>
      </Card>
    </Container>
  );
};

export default Login;
