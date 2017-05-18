import React from 'react';
import { Link } from 'react-router-dom';

const PantryIndexItem = ({ pantry_item }) => (
  <li className="pantry-index-item">
    <Link to={`/pantry_items/${pantry_items.id}`}>
      <span> { pantry_items.name } </span>
      <span> { pantry_items.quantity } </span>
      <span> { pantry_items.unit } </span>
      <span> { pantry_items.category } </span>
    </Link>
  </li>
);

export default PantryIndexItem;
