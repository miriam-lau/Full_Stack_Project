import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import RecipeForm from "./recipe_form";
import { createNewRecipe } from "../../actions/recipe_actions";

const mapStateToProps = (state) => ({
  errors: state.errors
});

const mapDispatchToProps = (dispatch) => ({
  createRecipe: recipe => dispatch(createNewRecipe(recipe)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RecipeForm));
