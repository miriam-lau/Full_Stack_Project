import React from 'react';
import {Route, Link} from 'react-router-dom';

import PantryIndexItem from './pantry_index_item';
import PantryItemFormContainer from './pantry_item_form_container';

const selectCategory = ["Baking and Dry Goods", "Beverages", "Bread and Bakery", "Canned and Jarred Goods", "Dairy", "Dried Herbs and Spices", "Frozen Foods", "Fruits and Vegetables", "Meat and Seafood", "Oils and Sauces", "Snacks", "Miscellaneous"]

class PantryIndex extends React.Component {
  constructor(props) {
    super(props)
  }

// componentDidMount or WillMount?
  componentWillMount() {
    this.props.requestAllPantryItems();
  }

  render() {
    const pantry_items = this.props.pantry_items;
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

            <div className="pantry-category-section">
              <h3 className="pantry-category">Uncategorized</h3>
              <ul className="pantry-items">
                {this.props.pantry_items.map((item, idx) => {
                  if (item.category === '') {
                    return ( <PantryIndexItem
                      key={idx}
                      pantry_item_id={item.id}
                      pantry_item={item}
                      requestPantryItem={this.props.requestPantryItem}
                      removePantryItem={this.props.removePantryItem}
                      editPantryItemDbOnly={this.props.editPantryItemDbOnly}
                      editPantryItem={this.props.editPantryItem} />
                    )
                  }
                })}
              </ul>
            </div>

            {selectCategory.map((category, idx) => {
              return (
                <div className="pantry-category-section">
                  <h3 className="pantry-category">{category}</h3>
                  <ul className="pantry-items">
                    {this.props.pantry_items.map((item, idx) => {
                      if (item.category === category) {
                        return ( <PantryIndexItem
                          key={idx}
                          pantry_item_id={item.id}
                          pantry_item={item}
                          requestPantryItem={this.props.requestPantryItem}
                          deletePantryItem={this.props.deletePantryItem}
                          editPantryItemDbOnly={this.props.editPantryItemDbOnly}
                          editPantryItem={this.props.editPantryItem} />
                        )
                      }
                    })}
                  </ul>
                </div>
              )
            })}
          </div>

          <div className="reminders">
            <section><h2 className="pantry-title">Reminders</h2>
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
