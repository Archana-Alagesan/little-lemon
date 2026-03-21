import React from 'react';
import { render, screen } from '@testing-library/react';
import Chicago from './Chicago';

// ── Mocks ──────────────────────────────────────────────

jest.mock('../assets/images/Mario and Adrian A.jpg', () => 'Mario and Adrian A.jpg');
jest.mock('../assets/images/Mario and Adrian B.jpg', () => 'Mario and Adrian B.jpg');

// ── Tests ──────────────────────────────────────────────

describe('Chicago', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    // ── Rendering ────────────────────────────────────────

    describe('Rendering', () => {

        test('renders without crashing', () => {
            render(<Chicago />);
        });

        test('renders little lemon heading', () => {
            render(<Chicago />);
            expect(screen.getByRole('heading', { name: /little lemon/i })).toBeInTheDocument();
        });

        test('renders chicago heading', () => {
            render(<Chicago />);
            expect(screen.getByRole('heading', { name: /chicago/i })).toBeInTheDocument();
        });

        test('renders description text', () => {
            render(<Chicago />);
            expect(screen.getByText(/mario and adrian/i)).toBeInTheDocument();
        });

        test('renders mediterranean text', () => {
            render(<Chicago />);
            expect(screen.getByText(/mediterranean/i)).toBeInTheDocument();
        });

    });

    // ── Images ────────────────────────────────────────────

    describe('Images', () => {

        test('renders 2 owner photos', () => {
            render(<Chicago />);
            expect(screen.getAllByAltText(/mario and adrian/i)).toHaveLength(2);
        });

        test('renders photo a with correct src', () => {
            const { container } = render(<Chicago />);
            expect(container.querySelector('.owner-photo-a'))
                .toHaveAttribute('src', 'Mario and Adrian A.jpg');
        });

        test('renders photo b with correct src', () => {
            const { container } = render(<Chicago />);
            expect(container.querySelector('.owner-photo-b'))
                .toHaveAttribute('src', 'Mario and Adrian B.jpg');
        });

    });

});