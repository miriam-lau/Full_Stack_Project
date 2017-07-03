import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import PantryItemForm from './pantry_item_form';
import { createNewPantryItem, editPantryItem } from '../../actions/pantry_item_actions';
import { selectAllPantryItems } from '../../reducers/selectors';

const mapStateToProps = (state) => ({
  pantryItems: selectAllPantryItems(state),
  errors: state.pantryItems.errors
});

const mapDispatchToProps = (dispatch) => ({
  createNewPantryItem: pantryItem => dispatch(createNewPantryItem(pantryItem)),
  editPantryItem: pantryItem => dispatch(editPantryItem(pantryItem))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PantryItemForm));
