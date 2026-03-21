import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CallToAction from './CallToAction';

// ── Mocks ──────────────────────────────────────────────

jest.mock('../assets/images/restauranfood.jpg', () => 'restauranfood.jpg');

// ── Helper ─────────────────────────────────────────────

const renderCallToAction = () => {
    return render(
        <MemoryRouter
            future={{
                v7_startTransition: true,
                v7_relativeSplatPath: true,
            }}
        >
            <CallToAction />
        </MemoryRouter>
    );
};

// ── Tests ──────────────────────────────────────────────

describe('CallToAction', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    // ── Rendering ────────────────────────────────────────

    describe('Rendering', () => {

        test('renders without crashing', () => {
            renderCallToAction();
        });

        test('renders little lemon heading', () => {
            renderCallToAction();
            expect(screen.getByRole('heading', { name: /little lemon/i })).toBeInTheDocument();
        });

        test('renders chicago heading', () => {
            renderCallToAction();
            expect(screen.getByRole('heading', { name: /chicago/i })).toBeInTheDocument();
        });

        test('renders description', () => {
            renderCallToAction();
            expect(screen.getByText(/family owned mediterranean restaurant/i)).toBeInTheDocument();
        });

    });

    // ── Image ─────────────────────────────────────────────

    describe('Image', () => {

        test('renders food image', () => {
            renderCallToAction();
            expect(screen.getByAltText(/delicious food/i)).toBeInTheDocument();
        });

        test('renders food image with correct src', () => {
            renderCallToAction();
            expect(screen.getByAltText(/delicious food/i))
                .toHaveAttribute('src', 'restauranfood.jpg');
        });

    });

    // ── Link ──────────────────────────────────────────────

    describe('Link', () => {

        test('renders reserve a table link', () => {
            renderCallToAction();
            expect(screen.getByRole('link', { name: /reserve a table/i })).toBeInTheDocument();
        });

        test('reserve a table link points to /booking', () => {
            renderCallToAction();
            expect(screen.getByRole('link', { name: /reserve a table/i }))
                .toHaveAttribute('href', '/booking');
        });

        test('reserve a table link has correct class', () => {
            renderCallToAction();
            expect(screen.getByRole('link', { name: /reserve a table/i }))
                .toHaveClass('btn', 'btn-primary');
        });

    });

});