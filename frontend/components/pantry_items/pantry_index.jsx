import React from 'react';
import {Route} from 'react-router-dom';

import PantryIndexItem from './pantry_index_item';
import PantryItemFormContainer from './pantry_item_form_container';

class PantryIndex extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.requestAllPantryItems();
  }

  render() {
    return (
      <div>
        <Route exact path="/pantry_items" component={ PantryItemFormContainer } />
        <br />
        <div className="pantry-table-column-titles">
          <div className="col-1">Item</div>
          <div className="col-2">Quantity</div>
          <div className="col-3">Unit</div>
          <div className="col-4">Category</div>
        </div>
        <ul className="pantry-items">
          {this.props.pantry_items.map(item  =>
            <PantryIndexItem key={item.id} pantry_item={item} />
          )}
        </ul>

      </div>
    );
  }
}

export default PantryIndex;
