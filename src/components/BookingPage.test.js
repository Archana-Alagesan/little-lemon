import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import BookingPage from './BookingPage';

// ── Mocks ──────────────────────────────────────────────

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn()
}));

jest.mock('../helpers/apiHelpers', () => ({
    submitAPI: jest.fn().mockReturnValue(true)
}));

jest.mock('../helpers/storageHelpers', () => ({
    saveBookedTime: jest.fn(),
    getBookedTimesForDate: jest.fn().mockReturnValue([])
}));

const mockDispatch = jest.fn();
const mockAvailableTimes = ['17:00', '18:00', '19:00', '20:00'];

beforeEach(() => {
    jest.clearAllMocks();
});

const renderBookingPage = () => {
    return render(
        <MemoryRouter
            future={{
                v7_startTransition: true,
                v7_relativeSplatPath: true,
            }}
        >
            <BookingPage
                availableTimes={mockAvailableTimes}
                dispatch={mockDispatch}
            />
        </MemoryRouter>
    )
};

// ── Tests ──────────────────────────────────────────────

describe('BookingPage', () => {

    describe('Rendering', () => {

        test('renders booking page', () => {
            renderBookingPage();
            expect(screen.getByText(/reserve your experience/i)).toBeInTheDocument();
        });

        test('renders intro text', () => {
            renderBookingPage();
            expect(screen.getByText(/every great meal begins/i)).toBeInTheDocument();
            expect(screen.getByText(/book your table at little lemon/i)).toBeInTheDocument();
        });

        test('renders booking form', () => {
            renderBookingPage();
            expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
        });

    })

    describe('Opening Hours', () => {

        test('renders opening hours heading', () => {
            renderBookingPage();
            expect(screen.getByText(/opening hours/i)).toBeInTheDocument();
        });

        test('renders weekday hours', () => {
            renderBookingPage();
            expect(screen.getByText(/mon - fri/i)).toBeInTheDocument();
            expect(screen.getByText(/12:00 pm - 10:00 pm/i)).toBeInTheDocument();
        });

        test('renders saturday hours', () => {
            renderBookingPage();
            expect(screen.getByText(/saturday/i)).toBeInTheDocument();
            expect(screen.getByText(/11:00 am - 11:00 pm/i)).toBeInTheDocument();
        });

        test('renders sunday hours', () => {
            renderBookingPage();
            expect(screen.getByText(/sunday/i)).toBeInTheDocument();
            expect(screen.getByText(/11:00 am - 10:00 pm/i)).toBeInTheDocument();
        });

    });

    describe('Reservation Policy', () => {

        test('renders reservation policy heading', () => {
            renderBookingPage();
            expect(screen.getByText(/reservation policy/i)).toBeInTheDocument();
        });

        test('renders reservation hold policy', () => {
            renderBookingPage();
            expect(screen.getByText(/reservation hold/i)).toBeInTheDocument();
            expect(screen.getByText(/15 minutes past your reservation time/i)).toBeInTheDocument();
        });

        test('renders cancellation policy', () => {
            renderBookingPage();
            expect(screen.getByText(/accommodate other guest/i)).toBeInTheDocument();
            expect(screen.getByText(/24 hours notice/i)).toBeInTheDocument();
        });

        test('renders large parties policy', () => {
            renderBookingPage();
            expect(screen.getByText(/large parties/i)).toBeInTheDocument();
            expect(screen.getByText(/10 or more/i)).toBeInTheDocument();
        });

        test('renders special requests policy', () => {
            renderBookingPage();
            expect(screen.getByText(/mention any needs in the notes field/i)).toBeInTheDocument();
            expect(screen.getByText(/dietary requirements/i)).toBeInTheDocument();
        });

    });

    describe('Contact Info', () => {

        test('renders contact us heading', () => {
            renderBookingPage();
            expect(screen.getByRole('heading', { name: /contact us/i })).toBeInTheDocument();
        });

        test('renders email', () => {
            renderBookingPage();
            expect(screen.getByText(/info@littlelemon.com/i)).toBeInTheDocument();
        });

        test('renders phone', () => {
            renderBookingPage();
            expect(screen.getByText(/\+1 \(234\) 567-890/i)).toBeInTheDocument();
        });

    });

    describe('Props', () => {

        test('passes availableTimes to BookingForm', () => {
            renderBookingPage();
            mockAvailableTimes.forEach(time => {
                expect(screen.getByText(time)).toBeInTheDocument();
            });
        });

        test('passes dispatch to BookingForm', () => {
            renderBookingPage();
            expect(screen.getByLabelText(/choose date/i)).toBeInTheDocument();
        });

    });

});