import { render, screen } from "@testing-library/react";
import Main from './Main';

test('Renders the HomePage component', () => {
    render(<Main />);
    const headingElement = screen.getByText("Home");
    expect(headingElement).toBeInTheDocument();
})
