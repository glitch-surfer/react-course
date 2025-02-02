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
        <p>Type: {item.astronomicalObjectType ?? 'Unknown'}</p>
        <p>Location: {item.location?.name ?? 'Unknown'}</p>
      </div>
    );
  }
}

export default Card;
