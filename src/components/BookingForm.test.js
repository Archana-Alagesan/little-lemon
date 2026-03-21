import { render, screen } from "@testing-library/react";
import BookingForm from './BookingForm';

test('Renders the BookingForm heading', () => {
    render(<BookingForm />);
    const element = screen.getByText("Choose date");
    expect(element).toBeInTheDocument();
})