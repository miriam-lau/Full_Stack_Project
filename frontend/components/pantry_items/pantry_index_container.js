import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import PantryIndex from "./pantry_index";
import { requestAllPantryItems } from "../../actions/pantry_item_actions";
import { selectAllPantryItems } from "../../reducers/selectors";

const mapStateToProps = (state) => ({
  pantryItems: selectAllPantryItems(state),
  errors: state.pantryItems.errors
});

const mapDispatchToProps = (dispatch) => ({
  requestAllPantryItems: () => dispatch(requestAllPantryItems())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PantryIndex));
