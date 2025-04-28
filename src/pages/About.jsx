import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FaBookOpen, FaUsers, FaGlobe, FaAward } from "react-icons/fa";

const About = () => {
    return (
        <Container className="mt-4">
            <h2 className="text-center mb-4">About BookStore</h2>
            <p className="text-center">
                Welcome to <strong>BookStore</strong> — your go-to destination for finding and purchasing books online.
            </p>

            <Row className="mb-4">
                <Col md={6}>
                    <Card className="text-center shadow-lg p-3 d-flex align-items-center">
                        <Card.Body>
                            <h4 className="text-center"><FaBookOpen /> Our Story</h4>
                            <p>Founded in 2025, BookStore started as a small passion project for book lovers. Over the years, we've grown into a thriving online marketplace, connecting readers with the best titles across genres and interests.</p>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card className="text-center shadow-lg p-3 d-flex align-items-center">
                        <Card.Body>
                            <h4 className="text-center"><FaUsers /> Our Mission</h4>
                            <p>We believe books have the power to inspire, educate, and transform lives. Our mission is to make reading accessible to everyone by offering a wide selection of books at competitive prices, delivered with excellent service.</p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row className="mb-4">
                <Col md={4}>
                    <Card className="text-center shadow-lg p-3 d-flex flex-column justify-content-center align-items-center">
                        <FaGlobe size={40} className="text-primary mb-3" />
                        <Card.Body className="text-center">
                            <h4>Worldwide Delivery</h4>
                            <p>We ship books to customers across the globe, ensuring fast and reliable delivery services.</p>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="text-center shadow-lg p-3 d-flex flex-column justify-content-center align-items-center">
                        <FaAward size={40} className="text-warning mb-3" />
                        <Card.Body className="text-center">
                            <h4>Quality Assurance</h4>
                            <br/>
                            <p>Every book in our collection is carefully selected to ensure top-notch quality for our readers.</p>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="text-center shadow-lg p-3 d-flex flex-column justify-content-center align-items-center">
                        <FaUsers size={40} className="text-success mb-3" />
                        <Card.Body className="text-center">
                            <h4>Community-Driven</h4>
                            <p>Join thousands of book enthusiasts sharing reviews, recommendations, and stories.</p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

        </Container>
    );
};

export default About;
