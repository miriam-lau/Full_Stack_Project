import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import RecipeDetail from "./recipe_detail";
import { requestRecipe } from "../../actions/recipe_actions";

const mapStateToProps = (state) => ({
  recipes: state.recipe
});

const mapDispatchToProps = dispatch => ({
  requestRecipe: id => dispatch(requestRecipe(id))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RecipeDetail));
