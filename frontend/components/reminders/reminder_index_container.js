import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import ReminderIndex from "./reminder_index";
import { requestAllReminders, deleteReminder } from
    "../../actions/reminder_actions";
import { requestAllRecipes, updateRecipe } from "../../actions/recipe_actions";
import { selectAllRecipes, selectAllReminders } from
    "../../reducers/selectors";

const mapStateToProps = (state) => ({
  reminders: selectAllReminders(state),
  recipes: selectAllRecipes(state),
  errors: state.reminder.errors
});

const mapDispatchToProps = (dispatch) => ({
  requestAllReminders: () => dispatch(requestAllReminders()),
  deleteReminder: (id) => dispatch(deleteReminder(id)),
  requestAllRecipes: () => dispatch(requestAllRecipes()),
  updateRecipe: (recipe) => dispatch(updateRecipe(recipe))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReminderIndex));
