import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/Site.css";

const Footer = () => {
    return (
    <footer className="bg-light border-top py-3 mt-4">
      <Container className="d-flex justify-content-between align-items-center">
        <div>
          <strong>BookStore</strong> — Discover Your Next Adventure
        </div>
        <div>
          <Link to="/" className="text-muted mx-2">Home</Link>
          <Link to="/catalog" className="text-muted mx-2">Catalog</Link>
          <Link to="/cart" className="text-muted mx-2">Cart</Link>
        </div>
        <div className="text-muted">
          © 2025 BookStore
        </div>
      </Container>
    </footer>
    );
};

export default Footer;
