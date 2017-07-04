import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import RecipeForm from "./recipe_form";
import { createRecipe } from "../../actions/recipe_actions";

const mapStateToProps = (state) => ({
  errors: state.errors
});

const mapDispatchToProps = (dispatch) => ({
  createRecipe: recipe => dispatch(createRecipe(recipe)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RecipeForm));
