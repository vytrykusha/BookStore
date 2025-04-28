import React, { useEffect, useState } from "react";
import { Container, Card, ListGroup, Alert, Button } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import jsPDF from "jspdf";

const Orders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  const generatePDF = (order) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`Order #${order.id}`, 10, 10);
    doc.setFontSize(12);
    doc.text(`Date: ${order.date}`, 10, 20);
    doc.text(`Customer: ${order.customer.name}`, 10, 30);
    doc.text(`Email: ${order.customer.email}`, 10, 40);
    doc.text(`Address: ${order.customer.address}`, 10, 50);
    doc.text(`Payment: ${order.payment}`, 10, 60);

    doc.text("Items:", 10, 75);
    order.items.forEach((item, index) => {
      doc.text(
        `${item.title} (x${item.quantity}) — $${(item.price * item.quantity).toFixed(2)}`,
        10,
        85 + index * 10
      );
    });

    doc.text(`Total: $${order.total}`, 10, 95 + order.items.length * 10);

    doc.save(`order-${order.id}.pdf`);
  };

  useEffect(() => {
    if (user) {
      const data = localStorage.getItem(`orders-${user.email}`);
      if (data) {
        setOrders(JSON.parse(data));
      }
    }
  }, [user]);

  if (!user) return <Navigate to="/login" />;

  return (
    <Container className="d-flex flex-column align-items-center mt-4">
      <Card className="p-4 shadow w-100" style={{ maxWidth: "800px", borderRadius: "20px" }}>
        <h2 className="text-center mb-4">My Orders</h2>
        {orders.length === 0 ? (
          <Alert variant="info" className="text-center">You don't have any orders yet.</Alert>
        ) : (
          orders
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((order) => (
              <Card className="mb-4 shadow-sm" key={order.id} style={{ borderRadius: "15px" }}>
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                      <Card.Title>Order #{order.id}</Card.Title>
                      <Card.Subtitle className="text-muted">{order.date}</Card.Subtitle>
                    </div>
                    <Button variant="outline-primary" size="sm" onClick={() => generatePDF(order)}>
                      Download PDF
                    </Button>
                  </div>
                  <ListGroup className="mb-3">
                    {order.items.map((item) => (
                      <ListGroup.Item key={item.id}>
                        {item.title} (x{item.quantity}) — ${item.price * item.quantity}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                  <div className="text-end fw-bold">
                    Total: ${order.total}
                  </div>
                </Card.Body>
              </Card>
            ))
        )}
      </Card>
    </Container>
  );
};

export default Orders;
