import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import GroceryItemForm from './grocery_item_form';
import { createGroceryItem } from '../../actions/grocery_actions';

const mapStateToProps = (state) => ({
  errors: state.errors
});

const mapDispatchToProps = (dispatch) => ({
  createGroceryItem: grocery_item => dispatch(createGroceryItem(grocery_item))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GroceryItemForm));
