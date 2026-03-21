import React from 'react';
import './BookingForm.css';
import { submitAPI } from '../helpers/api-helpers.js';
import { useNavigate } from 'react-router-dom';

const BookingForm = ({ availableTimes, dispatch }) => {
    const navigate = useNavigate();
    const [bookingData, setBookingData] = React.useState({
        date: '',
        time: '',
        guests: 1,
        occasion: ''
    });

    const handleDateChange = (date) => {
        setBookingData({ ...bookingData, date });
        dispatch({ date: new Date(date) });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Submit the booking data
        console.log("Booking data submitted:", bookingData);
        const result = submitAPI(bookingData);
        if (result) {
            // Navigate to the confirmation page or show a success message
            console.log("Booking confirmed:", bookingData);
            navigate('/confirmed', { state: { bookingData } });
        }
    };

    return (
        <form className="booking-form" style={{ display: "grid", maxWidth: "200px", gap: "20px" }} onSubmit={handleSubmit}>
            <label htmlFor="res-date">Choose date</label>
            <input type="date" id="res-date" value={bookingData.date} onChange={(e) => handleDateChange(e.target.value)} />
            <label htmlFor="res-time">Choose time</label>
            <select id="res-time" value={bookingData.time} onChange={(e) => setBookingData({ ...bookingData, time: e.target.value })}>
                {availableTimes.map((time) => (
                    <option key={time} value={time}>{time}</option>
                ))}
            </select>
            <label htmlFor="guests">Number of guests</label>
            <input type="number" placeholder="1" min="1" max="10" id="guests" value={bookingData.guests} onChange={(e) => setBookingData({ ...bookingData, guests: e.target.value })} />
            <label htmlFor="occasion">Occasion</label>
            <select id="occasion" value={bookingData.occasion} onChange={(e) => setBookingData({ ...bookingData, occasion: e.target.value })}>
                <option>Birthday</option>
                <option>Engagement</option>
                <option>Anniversary</option>
            </select>
            <input type="submit" value="Make Your reservation" />
        </form>
    );
}

export default BookingForm;
