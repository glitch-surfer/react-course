import { useEffect, useState } from 'react';
import { CardList, Item } from './CardList/CardList';
import { Spinner } from './Spinner/Spinner';
import './Main.css';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary.tsx';

export const Main = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async (searchTerm: string) => {
      setIsLoading(true);

      try {
        const response = await fetch(
          `https://swapi.dev/api/people/?search=${searchTerm}`
        );

        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        setItems(data?.results ?? []);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchDataFromCustomEvent = (event: Event) =>
      fetchData((event as CustomEvent).detail);

    window.addEventListener('onSearch', fetchDataFromCustomEvent);
    const savedSearch = localStorage.getItem('searchTerm');
    fetchData(savedSearch || '');

    return () =>
      window.removeEventListener('onSearch', fetchDataFromCustomEvent);
  }, []);

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
};
