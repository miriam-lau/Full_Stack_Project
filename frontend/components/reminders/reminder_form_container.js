import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import ReminderForm from "./reminder_form";
import { createReminder, updateReminder } from "../../actions/reminder_actions";
import { selectAllReminders } from "../../reducers/selectors";

const mapStateToProps = (state) => ({
  reminders: selectAllReminders(state),
  errors: state.reminder.errors
});

const mapDispatchToProps = (dispatch) => ({
  createReminder: (reminder) => dispatch(createReminder(reminder)),
  deleteReminder: (id) => dispatch(deleteReminder(id))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReminderForm));
