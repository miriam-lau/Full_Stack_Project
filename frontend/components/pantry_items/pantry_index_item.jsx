import React from 'react';
import { Link } from 'react-router-dom';

class PantryIndexItem extends React.Component {
  render() {
    const pantry_item = this.props.pantry_item;
    const deletePantryItem = this.props.deletePantryItem;

    return (
      <div className="pantry-items">
        <Link to={`/pantry_items/${pantry_item.id}`}></Link>
        <div className="pantry-table-columns">
          <div className="col-1">{ pantry_item.name }</div>
          <div className="col-2">{ pantry_item.quantity }</div>
          <div className="col-3">{ pantry_item.unit }</div>
          <div className="col-4">{ pantry_item.category }</div>
        </div>
        <button className="pantry-button"
          onClick={ () => {deletePantryItem(pantry_item.id)} }>
          Delete Pantry Item</button>
      </div>
    )
  }
}

export default PantryIndexItem;


// const PantryIndexItem = ({pantry_item, deletePantryItem}) => {
//   console.log(props);
//   return (
//     <div className="pantry-items">
//     <Link to={`/pantry_items/${pantry_item.id}`}></Link>
//     <div className="pantry-table-columns">
//     <div className="col-1">{ pantry_item.name }</div>
//     <div className="col-2">{ pantry_item.quantity }</div>
//     <div className="col-3">{ pantry_item.unit }</div>
//     <div className="col-4">{ pantry_item.category }</div>
//     </div>
//     <button className="delete-button" onClick={ deletePantryItem(pantry_item.id) }>
//     Delete Pantry Item</button>
//     </div>
//   )
// };
