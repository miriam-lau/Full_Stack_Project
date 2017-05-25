// import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';
//
// import UpdatePantry from './update_pantry';
// import { createPantryItem, editPantryItem,
//   editPantryItemDbOnly } from '../../actions/pantry_item_actions';
// import { selectAllPantryItems } from '../../reducers/selectors';
// import { deleteGroceryItem } from '../../actions/grocery_actions';
//
// const mapStateToProps = (state) => ({
//   pantry_items: selectAllPantryItems(state)
// });
//
// const mapDispatchToProps = (dispatch) => ({
//   createPantryItem: pantry_item => dispatch(createPantryItem(pantry_item)),
//   editPantryItem: (pantry_item) => dispatch(editPantryItem(pantry_item)),
//   editPantryItemDbOnly: (pantry_item) => dispatch(editPantryItemDbOnly(pantry_item)),
//   deleteGroceryItem: (id) => dispatch(deleteGroceryItem(id))
// });
//
// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UpdatePantry));
