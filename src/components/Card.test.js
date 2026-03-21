import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from './Card';

// ── Tests ──────────────────────────────────────────────

describe('Card', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    // ── Rendering ────────────────────────────────────────

    describe('Rendering', () => {

        test('renders without crashing', () => {
            render(<Card className="test" />);
        });

        test('renders children', () => {
            render(
                <Card className="test">
                    <p>Test content</p>
                </Card>
            );
            expect(screen.getByText(/test content/i)).toBeInTheDocument();
        });

        test('renders card div', () => {
            const { container } = render(<Card className="test" />);
            expect(container.querySelector('.card')).toBeInTheDocument();
        });

    });

    // ── ClassName ─────────────────────────────────────────

    describe('ClassName', () => {

        test('applies card class', () => {
            const { container } = render(<Card className="test" />);
            expect(container.querySelector('.card')).toBeInTheDocument();
        });

        test('applies custom className', () => {
            const { container } = render(<Card className="my-card" />);
            expect(container.querySelector('.my-card')).toBeInTheDocument();
        });

        test('applies both card and custom className', () => {
            const { container } = render(<Card className="my-card" />);
            expect(container.querySelector('.card.my-card')).toBeInTheDocument();
        });

    });

});