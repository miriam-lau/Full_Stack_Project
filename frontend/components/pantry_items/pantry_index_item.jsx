import React from 'react';
import { Link } from 'react-router-dom';

const PantryIndexItem = ({ pantry_item }) => (
  <div className="pantry-items">
    <Link to={`/pantry_items/${pantry_item.id}`}></Link>
    <div className="pantry-table-columns">
      <div className="col-1">{ pantry_item.name }</div>
      <div className="col-2">{ pantry_item.quantity }</div>
      <div className="col-3">{ pantry_item.unit }</div>
      <div className="col-4">{ pantry_item.category }</div>
    </div>
  </div>
);

export default PantryIndexItem;
