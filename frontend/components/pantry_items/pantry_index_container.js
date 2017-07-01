import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import PantryIndex from './pantry_index';
import { requestAllPantryItems, requestPantryItem, removePantryItem,
  editPantryItem } from '../../actions/pantry_item_actions';
import { selectAllPantryItems } from '../../reducers/selectors';

const mapStateToProps = (state) => ({
  pantry_items: selectAllPantryItems(state),
  errors: state.pantry_items.errors
});

const mapDispatchToProps = (dispatch) => ({
  requestAllPantryItems: () => dispatch(requestAllPantryItems()),
  requestPantryItem: (id) => dispatch(requestPantryItem(id)),
  removePantryItem: (id) => dispatch(removePantryItem(id)),
  editPantryItem: (pantry_item) => dispatch(editPantryItem(pantry_item))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PantryIndex));
