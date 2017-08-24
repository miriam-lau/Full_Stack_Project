import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import ReminderIndex from "./reminder_index";
import { requestAllReminders } from "../../actions/reminder_actions";
import { requestAllRecipes } from "../../actions/recipe_actions";
import { selectAllReminders, selectAllRecipes } from "../../reducers/selectors";

const mapStateToProps = (state) => ({
  reminders: selectAllReminders(state),
  recipes: selectAllRecipes(state),
  errors: state.reminder.errors
});

const mapDispatchToProps = (dispatch) => ({
  requestAllReminders: () => dispatch(requestAllReminders()),
  requestAllRecipes: () => dispatch(requestAllRecipes())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReminderIndex));
