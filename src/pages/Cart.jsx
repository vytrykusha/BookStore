import React, { useContext } from "react";
import { Container, Card, ListGroup, Button, Alert } from "react-bootstrap";
import { CartContext } from "../context/CartContext";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Container className="d-flex flex-column align-items-center mt-4">
      <Card className="p-4 shadow w-100" style={{ maxWidth: "700px", borderRadius: "20px" }}>
        <h2 className="text-center mb-4">🛒 Your Cart</h2>
        {cart.length === 0 ? (
          <Alert variant="info" className="text-center">Your cart is empty.</Alert>
        ) : (
          <>
            <ListGroup className="mb-3">
              {cart.map((item) => (
                <ListGroup.Item key={item.id} className="d-flex justify-content-between align-items-center">
                  <div>
                    {item.title} (x{item.quantity})
                    <div className="text-muted small">${(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => removeFromCart(item.id)}
                    className="rounded-pill"
                  >
                    Remove
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>

            <div className="text-end fw-bold mb-3">
              Total: ${total.toFixed(2)}
            </div>

            <div className="d-flex flex-column flex-md-row justify-content-between">
              <Button variant="warning" onClick={clearCart} className="mb-2 rounded-pill">
                🧹 Clear Cart
              </Button>
              <Button variant="success" href="/checkout" className="mb-2 rounded-pill">
                ✅ Proceed to Checkout
              </Button>
            </div>
          </>
        )}
      </Card>
    </Container>
  );
};

export default Cart;