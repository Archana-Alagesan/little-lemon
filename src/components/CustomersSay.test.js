import React from 'react';
import { render, screen } from '@testing-library/react';
import CustomersSay from './CustomersSay';

// ── Mocks ──────────────────────────────────────────────

jest.mock('../assets/images/john-doe.png', () => 'john-doe.png');
jest.mock('../assets/images/jane-smith.png', () => 'jane-smith.png');
jest.mock('../assets/images/sam-wilson.png', () => 'sam-wilson.png');
jest.mock('../assets/images/lisa-brown.png', () => 'lisa-brown.png');

// ── Tests ──────────────────────────────────────────────

describe('CustomersSay', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    // ── Rendering ────────────────────────────────────────

    describe('Rendering', () => {

        test('renders without crashing', () => {
            render(<CustomersSay />);
        });

        test('renders testimonials heading', () => {
            render(<CustomersSay />);
            expect(screen.getByText(/testimonials/i)).toBeInTheDocument();
        });

        test('renders 4 testimonials', () => {
            render(<CustomersSay />);
            expect(screen.getAllByText(/rating:/i)).toHaveLength(4);
        });

    });

    // ── Testimonials ──────────────────────────────────────

    describe('Testimonials', () => {

        test('renders john doe testimonial', () => {
            render(<CustomersSay />);
            expect(screen.getByText(/john doe/i)).toBeInTheDocument();
            expect(screen.getByText(/"the food was amazing!"/i)).toBeInTheDocument();
            expect(screen.getByAltText(/john doe/i)).toBeInTheDocument();
        });

        test('renders jane smith testimonial', () => {
            render(<CustomersSay />);
            expect(screen.getByText(/jane smith/i)).toBeInTheDocument();
            expect(screen.getByText(/"i loved the atmosphere."/i)).toBeInTheDocument();
            expect(screen.getByAltText(/jane smith/i)).toBeInTheDocument();
        });

        test('renders sam wilson testimonial', () => {
            render(<CustomersSay />);
            expect(screen.getByText(/sam wilson/i)).toBeInTheDocument();
            expect(screen.getByText(/"best dining experience/i)).toBeInTheDocument();
            expect(screen.getByAltText(/sam wilson/i)).toBeInTheDocument();
        });

        test('renders lisa brown testimonial', () => {
            render(<CustomersSay />);
            expect(screen.getByText(/lisa brown/i)).toBeInTheDocument();
            expect(screen.getByText(/"a culinary delight!"/i)).toBeInTheDocument();
            expect(screen.getByAltText(/lisa brown/i)).toBeInTheDocument();
        });

    });

    // ── Ratings ───────────────────────────────────────────

    describe('Ratings', () => {

        test('renders rating for john doe and lisa brown', () => {
            render(<CustomersSay />);
            expect(screen.getAllByText(/rating: 5 \/ 5/i)).toHaveLength(2);
        });

        test('renders rating for jane smith and sam wilson', () => {
            render(<CustomersSay />);
            expect(screen.getAllByText(/rating: 4 \/ 5/i)).toHaveLength(2);
        });

    });

    // ── Author Images ─────────────────────────────────────

    describe('Author Images', () => {

        test('renders all author images', () => {
            render(<CustomersSay />);
            expect(screen.getAllByRole('img')).toHaveLength(4);
        });

        test('renders john doe image with correct src', () => {
            render(<CustomersSay />);
            expect(screen.getByAltText(/john doe/i))
                .toHaveAttribute('src', 'john-doe.png');
        });

        test('renders jane smith image with correct src', () => {
            render(<CustomersSay />);
            expect(screen.getByAltText(/jane smith/i))
                .toHaveAttribute('src', 'jane-smith.png');
        });

    });

});