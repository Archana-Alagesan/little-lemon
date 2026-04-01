import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';

// ── Mocks ──────────────────────────────────────────────

jest.mock('../assets/images/logo.svg', () => 'logo.svg');
jest.mock('./Nav', () => () => null);

// ── Helper ─────────────────────────────────────────────

const renderHeader = () => {
    return render(
        <MemoryRouter
            future={{
                v7_startTransition: true,
                v7_relativeSplatPath: true,
            }}
        >
            <Header />
        </MemoryRouter>
    );
};

// ── Tests ──────────────────────────────────────────────

describe('Header', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    // ── Rendering ────────────────────────────────────────

    describe('Rendering', () => {

        test('renders without crashing', () => {
            renderHeader();
        });

        test('renders header element', () => {
            renderHeader();
            expect(screen.getByRole('banner')).toBeInTheDocument();
        });

        test('renders logo', () => {
            renderHeader();
            expect(screen.getByAltText(/little lemon logo/i)).toBeInTheDocument();
        });

        test('renders hamburger button', () => {
            renderHeader();
            expect(screen.getByRole('button', { name: /toggle menu/i })).toBeInTheDocument();
        });

        test('does not render overlay on initial render', () => {
            const { container } = renderHeader();
            expect(container.querySelector('.menu-overlay')).not.toBeInTheDocument();
        });

    });

    // ── Hamburger ─────────────────────────────────────────

    describe('Hamburger Menu', () => {

        test('opens overlay when hamburger is clicked', () => {
            const { container } = renderHeader();
            fireEvent.click(screen.getByRole('button', { name: /toggle menu/i }));
            expect(container.querySelector('.menu-overlay')).toBeInTheDocument();
        });

        test('closes overlay when close button is clicked', () => {
            const { container } = renderHeader();

            // Open menu
            fireEvent.click(screen.getByRole('button', { name: /toggle menu/i }));
            expect(container.querySelector('.menu-overlay')).toBeInTheDocument();

            // Close menu
            fireEvent.click(screen.getByRole('button', { name: /✕/i }));
            expect(container.querySelector('.menu-overlay')).not.toBeInTheDocument();
        });

        test('closes overlay when overlay is clicked', () => {
            const { container } = renderHeader();

            // Open menu
            fireEvent.click(screen.getByRole('button', { name: /toggle menu/i }));
            expect(container.querySelector('.menu-overlay')).toBeInTheDocument();

            // Click overlay
            fireEvent.click(container.querySelector('.menu-overlay'));
            expect(container.querySelector('.menu-overlay')).not.toBeInTheDocument();
        });

        test('toggles menu on repeated hamburger clicks', () => {
            const { container } = renderHeader();
            const hamburger = screen.getByRole('button', { name: /toggle menu/i });

            fireEvent.click(hamburger);
            expect(container.querySelector('.menu-overlay')).toBeInTheDocument();

            fireEvent.click(hamburger);
            expect(container.querySelector('.menu-overlay')).not.toBeInTheDocument();
        });

    });

    // ── Logo ──────────────────────────────────────────────

    describe('Logo', () => {

        test('renders logo with correct alt text', () => {
            renderHeader();
            expect(screen.getByAltText(/little lemon logo/i)).toBeInTheDocument();
        });

        test('renders logo with correct src', () => {
            renderHeader();
            expect(screen.getByAltText(/little lemon logo/i)).toHaveAttribute('src', 'logo.svg');
        });

    });

});