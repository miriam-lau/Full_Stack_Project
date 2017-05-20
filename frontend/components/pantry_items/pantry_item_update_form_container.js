import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { requestPantryItem, editPantryItem } from '../../actions/pantry_item_actions';
import PantryItemUpdateForm from './pantry_item_update_form';

const mapStateToProps = (state) => ({
  pantry_item: state.pantry_item,
  errors: state.errors
});

const mapDispatchToProps = dispatch => ({
  requestPantryItem: pantry_item => dispatch(requestPantryItem(pantry_item)),
  editPantryItem: pantry_item => dispatch(editPantryItem(pantry_item))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PantryItemUpdateForm));
