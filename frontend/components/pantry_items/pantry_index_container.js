import { connect } from 'react-redux';
import PantryIndex from './pantry_index';
import { requestAllPantryItems } from '../../actions/pantry_item_actions';
import { selectAllPantryItems } from '../../reducers/selectors';
// consider making a selector reducer

// what to do if currentUser is null
const mapStateToProps = (state) => ({
  pantry_items: selectAllPantryItems(state)
});
// state.session.currentUser.pantry_items

const mapDispatchToProps = (dispatch) => ({
  requestAllPantryItems: () => dispatch(requestAllPantryItems())
});

export default connect(mapStateToProps, mapDispatchToProps)(PantryIndex);
