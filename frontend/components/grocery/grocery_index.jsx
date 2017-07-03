import React from 'react';
import {Route, Link} from 'react-router-dom';

import { indexCategory } from '../utils/item_categories';
import GroceryIndexItem from './grocery_index_item';
import GroceryItemFormContainer from './grocery_item_form_container';
import groceryUpdatePantry from './grocery_update_pantry';


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
        successful = groceryUpdatePantry(key, grocery_item,
          this.props.pantryItems, this.props.createPantryItem, this.props.updatePantryItem, this.props.removeGroceryItem);
      }
    })
    this.setState({success: successful});
  }

  render() {
    const grocery_items = this.props.grocery_items;
    const pantryItems = this.props.pantryItems;
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

            {indexCategory.map((category, idx) => {
              return (
                <div key={idx} className="grocery-category-section">
                  {category === "" ?
                    <h3 className="grocery-category">Uncategorized</h3> :
                    <h3 className="grocery-category">{category}</h3>
                  }
                  <ul className="grocery-items">
                    {this.props.grocery_items.map((item) => {
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

            {indexCategory.map((category, idx) => {
              return (
                <div key={idx} className="grocery-category-section">
                  {category === "" ?
                    <h3 className="grocery-category">Uncategorized</h3> :
                    <h3 className="grocery-category">{category}</h3>
                  }
                  <ul className="grocery-items">
                    {this.props.grocery_items.map((item) => {
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
