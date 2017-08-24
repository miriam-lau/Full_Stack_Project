import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import RecipeReminder from "./recipe_reminder";
import { requestAllRecipes } from "../../actions/recipe_actions";
import { selectAllRecipes } from "../../reducers/selectors";

const mapStateToProps = (state) => ({
  recipes: selectAllRecipes(state)
});

const mapDispatchToProps = (dispatch) => ({
  requestAllRecipes: () => dispatch(requestAllRecipes())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RecipeReminder));
