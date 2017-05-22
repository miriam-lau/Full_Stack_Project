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
    const grocery_items = this.props.grocery_items;
    return (
      <div>
        <div className="grocery-wrapper">
          <div className="grocery-one">
            <Route exact path="/groceries" component={ GroceryItemFormContainer } />
          </div>
          <br />

          <div className="grocery-two">
            <h2>Current Grocery List</h2>
          </div>

          <div className="grocery-three">
            <ul className="grocery-items">
              {this.props.grocery_items.map(item => {
                return (<GroceryIndexItem
                  key={item.id}
                  grocery_item={item}
                  requestGroceryItem={this.props.requestGroceryItem}
                  deleteGroceryItem={this.props.deleteGroceryItem}
                  editGroceryItem={this.props.editGroceryItem} />)
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default GroceryIndex;
