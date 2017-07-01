import React from 'react';
import {Route, Link} from 'react-router-dom';

import GroceryIndexItem from './grocery_index_item';
import GroceryItemFormContainer from './grocery_item_form_container';
import updatePantry from '../pantry_items/update_pantry';

const selectCategory = ["Baking and Dry Goods", "Beverages", "Bread and Bakery", "Canned and Jarred Goods", "Dairy", "Dried Herbs and Spices", "Frozen Foods", "Fruits and Vegetables", "Meat and Seafood", "Oils and Sauces", "Snacks", "Miscellaneous"]

class GroceryIndex extends React.Component {
  constructor(props) {
    super(props);
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
    let successful = false;
    event.preventDefault();
    this.props.grocery_items.map(grocery_item => {
      if (grocery_item.purchased === true) {
        let key = grocery_item.id;
        successful = updatePantry(key, grocery_item, this.props.pantry_items,
          this.props.createNewPantryItem, this.props.editPantryItem,
          this.props.removeGroceryItem);
      }
    })
    this.setState({success: successful});
  }

  render() {
    const grocery_items = this.props.grocery_items;
    const pantry_items = this.props.pantry_items;
    return (
      <div>
        <div className="grocery-wrapper">
          <div className="grocery-side-nav-bar">
            <img src="http://res.cloudinary.com/miriam-lau/image/upload/v1498447613/side_nav_grocery_fi2cgm.png" alt="side-bar-img-grocery" className="grocery-img"/>
          </div>

          <div className="grocery-index">
            <section><h2 className="grocery-title">Grocery</h2>
            </section>

            <div className="add-grocery-item">
              <Route path="/groceries" component={ GroceryItemFormContainer } />
            </div>

            <div className="grocery-category-section">
              <h3 className="grocery-category">Uncategorized</h3>
              <ul className="grocery-items">
                {this.props.grocery_items.map((item, idx) => {
                  if ((item.purchased === false) && (item.category === '')) {
                    return (<GroceryIndexItem
                      key={item.id}
                      grocery_item={item}
                      requestGroceryItem={this.props.requestGroceryItem}
                      removeGroceryItem={this.props.removeGroceryItem}
                      editGroceryItem={this.props.editGroceryItem} />)
                    }
                })}
              </ul>
            </div>

            {selectCategory.map((category, idx) => {
              return (
                <div className="grocery-category-section">
                  <h3 className="grocery-category">{category}</h3>
                  <ul className="grocery-items">
                    {this.props.grocery_items.map((item, idx) => {
                      if ((item.purchased === false) && (item.category === category)) {
                        return (<GroceryIndexItem
                          key={item.id}
                          grocery_item={item}
                          requestGroceryItem={this.props.requestGroceryItem}
                          removeGroceryItem={this.props.removeGroceryItem}
                          editGroceryItem={this.props.editGroceryItem} />)
                        }
                    })}
                  </ul>
                </div>
              )
            })}
          </div>

          <div className="grocery-purchases">
            <section><h2 className="grocery-title">Purchased</h2>
            </section>

            <div className="add-to-pantry-div">
              <section>
                <button className="add-to-pantry-button"
                onClick={this.handleSubmit}>Add to Pantry</button>
              </section>

              <div className="add-success">
              {(this.state.success === true) ? "Add Successful!" : "" }
              </div>
            </div>

            <div className="grocery-category-section">
              <h3 className="grocery-category">Uncategorized</h3>
              <ul className="grocery-items">
                {this.props.grocery_items.map((item, idx) => {
                  if ((item.purchased === true) && (item.category === '')) {
                    return (<GroceryIndexItem
                      key={item.id}
                      grocery_item={item}
                      requestGroceryItem={this.props.requestGroceryItem}
                      removeGroceryItem={this.props.removeGroceryItem}
                      editGroceryItem={this.props.editGroceryItem} />)
                    }
                })}
              </ul>
            </div>

            {selectCategory.map((category, idx) => {
              return (
                <div className="purchased-grocery-category-section">
                  <h3 className="purchased- grocery-category">{category}</h3>
                  <ul className="grocery-items">
                    {this.props.grocery_items.map((item, idx) => {
                      if ((item.purchased === true) && (item.category === category)) {
                        return (<GroceryIndexItem
                          key={item.id}
                          grocery_item={item}
                          requestGroceryItem={this.props.requestGroceryItem}
                          removeGroceryItem={this.props.removeGroceryItem}
                          editGroceryItem={this.props.editGroceryItem} />)
                        }
                    })}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default GroceryIndex;
