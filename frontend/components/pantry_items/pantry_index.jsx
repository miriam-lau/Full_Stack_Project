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
            <section className="pantry-titles">
              <h2>Current Pantry Items</h2>
              <p className="edit-instructions">Click on item to edit</p>
            </section>
          </div>

          <div className="pantry-three">
            <ul className="pantry-items">
              {this.props.pantry_items.map(item => {
                return (<PantryIndexItem
                  key={item.id}
                  pantry_item={item}
                  requestPantryItem={this.props.requestPantryItem}
                  deletePantryItem={this.props.deletePantryItem}
                  editPantryItemDbOnly={this.props.editPantryItemDbOnly}
                  editPantryItem={this.props.editPantryItem} />)
              })}
            </ul>
          </div>

          <div className="pantry-four">
            <div className="tutorial-wrapper">
            <div className="tutorial">
              <h3>Tutorial</h3>
              <br />
              <p>Navigation:  Click between pages on the left.</p>
              <br />
              <p>Search:  Click the "search" icon and type in an item name.</p>
              <br />
              <p>Add: T ype in a number, unit(optional), and name. Press "Enter" or click "Add".</p>
              <br />
              <p>Adding a duplicate item (same name and unit) will auto-update
                the same item in pantry.</p>
              <br />
              <p>Update:  Click on the item fields. Click off the field to save.</p>
              <br />
              <p>Delete:  Click on the "garbage can" icon.</p>
            </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PantryIndex;
