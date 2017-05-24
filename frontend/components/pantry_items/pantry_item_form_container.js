import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import PantryItemForm from './pantry_item_form';
import { createPantryItem, editPantryItem } from '../../actions/pantry_item_actions';
import { selectAllPantryItems } from '../../reducers/selectors';

const mapStateToProps = (state) => ({
  pantry_items: selectAllPantryItems(state),
  errors: state.errors
});

const mapDispatchToProps = (dispatch) => ({
  createPantryItem: pantry_item => dispatch(createPantryItem(pantry_item)),
  editPantryItem: (pantry_item) => dispatch(editPantryItem(pantry_item))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PantryItemForm));
