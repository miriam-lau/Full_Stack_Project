import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import PantryIndex from './pantry_index';
import { requestAllPantryItems, deletePantryItem, editPantryItem } from '../../actions/pantry_item_actions';
import { selectAllPantryItems } from '../../reducers/selectors';

const mapStateToProps = (state) => ({
  pantry_items: selectAllPantryItems(state),
  errors: state.errors
});

const mapDispatchToProps = (dispatch) => ({
  requestAllPantryItems: () => dispatch(requestAllPantryItems()),
  deletePantryItem: (id) => dispatch(deletePantryItem(id)),
  editPantryItem: (pantry_item) => dispatch(editPantryItem(pantry_item))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PantryIndex));
