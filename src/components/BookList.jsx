import React, { useContext, useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { BookContext } from "../context/BookContext";
import BookItem from "./BookItem";

const BookList = () => {
  const { books } = useContext(BookContext);
  console.log(books);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("title");
  const [category, setCategory] = useState("all");

  const filteredBooks = books
    .filter(book =>
      book.title.toLowerCase().includes(search.toLowerCase()) &&
      (category === "all" || book.category === category)
    )
    .sort((a, b) => {
      if (sort === "title") return a.title.localeCompare(b.title);
      if (sort === "price") return a.price - b.price;
      return 0;
    });

  const categories = ["all", ...new Set(books.map(book => book.category))];

  return (
    <>
      <Form className="mb-4 d-flex gap-3 flex-wrap">
        <Form.Control
          type="text"
          placeholder="Search books"
          onChange={(e) => setSearch(e.target.value)}
          className="w-auto"
        />
        <Form.Select onChange={(e) => setSort(e.target.value)} className="w-auto">
          <option value="title">Sort by title</option>
          <option value="price">Sort by price</option>
        </Form.Select>
        <Form.Select onChange={(e) => setCategory(e.target.value)} className="w-auto">
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </Form.Select>
      </Form>
      <Row>
        {filteredBooks.map(book => (
          <Col key={book.id} xs={12} sm={6} md={4} lg={3}>
            <BookItem book={book} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default BookList;
