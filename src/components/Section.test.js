import React from 'react';
import { render, screen } from '@testing-library/react';
import Section from './Section';

// ── Tests ──────────────────────────────────────────────

describe('Section', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    // ── Rendering ────────────────────────────────────────

    describe('Rendering', () => {

        test('renders without crashing', () => {
            render(<Section className="test" />);
        });

        test('renders children', () => {
            render(
                <Section className="test">
                    <p>Test content</p>
                </Section>
            );
            expect(screen.getByText(/test content/i)).toBeInTheDocument();
        });

        test('renders section element', () => {
            const { container } = render(<Section className="test" />);
            expect(container.querySelector('section')).toBeInTheDocument();
        });

        test('renders section-content div', () => {
            const { container } = render(<Section className="test" />);
            expect(container.querySelector('.section-content')).toBeInTheDocument();
        });

    });

    // ──ClassName ─────────────────────────────────────────

    describe('ClassName', () => {

        test('applies section class', () => {
            const { container } = render(<Section className="test" />);
            expect(container.querySelector('.section')).toBeInTheDocument();
        });

        test('applies custom className', () => {
            const { container } = render(<Section className="my-section" />);
            expect(container.querySelector('.my-section')).toBeInTheDocument();
        });

        test('applies both section and custom className', () => {
            const { container } = render(<Section className="my-section" />);
            expect(container.querySelector('.section.my-section')).toBeInTheDocument();
        });

    });

});