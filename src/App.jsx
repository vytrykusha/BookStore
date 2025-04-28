import React, { useState } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import RoutesComponent from "./components/RoutesComponent";
import { useAuth } from "./context/AuthContext";
import { FaBookReader, FaShoppingCart, FaClipboardList, FaSignOutAlt, FaSignInAlt, FaUserPlus, FaTags, FaAddressBook, FaInfoCircle } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import ConfirmModal from "./components/ConfirmModal";
import Footer from "./components/Footer";

const App = () => {
  const { user, logout } = useAuth();
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <FaBookReader />
            <span>BookStore</span>
          </Navbar.Brand>

          <Nav className="me-auto">
            <Nav.Link as={Link} to="/discounts">
              <FaTags />
            </Nav.Link>
            <Nav.Link as={Link} to="/contacts">
              <FaAddressBook />
            </Nav.Link>
            <Nav.Link as={Link} to="/about">
              <FaInfoCircle />
            </Nav.Link>
          </Nav>;


          <Nav className="ms-auto">
            {user?.role === "admin" && (
              <Nav.Link as={Link} to="/admin"><RiAdminFill /></Nav.Link>
            )}

            <Nav.Link as={Link} to="/cart"><FaShoppingCart /></Nav.Link>
            <Nav.Link as={Link} to="/orders"><FaClipboardList /></Nav.Link>
            {user ? (
              <>
                {user && (
                  <Nav.Link as={Link} to="/profile" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt="avatar"
                        width={30}
                        height={30}
                        style={{ borderRadius: "50%" }}
                      />
                    ) : (
                      <img
                        src="https://innostudio.de/fileuploader/images/default-avatar.png"
                        alt="default avatar"
                        width={30}
                        height={30}
                        style={{ borderRadius: "50%" }}
                      />
                    )}
                  </Nav.Link>
                )}
                <Nav.Link onClick={() => setShowConfirm(true)}><FaSignOutAlt /></Nav.Link>

                <ConfirmModal
                  show={showConfirm}
                  onHide={() => setShowConfirm(false)}
                  onConfirm={() => {
                    logout();
                    setShowConfirm(false);
                  }}
                  title="Logout"
                  body="Are you sure you want to logout?"
                />
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login"><FaSignInAlt /></Nav.Link>
                <Nav.Link as={Link} to="/register"><FaUserPlus /></Nav.Link>
              </>
            )}
          </Nav>

        </Container>
      </Navbar>
      <Container className="mt-4">
        <RoutesComponent />
      </Container>
      <Footer/>
    </>
  );
};

export default App;
