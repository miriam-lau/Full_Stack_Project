import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import GroceryIndex from './grocery_index';
import { requestAllGroceryItems, requestGroceryItem, deleteGroceryItem,
  editGroceryItem } from '../../actions/grocery_actions';
import { selectAllGroceryItems } from '../../reducers/selectors';

const mapStateToProps = (state) => ({
  grocery_items: selectAllGroceryItems(state),
  errors: state.errors
});

const mapDispatchToProps = (dispatch) => ({
  requestAllGroceryItems: () => dispatch(requestAllGroceryItems()),
  requestGroceryItem: (id) => dispatch(requestGroceryItem(id)),
  deleteGroceryItem: (id) => dispatch(deleteGroceryItem(id)),
  editGroceryItem: (grocery_item) => dispatch(editGroceryItem(grocery_item))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GroceryIndex));
