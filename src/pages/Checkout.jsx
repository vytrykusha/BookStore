import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { Container, Card, Form, Button, ListGroup, Alert } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";

const Checkout = () => {
  const { user } = useAuth();
  const { cart, clearCart } = useContext(CartContext);
  const [formData, setFormData] = useState({ name: "", email: "", address: "", payment: "card" });
  const [submitted, setSubmitted] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const order = {
      id: Date.now(),
      customer: {
        name: formData.name,
        email: user.email,
        address: formData.address,
        payment: formData.payment,
      },
      items: cart,
      total: total.toFixed(2),
      date: new Date().toLocaleString(),
    };

    const ordersKey = `orders-${user.email}`;
    const existingOrders = JSON.parse(localStorage.getItem(ordersKey)) || [];
    const updatedOrders = [...existingOrders, order];
    localStorage.setItem(ordersKey, JSON.stringify(updatedOrders));

    setSubmitted(true);
    clearCart();
  };

  if (submitted) {
    return (
      <Container className="d-flex justify-content-center align-items-center mt-5">
        <Alert variant="success" className="text-center w-100" style={{ maxWidth: "500px" }}>
          Thank you, {formData.name}! Your order has been placed.
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="d-flex flex-column align-items-center mt-4">
      <Card className="p-4 shadow w-100" style={{ maxWidth: "700px", borderRadius: "20px" }}>
        <h2 className="text-center mb-4">Checkout</h2>

        {cart.length === 0 ? (
          <Alert variant="info" className="text-center">Your cart is empty.</Alert>
        ) : (
          <>
            <ListGroup className="mb-4">
              {cart.map((item) => (
                <ListGroup.Item key={item.id} className="d-flex justify-content-between align-items-center">
                  <div>{item.title} (x{item.quantity})</div>
                  <div className="fw-bold">${(item.price * item.quantity).toFixed(2)}</div>
                </ListGroup.Item>
              ))}
              <ListGroup.Item className="d-flex justify-content-between fw-bold">
                <div>Total:</div>
                <div>${total.toFixed(2)}</div>
              </ListGroup.Item>
            </ListGroup>

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control name="name" required onChange={handleChange} className="rounded-pill" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" required onChange={handleChange} className="rounded-pill" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control as="textarea" rows={3} name="address" required onChange={handleChange} style={{ borderRadius: "15px" }} />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Payment Method</Form.Label>
                <Form.Select name="payment" onChange={handleChange} value={formData.payment} className="rounded-pill">
                  <option value="card">Card</option>
                  <option value="cash">Cash</option>
                  <option value="paypal">PayPal</option>
                </Form.Select>
              </Form.Group>

              <Button type="submit" variant="success" className="w-100 rounded-pill">
                Place Order
              </Button>
            </Form>
          </>
        )}
      </Card>
    </Container>
  );
};

export default Checkout;
