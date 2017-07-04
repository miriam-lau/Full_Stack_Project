import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import GroceryItemForm from "./grocery_item_form";
import { createNewGroceryItem } from "../../actions/grocery_actions";

const mapStateToProps = (state) => ({
  errors: state.grocery.errors
});

const mapDispatchToProps = (dispatch) => ({
  createNewGroceryItem: grocery_item => dispatch(createNewGroceryItem(grocery_item))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GroceryItemForm));
