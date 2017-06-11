import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import RecipeForm from './recipe_form';
import { createNewRecipe, editRecipe, editRecipeDbOnly } from '../../actions/recipe_actions';
import { selectAllRecipes } from '../../reducers/selectors';

const mapStateToProps = (state) => ({
  recipes: selectAllRecipes(state),
  errors: state.errors
});

const mapDispatchToProps = (dispatch) => ({
  createRecipe: recipe => dispatch(createNewRecipe(recipe)),
  editRecipe: (recipe) => dispatch(editRecipe(recipe)),
  editRecipeDbOnly: (recipe) => dispatch(editRecipeDbOnly(recipe))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RecipeForm));
