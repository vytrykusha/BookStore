import React, { useState } from "react";
import { Container, Form, Button, Alert, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [newPass, setNewPass] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleReset = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const index = users.findIndex((u) => u.email === email);
    if (index === -1) {
      setMessage("No user with this email");
      return;
    }
    users[index].password = newPass;
    localStorage.setItem("users", JSON.stringify(users));
    setMessage("Password updated. You can now log in.");
    setTimeout(() => navigate("/login"), 2000);
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <Card className="p-4 shadow" style={{ width: "100%", maxWidth: "400px", borderRadius: "20px" }}>
        <h2 className="text-center mb-4">Reset Password</h2>
        {message && <Alert variant="info">{message}</Alert>}
        <Form onSubmit={handleReset}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="rounded-pill"
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              required
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              placeholder="Enter new password"
              className="rounded-pill"
            />
          </Form.Group>
          <Button type="submit" variant="primary" className="w-100 rounded-pill">
            Reset Password
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default ResetPassword;
