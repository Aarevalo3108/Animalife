import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./components/pages/Home";
import Shop from "./components/pages/Shop";
import Product from './components/pages/Product';
import Profile from "./components/pages/Profile";
import Admin from './components/pages/Admin';
import AdminUsers from './components/pages/AdminUsers';
import AdminOrders from './components/pages/AdminOrders';
import AdminProducts from './components/pages/AdminProducts';
import AdminCategories from './components/pages/AdminCategories';
import Cart from "./components/pages/Cart";
import OrderLayout from './components/pages/OrderLayout';
import Login from "./components/pages/Login";
import ResetPassword from "./components/pages/ResetPassword";
import EditUser from './components/pages/editUser';
import SignUp from "./components/pages/SignUp";
import NotFound from "./components/pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import AuthProvider from "./auth/AuthProvider";
import CartProvider from './components/CartProvider';
import './styles/App.css';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <CartProvider>
          <Nav />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/shop/:category" element={<Shop />} />
              <Route path="/shop/product/:id" element={<Product />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/" element={<ProtectedRoute />}>
                <Route path="profile" element={<Profile />} />
                <Route path="profile/edit" element={<EditUser />} />
                <Route path="order/:id" element={<OrderLayout />} />
                <Route path="/" element={<AdminRoute />}>
                  <Route path="admin" element={<Admin />} />
                  <Route path="admin/users" element={<AdminUsers />} />
                  <Route path="admin/orders" element={<AdminOrders />} />
                  <Route path="admin/products" element={<AdminProducts />} />
                  <Route path="admin/categories" element={<AdminCategories />} />
                </Route>
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </CartProvider>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
