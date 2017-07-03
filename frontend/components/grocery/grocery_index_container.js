import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import GroceryIndex from './grocery_index';
import { requestAllGroceryItems, requestGroceryItem, removeGroceryItem,
  editGroceryItem } from '../../actions/grocery_actions';
import { requestAllPantryItems, createNewPantryItem, editPantryItem }
  from '../../actions/pantry_item_actions';
import { selectAllGroceryItems, selectAllPantryItems } from '../../reducers/selectors';

const mapStateToProps = (state) => ({
  grocery_items: selectAllGroceryItems(state),
  pantryItems: selectAllPantryItems(state),
  errors: state.grocery.errors
});

const mapDispatchToProps = (dispatch) => ({
  requestAllGroceryItems: () => dispatch(requestAllGroceryItems()),
  requestGroceryItem: (id) => dispatch(requestGroceryItem(id)),
  removeGroceryItem: (id) => dispatch(removeGroceryItem(id)),
  editGroceryItem: (grocery_item) => dispatch(editGroceryItem(grocery_item)),
  requestAllPantryItems: () => dispatch(requestAllPantryItems()),
  createNewPantryItem: (pantryItem) =>
    dispatch(createNewPantryItem(pantryItem)),
  editPantryItem: (pantryItem) => dispatch(editPantryItem(pantryItem))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GroceryIndex));
