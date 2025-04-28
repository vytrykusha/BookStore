import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/Site.css";
import { useAuth } from "../context/AuthContext";
import ToastMessage from "./ToastMessage";

const BookItem = ({ book }) => {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [showToast, setShowToast] = useState(false);

  const handleAddToCart = () => {
    if (user) {
      addToCart(book);
      setShowToast(true);
    } else {
      alert("Please login to add books to your cart.");
    }
  };

  return (
    <Card className="book-card mb-4">
      <ToastMessage show={showToast} onClose={() => setShowToast(false)} message="Added to cart!" />
      <div className="image-container">
        <Card.Img variant="top" src={book.image} className="book-image" />
      </div>
      <Card.Body className="card-body">
        <Card.Title className="book-title">{book.title}</Card.Title>
        <Card.Text>
          {book.discount > 0 ? (
            <>
              <span style={{ textDecoration: "line-through", color: "red" }}>
                ${book.price}
              </span>{" "}
              <span style={{ fontWeight: "bold", color: "green" }}>
                ${(book.price * (1 - book.discount / 100)).toFixed(2)}
              </span>
            </>
          ) : (
            `$${book.price}`
          )}
        </Card.Text>

        <div className="button-container">
          <Button variant="outline-primary" size="sm" as={Link} to={`/book/${book.id}`}>
            View
          </Button>
          <Button variant="primary" size="sm" onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default BookItem;
