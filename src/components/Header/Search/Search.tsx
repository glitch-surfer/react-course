import { Component, MouseEvent, ChangeEvent } from 'react';
import './Search.css';

interface SearchProps {
  searchTerm: string;
}

class Search extends Component {
  state: SearchProps;

  constructor(props: Record<string, unknown>) {
    super(props);
    this.state = {
      searchTerm: '',
    };
  }

  componentDidMount() {
    const savedSearch = localStorage.getItem('searchTerm');
    if (savedSearch) {
      this.setState({ searchTerm: savedSearch });
    }
  }

  handleOnClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const processedTerm = this.state.searchTerm.trim();
    localStorage.setItem('searchTerm', processedTerm);

    const searchEvent = new CustomEvent('onSearch', {
      detail: processedTerm,
    });
    window.dispatchEvent(searchEvent);
  };

  handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: e.target.value });
  };

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.searchTerm}
          onChange={this.handleOnChange}
          placeholder="Search..."
        />
        <button onClick={this.handleOnClick}>Search</button>;
      </div>
    );
  }
}

export default Search;
