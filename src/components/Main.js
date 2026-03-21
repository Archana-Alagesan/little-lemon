import './Main.css';
import HomePage from './HomePage';
import BookingPage from './BookingPage';
import { Routes, Route } from 'react-router-dom';
import { useReducer } from 'react';
import ConfirmedBooking from './ConfirmedBooking.js';
import { getTimesForDate } from '../helpers/utils.js';

const updateTimes = (state, action) => {
    state = getTimesForDate(action.date);
    return state;
}

const initializeTimes = () => {
    const today = new Date();
    return getTimesForDate(today);
}

const Main = () => {
    const [availableTimes, dispatch] = useReducer(updateTimes, initializeTimes())

    return (
        <main>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/booking" element={<BookingPage availableTimes={availableTimes} dispatch={dispatch} />} />
                <Route path="/booking-confirmation" element={<ConfirmedBooking />} />
            </Routes>
        </main>
    );
}

export default Main;
