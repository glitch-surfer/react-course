import { Item } from '../CardList.tsx';
import './Card.css';

interface CardProps {
  item: Item;
  handleClick: () => void;
}

export const Card = ({ item, handleClick }: CardProps) => {
  return (
    <div className="card" onClick={handleClick}>
      <h3>Name: {item.name ?? 'Unknown'}</h3>
      <p>Skin Color: {item.skin_color ?? 'Unknown'}</p>
      <p>
        Eye Color:{' '}
        <span style={{ color: item.eye_color }}>
          {item.eye_color ?? 'Unknown'}
        </span>
      </p>
    </div>
  );
};
