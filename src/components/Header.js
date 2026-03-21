import React from 'react';
import logo from '../assets/images/Logo.svg';
import Nav from './Nav';
import './Header.css';

function Header() {
  return (
    <header>
      <img src={logo} alt="Little Lemon Logo" />
      <Nav />
    </header>
  );
}

export default Header;
