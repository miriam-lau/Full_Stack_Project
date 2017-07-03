import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import PantryItemForm from './pantry_item_form';
import { createPantryItem, updatePantryItem } from '../../actions/pantry_item_actions';
import { selectAllPantryItems } from '../../reducers/selectors';

const mapStateToProps = (state) => ({
  pantryItems: selectAllPantryItems(state),
  errors: state.pantryItems.errors
});

const mapDispatchToProps = (dispatch) => ({
  createPantryItem: pantryItem => dispatch(createPantryItem(pantryItem)),
  updatePantryItem: pantryItem => dispatch(updatePantryItem(pantryItem))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PantryItemForm));
