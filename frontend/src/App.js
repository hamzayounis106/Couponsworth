import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

// Importing Components
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Home from "./components/common/Home";
import ContactUs from "./components/common/ContactUs";
import About from "./components/common/About";
import Login from "./components/auth/Login";
// import Register from './components/auth/Register';
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";
import UserProfile from "./components/user/UserProfile";
import ShopPage from "./components/common/ShopPage";
import HeaderCoupens from "./components/common/headerCoupens";
import StoreDetailPage from "./components/common/StoreDetailPage";
import Preloader from "./components/common/Preloader";
import AdminDashboard from "./components/admin/AdminDashboard";
import "./index.css";
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate preloader with a timeout
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return <Preloader />;
  }

  return <Content />;
};

const Content = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Header />}
      <main>
        <Routes>
          {/* Non-Admin Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path='/register' element={<Register />} /> */}
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/user/profile" element={<UserProfile />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/coupon" element={<HeaderCoupens />} />
          <Route path="/store-details/:storeId" element={<StoreDetailPage />} />

          {/* Admin Routes */}
          <Route path="/admin/*" element={<AdminDashboard />} />
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
      <ToastContainer theme="dark" />
    </>
  );
};

export default App;
