import React from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Contacts = () => {
    return (
        <Container className="mt-4">
            <h2 className="text-center mb-4">Contact Us</h2>

            <Row className="mb-4">
                <Col md={4}>
                    <Card className="text-center shadow-lg p-3 d-flex align-items-center">
                        <FaPhone size={40} className="text-primary mb-2" />
                        <Card.Body>
                            <Card.Title>Phone</Card.Title>
                            <Card.Text><strong>Customer Support:</strong> +123 456 789</Card.Text>
                            <Card.Text><strong>Business Inquiries:</strong> +987 654 321</Card.Text>
                            <Card.Text><strong>Working Hours:</strong> Mon-Fri, 9AM-6PM</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="text-center shadow-lg p-3 d-flex align-items-center">
                        <FaEnvelope size={40} className="text-danger mb-2" />
                        <Card.Body>
                            <Card.Title>Email</Card.Title>
                            <Card.Text><strong>Support:</strong> support@bookstore.com</Card.Text>
                            <Card.Text><strong>Partnerships:</strong> partners@bookstore.com</Card.Text>
                            <Card.Text><strong>Careers:</strong> jobs@bookstore.com</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="text-center shadow-lg p-3 d-flex align-items-center">
                        <FaMapMarkerAlt size={40} className="text-success mb-2" />
                        <Card.Body>
                            <Card.Title>Location</Card.Title>
                            <Card.Text><strong>Head Office:</strong> 123 Book Street, Cityville</Card.Text>
                            <Card.Text><strong>Warehouse:</strong> 456 Paper Ave, Booktown</Card.Text>
                            <Card.Text><strong>Local Store:</strong> 789 Reading Lane, Library City</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row className="mb-4">
                <Col className="text-center">
                    <h4>Follow Us</h4>
                    <p>Stay connected with us for the latest updates and promotions!</p>
                    <div className="d-flex justify-content-center gap-3">
                        <a href="https://facebook.com" className="text-primary">
                            <FaFacebook size={30} />
                        </a>
                        <a href="https://instagram.com" className="text-danger">
                            <FaInstagram size={30} />
                        </a>
                        <a href="https://twitter.com" className="text-info">
                            <FaTwitter size={30} />
                        </a>
                    </div>
                </Col>
            </Row>

            <Row className="mb-4">
                <Col>
                    <Card className="p-4 shadow-lg">
                        <Card.Body>
                            <h4 className="text-center mb-3">Get in Touch</h4>
                            <p className="text-center">Have a question or suggestion? Let us know!</p>
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter your name" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="Enter your email" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Message</Form.Label>
                                    <Form.Control as="textarea" rows={4} placeholder="Enter your message" />
                                </Form.Group>
                                <Button variant="primary" className="w-100">Send Message</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Contacts;
