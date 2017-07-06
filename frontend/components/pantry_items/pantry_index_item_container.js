import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import PantryIndexItem from "./pantry_index_item";
import { requestAllPantryItems, deletePantryItem, updatePantryItem,
    updateQuantityDisplay } from "../../actions/pantry_item_actions";
import { selectAllPantryItems } from "../../reducers/selectors";

const mapStateToProps = (state) => ({
  pantryItems: selectAllPantryItems(state)
});

const mapDispatchToProps = (dispatch) => ({
  requestAllPantryItems: () => dispatch(requestAllPantryItems()),
  deletePantryItem: (id) => dispatch(deletePantryItem(id)),
  updatePantryItem: (pantryItem) => dispatch(updatePantryItem(pantryItem)),
  updateQuantityDisplay: (id, quantityDisplay) =>
      dispatch(updateQuantityDisplay(id, quantityDisplay))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PantryIndexItem));
