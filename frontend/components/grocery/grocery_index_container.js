import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import GroceryIndex from './grocery_index';
import { requestAllGroceryItems, requestGroceryItem, deleteGroceryItem,
  editGroceryItem } from '../../actions/grocery_actions';
import { requestAllPantryItems, createPantryItem, editPantryItem, editPantryItemDbOnly }
  from '../../actions/pantry_item_actions';
import { selectAllGroceryItems, selectAllPantryItems } from '../../reducers/selectors';

const mapStateToProps = (state) => ({
  grocery_items: selectAllGroceryItems(state),
  pantry_items: selectAllPantryItems(state),
  errors: state.grocery.errors
});

const mapDispatchToProps = (dispatch) => ({
  requestAllGroceryItems: () => dispatch(requestAllGroceryItems()),
  requestGroceryItem: (id) => dispatch(requestGroceryItem(id)),
  deleteGroceryItem: (id) => dispatch(deleteGroceryItem(id)),
  editGroceryItem: (grocery_item) => dispatch(editGroceryItem(grocery_item)),
  requestAllPantryItems: () => dispatch(requestAllPantryItems()),
  createPantryItem: (pantry_item) => dispatch(createPantryItem(pantry_item)),
  editPantryItem: (pantry_item) => dispatch(editPantryItem(pantry_item)),
  editPantryItemDbOnly: (pantry_item) => dispatch(editPantryItemDbOnly(pantry_item))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GroceryIndex));
