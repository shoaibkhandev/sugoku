import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders soguku game title', () => {
  render(<App />);
  const linkElement = screen.getByText(/suGOku/i);
  expect(linkElement).toBeInTheDocument();
});

test('Clicking on solve button should solve the puzzle', () => {
  render(<App />);
  const button = screen.getByTestId('solve-button');
  expect(button).toBeInTheDocument();

  fireEvent.click(button)

  const result = screen.getByTestId('game-result');
  expect(result).toHaveTextContent('solved')
});
