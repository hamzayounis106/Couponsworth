import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useParams,
  Navigate,
} from 'react-router-dom';

// import useNavigate from "react-router-dom";
// Importing Components
import Header from './components/common/Header';
import Home from './components/common/Home';
import ContactUs from './components/common/ContactUs';
import About from './components/common/About';
import Login from './components/auth/Login';
// import Register from './components/auth/Register';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';
import UserProfile from './components/user/UserProfile';
import AdminDashboard from './components/admin/AdminDashboard';
import ManageUsers from './components/admin/ManageUsers';
import ShopPage from './components/common/ShopPage';
import HeaderCoupens from './components/common/headerCoupens'; // Import headerCoupens
import CategoriesPage from './components/common/CategoriesPage';
import StoreDetailPage from './components/common/StoreDetailPage';
import Preloader from './components/common/Preloader';
import Footer from './components/common/Footer';
import LatestCoupons from './components/common/LatestCoupons';
import CopyCoupon from './components/common/CopyCoupon';
import { useNavigate } from 'react-router-dom';
import './index.css';
import Store from './components/admin/Store';
import AddStore from './components/admin/AddStore';
import DeletStore from './components/admin/DeletStore';
import Coupons from './components/admin/Coupons';
import Addcoupons from './components/admin/Addcoupons';
// Wrapper Component for /store/:id
// const StoreRouteWrapper = () => {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const restrictedId = "674656311a9ddbfc3fdbf8b9";

//   if (id === restrictedId) {
//     console.log("Restricted store ID:", id);
//     // Prevent navigation or render a fallback
//     window.location.href = "http://adidas.couponsworth.com/";
//     // navigate("http://adidas.couponsworth.com/");
//     return navigate("http://couponsworth.com/");
//   }

//   return <StoreDetailPage />;
// };

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

  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/contact' element={<ContactUs />} />
          <Route path='/about' element={<About />} />
          <Route path='/login' element={<Login />} />
          {/* <Route path='/register' element={<Register />} /> */}
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password/:token' element={<ResetPassword />} />
          <Route path='/user/profile' element={<UserProfile />} />
          <Route path='/admin' element={<AdminDashboard />} />
          <Route path='/admin/manage-users' element={<ManageUsers />} />
          <Route path='/shop' element={<ShopPage />} />
          <Route path='/coupon' element={<HeaderCoupens />} />{' '}
          <Route path='/store-details/:storeId' element={<StoreDetailPage />} />
          <Route path='/categories' element={<CategoriesPage />} />
          <Route path='/store/:id' element={<StoreDetailPage />} />
          <Route path='/copy-coupon/:couponCode' element={<CopyCoupon />} />
          <Route path='/latest-coupons' element={<LatestCoupons />} />
          <Route path='/admin/store' element={<Store />} />
          <Route path='/admin/coupons' element={<Coupons />} />
          <Route path='/admin/coupons/addcoupons' element={<Addcoupons />} />
          <Route path='/admin/store/addstore' element={<AddStore />} />
          <Route path='/admin/store/deletStore' element={<DeletStore />} />
        </Routes>
      </main>
      <Footer />
      <ToastContainer />
    </Router>
  );
};

export default App;
