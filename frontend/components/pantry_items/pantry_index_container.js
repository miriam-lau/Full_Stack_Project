import { connect } from 'react-redux';
import PantryIndex from './pantry_index';
import { requestAllPantryItems } from '../../actions/pantry_item_actions';
import { selectAllPantryItems } from '../../reducers/selectors';

const mapStateToProps = (state) => ({
  pantry_items: selectAllPantryItems(state),
});

const mapDispatchToProps = (dispatch) => ({
  requestAllPantryItems: () => dispatch(requestAllPantryItems()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PantryIndex);
