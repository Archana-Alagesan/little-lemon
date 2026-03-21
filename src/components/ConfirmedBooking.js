import { Link, useLocation } from 'react-router-dom';
import './ConfirmedBooking.css';
import Section from './Section';

const ConfirmedBooking = () => {

    const location = useLocation();
    const bookingDetails = location.state;

    return (
        <Section className="confirmed-booking-section">
            <div className="confirmed-booking">
                <h2>Your Table is Reserved!</h2>
                <div className="booking-details">
                    <p>Thank you, {bookingDetails.fullName}.</p>
                    <p>We look forward to welcoming you on {bookingDetails.date} at {bookingDetails.time} for {bookingDetails.guests} guests.</p>
                    <p>A confirmation has been sent to {bookingDetails.email}</p>
                </div>
                <div className="confirmation-info">
                    <p>Note: Please arrive 10 minutes early.</p>
                    <p>We hold tables for 15 minutes past reservation time.</p>
                </div>
                <div className="btn-container">
                    <Link className='btn btn-secondary' to="/">Back to Home</Link>
                    <Link className='btn btn-primary' to="/booking">Make Another Booking</Link>
                </div>
            </div>
        </Section>
    );
}

export default ConfirmedBooking;
