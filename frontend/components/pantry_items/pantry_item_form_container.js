import { connect } from 'react-redux';
import PantryItemForm from './pantry_item_form';
import { createPantryItem } from '../../actions/pantry_item_actions';

const mapStateToProps = (state) => ({
  errors: state.errors
});

const mapDispatchToProps = (dispatch) => ({
  createPantryItem: pantry_item => dispatch(createPantryItem(pantry_item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PantryItemForm);


// clearErrors: () => dispatch(receiveErrors([]))
