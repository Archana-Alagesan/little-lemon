import React from 'react';
import { render, screen } from '@testing-library/react';
import Specials from './Specials';

// ── Mocks ──────────────────────────────────────────────

jest.mock('../assets/images/greek_salad.jpg', () => 'greek_salad.jpg');
jest.mock('../assets/images/bruschetta.svg', () => 'bruschetta.svg');
jest.mock('../assets/images/lemon_dessert.jpg', () => 'lemon_dessert.jpg');

// ── Tests ──────────────────────────────────────────────

describe('Specials', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    // ── Rendering ────────────────────────────────────────

    describe('Rendering', () => {

        test('renders without crashing', () => {
            render(<Specials />);
        });

        test('renders heading', () => {
            render(<Specials />);
            expect(screen.getByText(/this week's specials/i)).toBeInTheDocument();
        });

        test('renders online menu button', () => {
            render(<Specials />);
            expect(screen.getByRole('button', { name: /online menu/i })).toBeInTheDocument();
        });

    });

    // ── Specials Cards ────────────────────────────────────

    describe('Specials Cards', () => {

        test('renders 3 specials cards', () => {
            render(<Specials />);
            expect(screen.getAllByRole('img')).toHaveLength(3);
        });

        test('renders greek salad card', () => {
            render(<Specials />);
            expect(screen.getByRole('heading', { name: /greek salad/i })).toBeInTheDocument();
            expect(screen.getByText(/\$12.99/i)).toBeInTheDocument();
            expect(screen.getByAltText(/greek salad/i)).toBeInTheDocument();
        });

        test('renders bruschetta card', () => {
            render(<Specials />);
            expect(screen.getByRole('heading', { name: /bruschetta/i })).toBeInTheDocument();
            expect(screen.getByText(/\$8.99/i)).toBeInTheDocument();
            expect(screen.getByAltText(/bruschetta/i)).toBeInTheDocument();
        });

        test('renders lemon dessert card', () => {
            render(<Specials />);
            expect(screen.getByRole('heading', { name: /lemon dessert/i })).toBeInTheDocument();
            expect(screen.getByText(/\$6.99/i)).toBeInTheDocument();
            expect(screen.getByAltText(/lemon dessert/i)).toBeInTheDocument();
        });
    });

    // ── Descriptions ─────────────────────────────────────

    describe('Descriptions', () => {

        test('renders greek salad description', () => {
            render(<Specials />);
            expect(screen.getByText(/crispy lettuce/i)).toBeInTheDocument();
        });

        test('renders bruschetta description', () => {
            render(<Specials />);
            expect(screen.getByText(/grilled bread/i)).toBeInTheDocument();
        });

        test('renders lemon dessert description', () => {
            render(<Specials />);
            expect(screen.getByText(/grandma's recipe/i)).toBeInTheDocument();
        });

    });

    // ── Order Delivery ────────────────────────────────────

    describe('Order Delivery', () => {

        test('renders order a delivery text for each card', () => {
            render(<Specials />);
            expect(screen.getAllByText(/order a delivery/i)).toHaveLength(3);
        });

    });

});