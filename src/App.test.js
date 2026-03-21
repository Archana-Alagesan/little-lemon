import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// ── Mocks ──────────────────────────────────────────────

jest.mock('./components/Header', () => () => <header data-testid="header">Header</header>);
jest.mock('./components/Main', () => () => <main data-testid="main">Main</main>);
jest.mock('./components/Footer', () => () => <footer data-testid="footer">Footer</footer>);

// Mock BrowserRouter to avoid warning
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  BrowserRouter: ({ children }) => children,
}));

// ── Tests ──────────────────────────────────────────────

describe('App', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {

    test('renders without crashing', () => {
      render(<App />);
    });

    test('renders header', () => {
      render(<App />);
      expect(screen.getByTestId('header')).toBeInTheDocument();
    });

    test('renders main', () => {
      render(<App />);
      expect(screen.getByTestId('main')).toBeInTheDocument();
    });

    test('renders footer', () => {
      render(<App />);
      expect(screen.getByTestId('footer')).toBeInTheDocument();
    });

    test('renders components in correct order', () => {
      render(<App />);
      const header = screen.getByTestId('header');
      const main = screen.getByTestId('main');
      const footer = screen.getByTestId('footer');

      expect(header.compareDocumentPosition(main))
        .toBe(Node.DOCUMENT_POSITION_FOLLOWING);
      expect(main.compareDocumentPosition(footer))
        .toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    });

  });

});