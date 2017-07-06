import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import GroceryIndexItem from "./grocery_index_item";
import { requestAllGroceryItems, deleteGroceryItem, updateGroceryItem,
    updateGroceryQuantityDisplay } from "../../actions/grocery_actions";
import { selectAllGroceryItems } from "../../reducers/selectors";

const mapStateToProps = (state) => ({
  groceryItems: selectAllGroceryItems(state)
});

const mapDispatchToProps = (dispatch) => ({
  requestAllGroceryItems: () => dispatch(requestAllGroceryItems()),
  deleteGroceryItem: (id) => dispatch(deleteGroceryItem(id)),
  updateGroceryItem: (groceryItem) => dispatch(updateGroceryItem(groceryItem)),
  updateGroceryQuantityDisplay: (id, quantityDisplay) =>
      dispatch(updateGroceryQuantityDisplay(id, quantityDisplay))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GroceryIndexItem));
