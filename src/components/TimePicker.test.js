import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TimePicker from './TimePicker';

// ── Test Data ──────────────────────────────────────────

const allTimes = ['17:00', '18:00', '19:00', '20:00', '21:00'];
const availableTimes = ['17:00', '18:00', '19:00'];
const mockOnChange = jest.fn();

// ── Helper ─────────────────────────────────────────────

const renderTimePicker = (props = {}) => {
    return render(
        <TimePicker
            allTimes={allTimes}
            availableTimes={availableTimes}
            value=""
            onChange={mockOnChange}
            {...props}
        />
    );
};

// ── Tests ──────────────────────────────────────────────

describe('TimePicker', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    // ── Rendering ────────────────────────────────────────

    describe('Rendering', () => {

        test('renders without crashing', () => {
            renderTimePicker();
        });

        test('renders select time label', () => {
            renderTimePicker();
            expect(screen.getByText(/select time/i)).toBeInTheDocument();
        });

        test('renders all time pills', () => {
            renderTimePicker();
            allTimes.forEach(time => {
                expect(screen.getByText(time)).toBeInTheDocument();
            });
        });

        test('renders correct number of time pills', () => {
            renderTimePicker();
            expect(screen.getAllByRole('button')).toHaveLength(allTimes.length);
        });

    });

    // ── Closed ────────────────────────────────────────────

    describe('Closed', () => {

        test('shows closed message when availableTimes is empty', () => {
            renderTimePicker({ availableTimes: [] });
            expect(screen.getByText(/we are closed on this day/i)).toBeInTheDocument();
        });

        test('does not show time pills when closed', () => {
            renderTimePicker({ availableTimes: [] });
            expect(screen.queryAllByRole('button')).toHaveLength(0);
        });

    });

    // ── Fully Booked ──────────────────────────────────────

    describe('Fully Booked', () => {

        test('shows fully booked message when all times are booked', () => {
            renderTimePicker({
                availableTimes: ['17:00', '18:00', '19:00'],
                bookedTimes: ['17:00', '18:00', '19:00'],
            });
            expect(screen.getByText(/we are fully booked/i)).toBeInTheDocument();
        });

        test('does not show time pills when fully booked', () => {
            renderTimePicker({
                availableTimes: ['17:00', '18:00', '19:00'],
                bookedTimes: ['17:00', '18:00', '19:00'],
            });
            expect(screen.queryAllByRole('button')).toHaveLength(0);
        });

    });

    // ── Disabled ─────────────────────────────────────────

    describe('Disabled Times', () => {

        test('disables times not in availableTimes', () => {
            renderTimePicker();
            // 20:00 and 21:00 are in allTimes but not availableTimes
            expect(screen.getByText('20:00').closest('button')).toBeDisabled();
            expect(screen.getByText('21:00').closest('button')).toBeDisabled();
        });

        test('enables times that are available', () => {
            renderTimePicker();
            expect(screen.getByText('17:00').closest('button')).not.toBeDisabled();
            expect(screen.getByText('18:00').closest('button')).not.toBeDisabled();
            expect(screen.getByText('19:00').closest('button')).not.toBeDisabled();
        });

        test('disables booked times', () => {
            renderTimePicker({ bookedTimes: ['17:00'] });
            expect(screen.getByText('17:00').closest('button')).toBeDisabled();
        });

        test('applies booked class to booked times', () => {
            renderTimePicker({ bookedTimes: ['17:00'] });
            expect(screen.getByText('17:00').closest('button')).toHaveClass('booked');
        });

        test('applies disabled class to unavailable times', () => {
            renderTimePicker();
            expect(screen.getByText('20:00').closest('button')).toHaveClass('disabled');
        });

    });

    // ── Selection ─────────────────────────────────────────

    describe('Selection', () => {

        test('calls onChange when available time is clicked', () => {
            renderTimePicker();
            fireEvent.click(screen.getByText('17:00'));
            expect(mockOnChange).toHaveBeenCalledWith('17:00');
        });

        test('does not call onChange when disabled time is clicked', () => {
            renderTimePicker();
            fireEvent.click(screen.getByText('20:00'));
            expect(mockOnChange).not.toHaveBeenCalled();
        });

        test('does not call onChange when booked time is clicked', () => {
            renderTimePicker({ bookedTimes: ['17:00'] });
            fireEvent.click(screen.getByText('17:00'));
            expect(mockOnChange).not.toHaveBeenCalled();
        });

        test('applies active class to selected time', () => {
            renderTimePicker({ value: '17:00' });
            expect(screen.getByText('17:00').closest('button')).toHaveClass('active');
        });

        test('does not apply active class to unselected time', () => {
            renderTimePicker({ value: '17:00' });
            expect(screen.getByText('18:00').closest('button')).not.toHaveClass('active');
        });

    });

});