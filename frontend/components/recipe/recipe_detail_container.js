import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import RecipeDetail from "./recipe_detail";
import { requestRecipe, deleteRecipe, udpateRecipe } from
    "../../actions/recipe_actions";

const mapStateToProps = (state) => ({
  recipe: state.recipe
});

const mapDispatchToProps = dispatch => ({
  requestRecipe: (id) => dispatch(requestRecipe(id)),
  deleteRecipe: (id) => dispatch(deleteRecipe(id)),
  updateRecipe: (recipe) => dispatch(updateRecipe(recipe))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RecipeDetail));
