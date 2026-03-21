import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Main from './Main';
import { act } from '@testing-library/react';

// ── Mocks ──────────────────────────────────────────────

jest.mock('./HomePage', () => () => null);
jest.mock('./BookingPage', () => ({ dispatch }) => {
    const React = require('react');
    return React.createElement('button', {
        'data-testid': 'trigger-dispatch',
        onClick: () => dispatch({ date: new Date('2025-12-25') })
    }, 'Trigger');
});
jest.mock('./ConfirmedBooking', () => () => null);

jest.mock('../helpers/utils', () => ({
    getTimesForDate: jest.fn().mockReturnValue(['17:00', '18:00', '19:00']),
}));

// ── Helper ─────────────────────────────────────────────

const renderMain = (initialPath = '/') => {
    return render(
        <MemoryRouter
            initialEntries={[initialPath]}
            future={{
                v7_startTransition: true,
                v7_relativeSplatPath: true,
            }}
        >
            <Main />
        </MemoryRouter>
    );
};

// ── Tests ──────────────────────────────────────────────

describe('Main', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    // ── Rendering ────────────────────────────────────────

    describe('Rendering', () => {

        test('renders without crashing', () => {
            renderMain();
        });

        test('renders main element', () => {
            renderMain();
            expect(screen.getByRole('main')).toBeInTheDocument();
        });

    });

    // ── Routing ──────────────────────────────────────────

    describe('Routing', () => {

        test('renders on / route without crashing', () => {
            renderMain('/');
            expect(screen.getByRole('main')).toBeInTheDocument();
        });

        test('renders on /booking route without crashing', () => {
            renderMain('/booking');
            expect(screen.getByRole('main')).toBeInTheDocument();
        });

        test('renders on /booking-confirmation route without crashing', () => {
            renderMain('/booking-confirmation');
            expect(screen.getByRole('main')).toBeInTheDocument();
        });

    });

    // ── availableTimes ────────────────────────────────────

    describe('availableTimes', () => {

        test('initializes times using getTimesForDate', () => {
            const { getTimesForDate } = require('../helpers/utils');
            renderMain();
            expect(getTimesForDate).toHaveBeenCalled();
        });

        test('calls getTimesForDate with a Date object', () => {
            const { getTimesForDate } = require('../helpers/utils');
            renderMain();
            expect(getTimesForDate).toHaveBeenCalledWith(
                expect.any(Date)
            );
        });

        test('updateTimes updates times when dispatch is called', async () => {
            const { getTimesForDate } = require('../helpers/utils');
            renderMain('/booking');

            await act(async () => {
                fireEvent.click(screen.getByTestId('trigger-dispatch'));
            });

            expect(getTimesForDate).toHaveBeenCalledWith(new Date('2025-12-25'));
        });

    });

});