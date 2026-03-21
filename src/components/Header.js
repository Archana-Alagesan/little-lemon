import logo from '../assets/images/Logo.svg';
import Nav from './Nav';
import './Header.css';

const Header = () => {
  return (
    <header>
      <img src={logo} alt="Little Lemon Logo" />
      <Nav hideOnMobile />
    </header>
  );
}

export default Header;
