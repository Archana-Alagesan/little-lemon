import './Main.css';
import HomePage from './HomePage';
import BookingPage from './BookingPage';
import { Routes, Route } from 'react-router-dom';
import { act, useReducer, useState } from 'react';
import { fetchAPI } from '../helpers/api-helpers.js';
import ConfirmedBooking from './ConfirmedBooking.js';

const updateTimes = (state, action) => {
    console.log(state);
    console.log(action);
    return fetchAPI(action.date);
}

const initializeTimes = () => {
    const today = new Date();
    return fetchAPI(today);
}

const Main = () => {
    const [availableTimes, dispatch] = useReducer(updateTimes, initializeTimes())

    return (
        <main>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/booking" element={<BookingPage availableTimes={availableTimes} dispatch={dispatch} />} />
                <Route path="/confirmed" element={<ConfirmedBooking bookingDetails={{ date: '2023-10-10', time: '18:00', guests: 2 }} />} />
            </Routes>
        </main>
    );
}

export default Main;
