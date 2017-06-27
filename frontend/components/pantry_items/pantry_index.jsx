import React from 'react';
import {Route, Link} from 'react-router-dom';

import PantryIndexItem from './pantry_index_item';
import PantryItemFormContainer from './pantry_item_form_container';

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

            <h3 className="pantry-category">Baking and Dry Goods</h3>
            <ul className="pantry-items">
              {this.props.pantry_items.map((item, idx) => {
                if (item.category === "Baking and Dry Goods") {
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

            <h3 className="pantry-category">Beverages</h3>
            <ul className="pantry-items">
              {this.props.pantry_items.map((item, idx) => {
                if (item.category === "Beverages") {
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

            <h3 className="pantry-category">Bread and Bakery</h3>
            <ul className="pantry-items">
              {this.props.pantry_items.map((item, idx) => {
                if (item.category === "Bread and Bakery") {
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

            <h3 className="pantry-category">Canned and Jarred Goods</h3>
            <ul className="pantry-items">
              {this.props.pantry_items.map((item, idx) => {
                if (item.category === "Canned and Jarred Goods") {
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

            <h3 className="pantry-category">Dairy</h3>
            <ul className="pantry-items">
              {this.props.pantry_items.map((item, idx) => {
                if (item.category === "Dairy") {
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

            <h3 className="pantry-category">Dried Herbs and Spices</h3>
            <ul className="pantry-items">
              {this.props.pantry_items.map((item, idx) => {
                if (item.category === "Dried Herbs and Spices") {
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

            <h3 className="pantry-category">Frozen Foods</h3>
            <ul className="pantry-items">
              {this.props.pantry_items.map((item, idx) => {
                if (item.category === "Frozen Foods") {
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

            <h3 className="pantry-category">Fruits and Vegetables</h3>
            <ul className="pantry-items">
              {this.props.pantry_items.map((item, idx) => {
                if (item.category === "Fruits and Vegetables") {
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

            <h3 className="pantry-category">Meat and Seafood</h3>
            <ul className="pantry-items">
              {this.props.pantry_items.map((item, idx) => {
                if (item.category === "Meat and Seafood") {
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

            <h3 className="pantry-category">Oils and Sauces</h3>
            <ul className="pantry-items">
              {this.props.pantry_items.map((item, idx) => {
                if (item.category === "Oils and Sauces") {
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

            <h3 className="pantry-category">Snacks</h3>
            <ul className="pantry-items">
              {this.props.pantry_items.map((item, idx) => {
                if (item.category === "Snacks") {
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
