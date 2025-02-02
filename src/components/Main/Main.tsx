import { Component } from 'react';
import CardList, { Item } from './CardList/CardList';
import Spinner from './Spinner/Spinner';
import './Main.css';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary.tsx';

interface MainState {
  items: Item[]; //todo
  isLoading: boolean;
  error: string | null;
}

class Main extends Component {
  state: MainState;

  constructor(props: Record<string, unknown>) {
    super(props);
    this.state = {
      items: [],
      isLoading: false,
      error: null,
    };
  }

  componentDidMount() {
    window.addEventListener('onSearch', this.handleSearch);
    const savedSearch = localStorage.getItem('searchTerm');
    this.fetchData(savedSearch || '');
  }

  componentWillUnmount() {
    window.removeEventListener('onSearch', this.handleSearch);
  }

  handleSearch = (event: Event) => {
    this.fetchData((event as CustomEvent).detail);
  };

  fetchData = async (searchTerm: string) => {
    this.setState({ isLoading: true, error: null });
    try {
      const response = await fetch(
        `https://swapi.dev/api/people/?search=${searchTerm}`
      );

      if (!response.ok) throw new Error('Failed to fetch data');
      const data = await response.json();
      this.setState({ items: data.results ?? [] });
    } catch (err) {
      this.setState({ error: (err as Error).message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { items, isLoading, error } = this.state;

    if (error) {
      return <div className="error">Error: {error}</div>;
    }

    if (isLoading) {
      return <Spinner />;
    }

    return (
      <main className="main">
        <ErrorBoundary>
          <CardList items={items} />
        </ErrorBoundary>
      </main>
    );
  }
}

export default Main;
