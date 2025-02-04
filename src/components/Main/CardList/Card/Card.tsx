import { Component } from 'react';
import { Item } from '../CardList.tsx';
import './Card.css';

interface CardProps {
  item: Item;
}

class Card extends Component<CardProps> {
  render() {
    const { item } = this.props;

    return (
      <div className="card">
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
  }
}

export default Card;
