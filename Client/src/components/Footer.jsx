import "./footer.css";
import { FaFacebook, FaInstagram, FaTwitter, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="footer">

            <div className="footer-sections">

                {/* Brand / About */}
                <section>
                    <h3>Mali's Store</h3>
                    <p>Your trusted store for makeup, skincare, and quality beauty accessories.</p>
                </section>

                {/* Quick Navigation */}
                <section>
                    <h3>Quick Links</h3>
                    <Link to="/#About-section">About Us</Link>
                    <Link to="/products">Products</Link>
                    <Link to="/contact">Contact</Link>
                    {/* <Link to="/faq">FAQ</Link> */}
                </section>

                {/* Contact Section */}
                <section>
                    <h3>Contact</h3>
                    <p><FaEnvelope /> hello@malistore.com</p>
                    <p><FaPhone /> +234 812 345 6789</p>
                    <p><FaMapMarkerAlt /> Lagos, Nigeria</p>
                </section>

                {/* Social Media */}
                <section>
                    <h3>Follow Us</h3>
                    <div className="footer-socials">
                        <a href="#"><FaFacebook /> Facebook</a>
                        <a href="#"><FaInstagram /> Instagram</a>
                        <a href="#"><FaTwitter /> Twitter</a>
                    </div>
                </section>
            </div>

            <div className="footer-bottom">
                <p>© 2023 - 2025 Mali's Store. All rights reserved.</p>
            </div>

        </footer>
    );
}
