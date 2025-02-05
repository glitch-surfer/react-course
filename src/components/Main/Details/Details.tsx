import React, { useEffect, useState } from 'react';
import { Spinner } from '../Spinner/Spinner.tsx';
import { Item } from '../CardList/CardList.tsx';

interface DetailsProps {
  url: string;
}

export const Details: React.FC<DetailsProps> = ({ url }) => {
  const [itemDetails, setItemDetails] = useState<Item | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(url);

        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        setItemDetails(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  if (error) return <p>{error}</p>;
  if (isLoading) return <Spinner />;

  return (
    <div>
      <div>
        <h2>Item Details</h2>
        <p>ID: {itemDetails?.birth_year}</p>
        <p>{itemDetails?.films}</p>
      </div>
    </div>
  );
};
