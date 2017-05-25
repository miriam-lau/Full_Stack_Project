import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import SearchForm from './search_form';
import { selectAllPantryItems, selectAllGroceryItems } from '../../reducers/selectors';

const mapStateToProps = (state) => ({
  pantry_items: selectAllPantryItems(state),
  grocery_items: selectAllGroceryItems(state)
});

const mapDispatchToProps = (dispatch) => ({
  requestAllPantryItems: () => dispatch(requestAllPantryItems()),
  requestAllGroceryItems: () => dispatch(requestAllGroceryItems())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchForm));
