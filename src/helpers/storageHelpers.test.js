import {
    saveBookedTime,
    getBookedTimes,
    getBookedTimesForDate,
    isTimeBooked,
} from './storageHelpers';

describe('storageHelpers', () => {

    beforeEach(() => {
        localStorage.clear();
    });

    // ── getBookedTimes ────────────────────────────────────

    describe('getBookedTimes', () => {

        test('returns empty object when localStorage is empty', () => {
            expect(getBookedTimes()).toEqual({});
        });

        test('returns all booked times', () => {
            saveBookedTime('2025-12-25', '19:00');
            saveBookedTime('2025-12-26', '20:00');
            const booked = getBookedTimes();
            expect(booked['2025-12-25']).toContain('19:00');
            expect(booked['2025-12-26']).toContain('20:00');
        });

        test('parses stored JSON correctly', () => {
            localStorage.setItem('bookedTimes', JSON.stringify({ '2025-12-25': ['19:00'] }));
            expect(getBookedTimes()).toEqual({ '2025-12-25': ['19:00'] });
        });

    });

    // ── saveBookedTime ────────────────────────────────────

    describe('saveBookedTime', () => {

        test('saves a booked time for a date', () => {
            saveBookedTime('2025-12-25', '19:00');
            expect(getBookedTimesForDate('2025-12-25')).toContain('19:00');
        });

        test('saves multiple times for same date', () => {
            saveBookedTime('2025-12-25', '19:00');
            saveBookedTime('2025-12-25', '20:00');
            const booked = getBookedTimesForDate('2025-12-25');
            expect(booked).toContain('19:00');
            expect(booked).toContain('20:00');
        });

        test('does not duplicate same time for same date', () => {
            saveBookedTime('2025-12-25', '19:00');
            saveBookedTime('2025-12-25', '19:00');
            const booked = getBookedTimesForDate('2025-12-25');
            expect(booked.filter(t => t === '19:00')).toHaveLength(1);
        });

        test('saves times for different dates independently', () => {
            saveBookedTime('2025-12-25', '19:00');
            saveBookedTime('2025-12-26', '20:00');
            expect(getBookedTimesForDate('2025-12-25')).toContain('19:00');
            expect(getBookedTimesForDate('2025-12-26')).toContain('20:00');
            expect(getBookedTimesForDate('2025-12-25')).not.toContain('20:00');
        });

        test('persists to localStorage', () => {
            saveBookedTime('2025-12-25', '19:00');
            const stored = JSON.parse(localStorage.getItem('bookedTimes'));
            expect(stored['2025-12-25']).toContain('19:00');
        });

    });

    // ── getBookedTimesForDate ─────────────────────────────

    describe('getBookedTimesForDate', () => {

        test('returns empty array when no times booked for date', () => {
            expect(getBookedTimesForDate('2025-12-25')).toEqual([]);
        });

        test('returns booked times for specific date', () => {
            saveBookedTime('2025-12-25', '19:00');
            expect(getBookedTimesForDate('2025-12-25')).toEqual(['19:00']);
        });

        test('returns empty array for date with no bookings', () => {
            saveBookedTime('2025-12-25', '19:00');
            expect(getBookedTimesForDate('2025-12-26')).toEqual([]);
        });

        test('returns all times for a date', () => {
            saveBookedTime('2025-12-25', '19:00');
            saveBookedTime('2025-12-25', '20:00');
            expect(getBookedTimesForDate('2025-12-25')).toEqual(['19:00', '20:00']);
        });

    });

    // ── isTimeBooked ──────────────────────────────────────

    describe('isTimeBooked', () => {

        test('returns false when nothing is booked', () => {
            expect(isTimeBooked('2025-12-25', '19:00')).toBe(false);
        });

        test('returns true when time is booked for date', () => {
            saveBookedTime('2025-12-25', '19:00');
            expect(isTimeBooked('2025-12-25', '19:00')).toBe(true);
        });

        test('returns false when time is not booked for date', () => {
            saveBookedTime('2025-12-25', '19:00');
            expect(isTimeBooked('2025-12-25', '20:00')).toBe(false);
        });

        test('returns false for different date same time', () => {
            saveBookedTime('2025-12-25', '19:00');
            expect(isTimeBooked('2025-12-26', '19:00')).toBe(false);
        });

    });

});