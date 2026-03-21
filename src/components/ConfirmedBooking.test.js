import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ConfirmedBooking from './ConfirmedBooking';

// ── Mock Data ──────────────────────────────────────────

const mockBookingDetails = {
    fullName: 'John Doe',
    date: '2025-12-25',
    time: '19:00',
    guests: 4,
    email: 'john@example.com',
};

// ── Helper ─────────────────────────────────────────────

const renderConfirmedBooking = (state = mockBookingDetails) => {
    return render(
        <MemoryRouter
            initialEntries={[{ pathname: '/booking-confirmation', state }]}
            future={{
                v7_startTransition: true,
                v7_relativeSplatPath: true,
            }}
        >
            <Routes>
                <Route path="/booking-confirmation" element={<ConfirmedBooking />} />
            </Routes>
        </MemoryRouter>
    );
};

// ── Tests ──────────────────────────────────────────────

describe('ConfirmedBooking', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    // ── Rendering ────────────────────────────────────────

    describe('Rendering', () => {

        test('renders without crashing', () => {
            renderConfirmedBooking();
        });

        test('renders confirmed booking heading', () => {
            renderConfirmedBooking();
            expect(screen.getByText(/your table is reserved/i)).toBeInTheDocument();
        });

        test('renders note about arriving early', () => {
            renderConfirmedBooking();
            expect(screen.getByText(/arrive 10 minutes early/i)).toBeInTheDocument();
        });

        test('renders table hold notice', () => {
            renderConfirmedBooking();
            expect(screen.getByText(/15 minutes past reservation time/i)).toBeInTheDocument();
        });

    });

    // ── Booking Details ───────────────────────────────────

    describe('Booking Details', () => {

        test('renders guest name', () => {
            renderConfirmedBooking();
            expect(screen.getByText(/john doe/i)).toBeInTheDocument();
        });

        test('renders booking date', () => {
            renderConfirmedBooking();
            expect(screen.getByText(/2025-12-25/i)).toBeInTheDocument();
        });

        test('renders booking time', () => {
            renderConfirmedBooking();
            expect(screen.getByText(/19:00/i)).toBeInTheDocument();
        });

        test('renders number of guests', () => {
            renderConfirmedBooking();
            expect(screen.getByText(/4 guests/i)).toBeInTheDocument();
        });

        test('renders confirmation email', () => {
            renderConfirmedBooking();
            expect(screen.getByText(/john@example.com/i)).toBeInTheDocument();
        });

    });

    // ── Links ─────────────────────────────────────────────

    describe('Links', () => {

        test('renders back to home link', () => {
            renderConfirmedBooking();
            expect(screen.getByRole('link', { name: /back to home/i })).toBeInTheDocument();
        });

        test('back to home link points to /', () => {
            renderConfirmedBooking();
            expect(screen.getByRole('link', { name: /back to home/i }))
                .toHaveAttribute('href', '/');
        });

        test('renders make another booking link', () => {
            renderConfirmedBooking();
            expect(screen.getByRole('link', { name: /make another booking/i })).toBeInTheDocument();
        });

        test('make another booking link points to /booking', () => {
            renderConfirmedBooking();
            expect(screen.getByRole('link', { name: /make another booking/i }))
                .toHaveAttribute('href', '/booking');
        });

    });

});