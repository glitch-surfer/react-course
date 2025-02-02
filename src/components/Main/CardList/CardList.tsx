import { Component } from 'react';
import Card from './Card/Card';
import './CardList.css';

export interface Item {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: [];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

interface CardListProps {
  items: Item[];
}

class CardList extends Component<CardListProps> {
  render() {
    const { items } = this.props;

    return (
      <div className="card-list">
        {items?.length
          ? items.map((item) => <Card key={item.url} item={item} />)
          : 'No data'}
      </div>
    );
  }
}

export default CardList;
