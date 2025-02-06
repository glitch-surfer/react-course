import { describe, it, vi, expect, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { Card } from './Card';
import { Item } from '../CardList.tsx';

describe('Card Component', () => {
  const mockItem = {
    name: 'Luke Skywalker',
    skin_color: 'fair',
    eye_color: 'blue',
  } as Item;

  afterEach(() => {
    cleanup();
  });

  it('renders the relevant card data', () => {
    render(<Card item={mockItem} handleClick={vi.fn()} />);

    // Check if the relevant data is rendered
    expect(screen.getByText(/Name: Luke Skywalker/i)).toBeInTheDocument();
    expect(screen.getByText(/Skin Color: fair/i)).toBeInTheDocument();
    expect(screen.getByText(/Eye Color:/i)).toBeInTheDocument();

    // Verify eye color is styled correctly
    const eyeColorElement = screen.getByText('blue');
    expect(eyeColorElement).toBeInTheDocument();
  });

  it('renders "Unknown" for missing data', () => {
    const incompleteItem = {
      name: undefined,
      skin_color: undefined,
      eye_color: undefined,
    } as unknown as Item;

    render(<Card item={incompleteItem} handleClick={vi.fn()} />);

    // Check if "Unknown" is rendered for missing data
    expect(screen.getByText(/Name: Unknown/i)).toBeInTheDocument();
    expect(screen.getByText(/Skin Color: Unknown/i)).toBeInTheDocument();

    const eyeColorElement = screen.getByText('Eye Color:');
    const eyeColorChildElement = eyeColorElement.querySelector('span');
    expect(eyeColorChildElement).toHaveTextContent('Unknown');
  });

  it('calls handleClick when the card is clicked', () => {
    const handleClickMock = vi.fn();

    render(<Card item={mockItem} handleClick={handleClickMock} />);

    // Simulate a click on the card
    const cardElement = screen
      .getByText(/Name: Luke Skywalker/i)
      .closest('div');
    fireEvent.click(cardElement as HTMLElement);

    // Ensure handleClick is called
    expect(handleClickMock).toHaveBeenCalledTimes(1);
  });

  it('triggers an additional API call when clicked', async () => {
    // Mock the API call
    const fetchDetailedInfoMock = vi.fn();
    const handleClickMock = () => {
      fetchDetailedInfoMock(); // Simulate the API call
    };

    render(<Card item={mockItem} handleClick={handleClickMock} />);

    // Simulate a click on the card
    const cardElement = screen
      .getByText(/Name: Luke Skywalker/i)
      .closest('div');
    fireEvent.click(cardElement as HTMLElement);

    // Ensure the API call is triggered
    expect(fetchDetailedInfoMock).toHaveBeenCalledTimes(1);
  });
});
