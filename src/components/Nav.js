import { Link } from 'react-router-dom';
import './Nav.css';

const Nav = ({ hideOnMobile }) => {
  return (
    <nav className={hideOnMobile ? "nav nav--hide-mobile" : "nav"}>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><a href="#menu">Menu</a></li>
        <li><Link to="/booking">Reservations</Link></li>
        <li><a href="#order-online">Order Online</a></li>
        <li><a href="#login">Login</a></li>
      </ul>
    </nav>
  );
}

export default Nav;
