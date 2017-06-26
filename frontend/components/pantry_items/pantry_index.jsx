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

          <div className="pantry-index">
            <section><h2 className="pantry-title">Pantry</h2>
            </section>

            <div className="add-pantry-item">
              <Route path="/pantry_items" component={ PantryItemFormContainer } />
            </div>

            <ul className="pantry-items">
              {this.props.pantry_items.map((item, idx) => {
                return (<PantryIndexItem
                  key={idx}
                  pantry_item_id={item.id}
                  pantry_item={item}
                  requestPantryItem={this.props.requestPantryItem}
                  deletePantryItem={this.props.deletePantryItem}
                  editPantryItemDbOnly={this.props.editPantryItemDbOnly}
                  editPantryItem={this.props.editPantryItem} />)
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
