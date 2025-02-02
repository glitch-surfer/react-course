import { Component } from 'react';
import CardList, { Item } from './CardList/CardList';
import Spinner from './Spinner/Spinner';
import './Main.css';

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
      // Replace with your API
      const response = await fetch(
        `https://stapi.co/api/v2/rest/astronomicalObject/search/`
      );
      console.log(searchTerm);

      if (!response.ok) throw new Error('Failed to fetch data');
      const data = await response.json();
      this.setState({ items: data.astronomicalObjects });
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
        <CardList items={items} />
      </main>
    );
  }
}

export default Main;
