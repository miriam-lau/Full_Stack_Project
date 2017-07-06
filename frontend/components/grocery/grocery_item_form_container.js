import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import GroceryItemForm from "./grocery_item_form";
import { createGroceryItem, updateGroceryItem, updateGroceryQuantityDisplay,
    deleteGroceryItem } from "../../actions/grocery_actions";
import { selectAllGroceryItems } from "../../reducers/selectors";

const mapStateToProps = (state) => ({
  groceryItems: selectAllGroceryItems(state),
  errors: state.grocery.errors
});

const mapDispatchToProps = (dispatch) => ({
  createGroceryItem: (groceryItem) => dispatch(createGroceryItem(groceryItem)),
  updateGroceryItem: (groceryItem) => dispatch(updateGroceryItem(groceryItem)),
  updateGroceryQuantityDisplay: (id, quantityDisplay) =>
      dispatch(updateGroceryQuantityDisplay(id, quantityDisplay)),
  deleteGroceryItem: (id) => dispatch(deleteGroceryItem(id))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GroceryItemForm));
