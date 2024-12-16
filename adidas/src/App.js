import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

// Importing Components
import Header from "./components/common/Header";
import StoreDetailPage from "./components/common/StoreDetailPage";
import Preloader from "./components/common/Preloader";
import Footer from "./components/common/Footer";

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
          {/* Redirect from "/" to "/store/674656311a9ddbfc3fdbf8b9" */}
          <Route path="/" element={<Navigate to="/store/674656311a9ddbfc3fdbf8b9" />} />

          {/* Store details route */}
          <Route path="/store/:id" element={<StoreDetailPage />} />
        </Routes>
      </main>
      <Footer />
      <ToastContainer />
    </Router>
  );
};

export default App;
