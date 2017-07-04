import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import PantryIndex from "./pantry_index";
import { requestAllPantryItems, requestPantryItem, deletePantryItem,
  updatePantryItem, updateQuantityDisplay } from "../../actions/pantry_item_actions";
import { selectAllPantryItems } from "../../reducers/selectors";

const mapStateToProps = (state) => ({
  pantryItems: selectAllPantryItems(state),
  errors: state.pantryItems.errors
});

const mapDispatchToProps = (dispatch) => ({
  requestAllPantryItems: () => dispatch(requestAllPantryItems()),
  requestPantryItem: (id) => dispatch(requestPantryItem(id)),
  deletePantryItem: (id) => dispatch(deletePantryItem(id)),
  updatePantryItem: (pantryItem) =>
      dispatch(updatePantryItem(pantryItem)),
  updateQuantityDisplay: (id, quantityDisplay) =>
      dispatch(updateQuantityDisplay(id, quantityDisplay))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PantryIndex));
