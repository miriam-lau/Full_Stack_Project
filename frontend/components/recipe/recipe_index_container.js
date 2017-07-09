import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import RecipeIndex from "./recipe_index";
import { requestAllRecipes, createRecipe } from "../../actions/recipe_actions";
import { selectAllRecipes } from "../../reducers/selectors";

const mapStateToProps = (state) => ({
  recipes: selectAllRecipes(state),
  errors: state.errors
});

const mapDispatchToProps = (dispatch) => ({
  requestAllRecipes: () => dispatch(requestAllRecipes()),
  createRecipe: (recipe) => dispatch(createRecipe(recipe)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RecipeIndex));
