import React, { useState } from "react";
import { Form, Button, Container, Alert, Card, Image } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import ConfirmModal from "../components/ConfirmModal";

const Profile = () => {
  const { user, logout } = useAuth();
  const [formData, setFormData] = useState({
    ...user,
    avatar: user.avatar || ""
  });
  const [message, setMessage] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  if (!user) return <Navigate to="/login" />;

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const updatedUsers = users.map((u) =>
      u.email === user.email ? formData : u
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("currentUser", JSON.stringify(formData));
    setMessage("Profile updated successfully. Please re-login to refresh data.");
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <Card className="p-4 shadow" style={{ width: "100%", maxWidth: "500px", borderRadius: "20px" }}>
        <div className="text-center mb-4">
          <Image src={formData.avatar || "https://innostudio.de/fileuploader/images/default-avatar.png"} roundedCircle width={100} height={100} className="mb-3" />
          <h2>My Profile</h2>
        </div>
        {message && <Alert variant="success">{message}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control name="name" value={formData.name} onChange={handleChange} className="rounded-pill" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Avatar URL</Form.Label>
            <Form.Control type="text" name="avatar" value={formData.avatar} onChange={handleChange} placeholder="https://innostudio.de/fileuploader/images/default-avatar.png" className="rounded-pill" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" value={formData.email} disabled className="rounded-pill" />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} className="rounded-pill" />
          </Form.Group>
          <Button type="submit" variant="primary" className="w-100 rounded-pill mb-2">Update Profile</Button>
          <Button variant="secondary" className="w-100 rounded-pill" onClick={() => setShowConfirm(true)}>Logout</Button>
        </Form>

        <ConfirmModal
          show={showConfirm}
          onHide={() => setShowConfirm(false)}
          onConfirm={logout}
          title="Logout"
          body="Are you sure you want to logout?"
        />
      </Card>
    </Container>
  );
};

export default Profile;
