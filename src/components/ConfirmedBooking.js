import './ConfirmedBooking.css';

const ConfirmedBooking = ({ bookingDetails }) => {
    return (
        <div className="confirmed-booking">
            <h2>Booking Confirmed</h2>
            <p>Thank you for your booking!</p>
            <div className="booking-details">
                <h3>Booking Details:</h3>
                <p>Date: {bookingDetails.date}</p>
                <p>Time: {bookingDetails.time}</p>
                <p>Guests: {bookingDetails.guests}</p>
            </div>
        </div>
    );
}

export default ConfirmedBooking;
