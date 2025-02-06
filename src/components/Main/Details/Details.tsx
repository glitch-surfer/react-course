import React, { useEffect, useState } from 'react';
import { Spinner } from '../Spinner/Spinner.tsx';
import { Item } from '../CardList/CardList.tsx';
import './Details.css';
import { useOutletContext } from 'react-router-dom';
import { BASE_URL } from '../../../consts/consts.ts';

interface DetailsProps {
  detailsId: string;
  handleCloseDetails: () => void;
}

export const Details: React.FC = () => {
  const [itemDetails, setItemDetails] = useState<Item | null>(null);
  const { detailsId, handleCloseDetails } = useOutletContext<DetailsProps>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(`${BASE_URL}/${detailsId}`);

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
  }, [detailsId]);

  if (error) return <p>{error}</p>;
  if (isLoading) return <Spinner />;

  return (
    <div className="details">
      <div>
        <h2>{itemDetails?.name} Details</h2>
        <p>Gender: {itemDetails?.gender}</p>
        <p>Height: {itemDetails?.height}</p>
        <p>Mass: {itemDetails?.mass}</p>
        <p>Skin Color: {itemDetails?.skin_color}</p>
      </div>

      <button onClick={handleCloseDetails} style={{ marginBottom: '10px' }}>
        Close
      </button>
    </div>
  );
};
