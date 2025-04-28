import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BookContext } from "../context/BookContext";
import { Button, Container, Row, Col, Badge } from "react-bootstrap";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { books } = useContext(BookContext);
  const { addToCart } = useCart();

  const book = books.find(b => b.id.toString() === id);

  if (!book) return (
    <Container className="my-5 text-center">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <h2>Book not found</h2>
        <Button variant="secondary" onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </motion.div>
    </Container>
  );

  const discountedPrice = book.discount ? (book.price * (1 - book.discount / 100)).toFixed(2) : null;

  return (
    <Container className="my-5">
      <Button variant="outline-secondary" className="mb-4" onClick={() => navigate(-1)}>
        ← Back to Catalog
      </Button>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Row>
          <Col md={5}>
            <motion.img
              src={book.image}
              alt={book.title}
              className="img-fluid rounded shadow-sm"
              style={{ maxHeight: "500px", objectFit: "cover", width: "100%" }}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            />
          </Col>
          <Col md={7}>
            <h2 className="mb-3">{book.title}</h2>
            <p>
              <strong>Category:</strong>{" "}
              <Badge bg="info" text="dark">
                {book.category}
              </Badge>
            </p>
            <p>
              <strong>Price:</strong>{" "}
              {discountedPrice ? (
                <>
                  <span className="text-muted text-decoration-line-through">${book.price.toFixed(2)}</span>{" "}
                  <span className="text-danger">${discountedPrice}</span>
                </>
              ) : (
                <span>${book.price.toFixed(2)}</span>
              )}
            </p>
            <p>{book.description}</p>
            <Button variant="primary" onClick={() => addToCart(book)}>
              Add to Cart
            </Button>
          </Col>
        </Row>
      </motion.div>
    </Container>
  );
};

export default BookDetails;
