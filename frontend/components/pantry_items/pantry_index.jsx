import React from 'react';
import PantryIndexItem from './pantry_index_item';

class PantryIndex extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.requestAllPantryItems();
  }

  render() {
    return (
      <div className="pantry-items">
        <div className="pantry-table-column-titles">
          <div className="col-1">Item</div>
          <div className="col-2">Quantity</div>
          <div className="col-3">Unit</div>
          <div className="col-4">Category</div>
        </div>
        {this.props.pantry_items.map(item =>
          <PantryIndexItem key={item.id} pantry_item={item} />
        )}
      </div>
    );
  }
}

export default PantryIndex;
