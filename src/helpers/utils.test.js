import { getTimesForDate } from './utils';
import { OPENING_HOURS } from './constants';

describe('getTimesForDate', () => {

    // ── Edge Cases ────────────────────────────────────────

    describe('Edge Cases', () => {

        test('returns empty array when date is null', () => {
            expect(getTimesForDate(null)).toEqual([]);
        });

        test('returns empty array when date is undefined', () => {
            expect(getTimesForDate(undefined)).toEqual([]);
        });

    });

    // ── Weekday ───────────────────────────────────────────

    describe('Weekday (Mon - Fri)', () => {

        test('returns times within weekday opening hours', () => {
            const monday = new Date('2025-12-29');  // Monday
            const result = getTimesForDate(monday);
            result.forEach(time => {
                const hour = parseInt(time.split(':')[0]);
                expect(hour).toBeGreaterThanOrEqual(12);
                expect(hour).toBeLessThanOrEqual(21);
            });
        });

        test('does not return times before opening on weekday', () => {
            const monday = new Date('2025-12-29');
            const result = getTimesForDate(monday);
            result.forEach(time => {
                const hour = parseInt(time.split(':')[0]);
                expect(hour).toBeGreaterThanOrEqual(12);
            });
        });

        test('last slot is 1 hour before closing on weekday', () => {
            const monday = new Date('2025-12-29');
            const result = getTimesForDate(monday);
            const lastTime = result[result.length - 1];
            const closeHour = parseInt(OPENING_HOURS[1].close.split(':')[0]);
            expect(parseInt(lastTime.split(':')[0])).toBe(closeHour - 1);
        });

    });

    // ── Saturday ──────────────────────────────────────────

    describe('Saturday', () => {

        test('returns times within saturday opening hours', () => {
            const saturday = new Date('2025-12-27');  // Saturday
            const result = getTimesForDate(saturday);
            result.forEach(time => {
                const hour = parseInt(time.split(':')[0]);
                expect(hour).toBeGreaterThanOrEqual(11);
                expect(hour).toBeLessThanOrEqual(22);
            });
        });

        test('first slot is 11:00 on saturday', () => {
            const saturday = new Date('2025-12-27');
            const result = getTimesForDate(saturday);
            expect(result[0]).toBe('11:00');
        });

        test('last slot is 1 hour before closing on saturday', () => {
            const saturday = new Date('2025-12-27');
            const result = getTimesForDate(saturday);
            const lastTime = result[result.length - 1];
            const closeHour = parseInt(OPENING_HOURS[6].close.split(':')[0]);
            expect(parseInt(lastTime.split(':')[0])).toBe(closeHour - 1);
        });

    });

    // ── Sunday ────────────────────────────────────────────

    describe('Sunday', () => {

        test('returns times within sunday opening hours', () => {
            const sunday = new Date('2025-12-28');  // Sunday
            const result = getTimesForDate(sunday);
            result.forEach(time => {
                const hour = parseInt(time.split(':')[0]);
                expect(hour).toBeGreaterThanOrEqual(11);
                expect(hour).toBeLessThanOrEqual(21);
            });
        });

        test('first slot is 11:00 on sunday', () => {
            const sunday = new Date('2025-12-28');
            const result = getTimesForDate(sunday);
            expect(result[0]).toBe('11:00');
        });

    });

    // ── Today ─────────────────────────────────────────────

    describe('Today', () => {

        test('does not return past times for today', () => {
            const today = new Date();
            const currentHour = today.getHours();
            const result = getTimesForDate(today);
            result.forEach(time => {
                const hour = parseInt(time.split(':')[0]);
                expect(hour).toBeGreaterThan(currentHour);
            });
        });

        test('returns future times for today', () => {
            const today = new Date();
            const result = getTimesForDate(today);
            result.forEach(time => {
                const hour = parseInt(time.split(':')[0]);
                expect(hour).toBeGreaterThan(today.getHours());
            });
        });

    });

    // ── Future Date ───────────────────────────────────────

    describe('Future Date', () => {

        test('returns all times within opening hours for future date', () => {
            const future = new Date('2030-06-17');  // Monday
            const result = getTimesForDate(future);
            expect(result.length).toBeGreaterThan(0);
        });

        test('does not filter past times for future date', () => {
            const future = new Date('2030-06-17');
            const result = getTimesForDate(future);
            const openHour = parseInt(OPENING_HOURS[1].open.split(':')[0]);
            expect(parseInt(result[0].split(':')[0])).toBe(openHour);
        });

    });

});