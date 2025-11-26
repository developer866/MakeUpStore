import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import Button from "./Button";

function Navbar() {
  const [showMenu, setShowMenu] = useState(false);

  const handleClicks = () => {
    setShowMenu(!showMenu);
  };

  return (
    <main>
      <section>
        <div className="navbar">
          <h4 className="logo">Mali's Touch</h4>

          {/* navigation */}
          <section>
            <ul className="navbar-links">
              <Link to="/">
                <p>Home</p>
              </Link>
          
              <Link to="/Products">
                <p>Products</p>
              </Link>
              <Link to="/Services">
                <p>Services</p>
              </Link>
              {/* <Link to="/BookService">
                <p>Book Now</p>
              </Link> */}
              <Link to="/Contact">
                <p>Contact Us</p>
              </Link>
            </ul>
          </section>
          <section className="">
            <Button text="Book Service" link='Booking' />
            <Button text="Cart" link='Booking' />
          </section>

          {/* mobile menu */}
          <section className="mobile-menu">
            {/* hamburger icon */}
            <img
              src="/Images/bars-solid-full.svg"
              className="menu-icon"
              alt="menu"
              onClick={handleClicks}
            />

            {showMenu && (
              <div className="menu-popup">
                <div className="menu-close">
                  <img
                    src="/Images/xmark-solid-full.svg"
                    className="close-icon"
                    alt="close"
                    onClick={handleClicks}
                  />
                </div>
                <ul className="menu-links">
                  <Link to="/" onClick={handleClicks}>
                    <h4>Home</h4>
                  </Link>
                  <Link to="/Project" onClick={handleClicks}>
                    <h4>Product</h4>
                  </Link>
                  <Link to="/Services" onClick={handleClicks}>
                    <h4>Services</h4>
                  </Link>
                  <Link to="/Contact" onClick={handleClicks}>
                    <h4>Contact</h4>
                  </Link>
                </ul>
              </div>
            )}
          </section>
        </div>
      </section>
    </main>
  );
}

export default Navbar;
