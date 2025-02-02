import { Component } from 'react';
import Card from './Card/Card';
import './CardList.css';

export interface Item {
  uid: string;
  name: string;
  astronomicalObjectType: string;
  location: {
    uid: string;
    name: string;
  };
}

interface CardListProps {
  items: Item[];
}

class CardList extends Component<CardListProps> {
  render() {
    const { items } = this.props;

    return (
      <div className="card-list">
        {items.map((item) => (
          <Card key={item.uid} item={item} />
        ))}
      </div>
    );
  }
}

export default CardList;
