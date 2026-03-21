// src/components/BookingForm.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import BookingForm from './BookingForm';
import { act } from '@testing-library/react';

// ── Mocks ──────────────────────────────────────────────

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

// Mock API helpers
jest.mock('../helpers/apiHelpers', () => ({
  submitAPI: jest.fn().mockReturnValue(true)
}));

// Mock storage helpers
jest.mock('../helpers/storageHelpers', () => ({
  saveBookedTime: jest.fn(),
  getBookedTimesForDate: jest.fn().mockReturnValue([])
}));

// ── Test Setup ─────────────────────────────────────────

const mockDispatch = jest.fn();
const mockAvailableTimes = ['17:00', '18:00', '19:00', '20:00'];

const renderBookingForm = () => {
  return render(
    <MemoryRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <BookingForm
        availableTimes={mockAvailableTimes}
        dispatch={mockDispatch}
      />
    </MemoryRouter>
  )
}

// ── Tests ──────────────────────────────────────────────

describe('BookingForm', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ── Rendering ────────────────────────────────────────

  describe('Rendering', () => {

    test('renders booking form', () => {
      renderBookingForm();
      expect(screen.getByText(/make your reservation/i)).toBeInTheDocument();
    });

    test('renders all form fields', () => {
      renderBookingForm();
      expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/choose date/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/number of guests/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/occasion/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/special requests/i)).toBeInTheDocument();
    });

    test('submit button is disabled on initial render', () => {
      renderBookingForm();
      expect(screen.getByRole('button', { name: /make your reservation/i }))
        .toBeDisabled();
    });

  });

  // ── Validation ───────────────────────────────────────

  describe('Validation', () => {

    test('shows error when full name is empty', async () => {
      renderBookingForm();
      const nameInput = screen.getByLabelText(/full name/i);
      fireEvent.blur(nameInput);
      await waitFor(() => {
        expect(screen.getByText(/name is required/i)).toBeInTheDocument();
      });
    });

    test('shows error for invalid email', async () => {
      renderBookingForm();
      const emailInput = screen.getByLabelText(/email/i);
      await userEvent.type(emailInput, 'invalidemail');
      fireEvent.blur(emailInput);
      await waitFor(() => {
        expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
      });
    });

    test('shows error for invalid phone', async () => {
      renderBookingForm();
      const phoneInput = screen.getByLabelText(/phone/i);
      await userEvent.type(phoneInput, '123');
      fireEvent.blur(phoneInput);
      await waitFor(() => {
        expect(screen.getByText(/phone must be/i)).toBeInTheDocument();
      });
    });

    test('shows error when time is not selected', async () => {
      renderBookingForm();
      await userEvent.type(screen.getByLabelText(/full name/i), 'John Doe');
      await userEvent.type(screen.getByLabelText(/email/i), 'john@example.com');
      await userEvent.type(screen.getByLabelText(/phone/i), '1234567890');
      await userEvent.selectOptions(screen.getByLabelText(/occasion/i), 'Birthday');
      fireEvent.change(screen.getByLabelText(/choose date/i), {
        target: { value: new Date().toISOString().split('T')[0] }
      });
      fireEvent.submit(screen.getByRole('form', { name: /booking form/i }));
      await waitFor(() => {
        expect(screen.getByText(/please select a time/i)).toBeInTheDocument();
      });
    });

  })

  // ── Interaction ──────────────────────────────────────

  describe('Interaction', () => {

    test('updates full name field on input', async () => {
      renderBookingForm();
      const nameInput = screen.getByLabelText(/full name/i);
      await userEvent.type(nameInput, 'John Doe');
      expect(nameInput).toHaveValue('John Doe');
    });

    test('updates email field on input', async () => {
      renderBookingForm();
      const emailInput = screen.getByLabelText(/email/i);
      await userEvent.type(emailInput, 'john@example.com');
      expect(emailInput).toHaveValue('john@example.com');
    });

    test('updates guests field on input', async () => {
      renderBookingForm();
      const guestsInput = screen.getByLabelText(/number of guests/i);
      await userEvent.clear(guestsInput);
      await userEvent.type(guestsInput, '4');
      expect(guestsInput).toHaveValue(4);
    });

    test('dispatches action when date changes', async () => {
      renderBookingForm();
      const dateInput = screen.getByLabelText(/choose date/i);
      await act(async () => {
        fireEvent.change(dateInput, { target: { value: '2025-12-25' } });
      });
      expect(mockDispatch).toHaveBeenCalledWith({
        date: new Date('2025-12-25')
      });
    });

    test('updates occasion on select', async () => {
      renderBookingForm();
      const occasionSelect = screen.getByLabelText(/occasion/i);
      await userEvent.selectOptions(occasionSelect, 'Birthday');
      expect(occasionSelect).toHaveValue('Birthday');
    });

  });

  // ── Submission ───────────────────────────────────────

  describe('Submission', () => {

    test('submits form with valid data and navigates', async () => {
      const { submitAPI } = require('../helpers/apiHelpers');
      renderBookingForm();

      const today = new Date();
      const nextDay = new Date(today);
      nextDay.setDate(today.getDate() + 1);

      // Fill all fields
      await userEvent.type(screen.getByLabelText(/full name/i), 'John Doe');
      await userEvent.type(screen.getByLabelText(/email/i), 'john@example.com');
      await userEvent.type(screen.getByLabelText(/phone/i), '1234567890');
      fireEvent.change(screen.getByLabelText(/choose date/i), {
        target: { value: nextDay.toISOString().split('T')[0] }
      });

      // Select a time pill
      await waitFor(() => {
        expect(screen.getByText('17:00')).toBeInTheDocument();
      });
      fireEvent.click(screen.getByText('17:00'));
      await userEvent.selectOptions(screen.getByLabelText(/occasion/i), 'Birthday');

      // Check button is enabled before submitting
      await waitFor(() => {
        expect(screen.getByRole('button', { name: /make your reservation/i }))
          .not.toBeDisabled();
      });

      // Submit form
      fireEvent.submit(screen.getByRole('form', { name: /booking form/i }));

      await waitFor(() => {
        expect(submitAPI).toHaveBeenCalled();
        expect(mockNavigate).toHaveBeenCalledWith(
          '/booking-confirmation',
          expect.objectContaining({ state: expect.any(Object) })
        );
      });
    });

    test('does not navigate when submitAPI returns false', async () => {
      const apiHelpers = require('../helpers/apiHelpers');
      apiHelpers.submitAPI.mockReturnValueOnce(false);  // ← force false

      renderBookingForm();

      // Fill all required fields
      await userEvent.type(screen.getByLabelText(/full name/i), 'John Doe');
      await userEvent.type(screen.getByLabelText(/email/i), 'john@example.com');
      await userEvent.type(screen.getByLabelText(/phone/i), '1234567890');

      fireEvent.change(screen.getByLabelText(/choose date/i), {
        target: { value: '2025-12-25' }
      });

      await waitFor(() => {
        expect(screen.getByText('17:00')).toBeInTheDocument();
      });

      fireEvent.click(screen.getByText('17:00'));

      await waitFor(() => {
        expect(
          screen.getByDisplayValue(/make your reservation/i)
        ).not.toBeDisabled();
      });

      fireEvent.submit(screen.getByRole('form', { name: /booking form/i }));

      await waitFor(() => {
        expect(mockNavigate).not.toHaveBeenCalled();
      });
    });
  });

});