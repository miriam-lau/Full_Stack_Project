import { connect } from 'react-redux';
import PantryIndex from './pantry_index';
import { requestAllPantryItems, createPantryItem } from '../../actions/pantry_item_actions';
import { selectAllPantryItems } from '../../reducers/selectors';

// what to do if currentUser is null
const mapStateToProps = (state) => ({
  pantry_items: selectAllPantryItems(state),
  errors: state.errors
});

const mapDispatchToProps = (dispatch) => ({
  requestAllPantryItems: () => dispatch(requestAllPantryItems()),
  createPantryItem: pantry_item => dispatch(createPantryItem(pantry_item))
});

export default connect(mapStateToProps, mapDispatchToProps)(PantryIndex);
