import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import RecipeReminders from "./recipe_reminders";
import { requestAllRecipes, updateRecipe } from "../../actions/recipe_actions";
import { selectAllRecipes } from "../../reducers/selectors";

const mapStateToProps = (state) => ({
  recipes: selectAllRecipes(state)
});

const mapDispatchToProps = (dispatch) => ({
  requestAllRecipes: () => dispatch(requestAllRecipes()),
  updateRecipe: () => dispatch(updateRecipe())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RecipeReminders));
