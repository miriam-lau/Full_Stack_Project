import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import RecipeDetail from "./recipe_detail";
import { requestRecipe, deleteRecipe } from "../../actions/recipe_actions";

const mapStateToProps = (state) => ({
  recipe: state.recipe
});

const mapDispatchToProps = dispatch => ({
  requestRecipe: (id) => dispatch(requestRecipe(id)),
  deleteRecipe: (id) => dispatch(deleteRecipe(id))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RecipeDetail));
