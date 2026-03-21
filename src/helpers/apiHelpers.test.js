import { fetchAPI, submitAPI } from './apiHelpers';

describe('apiHelpers', () => {

    // ── fetchAPI ──────────────────────────────────────────

    describe('fetchAPI', () => {

        test('returns an array', () => {
            const result = fetchAPI(new Date('2025-12-25'));
            expect(Array.isArray(result)).toBe(true);
        });

        test('returns times between 17:00 and 23:30', () => {
            const result = fetchAPI(new Date('2025-12-25'));
            result.forEach(time => {
                const hour = parseInt(time.split(':')[0]);
                expect(hour).toBeGreaterThanOrEqual(17);
                expect(hour).toBeLessThanOrEqual(23);
            });
        });

        test('returns times in HH:00 or HH:30 format', () => {
            const result = fetchAPI(new Date('2025-12-25'));
            result.forEach(time => {
                expect(time).toMatch(/^\d{2}:(00|30)$/);
            });
        });

        test('returns same times for same date', () => {
            const date = new Date('2025-12-25');
            const result1 = fetchAPI(date);
            const result2 = fetchAPI(date);
            expect(result1).toEqual(result2);
        });

        test('returns different times for different dates', () => {
            const result1 = fetchAPI(new Date('2025-12-25'));
            const result2 = fetchAPI(new Date('2025-12-26'));
            expect(result1).not.toEqual(result2);
        });

        test('accepts a Date object', () => {
            expect(() => fetchAPI(new Date())).not.toThrow();
        });

    });

    // ── submitAPI ─────────────────────────────────────────

    describe('submitAPI', () => {

        test('returns true', () => {
            const result = submitAPI({});
            expect(result).toBe(true);
        });

        test('returns true with valid form data', () => {
            const result = submitAPI({
                fullName: 'John Doe',
                email: 'john@example.com',
                phone: '1234567890',
                date: '2025-12-25',
                time: '19:00',
                guests: 4,
                occasion: 'Birthday',
            });
            expect(result).toBe(true);
        });

        test('returns a boolean', () => {
            expect(typeof submitAPI({})).toBe('boolean');
        });

    });

});