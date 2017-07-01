import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import PantryItemForm from './pantry_item_form';
import { createNewPantryItem, editPantryItem, editPantryItemDbOnly } from '../../actions/pantry_item_actions';
import { selectAllPantryItems } from '../../reducers/selectors';

const mapStateToProps = (state) => ({
  pantry_items: selectAllPantryItems(state),
  errors: state.pantry_item.errors
});

const mapDispatchToProps = (dispatch) => ({
  createNewPantryItem: pantry_item => dispatch(createNewPantryItem(pantry_item)),
  editPantryItem: (pantry_item) => dispatch(editPantryItem(pantry_item)),
  editPantryItemDbOnly: (pantry_item) => dispatch(editPantryItemDbOnly(pantry_item))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PantryItemForm));
