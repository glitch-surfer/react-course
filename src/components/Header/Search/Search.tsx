import React, { useEffect, useState } from 'react';
import './Search.css';

export const Search = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const savedSearch = localStorage.getItem('searchTerm');
    if (savedSearch) {
      setSearchTerm(savedSearch);
    }
  }, []);

  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const processedTerm = searchTerm.trim();
    localStorage.setItem('searchTerm', processedTerm);

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
