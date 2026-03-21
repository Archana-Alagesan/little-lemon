import './Specials.css';
import Section from './Section';
import Card from './Card';
import greakSaladImg from '../assets/images/greek_salad.jpg';
import bruschettaImg from '../assets/images/bruschetta.svg';
import lemonDessertImg from '../assets/images/lemon_dessert.jpg';

const Specials = () => {
    const specials = [
        { id: 1, title: "Greek Salad", price: "12.99", description: "The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.", image: greakSaladImg },
        { id: 2, title: "Bruschetta", price: "8.99", description: "Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil.", image: bruschettaImg },
        { id: 3, title: "Lemon Dessert", price: "6.99", description: "This comes straight from grandma's recipe book, every last ingredient has been sourced and is as authentic as can be imagined.", image: lemonDessertImg },
    ];

    return (
        <Section className="specials">
            <div className="specials-header">
                <h2>This Week's Specials</h2>
                <button className="btn btn-primary">Online Menu</button>
            </div>
            <div className="specials-cards-container">
                {specials.map((special) => (
                    <Card key={special.id} className="specials-card">
                        <img src={special.image} alt={special.title} />
                        <div className='specials-card-info'>
                            <h3>{special.title}</h3>
                            <span className="specials-card-price">${special.price}</span>
                        </div>
                        <p className='specials-card-description'>{special.description}</p>
                        <p className='specials-card-order'>Order a delivery <span className="specials-card-icon material-icons">delivery_dining</span></p>
                    </Card>
                ))}
            </div>
        </Section>
    );
}

export default Specials;
