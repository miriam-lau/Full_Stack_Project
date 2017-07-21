import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import RecipeUpdate from "./recipe_update";
import { updateRecipe } from "../../actions/recipe_actions";

const mapStateToProps = (state) => ({
  recipe: state.recipe,
  errors: state.recipe.errors
});

const mapDispatchToProps = (dispatch) => ({
  updateRecipe: (recipe) => dispatch(updateRecipe(recipe)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RecipeUpdate));
