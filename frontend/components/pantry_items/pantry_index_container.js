import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import PantryIndex from './pantry_index';
import { requestAllPantryItems, requestPantryItem, removePantryItem,
  editPantryItem } from '../../actions/pantry_item_actions';
import { selectAllPantryItems } from '../../reducers/selectors';

const mapStateToProps = (state) => ({
  pantryItems: selectAllPantryItems(state),
  errors: state.pantryItems.errors
});

const mapDispatchToProps = (dispatch) => ({
  requestAllPantryItems: () => dispatch(requestAllPantryItems()),
  requestPantryItem: (id) => dispatch(requestPantryItem(id)),
  removePantryItem: (id) => dispatch(removePantryItem(id)),
  editPantryItem: (pantryItem) => dispatch(editPantryItem(pantryItem))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PantryIndex));
