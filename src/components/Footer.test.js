import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Footer from './Footer';

// ── Mocks ──────────────────────────────────────────────

jest.mock('../assets/images/footer_logo.png', () => 'footer_logo.png');
jest.mock('./Nav', () => () => null);

// ── Helper ─────────────────────────────────────────────

const renderFooter = () => {
    return render(
        <MemoryRouter
            future={{
                v7_startTransition: true,
                v7_relativeSplatPath: true,
            }}
        >
            <Footer />
        </MemoryRouter>
    );
};

// ── Tests ──────────────────────────────────────────────

describe('Footer', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    // ── Rendering ────────────────────────────────────────

    describe('Rendering', () => {

        test('renders without crashing', () => {
            renderFooter();
        });

        test('renders footer element', () => {
            renderFooter();
            expect(screen.getByRole('contentinfo')).toBeInTheDocument();
        });

        test('renders logo', () => {
            renderFooter();
            expect(screen.getByAltText(/little lemon logo/i)).toBeInTheDocument();
        });

        test('renders logo with correct src', () => {
            renderFooter();
            expect(screen.getByAltText(/little lemon logo/i))
                .toHaveAttribute('src', 'footer_logo.png');
        });

    });

    // ── Quick Links ───────────────────────────────────────

    describe('Quick Links', () => {

        test('renders quick links heading', () => {
            renderFooter();
            expect(screen.getByText(/quick links/i)).toBeInTheDocument();
        });

    });

    // ── Contact ───────────────────────────────────────────

    describe('Contact', () => {

        test('renders contact us heading', () => {
            renderFooter();
            expect(screen.getByRole('heading', { name: /contact us/i })).toBeInTheDocument();
        });

        test('renders phone number', () => {
            renderFooter();
            expect(screen.getByRole('link', { name: /\+1 \(234\) 567-890/i })).toBeInTheDocument();
        });

        test('renders phone link with correct href', () => {
            renderFooter();
            expect(screen.getByRole('link', { name: /\+1 \(234\) 567-890/i }))
                .toHaveAttribute('href', 'tel:+1234567890');
        });

        test('renders email', () => {
            renderFooter();
            expect(screen.getByRole('link', { name: /info@littlelemon.com/i })).toBeInTheDocument();
        });

        test('renders email link with correct href', () => {
            renderFooter();
            expect(screen.getByRole('link', { name: /info@littlelemon.com/i }))
                .toHaveAttribute('href', 'mailto:info@littlelemon.com');
        });

        test('renders address', () => {
            renderFooter();
            expect(screen.getByText(/123 lemon st/i)).toBeInTheDocument();
        });

    });

    // ── Social ────────────────────────────────────────────

    describe('Social', () => {

        test('renders follow us heading', () => {
            renderFooter();
            expect(screen.getByText(/follow us/i)).toBeInTheDocument();
        });

        test('renders facebook link', () => {
            const { container } = renderFooter();
            const link = container.querySelector('a[href="https://facebook.com"]');
            expect(link).toBeInTheDocument();
            expect(link).toHaveAttribute('href', 'https://facebook.com');
        });

        test('renders instagram link', () => {
            const { container } = renderFooter();
            const link = container.querySelector('a[href="https://instagram.com"]');
            expect(link).toBeInTheDocument();
            expect(link).toHaveAttribute('href', 'https://instagram.com');
        });

        test('renders x twitter link', () => {
            const { container } = renderFooter();
            const link = container.querySelector('a[href="https://x.com"]');
            expect(link).toBeInTheDocument();
            expect(link).toHaveAttribute('href', 'https://x.com');
        });

        test('renders social links with target blank', () => {
            const { container } = renderFooter();
            const socialLinks = container.querySelectorAll('.social a');
            socialLinks.forEach(link => {
                expect(link).toHaveAttribute('target', '_blank');
            });
        });

    });

    // ── Footer Bottom ─────────────────────────────────────

    describe('Footer Bottom', () => {

        test('renders copyright text', () => {
            renderFooter();
            expect(screen.getByText(/2026 little lemon/i)).toBeInTheDocument();
        });

        test('renders all rights reserved', () => {
            renderFooter();
            expect(screen.getByText(/all rights reserved/i)).toBeInTheDocument();
        });

    });

});