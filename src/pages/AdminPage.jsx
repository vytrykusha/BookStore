import React, { useContext, useState } from "react";
import { Container, Row, Col, Card, Form, Button, Modal, InputGroup } from "react-bootstrap";
import { BookContext } from "../context/BookContext";
import { Pagination } from "react-bootstrap";

const AdminPage = () => {
  const { books, setBooks } = useContext(BookContext);
  const [discounts, setDiscounts] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [newBook, setNewBook] = useState({ title: "", price: "", category: "", description: "", image: "", discount: 0 });
  const [editBook, setEditBook] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [sortOption, setSortOption] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const booksPerPage = 6;
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    if (sortOption === "title") return a.title.localeCompare(b.title);
    if (sortOption === "price") return a.price - b.price;
    return 0;
  });

  const currentBooks = sortedBooks.slice(indexOfFirstBook, indexOfLastBook);

  const handleEditClick = (book) => { setEditBook(book); setShowEditModal(true); };
  const handleSaveEdit = (e) => { e.preventDefault(); const updatedBooks = books.map((b) => b.id === editBook.id ? editBook : b); setBooks(updatedBooks); localStorage.setItem("books", JSON.stringify(updatedBooks)); setShowEditModal(false); };
  const confirmDelete = (book) => { setBookToDelete(book); setShowDeleteModal(true); };
  const handleDeleteConfirmed = () => { const updatedBooks = books.filter((b) => b.id !== bookToDelete.id); setBooks(updatedBooks); localStorage.setItem("books", JSON.stringify(updatedBooks)); setShowDeleteModal(false); };
  const handleCreateBook = (e) => { e.preventDefault(); const bookToAdd = { ...newBook, id: Date.now(), price: parseFloat(newBook.price), discount: parseInt(newBook.discount) }; const updatedBooks = [...books, bookToAdd]; setBooks(updatedBooks); localStorage.setItem("books", JSON.stringify(updatedBooks)); setShowModal(false); setNewBook({ title: "", price: "", category: "", description: "", image: "", discount: 0 }); };

  return (
    <Container className="mt-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
        <h2>📚 Admin Panel</h2>
        <Button variant="success" onClick={() => setShowModal(true)}>➕ Add Book</Button>
      </div>

      <Row className="align-items-center mb-4">
        <Col md={6} className="mb-2">
          <InputGroup>
            <Form.Control placeholder="Search by title..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </InputGroup>
        </Col>
        <Col md={3} className="mb-2">
          <Form.Select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
            <option value="">Sort by...</option>
            <option value="title">Title (A-Z)</option>
            <option value="price">Price (Low to High)</option>
          </Form.Select>
        </Col>
        <Col md={3} className="text-end">
          <Button variant="primary" onClick={() => {
            const updatedBooks = books.map((book) => ({
              ...book,
              discount: discounts[book.id] ? parseInt(discounts[book.id]) : book.discount,
            }));
            setBooks(updatedBooks);
            localStorage.setItem("books", JSON.stringify(updatedBooks));
          }}>💾 Save Discounts</Button>
        </Col>
      </Row>

      <Row>
        {currentBooks.map((book) => (
          <Col key={book.id} xs={12} md={6} lg={4} className="mb-4">
            <Card className="shadow-sm h-100">
              <Card.Img variant="top" src={book.image || "https://via.placeholder.com/150"} height="200" style={{ objectFit: "cover" }} />
              <Card.Body>
                <Card.Title>{book.title}</Card.Title>
                <Card.Text><strong>Price:</strong> ${book.price.toFixed(2)}</Card.Text>
                <Card.Text><strong>Discount:</strong> {book.discount || 0}%</Card.Text>
                <Form.Group className="mb-2">
                  <Form.Label>Update Discount</Form.Label>
                  <Form.Control type="number" min="0" max="100" value={discounts[book.id] || ""} onChange={(e) => setDiscounts((prev) => ({ ...prev, [book.id]: e.target.value }))} />
                </Form.Group>
                <div className="d-flex justify-content-between">
                  <Button variant="warning" size="sm" onClick={() => handleEditClick(book)}>✏️ Edit</Button>
                  <Button variant="danger" size="sm" onClick={() => confirmDelete(book)}>🗑️ Delete</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Pagination className="justify-content-center mt-4">
        <Pagination.Prev onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1} />
        {Array.from({ length: Math.ceil(sortedBooks.length / booksPerPage) }, (_, idx) => (
          <Pagination.Item key={idx + 1} active={currentPage === idx + 1} onClick={() => setCurrentPage(idx + 1)}>{idx + 1}</Pagination.Item>
        ))}
        <Pagination.Next onClick={() => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(sortedBooks.length / booksPerPage)))} disabled={currentPage === Math.ceil(sortedBooks.length / booksPerPage)} />
      </Pagination>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete "{bookToDelete?.title}"?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirmed}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>


      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editBook && (
            <Form onSubmit={handleSaveEdit}>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  value={editBook.title}
                  onChange={(e) => setEditBook({ ...editBook, title: e.target.value })}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  value={editBook.price}
                  onChange={(e) => setEditBook({ ...editBook, price: parseFloat(e.target.value) })}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  value={editBook.category}
                  onChange={(e) => setEditBook({ ...editBook, category: e.target.value })}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={editBook.description}
                  onChange={(e) => setEditBook({ ...editBook, description: e.target.value })}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Image URL</Form.Label>
                <Form.Control
                  value={editBook.image}
                  onChange={(e) => setEditBook({ ...editBook, image: e.target.value })}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreateBook}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                name="title"
                value={newBook.title}
                onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={newBook.price}
                onChange={(e) => setNewBook({ ...newBook, price: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                name="category"
                value={newBook.category}
                onChange={(e) => setNewBook({ ...newBook, category: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                name="description"
                as="textarea"
                rows={3}
                value={newBook.description}
                onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                name="image"
                value={newBook.image}
                onChange={(e) => setNewBook({ ...newBook, image: e.target.value })}
              />
            </Form.Group>

            <Button variant="success" type="submit">
              Add Book
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default AdminPage;
