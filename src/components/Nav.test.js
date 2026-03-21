import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Nav from './Nav';

// ── Helper ─────────────────────────────────────────────

const renderNav = (props = {}) => {
    return render(
        <MemoryRouter
            future={{
                v7_startTransition: true,
                v7_relativeSplatPath: true,
            }}
        >
            <Nav
                className=""
                ariaLabel="main navigation"
                {...props}
            />
        </MemoryRouter>
    );
};

// ── Tests ──────────────────────────────────────────────

describe('Nav', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    // ── Rendering ────────────────────────────────────────

    describe('Rendering', () => {

        test('renders without crashing', () => {
            renderNav();
        });

        test('renders nav element', () => {
            renderNav();
            expect(screen.getByRole('navigation')).toBeInTheDocument();
        });

        test('renders all nav links', () => {
            renderNav();
            expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
            expect(screen.getByRole('link', { name: /menu/i })).toBeInTheDocument();
            expect(screen.getByRole('link', { name: /reservations/i })).toBeInTheDocument();
            expect(screen.getByRole('link', { name: /order online/i })).toBeInTheDocument();
            expect(screen.getByRole('link', { name: /login/i })).toBeInTheDocument();
        });

    });

    // ── Links ─────────────────────────────────────────────

    describe('Links', () => {

        test('home link points to /', () => {
            renderNav();
            expect(screen.getByRole('link', { name: /home/i })).toHaveAttribute('href', '/');
        });

        test('reservations link points to /booking', () => {
            renderNav();
            expect(screen.getByRole('link', { name: /reservations/i })).toHaveAttribute('href', '/booking');
        });

        test('menu link points to #menu', () => {
            renderNav();
            expect(screen.getByRole('link', { name: /menu/i })).toHaveAttribute('href', '#menu');
        });

        test('order online link points to #order-online', () => {
            renderNav();
            expect(screen.getByRole('link', { name: /order online/i })).toHaveAttribute('href', '#order-online');
        });

        test('login link points to #login', () => {
            renderNav();
            expect(screen.getByRole('link', { name: /login/i })).toHaveAttribute('href', '#login');
        });

    });

    // ── ClassName ─────────────────────────────────────────

    describe('ClassName', () => {

        test('applies nav class', () => {
            const { container } = renderNav();
            expect(container.querySelector('.nav')).toBeInTheDocument();
        });

        test('applies custom className', () => {
            const { container } = renderNav({ className: 'custom-nav' });
            expect(container.querySelector('.custom-nav')).toBeInTheDocument();
        });

        test('applies nav--hide-mobile when hideOnMobile is true', () => {
            const { container } = renderNav({ hideOnMobile: true });
            expect(container.querySelector('.nav--hide-mobile')).toBeInTheDocument();
        });

        test('does not apply nav--hide-mobile when hideOnMobile is false', () => {
            const { container } = renderNav({ hideOnMobile: false });
            expect(container.querySelector('.nav--hide-mobile')).not.toBeInTheDocument();
        });

    });

    // ── Aria Label ────────────────────────────────────────

    describe('Aria Label', () => {

        test('applies aria-label', () => {
            renderNav({ ariaLabel: 'main navigation' });
            expect(screen.getByRole('navigation', { name: /main navigation/i })).toBeInTheDocument();
        });

    });

});