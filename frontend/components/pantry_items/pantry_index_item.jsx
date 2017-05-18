import React from 'react';
import { Link } from 'react-router-dom';

const PantryIndexItem = ({ pantry_item }) => (
  <li className="pantry-index-item">
    <Link to={`/pantry_items/${pantry_item.id}`}>
      <span>Item: { pantry_item.name } </span>
      <span>Quantity: { pantry_item.quantity } </span>
      <span>Unit: { pantry_item.unit } </span>
      <span>Category: { pantry_item.category } </span>
    </Link>
  </li>
);

export default PantryIndexItem;
