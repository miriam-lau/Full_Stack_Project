import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import PantryIndex from './pantry_index';
import { requestAllPantryItems, deletePantryItem, editPantryItem } from '../../actions/pantry_item_actions';
import { selectAllPantryItems } from '../../reducers/selectors';

const mapStateToProps = (state) => ({
  pantry_items: selectAllPantryItems(state),
  errors: state.errors
});

const mapDispatchToProps = (dispatch, {pantry_item}) => ({
  requestAllPantryItems: () => dispatch(requestAllPantryItems()),
  deletePantryItem: (id) => dispatch(deletePantryItem(id)),
  editPantryItem: (id) => dispatch(editPantryItem(id))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PantryIndex));
