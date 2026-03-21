import React from 'react';
import './BookingForm.css';
import { submitAPI } from '../helpers/apiHelpers.js';
import { useNavigate } from 'react-router-dom';
import Card from './Card.js';
import TimePicker from './TimePicker.js';
import { ALL_TIMES } from '../helpers/constants.js';
import { useFormik } from 'formik';
import { bookingSchema } from '../helpers/validationSchema.js';
import { saveBookedTime, getBookedTimesForDate } from '../helpers/storageHelpers.js';

const BookingForm = ({ availableTimes, dispatch }) => {
    const today = new Date().toISOString().split('T')[0];
    const navigate = useNavigate();
    const [bookingData, setBookingData] = React.useState({
        fullName: '',
        email: '',
        phone: '',
        date: today,
        time: '',
        guests: 1,
        occasion: ''
    });

    const handleDateChange = (date) => {
        setBookingData({ ...bookingData, date });
        dispatch({ date: new Date(date) });
    };

    const bookedTimes = getBookedTimesForDate(bookingData.date);

    const formik = useFormik({
        initialValues: {
            fullName: '',
            email: '',
            phone: '',
            date: today,
            time: '',
            guests: 1,
            occasion: 'No special occasion',
            notes: '',
        },
        validationSchema: bookingSchema,
        onSubmit: (values) => {
            const result = submitAPI(values);
            if (result) {
                saveBookedTime(values.date, values.time);
                navigate('/booking-confirmation', { state: values });
            }
        }
    });

    return (
        <Card className="booking-form-container">
            <form className="booking-form" aria-label="booking form" onSubmit={formik.handleSubmit}>
                <div className='form-field'>
                    <label htmlFor="fullname">Full Name</label>
                    <input type="text" id="fullname" {...formik.getFieldProps('fullName')} />
                    {formik.touched.fullName && formik.errors.fullName && (
                        <span className="error-msg">{formik.errors.fullName}</span>
                    )}
                </div>
                <div className='form-field'>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" {...formik.getFieldProps('email')} />
                    {formik.touched.email && formik.errors.email && (
                        <span className="error-msg">{formik.errors.email}</span>
                    )}
                </div>
                <div className='form-field'>
                    <label htmlFor="phone">Phone</label>
                    <input type="tel" id="phone" {...formik.getFieldProps('phone')} />
                    {formik.touched.phone && formik.errors.phone && (
                        <span className="error-msg">{formik.errors.phone}</span>
                    )}
                </div>
                <div className='form-field'>
                    <label htmlFor="res-date">Choose date</label>
                    <input type="date" id="res-date" min={today} value={formik.values.date} onChange={(e) => {
                        formik.handleChange(e);
                        handleDateChange(e.target.value);
                    }} />
                </div>
                {/* Time Pills */}
                {bookingData.date && (
                    <div>
                        <TimePicker
                            allTimes={ALL_TIMES}
                            availableTimes={availableTimes}
                            bookedTimes={bookedTimes}
                            value={formik.values.time}
                            onChange={(time) => formik.setFieldValue('time', time)}
                        />
                        {formik.touched.time && formik.errors.time && (
                            <span className="error-msg">{formik.errors.time}</span>
                        )}
                    </div>
                )}
                <div className='form-field'>
                    <label htmlFor="guests">Number of guests</label>
                    <input type="number" placeholder="1" min="1" max="10" id="guests" {...formik.getFieldProps('guests')} />
                </div>
                <div className='form-field'>
                    <label htmlFor="occasion">Occasion</label>
                    <div className="select-wrap">
                        <select id="occasion" {...formik.getFieldProps('occasion')}>
                            <option value="No special occasion">No special occasion</option>
                            <option value="Birthday">Birthday</option>
                            <option value="Anniversary">Anniversary</option>
                            <option value="Date Night">Date Night</option>
                            <option value="Business Meeting">Business Meeting</option>
                            <option value="Family Gathering">Family Gathering</option>
                            <option value="Engagement">Engagement</option>
                        </select>
                    </div>
                </div>
                <div className='form-field'>
                    <label htmlFor="notes">Special Requests/Notes</label>
                    <textarea name='notes' id="notes" rows="5" {...formik.getFieldProps('notes')}></textarea>
                </div>
                <input className='btn btn-primary reserve-btn' disabled={!formik.isValid || !formik.dirty || formik.isSubmitting} type="submit" value="Make Your reservation" />
            </form>
        </Card>
    );
}

export default BookingForm;
