import './BookingPage.css';
import BookingForm from './BookingForm';
import Card from './Card';
import Section from './Section';

const BookingPage = ({ availableTimes, dispatch }) => {
    return (
        <Section className="booking-page">
            <div className='booking-intro'>
                <h1>Reserve Your Experience</h1>
                <p>Every great meal begins with a moment saved just for you.</p>
                <p>Book your table at Little Lemon and let us take care of the rest.</p>
            </div>
            <div className='booking-content'>
                <BookingForm availableTimes={availableTimes} dispatch={dispatch} />
                <div className='reservation-info-container'>
                    <Card className='open-hours-card'>
                        <h3>Opening Hours</h3>
                        <div className="hours-grid">
                            <span className="day">Mon - Fri</span>
                            <span className="time">12:00 PM - 10:00 PM</span>

                            <span className="day">Saturday</span>
                            <span className="time">11:00 AM - 11:00 PM</span>

                            <span className="day">Sunday</span>
                            <span className="time">11:00 AM - 10:00 PM</span>
                        </div>
                    </Card>
                    <Card className='reservation-policy-card'>
                        <div className='reservation-policy'>
                            <h3>Reservation Policy</h3>
                            <ol>
                                <li>
                                    <strong>Reservation Hold:</strong>
                                    <p>
                                        We hold your table for 15 minutes past your reservation time. After that, your table may be released to other guests.
                                    </p>
                                </li>
                                <li>
                                    <strong>Cancellation:</strong>
                                    <p>
                                        We kindly ask for at least 24 hours notice
                                        for cancellations. This helps us accommodate
                                        other guests who are waiting.
                                    </p>
                                </li>
                                <li>
                                    <strong>Large Parties:</strong>
                                    <p>
                                        For parties of 10 or more, please contact us
                                        directly by phone to arrange your reservation and discuss menu options.
                                    </p>
                                </li>
                                <li>
                                    <strong>Special Requests:</strong>
                                    <p>
                                        We do our best to accommodate dietary
                                        requirements and special occasions. Please
                                        mention any needs in the notes field when
                                        booking.
                                    </p>
                                </li>
                            </ol>
                        </div>
                    </Card>
                </div>
            </div>
            <Card className='contact-info-card'>
                <div className='contact-info'>
                    <h2>Contact Us</h2>
                    <p>If you have any questions or need assistance, feel free to reach out to us:</p>
                    <p>Email: info@littlelemon.com</p>
                    <p>Phone: +1 (234) 567-890</p>
                </div>
            </Card>
        </Section>
    );
}

export default BookingPage;