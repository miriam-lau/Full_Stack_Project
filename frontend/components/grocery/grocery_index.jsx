import React from "react";
import { Route, Link } from "react-router-dom";

import GroceryIndexItemContainer from "./grocery_index_item_container";
import GroceryItemFormContainer from "./grocery_item_form_container";
import groceryUpdatePantry from "./grocery_update_pantry";
import { indexCategory } from "../utils/item_categories";

class GroceryIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = { success: false };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.props.requestAllGroceryItems();
    this.props.requestAllPantryItems();
  }

  /*
    On submit, if grocery item "purchased" category is true, set state to successful. "groceryUpdatePantry" is a presentational component to update the pantry with the purchased grocery item.
    @param {event}
  */
  handleSubmit(event) {
    let successful = false;
    event.preventDefault();
    this.props.groceryItems.map(groceryItem => {
      if (groceryItem.purchased === true) {
        let id = groceryItem.id;
        successful = groceryUpdatePantry(
            this.props.pantryItems,
            groceryItem.id,
            groceryItem,
            this.props.createPantryItem,
            this.props.updatePantryItem,
            this.props.deleteGroceryItem);
      }
    })
    this.setState({ success: successful });
  }

  render() {
    const groceryItems = this.props.groceryItems;
    const pantryItems = this.props.pantryItems;
    return (
      <div className="wrapper">
        <div>
          <img
              src="http://res.cloudinary.com/miriam-lau/image/upload/v1498447613/side_nav_grocery_fi2cgm.png"
              alt="side-bar-img-grocery" className="side-nav-img"
          />
        </div>

        <div className="index">
          <section>
            <h2 className="index-title">Grocery</h2>
          </section>

          <div className="add-item">
            <GroceryItemFormContainer />
          </div>

          {indexCategory.map((category, idx) => {
            return (
              <div key={ idx } className="index-category-section">
                <h3 className="index-category">{category === "" ?
                    "Uncategorized" : category}
                </h3>
                <ul className="items">
                  {this.props.groceryItems.map((item) => {
                    if ((item.purchased === false) &&
                        (item.category === category)) {
                      return (
                        <GroceryIndexItemContainer
                          key={ item.id }
                          groceryItem={ item }
                        />
                      )
                    }
                  })}
                </ul>
              </div>
            )
          })}
        </div>

        <div className="grocery-purchases">
          <section>
            <h2 className="index-title">Purchased</h2>
          </section>

          <div className="add-to-pantry-div">
            <section>
              <button className="add-to-pantry-button"
                  onClick={ this.handleSubmit }>Add to Pantry
              </button>
            </section>

            <div className="add-success">
              {(this.state.success === true) ? "Add Successful!" : "" }
            </div>
          </div>

          {indexCategory.map((category, idx) => {
            return (
              <div key = { idx } className="purchased-grocery-category-section">
                <h3 className="index-category">{category === "" ?
                    "Uncategorized" : category}
                </h3>
                <ul className="items">
                  {this.props.groceryItems.map((item) => {
                    if ((item.purchased === true) &&
                        (item.category === category)) {
                      return (
                        <GroceryIndexItemContainer
                          key={ item.id }
                          groceryItem={ item }
                        />
                      )
                    }
                  })}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    );
  }
}

export default GroceryIndex;
