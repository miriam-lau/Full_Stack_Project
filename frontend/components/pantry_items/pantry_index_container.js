import { connect } from 'react-redux';
import PantryIndex from './pantry_index';
import { requestAllPantryItems } from '../../actions/pantry_item_actions';
// consider making a selector reducer

const mapStateToProps = (state) => ({
  pantry_items: state
});

const mapDispatchToProps = (dispatch) => ({
  requestAllPantryItems: () => dispatch(requestAllPantryItems())
});

export default connect(mapStateToProps, mapDispatchToProps)(PantryIndex);
