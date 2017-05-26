import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import PantryIndex from './pantry_index';
import { requestAllPantryItems, requestPantryItem, deletePantryItem,
  editPantryItem, editPantryItemDbOnly } from '../../actions/pantry_item_actions';
import { selectAllPantryItems } from '../../reducers/selectors';

const mapStateToProps = (state) => ({
  pantry_items: selectAllPantryItems(state),
  errors: state.errors
});

const mapDispatchToProps = (dispatch) => ({
  requestAllPantryItems: () => dispatch(requestAllPantryItems()),
  requestPantryItem: (id) => dispatch(requestPantryItem(id)),
  deletePantryItem: (id) => dispatch(deletePantryItem(id)),
  editPantryItem: (pantry_item) => dispatch(editPantryItem(pantry_item)),
  editPantryItemDbOnly: (pantry_item) => dispatch(editPantryItemDbOnly(pantry_item))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PantryIndex));
