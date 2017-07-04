import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import GroceryIndex from "./grocery_index";
import { requestAllGroceryItems, requestGroceryItem, deleteGroceryItem,
  updateGroceryItem } from "../../actions/grocery_actions";
import { requestAllPantryItems, createPantryItem, updatePantryItem }
  from "../../actions/pantry_item_actions";
import { selectAllGroceryItems, selectAllPantryItems } from "../../reducers/selectors";

const mapStateToProps = (state) => ({
  groceryItems: selectAllGroceryItems(state),
  pantryItems: selectAllPantryItems(state),
  errors: state.grocery.errors
});

const mapDispatchToProps = (dispatch) => ({
  requestAllGroceryItems: () => dispatch(requestAllGroceryItems()),
  requestGroceryItem: (id) => dispatch(requestGroceryItem(id)),
  deleteGroceryItem: (id) => dispatch(deleteGroceryItem(id)),
  updateGroceryItem: (groceryItem) => dispatch(updateGroceryItem(groceryItem)),
  requestAllPantryItems: () => dispatch(requestAllPantryItems()),
  createPantryItem: (pantryItem) =>
    dispatch(createPantryItem(pantryItem)),
  updatePantryItem: (pantryItem) => dispatch(updatePantryItem(pantryItem))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GroceryIndex));
