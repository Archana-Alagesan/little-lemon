import logo from '../assets/images/logo.svg';
import Nav from './Nav';
import './Header.css';
import { useState } from 'react';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = () => setIsOpen(!isOpen)
    const closeMenu = () => setIsOpen(false)
    return (
        <header>
            <button
                className="hamburger"
                onClick={toggleMenu}
                aria-label="Toggle menu"
            >
                <span className={'hamburger-line'}></span>
                <span className={'hamburger-line'}></span>
                <span className={'hamburger-line'}></span>
            </button>

            {/* Overlay */}
            {isOpen && (
                <div className="menu-overlay" onClick={closeMenu}>
                    {/* Close button */}
                    <button className="menu-close" onClick={closeMenu}>✕</button>
                    <Nav className={`vertical-nav nav--open`} />
                </div>
            )}
            <img src={logo} alt="Little Lemon Logo" />
            <Nav hideOnMobile />
        </header>
    );
}

export default Header;
