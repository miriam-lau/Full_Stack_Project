import React from 'react';
import {Route, Link} from 'react-router-dom';

import GroceryIndexItem from './grocery_index_item';
import GroceryItemFormContainer from './grocery_item_form_container';

class GroceryIndex extends React.Component {
  constructor(props) {
    super(props)
  }

// componentDidMount or WillMount?
  componentWillMount() {
    this.props.requestAllGroceryItems();
  }

  // componentWillReceiveProps(nextProps) {
  //   if (this.props !== nextProps) {
  //     this.props.requestAllGroceryItems();
  //   }
  // }

  render() {
    const grocery_items = this.props.grocery_items;
    return (
      <div>
        <div className="grocery-wrapper">
          <div className="grocery-one">
            <Route path="/groceries" component={ GroceryItemFormContainer } />
          </div>
          <br />

          <div className="grocery-two">
            <h2>Current Grocery List</h2>
            <p className="edit-instructions">Click on item to edit</p>
          </div>

          <div className="grocery-three">
            <ul className="grocery-items">
              {this.props.grocery_items.map(item => {
                if (item.purchased === false) {
                  return (<GroceryIndexItem
                    key={item.id}
                    grocery_item={item}
                    requestGroceryItem={this.props.requestGroceryItem}
                    deleteGroceryItem={this.props.deleteGroceryItem}
                    editGroceryItem={this.props.editGroceryItem} />)
                  }
              })}
            </ul>
          </div>

          <br />
          <br />
          <div className="grocery-four">
          <h2>Purchased</h2>
          <p className="edit-instructions">Click on item to edit</p>
          </div>

          <div className="grocery-five">
            <ul className="purchased-grocery-items">
              {this.props.grocery_items.map(item => {
                if (item.purchased === true) {
                  return (<GroceryIndexItem
                    key={item.id}
                    grocery_item={item}
                    requestGroceryItem={this.props.requestGroceryItem}
                    deleteGroceryItem={this.props.deleteGroceryItem}
                    editGroceryItem={this.props.editGroceryItem} />)
                }
              })}
            </ul>
          </div>

        </div>
      </div>
    );
  }
}

export default GroceryIndex;
