import React from 'react';
import './Search.css';
import { useLocalStorage } from '../../../hooks/useLocalStorage.ts';
import { SEARCH_TERM_KEY } from '../../../consts/consts.ts';

export const Search = () => {
  const [searchTerm, setSearchTerm] = useLocalStorage(SEARCH_TERM_KEY);

  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const processedTerm = searchTerm.trim();

    const searchEvent = new CustomEvent('onSearch', {
      detail: processedTerm,
    });
    window.dispatchEvent(searchEvent);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleOnChange}
        placeholder="Search..."
      />
      <button onClick={handleOnClick}>Search</button>
    </div>
  );
};
