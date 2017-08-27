import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import RecipeReminderItem from "./recipe_reminder_item";
import { updateRecipe } from "../../actions/recipe_actions";

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  updateRecipe: (recipe) => dispatch(updateRecipe(recipe))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RecipeReminderItem));
