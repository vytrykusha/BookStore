import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Cart from "../pages/Cart";
import BookDetails from "./BookDetails";
import Checkout from "../pages/Checkout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProtectedRoute from "./ProtectedRoute";
import Orders from "../pages/Orders";
import Profile from "../pages/Profile";
import ResetPassword from "../pages/ResetPassword";
import Discounts from "../pages/Discounts";
import Contacts from "../pages/Contacts";
import About from "../pages/About";
import AdminPage from "../pages/AdminPage";
import AdminRoute from "./AdminRoute";

const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/orders" element={
        <ProtectedRoute>
          <Orders />
        </ProtectedRoute>
      } />
      <Route path="/cart" element={
        <ProtectedRoute>
          <Cart />
        </ProtectedRoute>
      } />
      <Route path="/checkout" element={
        <ProtectedRoute>
          <Checkout />
        </ProtectedRoute>
      } />
      <Route path="/profile" element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      } />
      <Route path="/admin" element={
          <AdminRoute>
            <AdminPage />
          </AdminRoute>
      } />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/discounts" element={<Discounts />} />
      <Route path="/contacts" element={<Contacts />} />
      <Route path="/about" element={<About />} />
      <Route path="/book/:id" element={<BookDetails />} />
    </Routes>
  );
};

export default RoutesComponent;
