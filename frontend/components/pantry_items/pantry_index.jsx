import React from 'react';
import PantryIndexItem from './pantry_index_item';
import PantryItemForm from './pantry_item_form';

class PantryIndex extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.requestAllPantryItems();
  }

  render() {
    console.log(this.props.pantry_items);
    const { createPantryItem, errors } = this.props;
    return (
      <div className="pantry-items">
        <div>
          <PantryItemForm createPantryItem= { createPantryItem }
            errors={ errors } />
        </div>

        <br />
        <br />
        <div className="pantry-table-column-titles">
          <div className="col-1">Item</div>
          <div className="col-2">Quantity</div>
          <div className="col-3">Unit</div>
          <div className="col-4">Category</div>
        </div>
        {this.props.pantry_items.map(item  =>
          <PantryIndexItem key={item.id} pantry_item={item} />
        )}
      </div>
    );
  }
}

export default PantryIndex;
