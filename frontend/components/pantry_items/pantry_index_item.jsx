import React from 'react';
import { Link } from 'react-router-dom';

class PantryIndexItem extends React.Component {
  render() {
    const pantry_item = this.props.pantry_item;
    const deletePantryItem = this.props.deletePantryItem;

    return (
      <div className="pantry-items">
        <div className="pantry-table-columns">
          <div className="col-1">{ pantry_item.name }</div>
          <div className="col-2">{ pantry_item.quantity }</div>
          <div className="col-3">{ pantry_item.unit }</div>
          <div className="col-4">{ pantry_item.category }</div>
        </div>
        <div className="button-link">
          <Link to={`/pantry_items/${pantry_item.id}/edit`}>
            Update Pantry Item
          </Link>
        </div>
        <button className="pantry-button"
          onClick={ () => {deletePantryItem(pantry_item.id)} }>
          Delete Pantry Item
        </button>
      </div>
    );
  }
}

export default PantryIndexItem;

// <Link to={`/pantry_items/${pantry_item.id}`}></Link>
// <button className="pantry-button"
//   onClick={ () => {editPantryItem(pantry_item.id)} }>
//   Update Pantry Item
// </button>
