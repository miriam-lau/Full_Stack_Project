import { connect } from 'react-redux';
import PantryIndex from './pantry_index';
import { requestAllPantryItems } from '../../actions/pantry_item_actions';
import { selectAllPantryItems } from '../../reducers/selectors';

// what to do if currentUser is null
const mapStateToProps = (state) => ({
  pantry_items: selectAllPantryItems(state)
});

const mapDispatchToProps = (dispatch) => ({
  requestAllPantryItems: () => dispatch(requestAllPantryItems())
});

export default connect(mapStateToProps, mapDispatchToProps)(PantryIndex);
