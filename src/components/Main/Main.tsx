import { useEffect, useState } from 'react';
import { CardList, Item } from './CardList/CardList';
import { Spinner } from './Spinner/Spinner';
import './Main.css';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary.tsx';
import { useLocalStorage } from '../../hooks/useLocalStorage.ts';
import { BASE_URL, SEARCH_TERM_KEY } from '../../consts/consts.ts';
import { Pagination } from './Pagination/Pagination.tsx';
import { useSearchParams } from 'react-router-dom';
import { Details } from './Details/Details.tsx';

export const Main = () => {
  const [searchTerm] = useLocalStorage(SEARCH_TERM_KEY);
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [detailsItemUrl, setDetailsItemUrl] = useState<string>('');
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get('page') || '1')
  );

  useEffect(() => {
    const fetchData = async (searchTerm: string) => {
      setIsLoading(true);

      try {
        const response = await fetch(
          `${BASE_URL}/?search=${searchTerm}&page=${currentPage}`
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
    fetchData(searchTerm);

    return () =>
      window.removeEventListener('onSearch', fetchDataFromCustomEvent);
  }, [currentPage]);

  const handleItemClick = (url: string) => {
    setDetailsItemUrl(url);
    setSearchParams({
      page: currentPage.toString(),
      details: (url.split('/').at(-2) ?? '').toString(),
    });
  };

  const handleCloseDetails = () => {
    setDetailsItemUrl('');
    setSearchParams({ page: currentPage.toString() });
  };

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <main className="main">
      <ErrorBoundary>
        <CardList items={items} handleCardClick={handleItemClick} />
        <Pagination
          currentPage={currentPage}
          onPageChange={(page) => {
            setSearchParams({ page: page.toString() });
            setCurrentPage(page);
          }}
        />
        {detailsItemUrl && (
          <div
            style={{ width: '300px', padding: '20px', background: '#f9f9f9' }}
          >
            <button
              onClick={handleCloseDetails}
              style={{ marginBottom: '10px' }}
            >
              Close
            </button>
            <Details url={detailsItemUrl} />
          </div>
        )}
      </ErrorBoundary>
    </main>
  );
};
