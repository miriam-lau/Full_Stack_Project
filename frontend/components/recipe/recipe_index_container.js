import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import RecipeIndex from './recipe_index';
import { requestAllRecipes, requestRecipe, createNewRecipe, editRecipe,
  removeRecipe} from '../../actions/recipe_actions';
import { selectAllRecipes } from '../../reducers/selectors';

const mapStateToProps = (state) => ({
  recipes: selectAllRecipes(state),
  errors: state.errors
});

const mapDispatchToProps = (dispatch) => ({
  requestAllRecipes: () => dispatch(requestAllRecipes()),
  requestRecipe: (id) => dispatch(requestRecipe(id)),
  createNewRecipe: (recipe) => dispatch(createNewRecipe(recipe)),
  editRecipe: (recipe) => dispatch(editRecipe(recipe)),
  removeRecipe: (id) => dispatch(removeRecipe(id))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RecipeIndex));
