import footerLogo from '../assets/images/footer-logo.png';
import './Footer.css';
import Nav from './Nav';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-inner">
                <div className="footer-col logo">
                    <img src={footerLogo} alt="Little Lemon Logo" className="footer-logo" />
                </div>

                <div className="footer-col footer-nav">
                    <h4>Quick Links</h4>
                    <Nav className="vertical-nav" aria-label="Footer navigation" />
                </div>

                <div className="footer-col contact">
                    <h4>Contact Us</h4>
                    <p>Phone: <a href="tel:+1234567890">+1 (234) 567-890</a></p>
                    <p>Email: <a href="mailto:info@littlelemon.com">info@littlelemon.com</a></p>
                    <p>Address: 123 Lemon St, Citrus City</p>
                </div>

                <div className="footer-col social">
                    <h4>Follow Us</h4>
                    <ul>
                        <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-facebook facebook"></i></a></li>
                        <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-instagram instagram"></i></a></li>
                        <li><a href="https://x.com" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-x-twitter x-twitter"></i></a></li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; 2026 Little Lemon. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
