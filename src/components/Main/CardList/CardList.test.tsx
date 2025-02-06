import { render, screen } from '@testing-library/react';
import { CardList, Item } from './CardList';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup } from 'vitest-browser-react';

vi.mock('./Card/Card', () => ({
  Card: ({ item, handleClick }: { item: Item; handleClick: () => void }) => (
    <div data-testid="card" onClick={handleClick}>
      {item.name}
    </div>
  ),
}));

vi.mock('./ErrorButton/ErrorButton', () => ({
  default: () => <button data-testid="error-button">Error Button</button>,
}));

describe('CardList', () => {
  afterEach(() => {
    // Ensures the DOM is cleaned up between tests
    cleanup();
    vi.clearAllMocks(); // Clear mocks to avoid side effects
  });

  it('renders the correct number of cards', () => {
    const mockItems: Item[] = [
      {
        name: 'Luke Skywalker',
        url: 'https://swapi.dev/api/people/1/',
        height: '',
        mass: '',
        hair_color: '',
        skin_color: '',
        eye_color: '',
        birth_year: '',
        gender: '',
        homeworld: '',
        films: [],
        species: [],
        vehicles: [],
        starships: [],
        created: '',
        edited: '',
      },
      {
        name: 'Leia Organa',
        url: 'https://swapi.dev/api/people/2/',
        height: '',
        mass: '',
        hair_color: '',
        skin_color: '',
        eye_color: '',
        birth_year: '',
        gender: '',
        homeworld: '',
        films: [],
        species: [],
        vehicles: [],
        starships: [],
        created: '',
        edited: '',
      },
    ];

    const mockHandleCardClick = vi.fn();

    render(
      <CardList items={mockItems} handleCardClick={mockHandleCardClick} />
    );

    // Assert the correct number of cards is rendered
    const cards = screen.getAllByTestId('card');
    expect(cards).toHaveLength(2);
  });

  it('renders "No data" when the items array is empty', () => {
    render(<CardList items={[]} handleCardClick={vi.fn()} />);

    // Assert that the "No data" message is displayed
    expect(screen.getByText(/No data/i)).toBeInTheDocument();
  });
});
