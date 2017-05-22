import React from 'react';
import {Route, Link} from 'react-router-dom';

import GroceryIndexItem from './grocery_index_item';
import GroceryItemFormContainer from './grocery_item_form_container';

class GroceryIndex extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.requestAllGroceryItems();
  }

  render() {
    // const deleteGroceryItem = this.props.deleteGroceryItem;
    // const editGroceryItem = this.props.editGroceryItem;
    // const grocery_items = this.props.grocery_items;
    return (
      <div>GroceryIndex</div>
        // <Route exact path="/grocery_items" component={ GroceryItemFormContainer } />
        // <Route path="/grocery_items/:id/edit" component={ GroceryItemUpdateFormContainer } />
        // <br />
        // <div className="grocery-table-column-titles">
        //   <div className="col-1">Item</div>
        //   <div className="col-2">Quantity</div>
        //   <div className="col-3">Unit</div>
        //   <div className="col-4">Category</div>
        // </div>
        // <ul className="grocery-items">
        //   {this.props.grocery_items.map((item, idx) => {
        //     return (<GroceryIndexItem key={idx} grocery_item={item}
        //       deleteGroceryItem={deleteGroceryItem}
        //       editGroceryItem={editGroceryItem} />)
        //   })}
        // </ul>
    );
  }
}

export default GroceryIndex;
