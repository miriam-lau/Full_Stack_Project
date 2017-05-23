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
          <div className="pantry-one">
            <Route path="/pantry_items" component={ PantryItemFormContainer } />
          </div>
          <br />

          <div className="pantry-two">
            <h2>Current Pantry Items</h2>
            <p className="edit-instructions">Click on item to edit</p>
          </div>

          <div className="pantry-three">
            <ul className="pantry-items">
              {this.props.pantry_items.map(item => {
                return (<PantryIndexItem
                  key={item.id}
                  pantry_item={item}
                  requestPantryItem={this.props.requestPantryItem}
                  deletePantryItem={this.props.deletePantryItem}
                  editPantryItem={this.props.editPantryItem} />)
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default PantryIndex;
