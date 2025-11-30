import "./footer.css";
import { FaFacebook, FaInstagram, FaTwitter, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-sections">
                <section>
                    <h3>Mali's Store</h3>
                    <Link to="/about">About Us</Link>
                    <Link to="/services">Services</Link>
                    <Link to="/Products">Products</Link>
                </section>
                <section>
                    <h3>Contact</h3>
                    <p><FaEnvelope /> hello@malistore.com</p>
                    <p><FaPhone /> +234 812 345 6789</p>
                    <p><FaMapMarkerAlt /> Lagos, Nigeria</p>
                </section>
                <section>
                    <h3>Follow Us</h3>
                    <p><FaFacebook /> Facebook</p>
                    <p><FaInstagram /> Instagram</p>
                    <p><FaTwitter /> Twitter</p>
                </section>
            </div>
            <div className="footer-bottom">
                <p>© 2023-2025 Mali's Store. All rights reserved.</p>
            </div>
        </footer >
    );
}
