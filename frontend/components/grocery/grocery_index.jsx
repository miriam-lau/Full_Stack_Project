import React from 'react';
import {Route, Link} from 'react-router-dom';

// import PantryIndexItem from './pantry_index_item';
// import PantryItemFormContainer from './pantry_item_form_container';
// import PantryItemUpdateFormContainer from './pantry_item_update_form_container';

class GroceryIndex extends React.Component {
  constructor(props) {
    super(props)
  }

  // componentDidMount() {
  //   this.props.requestAllPantryItems();
  // }

  render() {
    // const deletePantryItem = this.props.deletePantryItem;
    // const editPantryItem = this.props.editPantryItem;
    // const pantry_items = this.props.pantry_items;
    return (
      <div>GroceryIndex</div>
        // <Route exact path="/pantry_items" component={ PantryItemFormContainer } />
        // <Route path="/pantry_items/:id/edit" component={ PantryItemUpdateFormContainer } />
        // <br />
        // <div className="pantry-table-column-titles">
        //   <div className="col-1">Item</div>
        //   <div className="col-2">Quantity</div>
        //   <div className="col-3">Unit</div>
        //   <div className="col-4">Category</div>
        // </div>
        // <ul className="pantry-items">
        //   {this.props.pantry_items.map((item, idx) => {
        //     return (<PantryIndexItem key={idx} pantry_item={item}
        //       deletePantryItem={deletePantryItem}
        //       editPantryItem={editPantryItem} />)
        //   })}
        // </ul>
    );
  }
}

export default GroceryIndex;