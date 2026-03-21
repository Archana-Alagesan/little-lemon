import './CustomersSay.css';
import Section from './Section';
import Card from './Card';

const CustomersSay = () => {
    const testimonials = [
        {
            id: 1,
            text: "The food was amazing!",
            rating: 5,
            author: "John Doe"
        },
        {
            id: 2,
            text: "I loved the atmosphere.",
            rating: 4,
            author: "Jane Smith"
        },
        {
            id: 3,
            text: "Best dining experience I've ever had.",
            rating: 4,
            author: "Sam Wilson"
        },
        {
            id: 4,
            text: "A culinary delight!",
            rating: 5,
            author: "Lisa Brown"
        }
    ];

    return (
        <Section className="customers-say">
            <h2>Testimonials</h2>
            <div className="testimonials">
                {testimonials.map(testimonial => (
                    <Card key={testimonial.id} className="testimonial">
                        <div className='rating-container'>
                            <p>{Array.from({ length: testimonial.rating }, (_, i) => <i className="fa-solid fa-star rating-stars" key={i}></i>)}</p>
                            <p className="rating">Rating: {testimonial.rating} / 5</p>
                        </div>
                        <div className='testimonial-author'>
                            <img className='testimonial-author-image' src={require(`../assets/images/${testimonial.author}.png`)} alt={testimonial.author} />
                            <span>{testimonial.author}</span>
                        </div>
                        <div className='testimonial-text'>
                            <p>"{testimonial.text}"</p>
                        </div>
                    </Card>
                ))}
            </div>
        </Section>
    );
}

export default CustomersSay;
