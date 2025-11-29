import React, { useState } from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import Button from "./Button";
import Carticon from "./Carticon";

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
              <NavLink to="/">
                <p>Home</p>
              </NavLink>
              <NavLink to="/Services">
                <p>Makeup Services</p>
              </NavLink>
              <NavLink to="/Products">
                <p>Beauty Products</p>
              </NavLink>
              <NavLink to="/Contact">
                <p>Contact Us</p>
              </NavLink>
            </ul>
          </section>

          <section className="cart">
            <div className='BookServiceButton' >

              <Button text="Book Service" link='Booking' />
            </div>
            <Carticon />
          </section>

          {/* mobile menu */}
          <section className="mobile-menu">
            {/* hamburger icon */}
            <div className="mobilecart">
              <Carticon />
              <img
                src="/Images/bars-solid-full.svg"
                className="menu-icon"
                alt="menu"
                onClick={handleClicks}
              />
            </div>

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
                  <NavLink to="/" onClick={handleClicks}>
                    <h4>Home</h4>
                  </NavLink>
                  <NavLink to="/Project" onClick={handleClicks}>
                    <h4>Product</h4>
                  </NavLink>
                  <NavLink to="/Services" onClick={handleClicks}>
                    <h4>Services</h4>
                  </NavLink>
                  <NavLink to="/Contact" onClick={handleClicks}>
                    <h4>Contact</h4>
                  </NavLink>
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
