import React, { useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { BookContext } from "../context/BookContext";
import BookItem from "../components/BookItem";

const Discounts = () => {
  const { books } = useContext(BookContext);

  const discountedBooks = books.filter((book) => book.discount > 0);

  return (
    <Container className="mt-4">
      <h2>Discounts</h2>
      {discountedBooks.length === 0 ? (
        <p>No discounts available at the moment.</p>
      ) : (
        <Row>
          {discountedBooks.map((book) => (
            <Col key={book.id} xs={12} sm={6} md={4} lg={3}>
              <BookItem book={book} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Discounts;
