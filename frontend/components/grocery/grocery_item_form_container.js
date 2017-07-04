import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import GroceryItemForm from "./grocery_item_form";
import { createGroceryItem } from "../../actions/grocery_actions";

const mapStateToProps = (state) => ({
  errors: state.grocery.errors
});

const mapDispatchToProps = (dispatch) => ({
  createGroceryItem: groceryItem => dispatch(createGroceryItem(groceryItem))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GroceryItemForm));
