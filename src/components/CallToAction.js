import './CallToAction.css';
import foodImage from '../assets/images/restauranfood.jpg';
import Section from './Section';
import { Link } from 'react-router-dom';

const CallToAction = () => {
    return (
        <Section className="cta">
            <div className="cta-info-container">
                <div className="cta-content">
                    <h1>Little Lemon</h1>
                    <h2>Chicago</h2>
                    <p>We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</p>
                </div>
                <div className="cta-image">
                    <img src={foodImage} alt="Delicious Food" />
                </div>
            </div>
            <div className="cta-button">
                <Link to="/booking" className="btn btn-primary">Reserve a Table</Link>
            </div>
        </Section>
    );
}

export default CallToAction;
