import React from "react";
import {Route, Link} from "react-router-dom";

import PantryIndexItem from "./pantry_index_item";
import PantryItemFormContainer from "./pantry_item_form_container";
import { indexCategory } from "../utils/item_categories";

class PantryIndex extends React.Component {
  constructor(props) {
    super(props)
  }

// componentDidMount or WillMount?
  componentWillMount() {
    this.props.requestAllPantryItems();
  }

  render() {
    const pantryItems = this.props.pantryItems;
    return (
      <div>
        <div className="pantry-wrapper">
          <div className="pantry-side-nav-bar">
            <img src="http://res.cloudinary.com/miriam-lau/image/upload/v1498447620/side_nav_pantry_f4sutn.png" alt="side-bar-img-pantry" className="pantry-img"/>
          </div>

          <div className="pantry-index">
            <section><h2 className="pantry-title">Pantry</h2>
            </section>

            <div className="add-pantry-item">
              <Route path="/pantry_items" component={ PantryItemFormContainer } />
            </div>

            {indexCategory.map((category, idx) => {
              return (
                <div key={idx} className="pantry-category-section">
                  {category === "" ?
                    <h3 className="pantry-category">Uncategorized</h3> :
                    <h3 className="pantry-category">{category}</h3>
                  }
                  <ul className="pantry-items">
                    {this.props.pantryItems.map((item) => {
                      if (item.category === category) {
                        return ( <PantryIndexItem
                          key={item.id}
                          pantryItem={item}
                          pantryItems={this.props.pantryItems}
                          requestPantryItem={this.props.requestPantryItem}
                          deletePantryItem={this.props.deletePantryItem}
                          updatePantryItem={this.props.updatePantryItem}
                          updateQuantityDisplay={this.props.updateQuantityDisplay} />
                        )
                      }
                    })}
                  </ul>
                </div>
              )
            })}
          </div>

          <div className="reminders">
            <section>
              <h2 className="pantry-title">Reminders</h2>
            </section>

            <div>
              <h3 className="reminder-titles">Grocery Lists</h3>
            </div>

            <div>
              <h3 className="reminder-titles">Recipes To Make</h3>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default PantryIndex;
