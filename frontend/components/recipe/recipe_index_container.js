import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import RecipeIndex from "./recipe_index";
import { requestAllRecipes, requestRecipe, createRecipe, updateRecipe,
  deleteRecipe} from "../../actions/recipe_actions";
import { selectAllRecipes } from "../../reducers/selectors";

const mapStateToProps = (state) => ({
  recipes: selectAllRecipes(state),
  errors: state.errors
});

const mapDispatchToProps = (dispatch) => ({
  requestAllRecipes: () => dispatch(requestAllRecipes()),
  requestRecipe: (id) => dispatch(requestRecipe(id)),
  createRecipe: (recipe) => dispatch(createRecipe(recipe)),
  updateRecipe: (recipe) => dispatch(updateRecipe(recipe)),
  deleteRecipe: (id) => dispatch(deleteRecipe(id))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RecipeIndex));
