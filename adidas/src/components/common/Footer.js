import React from "react";
import "../../styles/Footer.css";
const BASEURL = process.env.REACT_APP_API_MAIN_URL_LIVE;
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>About Us</h3>
          <p>Get best and authentic coupon codes here on our website.</p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <a href={`${BASEURL}`}>Home</a>
            </li>
            <li>
              <a href={`${BASEURL}/about`}>About</a>
            </li>
            {/* <li><a href="/services">Services</a></li> */}
            <li>
              <a href={`${BASEURL}/contact`}>Contact</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h3>Contact</h3>
          <p>Email: couponsworth@gmail.com</p>
          {/* <p>Phone: +1 (123) 456-7890</p> */}
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 Coupons Worth. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
