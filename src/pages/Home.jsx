import React from "react";
import { Container, Card } from "react-bootstrap";
import BookList from "../components/BookList";

const Home = () => {
  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">Welcome to the Book Store!</h1>
      <Card className="p-4 shadow" style={{ borderRadius: "20px" }}>
        <BookList />
      </Card>
    </Container>
  );
};

export default Home;
