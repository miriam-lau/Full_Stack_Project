import React from 'react';
import {Route, Link} from 'react-router-dom';

import GroceryIndexItem from './grocery_index_item';
import GroceryItemFormContainer from './grocery_item_form_container';
import updatePantry from '../pantry_items/update_pantry';

class GroceryIndex extends React.Component {
  constructor(props) {
    super(props)
    this.state = {success: false};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.grocery_items = this.props.grocery_items;
  }

// componentDidMount or WillMount?
  componentWillMount() {
    this.props.requestAllGroceryItems();
    this.props.requestAllPantryItems();
  }

  handleSubmit(event) {
    console.log("in grocery index");
    let successful = false;
    event.preventDefault();
    this.props.grocery_items.map(grocery_item => {
      if (grocery_item.purchased === true) {
        let key = grocery_item.id;
        console.log("in grocery index");
        console.log(this.props.pantry_items);
        successful = updatePantry(key, grocery_item, this.props.pantry_items,
          this.props.createPantryItem, this.props.editPantryItemDbOnly,
          this.props.deleteGroceryItem);
      }
    })
    this.setState({success: successful});
  }

  render() {
    const grocery_items = this.props.grocery_items;
    const pantry_items = this.props.pantry_items;
    console.log('here2');
    console.log(pantry_items);
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

          <div className="add-success">
            {(this.state.success === true) ? "Add Successful!" : "" }
          </div>

          <div className="grocery-four">
            <section>
              <h2>Purchased</h2>
              <p className="edit-instructions">Click on item to edit</p>
            </section>
            <section>
              <button className="add-to-pantry-button"
                onClick={this.handleSubmit}>Add to Pantry</button>
            </section>
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
