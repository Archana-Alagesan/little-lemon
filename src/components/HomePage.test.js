import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from './HomePage';

// ── Mocks ──────────────────────────────────────────────
jest.mock('./CallToAction', () => () => require('react').createElement('div', { 'data-testid': 'call-to-action' }));
jest.mock('./Specials', () => () => require('react').createElement('div', { 'data-testid': 'specials' }));
jest.mock('./CustomersSay', () => () => require('react').createElement('div', { 'data-testid': 'customers-say' }));
jest.mock('./Chicago', () => () => require('react').createElement('div', { 'data-testid': 'chicago' }));

// ── Tests ──────────────────────────────────────────────

describe('HomePage', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    // ── Rendering ────────────────────────────────────────

    describe('Rendering', () => {

        test('renders without crashing', () => {
            render(<HomePage />);
        });

        test('renders home-page container', () => {
            const { container } = render(<HomePage />);
            expect(container.querySelector('.home-page')).toBeInTheDocument();
        });

        test('renders CallToAction', () => {
            render(<HomePage />);
            expect(screen.getByTestId('call-to-action')).toBeInTheDocument();
        });

        test('renders Specials', () => {
            render(<HomePage />);
            expect(screen.getByTestId('specials')).toBeInTheDocument();
        });

        test('renders CustomersSay', () => {
            render(<HomePage />);
            expect(screen.getByTestId('customers-say')).toBeInTheDocument();
        });

        test('renders Chicago', () => {
            render(<HomePage />);
            expect(screen.getByTestId('chicago')).toBeInTheDocument();
        });

    });

});