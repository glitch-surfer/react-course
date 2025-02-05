import React, { useEffect, useState } from 'react';
import { Spinner } from '../Spinner/Spinner.tsx';
import { Item } from '../CardList/CardList.tsx';
import './Details.css';

interface DetailsProps {
  url: string;
  handleClose: () => void;
}

export const Details: React.FC<DetailsProps> = ({ url, handleClose }) => {
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
    <>
      <div className="overlay" onClick={handleClose}></div>
      <div className="details">
        <div>
          <h2>{itemDetails?.name} Details</h2>
          <p>Gender: {itemDetails?.gender}</p>
          <p>Height: {itemDetails?.height}</p>
          <p>Mass: {itemDetails?.mass}</p>
          <p>Skin Color: {itemDetails?.skin_color}</p>
        </div>

        <button onClick={handleClose} style={{ marginBottom: '10px' }}>
          Close
        </button>
      </div>
    </>
  );
};
