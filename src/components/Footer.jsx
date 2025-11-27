import "./footer.css";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-sections">
                <section>
                    <h3>Mali's Store</h3>
                    <p>About us</p>
                    <p>Contact</p>
                    <p>Blog</p>
                </section>
                <section>
                    <h3>Products</h3>
                    <p>Makeup</p>
                    <p>Skincare</p>
                    <p>Accessories</p>
                </section>
                <section>
                    <h3>Support</h3>
                    <p>FAQ</p>
                    <p>Shipping</p>
                    <p>Returns</p>
                </section>
                <section>
                    <h3>Follow Us</h3>
                    <p>Instagram</p>
                    <p>Facebook</p>
                    <p>Twitter</p>
                </section>
            </div>
            <div className="footer-bottom">
                <p>© 2023-2025 Mali's Store. All rights reserved.</p>
            </div>
        </footer>
    );
}
